import PurchasingTicketsModal from "./PurchasingTicketsModal";
import AccountMixerRunningModal from "./AccountMixerRunningModal";
import AutobuyerRunning from "./AutobuyerRunningModal";
import HasTicketFeeErro from "./HasTicketFeeError";
import { useCantCloseModal } from "./hooks";
import { ConfirmModal } from "modals";

const CantCloseModals = (props) => {
  const { show, onSubmit, onCancelModal, modalContent } = props;
  const {
    autoBuyerRunning,
    hasUnpaidFee,
    cantCloseModalVisible,
    onHideCantCloseModal,
    shutdownApp,
    accountMixerRunning,
    purchasingTickets
  } = useCantCloseModal();
  let Component = () => <></>;
  if (autoBuyerRunning) {
    Component = AutobuyerRunning;
  } else if (hasUnpaidFee) {
    Component = HasTicketFeeErro;
  } else if (accountMixerRunning) {
    Component = AccountMixerRunningModal;
  } else if (purchasingTickets) {
    Component = PurchasingTicketsModal;
  } else if (modalContent) {
    return <ConfirmModal {...props} />;
  }
  console.log(show, cantCloseModalVisible);
  return (
    <Component
      show={show ?? cantCloseModalVisible}
      onSubmit={() => {
        if (onSubmit) {
          console.log("submit?");
          onSubmit();
        } else {
          console.log("shut down app?");
          shutdownApp();
        }
      }}
      onCancelModal={onCancelModal ?? onHideCantCloseModal}
    />
  );
};

export default CantCloseModals;
