// @flow
import React from "react";
import { autobind } from "core-decorators";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  createWalletRequest,
  createWalletConfirmNewSeed,
  createWalletGoBackNewSeed,
} from "../../actions/WalletLoaderActions";
import { getSeedService } from "../../wallet/seed";
import ContinueWalletCreation from "./ContinueWalletCreation";
import CreateWallet from "./CreateWallet";

@autobind
class CreateWalletForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      mnemonic: "",
      seed: "",
      passPhrase: "",
      decode: null
    };
  }

  componentDidMount() {
    this.generateSeed();
  }

  componentWillUpdate(nextProps) {
    if (this.props.decodeSeedError !== nextProps.decodeSeedError) {
      this.setState({ seedError: nextProps.decodeSeedError });
    }
  }

  componentWillUnmount() {
    this.resetState();
  }

  render() {
    const {
      confirmNewSeed,
      createWalletExisting,
      createWalletConfirmNewSeed
    } = this.props;
    const {
      setSeed,
      setPassPhrase,
      onCreateWallet
    } = this;
    const { mnemonic, decode } = this.state;
    const isValid = this.isValid();

    return (confirmNewSeed || createWalletExisting)
      ? (
        <ContinueWalletCreation
          {...{
            mnemonic: createWalletExisting ? null : mnemonic,
            setSeed,
            setPassPhrase,
            onCreateWallet,
            decode,
            isValid
          }}
        />
      ) : (
        <CreateWallet
          {...{
            mnemonic,
            createWalletConfirmNewSeed
          }}
        />
      );
  }

  resetState() {
    this.setState(this.getInitialState());
  }

  generateSeed() {
    return this.props.seedService.then(({ generate, decode }) =>
      generate().then(response => this.setState({
        decode,
        mnemonic: response.getSeedMnemonic(),
        seed: this.isTestNet() ? response.getSeedBytes() : null // Allows verification skip in dev
      }))
    );
  }

  setSeed(seed) {
    this.setState({ seed });
  }

  setPassPhrase(passPhrase) {
    this.setState({ passPhrase });
  }

  onCreateWallet() {
    const {
      createWalletExisting,
      createWalletRequest
    } = this.props;
    const { seed, passPhrase } = this.state;
    const pubpass = ""; // Temporarily disabled?

    if (!this.isValid()) return;
    createWalletRequest(pubpass, passPhrase, seed, !!createWalletExisting);
  }

  isValid() {
    const { seed, passPhrase } = this.state;
    return !!(seed && passPhrase);
  }

  isTestNet() {
    return this.props.network === "testnet";
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    createWalletConfirmNewSeed,
    createWalletGoBackNewSeed,
    createWalletRequest
  },
  dispatch
);

const mapStateToProps = ({
  walletLoader: {
    createWalletExisting,
    confirmNewSeed
  },
  grpc
}) => ({
  seedService: getSeedService({ grpc }),
  createWalletExisting,
  confirmNewSeed,
  network: grpc.network
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateWalletForm);