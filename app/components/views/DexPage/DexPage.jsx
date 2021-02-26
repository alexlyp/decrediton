import BrowserView from "react-electron-browser-view";
import { StandalonePage } from "layout";

const DexPage = () => {
  return (
    <StandalonePage>
      <BrowserView
        src="http://127.0.0.1:5758"
        style={{
          height: 1000
        }}
      />
    </StandalonePage>
  );
};
export default DexPage;
