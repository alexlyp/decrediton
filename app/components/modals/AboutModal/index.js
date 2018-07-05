import Modal from "./Modal";

@autobind
class AboutModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  hideModal() {
    this.setState({ show: false });
  }

  render() {
    const { show } = this.state;

    return <Aux>
      <Modal
        {...{
          ...this.props,
          show,
          onCancelModal: this.hideModal
        }}
      />
    </Aux>;
  }
}

export default modalVisible(AboutModal);
