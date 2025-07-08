import { useSelector } from "react-redux";
import Theme1 from "./themes/Theme1";
import Theme2 from "./themes/Theme2";
import Theme3 from "./themes/Theme3";
import Theme4 from "./themes/Theme4";

const ThemePreview = ({ theme }) => {
  const resume = useSelector((state) => state.resume.currentResume);

  const renderTheme = () => {
    switch (theme) {
      case "Theme1":
        return <Theme1 resume={resume} />;
      case "Theme2":
        return <Theme2 resume={resume} />;
      case "Theme3":
        return <Theme3 resume={resume} />;
      case "Theme4":
        return <Theme4 resume={resume} />;
      default:
        return <div>No theme selected</div>;
    }
  };

  return (
    <div className="">
    
      {renderTheme()}
    </div>
  );
};

export default ThemePreview;
