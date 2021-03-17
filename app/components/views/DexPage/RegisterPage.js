import { useDex } from "./hooks";
import { PassphraseModalButton, KeyBlueButton } from "buttons";
import { Balance } from "shared";
import { useEffect, useState, useCallback } from "react";
import { TextInput } from "inputs";
import { StandaloneHeader } from "layout";
import { FormattedMessage as T } from "react-intl";
import { LN_ICON } from "constants";
import "style/ConnectPage.css";

export const RegisterPageContent = () => {
  const {
    onRegisterDexc,
    registerDexcAttempt,
    onGetFee,
    dexcFee,
    dexcAddr
  } = useDex();

  const [isValid, setIsValid] = useState(false);
  const [addr, setAddress] = useState("");
  const [error, setIsError] = useState("");

  const resetState = useCallback(() => {
    setAddress(null);
  }, []);

  const onGetFeeDex = () => {
    onGetFee(addr);
    resetState();
  };

  useEffect(() => {
    setIsValid(!!addr);
  }, [addr]);

  useEffect(() => {
    if (addr === null) {
      return;
    }
    if (isValid) {
      setIsError(null);
      return;
    }
    if (!addr) {
      const error = <T id="error.Dex.Address" m="Please enter a valid DEX Server." />;
      setIsError(error);
      return;
    }
  }, [isValid, addr]);


  if (dexcFee && dexcAddr) {
    return (
      <div>
        <T id="dex.payRegistration.Fee" m="Please enter your DEX app passphrase to pay the following fee:" />
        <Balance amount={dexcFee} />
        <T id="dex.payRegistration.Address" m="DEX Server registering to:" /> {dexcAddr}
        <PassphraseModalButton
          disabled={registerDexcAttempt}
          modalTitle={
            <T id="dex.payDexFeeModalTitle" m="Pay DEX Fee" />
          }
          modalDescription={
            <T id="dex.payDexFeeModalDescription" m="Please enter your DEX App passphrase to pay the fee to register to the DEX Server" />
          }
          passphraseLabel={
            <T id="dex.payDexFeeAppPassphrase" m="DEX App Passphrase" />
          }
          loading={registerDexcAttempt}
          onSubmit={onRegisterDexc}
          buttonLabel={<T id="dex.payDexFeeButton" m="Pay DEX Fee" />}
        />
      </div>
    );
  } else {
    return (
      <div>
        <TextInput
          required
          value={addr}
          onChange={(e) => setAddress(e.target.value)}
          placeholder=""
        />
        {error && <div className="error">{error}</div>}
        <KeyBlueButton
          disabled={!isValid || registerDexcAttempt}
          loading={registerDexcAttempt}
          onClick={onGetFeeDex}>
          <T id="dex.getFeeButton" m="Get Fee to Pay" />
        </KeyBlueButton>
      </div>
    );
  }
};

export const RegisterPageHeader = () => (
  <StandaloneHeader
    title={<T id="dex.loginPage.title" m="DEX Server Payment" />}
    description={
      <T
        id="dex.loginPage.description"
        m={"Register your wallet with the DEX Server"}
      />
    }
    iconType={LN_ICON}
  />
);
