import PurchasingTicketsModal from "./PurchasingTicketsModal";
import AccountMixerRunningModal from "./AccountMixerRunningModal";
import AutobuyerRunning from "./AutobuyerRunningModal";
import DexOpenOrdersModal from "./DexOpenOrdersModal";
import HasTicketFeeErro from "./HasTicketFeeError";
import { useCantCloseModal } from "./hooks";
import { ConfirmModal } from "modals";
import { useEffect } from "react";

const CantCloseModals = (props) => {
  const { show, onSubmit, onCancelModal, modalContent } = props;
  const {
    autoBuyerRunning,
    hasUnpaidFee,
    cantCloseModalVisible,
    onHideCantCloseModal,
    shutdownApp,
    accountMixerRunning,
    purchasingTickets,
    dexOrdersOpen,
    dexLoggedIn,
    logoutDex
  } = useCantCloseModal();

  /*  Check if dex logged in then try to shut down?
  useEffect(() => {
    if (dexLoggedIn && show) {
      logoutDex()
    }
  });
  */
 
  let Component = () => <></>;
  if (autoBuyerRunning) {
    Component = AutobuyerRunning;
  } else if (hasUnpaidFee) {
    Component = HasTicketFeeErro;
  } else if (accountMixerRunning) {
    Component = AccountMixerRunningModal;
  } else if (purchasingTickets) {
    Component = PurchasingTicketsModal;
  } else if (dexOrdersOpen) {
    Component = DexOpenOrdersModal;
  } else if (modalContent) {
    return <ConfirmModal {...props} />;
  }

  return (
    <Component
      show={show ?? cantCloseModalVisible}
      onSubmit={() => {
        if (onSubmit) {
          onSubmit();
        } else {
          shutdownApp();
        }
      }}
      onCancelModal={onCancelModal ?? onHideCantCloseModal}
    />
  );
};

export default CantCloseModals;
