import BrowserView from "react-electron-browser-view";

const DexView = () => {
  return (
      <BrowserView
        src="http://127.0.0.1:5758"
        style={{
          height: 1000
        }}
      />
  );
};
export default DexView;
