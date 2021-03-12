import { useDex } from "./hooks";
import { PassphraseModalButton } from "buttons";
import { StandaloneHeader } from "layout";
import { FormattedMessage as T } from "react-intl";
import { LN_ICON } from "constants";
import "style/ConnectPage.css";

export const CreateWalletPageContent = () => {
  const {
    onCreateWalletDexc,
    createWalletDexcAttempt,
    user
  } = useDex();

  return ( 
    <div>
      {user}
      <PassphraseModalButton
        disabled={createWalletDexcAttempt}
        modalTitle={
          <T id="dex.createWallet" m="Create Wallet" />
        }
        loading={createWalletDexcAttempt}
        onSubmit={onCreateWalletDexc}
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
