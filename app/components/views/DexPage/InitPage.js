import { useDex } from "./hooks";
import { SetNewPassphraseModalButton } from "buttons";
import { StandaloneHeader } from "layout";
import { FormattedMessage as T } from "react-intl";
import { LN_ICON } from "constants";
import style from "./DexPage.module.css";

export const InitPageContent = () => {
  const { onInitDexc, initDexcAttempt } = useDex();

  return (
    <SetNewPassphraseModalButton
      disabled={initDexcAttempt}
      modalTitle={<T id="dex.initPassphrase" m="Set new Dexc app passphrase" />}
      loading={initDexcAttempt}
      onSubmit={onInitDexc}
      buttonLabel={<T id="dex.initPassphraseButton" m="Init Dexc" />}
    />
  );
};

export const InitPageHeader = () => (
  <StandaloneHeader
    title={<T id="dex.initPage.title" m="Set DEX App Password" />}
    description={
      <T
        id="dex.initPage.description"
        m={
          "You must create a new passphrase that will be used to log into the DEX for this wallet."
        }
      />
    }
    iconType={LN_ICON}
  />
);
