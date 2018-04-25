import Promise from "promise";
import * as client from "middleware/grpc/client";
import { reverseHash } from "../helpers/byteActions";
import {
  NextAddressRequest,
  ValidateAddressRequest,
  GetTransactionsRequest,
  TransactionDetails,
  PublishUnminedTransactionsRequest,
} from "middleware/walletrpc/api_pb";
import { withLog as log, withLogNoData, logOptionNoResponseData } from "./index";

const promisify = fn => (...args) => new Promise((ok, fail) => fn(...args,
  (res, err) => err ? fail(err) : ok(res)));

export const getWalletService = promisify(client.getWalletService);
export const getTicketBuyerService = promisify(client.getTicketBuyerService);
export const getVotingService = promisify(client.getVotingService);
export const getAgendaService = promisify(client.getAgendaService);
export const getMessageVerificationService = promisify(client.getMessageVerificationService);
export const getDecodeService = promisify(client.getDecodeMessageService);

export const getNextAddress = log((walletService, accountNum) =>
  new Promise((resolve, reject) => {
    const request = new NextAddressRequest();
    request.setAccount(accountNum);
    request.setKind(0);
    walletService
      .nextAddress(request, (error, response) => error ? reject(error) : resolve(response));
  })
    .then(response => ({
      publicKey: response.getPublicKey()
    })), "Get Next Address", logOptionNoResponseData());

export const validateAddress = withLogNoData((walletService, address) =>
  new Promise((resolve, reject) => {
    const request = new ValidateAddressRequest();
    request.setAddress(address);
    walletService.validateAddress(request, (error, response) => error ? reject(error) : resolve(response));
  }), "Validate Address");

export const decodeTransaction = withLogNoData((decodeMessageService, rawTx) =>
  new Promise((resolve, reject) => {
    var buffer = Buffer.isBuffer(rawTx) ? rawTx : Buffer.from(rawTx, "hex");
    var buff = new Uint8Array(buffer);
    decodeRawTransaction(buff, (error, tx) => {
      if (error) {
        reject(error);
      } else {
        resolve(tx);
      }
    });
  }), "Decode Transaction");

// UNMINED_BLOCK_TEMPLATE is a helper const that defines what an unmined block
// looks like (null timestamp, height == -1, etc).
export const UNMINED_BLOCK_TEMPLATE = {
  getTimestamp() { return null; },
  getHeight() { return -1; },
  getHash() { return null; }
};

export const TRANSACTION_TYPE_REGULAR = "Regular";
export const TRANSACTION_TYPE_TICKET_PURCHASE = "Ticket";
export const TRANSACTION_TYPE_VOTE = "Vote";
export const TRANSACTION_TYPE_REVOCATION = "Revocation";
export const TRANSACTION_TYPE_COINBASE = "Coinbase";

// Map from numerical into string transaction type
export const TRANSACTION_TYPES = {
  [TransactionDetails.TransactionType.REGULAR]: TRANSACTION_TYPE_REGULAR,
  [TransactionDetails.TransactionType.TICKET_PURCHASE]: TRANSACTION_TYPE_TICKET_PURCHASE,
  [TransactionDetails.TransactionType.VOTE]: TRANSACTION_TYPE_VOTE,
  [TransactionDetails.TransactionType.REVOCATION]: TRANSACTION_TYPE_REVOCATION,
  [TransactionDetails.TransactionType.COINBASE]: TRANSACTION_TYPE_COINBASE
};

export const TRANSACTION_DIR_SENT = "sent";
export const TRANSACTION_DIR_RECEIVED = "received";
export const TRANSACTION_DIR_TRANSFERED = "transfer";

// formatTransaction converts a transaction from the structure of a grpc reply
// into a structure more amenable to use within decrediton. It stores the block
// information of when the transaction was mined into the transaction.
// Index is the index of the transaction within the block.
export function formatTransaction(block, transaction, index) {

  const inputAmounts = transaction.getDebitsList().reduce((s, input) => s + input.getPreviousAmount(), 0);
  const outputAmounts = transaction.getCreditsList().reduce((s, input) => s + input.getAmount(), 0);
  const amount = outputAmounts - inputAmounts;
  const fee = transaction.getFee();
  const type = transaction.getTransactionType();
  let direction = "";


  let debitAccounts = [];
  transaction.getDebitsList().forEach((debit) => debitAccounts.push(debit.getPreviousAccount()));

  let creditAddresses = [];
  transaction.getCreditsList().forEach((credit) => creditAddresses.push(credit.getAddress()));

  if (type === TransactionDetails.TransactionType.REGULAR) {
    if (amount > 0) {
      direction = TRANSACTION_DIR_RECEIVED;
    } else if (amount < 0 && (fee == Math.abs(amount))) {
      direction = TRANSACTION_DIR_TRANSFERED;
    } else {
      direction = TRANSACTION_DIR_SENT;
    }
  }

  return {
    timestamp: block.getTimestamp(),
    height: block.getHeight(),
    blockHash: block.getHash(),
    index: index,
    hash: transaction.getHash(),
    txHash: reverseHash(Buffer.from(transaction.getHash()).toString("hex")),
    tx: transaction,
    txType: TRANSACTION_TYPES[type],
    debitsAmount: inputAmounts,
    creditsAmount: outputAmounts,
    type,
    direction,
    amount,
    fee,
    debitAccounts,
    creditAddresses
  };
}

export function formatUnminedTransaction(transaction, index) {
  return formatTransaction(UNMINED_BLOCK_TEMPLATE, transaction, index);
}

export const streamGetTransactions = withLogNoData((walletService, startBlockHeight,
  endBlockHeight, targetTransactionCount, dataCb) =>
  new Promise((resolve, reject) => {
    var request = new GetTransactionsRequest();
    request.setStartingBlockHeight(startBlockHeight);
    request.setEndingBlockHeight(endBlockHeight);
    request.setTargetTransactionCount(targetTransactionCount);

    let getTx = walletService.getTransactions(request);
    getTx.on("data", (response) => {
      var foundMined = [];
      var foundUnmined = [];

      let minedBlock = response.getMinedTransactions();
      if (minedBlock) {
        foundMined = minedBlock
          .getTransactionsList()
          .map((v, i) => formatTransaction(minedBlock, v, i));
      }

      let unmined = response.getUnminedTransactionsList();
      if (unmined) {
        foundUnmined = unmined
          .map((v, i) => formatUnminedTransaction(v, i));
      }

      dataCb(foundMined, foundUnmined);
    });
    getTx.on("end", () => {
      resolve();
    });
    getTx.on("error", (err) => {
      reject(err);
    });
  }), "Get Transactions");

export const getTransactions = (walletService, startBlockHeight,
  endBlockHeight, targetTransactionCount) =>
  new Promise((resolve, reject) => {

    var mined = [];
    var unmined = [];

    const dataCb = (foundMined, foundUnmined) => {
      mined  = mined.concat(foundMined);
      unmined = unmined.concat(foundUnmined);
    };

    streamGetTransactions(walletService, startBlockHeight,
      endBlockHeight, targetTransactionCount, dataCb)
      .then(() => resolve({ mined, unmined }))
      .catch(reject);
  });

export const publishUnminedTransactions = log((walletService) => new Promise((resolve, reject) => {
  const req = new PublishUnminedTransactionsRequest();
  walletService.publishUnminedTransactions(req, (err) => err ? reject(err) : resolve());
}), "Publish Unmined Transactions");

const decodeRawTransaction = (rawTx, cb) => {
  /*
	message Input {
		bytes previous_transaction_hash = 1;
		uint32 previous_transaction_index = 2;
		enum TreeType {
			REGULAR = 0;
			UNKNOWN = -1;
			STAKE = 1;
		}
		TreeType tree = 3;
		uint32 sequence = 4;
		int64 amount_in = 5;
		uint32 block_height = 6;
		uint32 block_index = 7;
		bytes signature_script = 8;
		string signature_script_asm = 9;
	}
	message Output {
		int64 value = 1;
		uint32 index = 2;
		int32 version = 3;
		bytes script = 4;
		string script_asm = 5;
		int32 required_signatures = 6;
		enum ScriptClass {
			NON_STANDARD = 0;
			PUB_KEY = 1;
			PUB_KEY_HASH = 2;
			SCRIPT_HASH = 3;
			MULTI_SIG = 4;
			NULL_DATA = 5;
			STAKE_SUBMISSION = 6;
			STAKE_GEN = 7;
			STAKE_REVOCATION = 8;
			STAKE_SUB_CHANGE = 9;
			PUB_KEY_ALT = 10;
			PUB_KEY_HASH_ALT = 11;
		}
		ScriptClass script_class = 7;
		repeated string addresses = 8;
		int64 commitment_amount = 9;
	}
	bytes transaction_hash = 1;
	int32 version = 2;
	uint32 lock_time = 3;
	uint32 expiry = 4;
	TransactionDetails.TransactionType transaction_type = 5;
	repeated Input inputs = 6;
	repeated Output outputs = 7;
  const
  var tx = {
    inputs: [],
    outputs: [],
    txHash: "",
    version: 0,
    lockTime: 0,
    expiry: 0,
    transactionType: "vote",
  };
  */
  var position = 0;

  var tx;
  tx.version = rawTx.readUInt32LE(position);
  position += 4;

  var first = rawTx.readUInt8(position);
  position += 1;
  switch (first) {
  case 0xFD:
    tx.numInputs = rawTx.readUInt16LE(position);
    position += 2;
    break;
  case 0xFE:
    tx.numInputs = rawTx.readUInt32LE(position);
    position += 4;
    break;
  default:
    tx.numInputs = first;
  }

  for (var i = 0; i < tx.numInputs; i++) {
    var input = "";
    tx.inputs.push(input);
  }

  first = rawTx.readUInt8(position);
  position += 1;
  switch (first) {
  case 0xFD:
    tx.numOutputs = rawTx.readUInt16LE(position);
    position += 2;
    break;
  case 0xFE:
    tx.numOutputs = rawTx.readUInt32LE(position);
    position += 4;
    break;
  default:
    tx.numOutputs = first;
  }

  for (var j = 0; j < tx.numOutputs; j++) {
    var output = "";
    tx.outputs.push(output);
  }

  tx.lockTime = rawTx.readUInt32LE(position);
  position += 4;
  tx.expiry = rawTx.readUInt32LE(position);
  position += 4;
  console.log(tx);
  return cb(null, tx);
};
