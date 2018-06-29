import TopLevelPrivacyOptions from "./TopLevelOptions";
import CustomPrivacyOptions from "./CustomPrivacyOptions";

export default ({ showCustomPrivacy, isTestNet, ...props }) => (

  <div className={isTestNet ? "page-body getstarted istestnet" : "page-body getstarted"}>
    <div className="getstarted-logo">
    </div>
    <div className="getstarted-new">
      {!showCustomPrivacy
        ? <TopLevelPrivacyOptions {...props} />
        : <CustomPrivacyOptions {...props} />}
    </div>
  </div>
);
