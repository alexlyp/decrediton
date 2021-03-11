import { useDex } from "./hooks";
import { PassphraseModalButton } from "buttons";
import { StandalonePage } from "layout";
import { FormattedMessage as T } from "react-intl";

const InitPage = () => {
  const {
    onInitDexc,
    initDexcAttempt
  } = useDex();

  return (
    <StandalonePage>
      <PassphraseModalButton
        disabled={initDexcAttempt}
        modalTitle={
          <T id="dex.initPassphrase" m="Set new Dexc app passphrase" />
        }
        loading={initDexcAttempt}
        onSubmit={onInitDexc}
        buttonLabel={<T id="dex.initPassphraseButton" m="Init Dexc" />}
      />
    </StandalonePage>
  );
};

export default InitPage;