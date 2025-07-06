import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../../features/resume/resumeSlice";
import { useSubmitResumeMutation } from "../../features/resume/resumeApi";

const OthersForm = () => {
  const dispatch = useDispatch();
  const others = useSelector((state) => state.resume.currentResume.others);
  const fullResume = useSelector((state) => state.resume.currentResume);

  const [submitResume, { isLoading, isSuccess, isError }] =
    useSubmitResumeMutation();

  const [inputValues, setInputValues] = useState({
    hobbies: "",
    languages: "",
  });

  //  Ensure others always has arrays
  useEffect(() => {
    if (!others.hobbies || !others.languages) {
      dispatch(
        updateField({
          section: "others",
          value: {
            hobbies: others.hobbies || [],
            languages: others.languages || [],
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

  const handleSubmit = async () => {
    try {
      const result = await submitResume(fullResume).unwrap();
      console.log("Submitted Successfully:", result);
      alert("Resume submitted successfully!");
    } catch (err) {
      console.error("Submit error:", err);
      alert("Error submitting resume.");
    }
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
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Other Details</h2>

      {/* Hobbies */}
      <div>
        <h3 className="font-medium">Hobbies</h3>
        {renderTags("hobbies")}
        <input
          type="text"
          placeholder="Type a hobby and press Enter"
          value={inputValues.hobbies}
          onChange={(e) => handleInputChange("hobbies", e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, "hobbies")}
          className="w-full mt-2 px-4 py-3 rounded-xl border-[2px] border-gray-300 shadow-md outline-none 
             transition-all duration-200 
             focus:border-[2px] focus:border-purple-500  focus:outline-[1.5px] focus:outline-black"
        />
      </div>

      {/* Languages */}
      <div>
        <h3 className="font-medium">Languages</h3>
        {renderTags("languages")}
        <input
          type="text"
          placeholder="Type a language and press Enter"
          value={inputValues.languages}
          onChange={(e) => handleInputChange("languages", e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, "languages")}
          className="w-full px-4 py-3 rounded-xl border-[2px] border-gray-300 shadow-md outline-none 
             transition-all duration-200 
             focus:border-[2px] focus:border-purple-500  focus:outline-[1.5px] focus:outline-black mt-2"
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          onClick={handleSubmit}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </div>

      {/* Messages */}
      {isError && (
        <p className="text-red-600"> Failed to submit. Please try again.</p>
      )}
      {isSuccess && (
        <p className="text-green-600"> Resume submitted successfully!</p>
      )}
    </div>
  );
};

export default OthersForm;
