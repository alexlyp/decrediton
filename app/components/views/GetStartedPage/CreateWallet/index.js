import CreateForm from "./CreateForm";

@autobind
class CreateWallet extends React.Component {

  render() {
    return (
      <div className={this.props.isTestNet ? "page-body getstarted istestnet" : "page-body getstarted"}>
        <CreateForm {...{ ...this.props }}/>
      </div>);
  }

}

export default CreateWallet;
