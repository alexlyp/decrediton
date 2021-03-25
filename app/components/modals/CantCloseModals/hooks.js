import * as sel from "selectors";
import { hideCantCloseModal } from "actions/ControlActions";
import * as da from "actions/DaemonActions";
import * as dxa from "actions/DexActions";
import { useSelector, useDispatch } from "react-redux";

export function useCantCloseModal() {
  const autoBuyerRunning = useSelector(sel.isTicketAutoBuyerEnabled);
  const hasUnpaidFee = useSelector(sel.getHasTicketFeeError);
  const cantCloseModalVisible = useSelector(sel.cantCloseModalVisible);
  const accountMixerRunning = useSelector(sel.getAccountMixerRunning);
  const purchasingTickets = useSelector(sel.purchaseTicketsRequestAttempt);
  const ticketAutoBuyerRunning = useSelector(sel.getTicketAutoBuyerRunning);
  const dexOrdersOpen = useSelector(sel.dexOrdersOpen);
  const dexLoggedIn = useSelector(sel.loggedInDexc);

  const dispatch = useDispatch();
  const onHideCantCloseModal = () => dispatch(hideCantCloseModal());
  const shutdownApp = () => dispatch(da.shutdownApp());
  const logoutDex = () => dispatch(dxa.logoutDexc());

  return {
    autoBuyerRunning: autoBuyerRunning || ticketAutoBuyerRunning,
    hasUnpaidFee,
    cantCloseModalVisible,
    onHideCantCloseModal,
    shutdownApp,
    accountMixerRunning,
    purchasingTickets,
    dexOrdersOpen,
    dexLoggedIn,
    logoutDex
  };
}
