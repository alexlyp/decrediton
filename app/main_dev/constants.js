import { app } from "electron";

export const MAX_LOG_LENGTH = 50000;

export const VERSION_MESSAGE = `${app.getName()} version ${app.getVersion()}`;

export const BOTH_CONNECTION_ERR_MESSAGE = "Cannot use both --testnet and --mainnet.";

export const USAGE_MESSAGE = `${app.getName()} version ${app.getVersion()}
Usage
  $ ${app.getName()} [--help] [--version] [--debug] [--testnet|--mainnet]
               [--extrawalletargs=...]

Options
  --help             Show help and exit
  --version          Show version and exit
  --debug  -d        Debug daemon/wallet messages
  --testnet          Connect to testnet
  --mainnet          Connect to mainnet
  --extrawalletargs  Pass extra arguments to dcrwallet
  --customBinPath    Custom path for dcrd/dcrwallet/dcrctl binaries
`;
