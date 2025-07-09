import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../features/resume/resumeSlice";
import ThemePreview from "./ThemePreview";
import { useEffect } from "react";

const themes = [
  { id: "Theme1", label: "Classic", img: "/public/theme4.png" },
  { id: "Theme2", label: "Modern", img: "/public/theme4.png" },
  { id: "Theme3", label: "Elegant", img: "/public/theme4.png" },
  { id: "Theme4", label: "Bright", img: "/public/theme4.png" },
];
const ThemeTab = () => {
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.resume.selectedTheme);

//  default theme on first render
useEffect(() => {
  if (!selected) {
    dispatch(setTheme("Theme1")); 
  }
}, [selected, dispatch]);
  const handleSelect = (themeId) => {
    dispatch(setTheme(themeId));
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Left: Theme options */}
      <div className=" md:w-1/2">
        <h2 className=" text-xl font-bold mb-2">Choose a Theme</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" >

        {themes.map((theme) => (
          <div
            key={theme.id}
            className={`border rounded p-2 cursor-pointer object-cover  ${
              selected === theme.id ? "border-blue-600" : "border-gray-300"
            }`}
            onClick={() => handleSelect(theme.id)}
          >
            <img
              src={theme.img}
              alt={theme.label}
              className="w-full aspect-video object-cover rounded"
            />
            <p className="text-center mt-2 font-medium">{theme.label}</p>
          </div>
        ))}
        </div>

      </div>

      {/* Right: Preview */}
      <div className="md:w-1/2 mt-4 md:mt-0">
        {selected ? (
          <ThemePreview theme={selected} />
        ) : (
          <div className="p-6 border rounded text-gray-500 bg-white shadow text-center">
            No theme selected
          </div>
        )}
      </div>
    </div>

    
  );
};

export default ThemeTab;
