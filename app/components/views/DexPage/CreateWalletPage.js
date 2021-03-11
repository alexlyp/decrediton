import { useDex } from "./hooks";
import { PassphraseModalButton } from "buttons";
import { FormattedMessage as T } from "react-intl";

const CreateWalletPage = () => {
  const {
    onCreateWalletDexc,
    createWalletDexcAttempt
  } = useDex();

  return (
    <PassphraseModalButton
      disabled={createWalletDexcAttempt}
      modalTitle={
        <T id="dex.initPassphrase" m="Create Wallet" />
      }
      loading={createWalletDexcAttempt}
      onSubmit={onCreateWalletDexc}
      buttonLabel={<T id="dex.initPassphraseButton" m="CreateWallet" />}
    />
  );
};

export default CreateWalletPage;