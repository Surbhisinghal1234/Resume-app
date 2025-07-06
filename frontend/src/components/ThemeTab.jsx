import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../features/resume/resumeSlice";
import ThemePreview from "./ThemePreview";
import { useEffect } from "react";

const themes = [
  { id: "Theme1", label: "Classic", img: "/themes/theme1.png" },
  { id: "Theme2", label: "Modern", img: "/themes/theme2.png" },
  { id: "Theme3", label: "Elegant", img: "/themes/theme3.png" },
  { id: "Theme4", label: "Bright", img: "/themes/theme4.png" },
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
    <div className="flex gap-2">
      {/* Left: Theme options */}
      <div className=" flex gap-4 flex-col space-y-4">
        <h2 className=" text-xl font-bold mb-2">Choose a Theme</h2>
        <div className="flex gap-4 flex-wrap" >

        {themes.map((theme) => (
          <div
            key={theme.id}
            className={`border rounded p-2 cursor-pointer h-[20rem] w-[20rem] ${
              selected === theme.id ? "border-blue-600" : "border-gray-300"
            }`}
            onClick={() => handleSelect(theme.id)}
          >
            <img
              src={theme.img}
              alt={theme.label}
              className="w-full h-32 object-cover rounded"
            />
            <p className="text-center mt-2 font-medium">{theme.label}</p>
          </div>
        ))}
        </div>

      </div>

      {/* Right: Preview */}
      <div className="">
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
