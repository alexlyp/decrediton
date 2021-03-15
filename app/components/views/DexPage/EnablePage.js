import { useDex } from "./hooks";
import { KeyBlueButton } from "buttons";
import { StandaloneHeader } from "layout";
import { FormattedMessage as T } from "react-intl";
import { LN_ICON } from "constants";
import "style/ConnectPage.css";

export const EnablePageContent = () => {
  const {
    onEnableDexc,
    enableDexAttempt,
  } = useDex();

  return (
      <KeyBlueButton
        disabled={enableDexAttempt}
        loading={enableDexAttempt}
        onClick={onEnableDexc}>
          {<T id="dex.enableButton" m="Enable Dexc" />}
      </KeyBlueButton>
  );
};

export const EnablePageHeader = () => (
  <StandaloneHeader
    title={<T id="dex.enablePage.title" m="Enable DEX" />}
    description={
      <T
        id="dex.enablePage.description"
        m={"You must enable DEX features to use them."}
      />
    }
    iconType={LN_ICON}
  />
);
