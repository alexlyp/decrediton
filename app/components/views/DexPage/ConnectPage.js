import { onInitDexc, initDexcAttempt } from "./hooks";

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