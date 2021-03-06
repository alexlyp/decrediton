import TicketsCardList from "./TicketsCardList";
import { FormattedMessage as T } from "react-intl";
import InfiniteScroll from "react-infinite-scroller";
import { LoadingMoreTicketsIndicator, NoMoreTicketsIndicator } from "indicators";
import { Tooltip } from "shared";
import { EyeFilterMenu } from "buttons";
import "style/MyTickets.less";

@autobind
class TicketListPage extends React.Component {

  render() {
    const {
      tickets, noMoreTickets, decodeRawTicketTransactions,
      onLoadMoreTickets, onChangeSortType, onChangeSelectedType,
      selectedSortOrderKey, selectedTicketTypeKey,
      sortTypes, ticketTypes, tsDate,
    } = this.props;

    return (
      <InfiniteScroll
        hasMore={!noMoreTickets}
        loadMore={onLoadMoreTickets}
        initialLoad={false}
        useWindow={false}
        threshold={180}
      >
        <Aux>
          <div className="tickets-buttons-area">
            <Tooltip tipWidth={300} text={<T id="tickets.sortby.tooltip" m="Sort By" />}>
              <EyeFilterMenu
                labelKey="label"
                keyField="value"
                options={sortTypes}
                selected={selectedSortOrderKey}
                onChange={onChangeSortType}
                className="sort-by"
              />
            </Tooltip>
            <Tooltip tipWidth={300} text={<T id="tickets.tickettypes.tooltip" m="Ticket Status" />}>
              <EyeFilterMenu
                labelKey="label"
                keyField="key"
                options={ticketTypes}
                selected={selectedTicketTypeKey}
                onChange={onChangeSelectedType}
              />
            </Tooltip>
          </div>

          {tickets.length > 0
            ? <TicketsCardList {...{ tickets, tsDate, decodeRawTicketTransactions }} />
            : null}
          {!noMoreTickets
            ? <LoadingMoreTicketsIndicator />
            : <NoMoreTicketsIndicator />}
        </Aux>
      </InfiniteScroll>
    );
  }
}

export default TicketListPage;
