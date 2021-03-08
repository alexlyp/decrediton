import { onInitDexc, initDexcAttempt } from "./hooks";
import { PassphraseModalButton } from "buttons";
import { FormattedMessage as T } from "react-intl";

const DexConnectPage = () => {
  return (
    <PassphraseModalButton
      disabled={initDexcAttempt}
      modalTitle={
        <T id="dex.initPassphrase" m="Set new Dexc app passphrase" />
      }
      loading={initDexcAttempt}
      onSubmit={onInitDexc}
      buttonLabel={<T id="dex.initPassphraseButton" m="Init Dexc" />}
    />
  );
};

export default DexConnectPage;