import { connect } from "react-redux";
import { selectorMap } from "../fp";
import { bindActionCreators } from "redux";
import * as sel from "../selectors";
import * as cta from "actions/ControlActions";

const mapStateToProps = selectorMap({
  modalVisible: sel.modalVisible,
  aboutModalVisible: sel.aboutModalVisible,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  aboutModalHidden: cta.aboutModalHidden,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps);
