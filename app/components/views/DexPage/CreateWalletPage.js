import { useDex } from "./hooks";
import { useMountEffect } from "hooks";
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
    dexAccount,
    btcConfig,
    onCheckBTCConfig,
    onUpdateBTCConfig,
    btcConfigUpdateNeeded,
    btcIntallNeeded
  } = useDex();

  const [isValid, setIsValid] = useState(false);
  const [walletName, setWalletName] = useState("");
  const [error, setIsError] = useState("");

  const resetState = useCallback(() => {
    setWalletName(null);
  }, []);
  useMountEffect(() => {
    onCheckBTCConfig();
  });

  useEffect(() => {
    setIsValid(!!walletName);
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
        btcConfig ? (
        <div>
          <TextInput
            required
            value={walletName}
            onChange={(e) => setWalletName(e.target.value)}
            placeholder="BTC Wallet Name"
          />
          {error && <div className="error">{error}</div>}
          <AppPassAndPassphraseModalButton
            disabled={!isValid}
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
          (
          btcConfigUpdateNeeded ?
            <div>
              <T id="dex.updateBTCConfig" m="You must update your bitcoin.conf to properly communicate with the DEX." />
              <KeyBlueButton
                onClick={onUpdateBTCConfig}
              >
                <T id="dex.updateBTCConfigButton" m="Update BTC Config" />
              </KeyBlueButton>
            </div> 
          :
          btcIntallNeeded ?
          <div>
            <T id="dex.checkBTCConfig" m="You must confirm your Bitcoin.conf is properly set up for connecting to DEX. If you have not yet installed a bitcoin wallet, please go to bitcoin.org for further instructions." />
            <KeyBlueButton
              onClick={onCheckBTCConfig}
            >
              <T id="dex.checkBTCConfigButton" m="Check BTC Config" />
            </KeyBlueButton>
          </div> :
          <KeyBlueButton
            onClick={onCheckBTCConfig}
          >
            <T id="dex.checkBTCConfigButton" m="Check BTC Config" />
          </KeyBlueButton>
         )
        )
      ) : (
        <div><T id="dex.btcWalletConnected" m="BTC Wallet has been sucessfully connected!" /></div>
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
        <div><T id="dex.dcrWalletConnected" m="DCR Wallet has been sucessfully connected!" /></div>
      )}
    </div>
  );
};

export const CreateWalletPageHeader = () => (
  <StandaloneHeader
    title={<T id="dex.createWallet.title" m="Connect Wallets to Dex" />}
    description={
      <T id="dex.createWallet.description" m={"Complete the following steps to connect your DCR and BTC wallets to the DEX."} />
    }
    iconType={LN_ICON}
  />
);
