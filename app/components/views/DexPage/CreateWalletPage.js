import { useDex } from "./hooks";
import { AppPassAndPassphraseModalButton, KeyBlueButton } from "buttons";
import { StandaloneHeader } from "layout";
import { TextInput } from "inputs";
import { useState, useCallback, useEffect } from "react";
import { FormattedMessage as T } from "react-intl";
import { LN_ICON } from "constants";
import style from "./DexPage.module.css";

export const CreateWalletPageContent = () => {
  const {
    onCreateWalletDexc,
    createWalletDexcAttempt,
    onBTCCreateWalletDexc,
    dexDCRWalletRunning,
    dexBTCWalletRunning,
    onCheckBTCConfig,
    onUpdateBTCConfig,
    dexAccount
  } = useDex();

  const [isValid, setIsValid] = useState(false);
  const [walletName, setWalletName] = useState("");
  const [error, setIsError] = useState("");

  const resetState = useCallback(() => {
    setWalletName(null);
  }, []);

  useEffect(() => {
    setIsValid(!!setWalletName);
  }, [walletName]);

  useEffect(() => {
    if (walletName === null) {
      return;
    }
    if (isValid) {
      setIsError(null);
      return;
    }
    if (!walletName) {
      const error = (
        <T id="error.BTC.WatllName" m="Please enter a valid wallet name" />
      );
      setIsError(error);
      return;
    }
  }, [isValid, walletName]);

  const onCreateWallet = (passphrase, args) => {
    const { appPassphrase } = args;
    onCreateWalletDexc(passphrase, appPassphrase, dexAccount);
    resetState();
  };

  const onBTCCreateWallet = (passphrase, args) => {
    const { appPassphrase } = args;
    onBTCCreateWalletDexc(passphrase, appPassphrase, walletName);
    resetState();
  };

  return (
    <div>
      {!dexBTCWalletRunning ? (
        <div>
          <KeyBlueButton onClick={onCheckBTCConfig}>
            <T id="dex.checkBTCConfig" m="Check Bitcoin Config" />
          </KeyBlueButton>
          <KeyBlueButton onClick={onUpdateBTCConfig}>
            <T id="dex.updateBTCConfig" m="Update BTC Config" />
          </KeyBlueButton>
          <TextInput
            required
            value={walletName}
            onChange={(e) => setWalletName(e.target.value)}
            placeholder=""
          />
          {error && <div className="error">{error}</div>}
          <AppPassAndPassphraseModalButton
            disabled={createWalletDexcAttempt}
            modalTitle={<T id="dex.createBTCWallet" m="Connect BTC Wallet" />}
            loading={createWalletDexcAttempt}
            onSubmit={onBTCCreateWallet}
            buttonLabel={
              <T id="dex.createWalletBTCPassphraseButton" m="Connect BTC Wallet" />
            }
            passphraseNotRequired={true}
          />
        </div>
      ) : (
        <div>BTC WALLET CONNECTED!</div>
      )}
      {!dexDCRWalletRunning ? (
        <AppPassAndPassphraseModalButton
          disabled={createWalletDexcAttempt}
          modalTitle={<T id="dex.createDCRWallet" m="Connect DCR Wallet" />}
          loading={createWalletDexcAttempt}
          onSubmit={onCreateWallet}
          buttonLabel={
            <T id="dex.createWalletDCRPassphraseButton" m="Connect DCR Wallet" />
          }
        />
      ) : (
        <div>DCR WALLET CONNECTED!</div>
      )}
    </div>
  );
};

export const CreateWalletPageHeader = () => (
  <StandaloneHeader
    title={<T id="dex.createWallet.title" m="Connect Wallet to Dex" />}
    description={
      <T id="dex.createWallet.description" m={"Connect wallet to dex"} />
    }
    iconType={LN_ICON}
  />
);
