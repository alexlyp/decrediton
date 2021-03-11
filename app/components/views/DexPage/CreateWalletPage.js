import { useDex } from "./hooks";
import { PassphraseModalButton } from "buttons";
import { StandalonePage } from "layout";
import { FormattedMessage as T } from "react-intl";

const CreateWalletPage = () => {
  const {
    onCreateWalletDexc,
    createWalletDexcAttempt,
    user
  } = useDex();

  return (
    <StandalonePage>
    {user}
    <PassphraseModalButton
      disabled={createWalletDexcAttempt}
      modalTitle={
        <T id="dex.initPassphrase" m="Create Wallet" />
      }
      loading={createWalletDexcAttempt}
      onSubmit={onCreateWalletDexc}
      buttonLabel={<T id="dex.initPassphraseButton" m="CreateWallet" />}
    />
    </StandalonePage>
  );
};

export default CreateWalletPage;