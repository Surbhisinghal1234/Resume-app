import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../../features/resume/resumeSlice";

const BasicInfoForm = () => {
  const dispatch = useDispatch();
  const basicInfo = useSelector(
    (state) => state.resume.currentResume.basicInfo
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    dispatch(
      updateField({
        section: "basicInfo",
        value: {
          ...basicInfo,
          [name]: value,
        },
      })
    );
  };

  return (
    <div className="space-y-6 bg-white/30 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-purple-200">
      <h2 className="text-2xl font-bold text-purple-700 border-b pb-2">
        🧾 Basic Information
      </h2>

      {[
        { id: "name", placeholder: "👤 Full Name", type: "text" },
        { id: "email", placeholder: "📧 Email Address", type: "email" },
        { id: "mobile", placeholder: "📱 Mobile Number", type: "tel" },
        { id: "location", placeholder: "📍 Current Location", type: "text" },
        { id: "designation", placeholder: "💼 Designation", type: "text" },
        { id: "linkedin", placeholder: "🔗 LinkedIn URL", type: "url" },
        { id: "github", placeholder: "💻 GitHub URL", type: "url" },
      ].map(({ id, placeholder, type }) => (
        <input
          key={id}
          id={id}
          name={id}
          type={type}
          value={basicInfo[id]}
          onChange={handleChange}
          required
          placeholder={placeholder}
          className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-300 bg-white/80 backdrop-blur-sm shadow-sm
        focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-500 transition-all duration-200"
        />
      ))}
    </div>
  );
};

export default BasicInfoForm;
