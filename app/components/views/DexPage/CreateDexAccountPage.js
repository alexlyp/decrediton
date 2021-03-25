import { useDex } from "./hooks";
import { PassphraseModalButton } from "buttons";
import { StandaloneHeader } from "layout";
import { AddAccountModal } from "modals";
import { FormattedMessage as T } from "react-intl";
import { LN_ICON } from "constants";
import style from "./DexPage.module.css";

export const CreateDexAccountPageContent = () => {
  const { onCreateDexAccount, dexAccountAttempt } = useDex();

  return (
    <div className={style.dexContent}>
      <PassphraseModalButton
        disabled={dexAccountAttempt}
        modalTitle={<T id="dex.createDexAccount" m="Create DEX Account" />}
        loading={dexAccountAttempt}
        modalComponent={AddAccountModal}
        onSubmit={onCreateDexAccount}
        buttonLabel={<T id="dex.createDexAccountButton" m="Create DEX Account" />}
      />
    </div>
  );
};

export const CreateDexAccountPageHeader = () => (
  <StandaloneHeader
    title={<T id="dex.createDexAccount.title" m="Create DEX Account" />}
    description={
      <T id="dex.createDexAccount.description" m={"A new account is required to be created to improve security for the wallet overall."} />
    }
    iconType={LN_ICON}
  />
);
