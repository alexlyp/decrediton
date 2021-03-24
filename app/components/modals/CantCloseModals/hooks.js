import * as sel from "selectors";
import { hideCantCloseModal } from "actions/ControlActions";
import * as da from "actions/DaemonActions";
import * as wla from "actions/WalletLoaderActions";
import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";

export function useCantCloseModal() {
  const autoBuyerRunning = useSelector(sel.isTicketAutoBuyerEnabled);
  const hasUnpaidFee = useSelector(sel.getHasTicketFeeError);
  const cantCloseModalVisible = useSelector(sel.cantCloseModalVisible);
  const accountMixerRunning = useSelector(sel.getAccountMixerRunning);
  const purchasingTickets = useSelector(sel.purchaseTicketsRequestAttempt);
  const ticketAutoBuyerRunning = useSelector(sel.getTicketAutoBuyerRunning);
  const dexOrdersOpen = useSelector(sel.dexOrdersOpen);
  const onlyWallet = useSelector(sel.onlyWallet);

  const dispatch = useDispatch();
  const onHideCantCloseModal = () => dispatch(hideCantCloseModal());
  const shutdownApp = useCallback(
    () => {
      if (onlyWallet) {
        dispatch(wla.closeWalletRequest());
      } else {
        dispatch(da.shutdownApp());
      }
    },
    [dispatch, onlyWallet]
  );

  return {
    autoBuyerRunning: autoBuyerRunning || ticketAutoBuyerRunning,
    hasUnpaidFee,
    cantCloseModalVisible,
    onHideCantCloseModal,
    shutdownApp,
    accountMixerRunning,
    purchasingTickets,
    dexOrdersOpen
  };
}
