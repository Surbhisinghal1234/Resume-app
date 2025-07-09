import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../../features/resume/resumeSlice";

const OthersForm = () => {
  const dispatch = useDispatch();
  const others = useSelector((state) => state.resume.currentResume.others);

  const [inputValues, setInputValues] = useState({
    hobbies: "",
    languages: "",
  });

  // 'others' has default array values
  useEffect(() => {
    if (!others?.hobbies || !others?.languages) {
      dispatch(
        updateField({
          section: "others",
          value: {
            hobbies: others?.hobbies || [],
            languages: others?.languages || [],
          },
        })
      );
    }
  }, [dispatch, others]);

  const handleInputChange = (type, value) => {
    setInputValues((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleKeyDown = (e, type) => {
    if (e.key === "Enter" && inputValues[type].trim()) {
      e.preventDefault();
      const newValue = inputValues[type].trim();

      if (!others[type].includes(newValue)) {
        const updated = {
          ...others,
          [type]: [...others[type], newValue],
        };
        dispatch(updateField({ section: "others", value: updated }));
      }

      setInputValues((prev) => ({
        ...prev,
        [type]: "",
      }));
    }
  };

  const handleRemove = (type, index) => {
    const updated = {
      ...others,
      [type]: others[type].filter((_, i) => i !== index),
    };
    dispatch(updateField({ section: "others", value: updated }));
  };

  const renderTags = (type) => (
    <div className="flex flex-wrap gap-2 mt-2">
      {others[type]?.map((item, index) => (
        <div
          key={index}
          className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full flex items-center"
        >
          <span>{item}</span>
          <button
            onClick={() => handleRemove(type, index)}
            className="ml-2 text-red-500 font-bold"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );

  return (
    // <div className="space-y-6">
    //   <h2 className="text-xl font-semibold">Other Details</h2>

    //   {/* Hobbies */}
    //   <div>
    //     <h3 className="font-medium">Hobbies</h3>
    //     {renderTags("hobbies")}
    //     <input
    //       type="text"
    //       placeholder="Type a hobby and press Enter"
    //       value={inputValues.hobbies}
    //       onChange={(e) => handleInputChange("hobbies", e.target.value)}
    //       onKeyDown={(e) => handleKeyDown(e, "hobbies")}
    //       className="w-full mt-2 px-4 py-3 rounded-xl border-[2px] border-gray-300 shadow-md outline-none 
    //          transition-all duration-200 
    //          focus:border-[2px] focus:border-purple-500  focus:outline-[1.5px] focus:outline-black"
    //     />
    //   </div>

    //   {/* Languages */}
    //   <div>
    //     <h3 className="font-medium">Languages</h3>
    //     {renderTags("languages")}
    //     <input
    //       type="text"
    //       placeholder="Type a language and press Enter"
    //       value={inputValues.languages}
    //       onChange={(e) => handleInputChange("languages", e.target.value)}
    //       onKeyDown={(e) => handleKeyDown(e, "languages")}
    //       className="w-full px-4 py-3 rounded-xl border-[2px] border-gray-300 shadow-md outline-none 
    //          transition-all duration-200 
    //          focus:border-[2px] focus:border-purple-500  focus:outline-[1.5px] focus:outline-black mt-2"
    //     />
    //   </div>
    // </div>

    <div className="space-y-8 bg-white/30 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-purple-200">
  <h2 className="text-2xl font-bold text-purple-700 border-b pb-2">🎯 Other Details</h2>

  {/* Hobbies */}
  <div>
    <h3 className="font-medium text-lg text-purple-600 mb-1">🎨 Hobbies</h3>
    {renderTags("hobbies")}
    <input
      type="text"
      placeholder="e.g. Drawing, Coding, Gaming..."
      value={inputValues.hobbies}
      onChange={(e) => handleInputChange("hobbies", e.target.value)}
      onKeyDown={(e) => handleKeyDown(e, "hobbies")}
      className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-300 bg-white/80 backdrop-blur-sm shadow-sm
        focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-500 transition-all duration-200"
    />
  </div>

  {/* Languages */}
  <div>
    <h3 className="font-medium text-lg text-purple-600 mb-1">🗣️ Languages</h3>
    {renderTags("languages")}
    <input
      type="text"
      placeholder="e.g. English, Hindi, Spanish..."
      value={inputValues.languages}
      onChange={(e) => handleInputChange("languages", e.target.value)}
      onKeyDown={(e) => handleKeyDown(e, "languages")}
      className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-300 bg-white/80 backdrop-blur-sm shadow-sm
        focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-500 transition-all duration-200"
    />
  </div>
</div>

  );
};

export default OthersForm;
