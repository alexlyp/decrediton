import { useDex } from "./hooks";
import { AppPassAndPassphraseModalButton } from "buttons";
import { StandaloneHeader } from "layout";
import { AccountsSelect } from "inputs";
import { useEffect, useState, useCallback } from "react";
import { FormattedMessage as T } from "react-intl";
import { LN_ICON } from "constants";
import "style/ConnectPage.css";

export const CreateWalletPageContent = () => {
  const {
    onCreateWalletDexc,
    createWalletDexcAttempt,
    defaultSpendingAccount,
    notMixedAccounts
  } = useDex();

  const [account, setAccount] = useState(defaultSpendingAccount);

  const onCreateWallet = (passphrase, args) => {
    const { appPassphrase } = args;
    onCreateWalletDexc(passphrase, appPassphrase, account);
  };

  return ( 
    <div>
      <AccountsSelect
        filterAccounts={notMixedAccounts}
        className="stakepool-purchase-ticket-input-select"
        {...{ account, onChange: setAccount }}
      />
      <AppPassAndPassphraseModalButton
        disabled={createWalletDexcAttempt}
        modalTitle={
          <T id="dex.createWallet" m="Create Wallet" />
        }
        loading={createWalletDexcAttempt}
        onSubmit={onCreateWallet}
        buttonLabel={<T id="dex.createWalletPassphraseButton" m="CreateWallet" />}
      />
    </div>
  );
};

export const CreateWalletPageHeader = () => (
  <StandaloneHeader
    title={<T id="dex.createWallet.title" m="Connect Wallet to Dex" />}
    description={
      <T
        id="dex.createWallet.description"
        m={"Connect wallet to dex"}
      />
    }
    iconType={LN_ICON}
  />
);
