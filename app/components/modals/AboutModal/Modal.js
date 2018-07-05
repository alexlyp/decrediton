import DefaultModal from "../AboutModalPortal";
import { InvisibleButton } from "buttons";
import { FormattedMessage as T } from "react-intl";

const propTypes = {
  show: PropTypes.bool.isRequired,
  onCancelModal: PropTypes.func.isRequired,
};

const Modal = ({ show, onCancelModal }) => (
  <DefaultModal className="confirm-seed-copy-modal" {...{ show }}>
    <div className="confirm-seed-copy-modal-content">
      <div className="confirm-seed-copy-warning-text">
      </div>
    </div>
    <div className="confirm-seed-copy-modal-toolbar">
      <InvisibleButton className="confirm-modal-close-button" onClick={onCancelModal}>
        <T id="seedCopyConfirm.btnCancel" m="Cancel" />
      </InvisibleButton>
    </div>
  </DefaultModal>
);

Modal.propTypes = propTypes;

export default Modal;
