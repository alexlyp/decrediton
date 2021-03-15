import BrowserView from "react-electron-browser-view";
import { FormattedMessage as T } from "react-intl";
import { StandaloneHeader } from "layout";
import { LN_ICON } from "constants";

export const DexViewContent = () => (
      <BrowserView
        src="http://127.0.0.1:5758/markets"
        style={{
          height: 1000
        }}
      />
  );


export const DexViewHeader = () => (
  <StandaloneHeader
    title={<T id="dex.dexView.title" m="Dex" />}
    iconType={LN_ICON}
  />
);
