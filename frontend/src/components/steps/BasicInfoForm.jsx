import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../../features/resume/resumeSlice";

const BasicInfoForm = () => {
  const dispatch = useDispatch();
  const basicInfo = useSelector((state) => state.resume.currentResume.basicInfo);

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
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Basic Information</h2>

      {/* Name */}
      <div>
        <label htmlFor="name" className="block font-medium mb-1">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={basicInfo.name}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border-[2px] border-gray-300 shadow-md outline-none 
            transition-all duration-200 
            focus:border-purple-500 focus:outline-black"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block font-medium mb-1">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={basicInfo.email}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border-[2px] border-gray-300 shadow-md outline-none 
            transition-all duration-200 
            focus:border-purple-500 focus:outline-black"
          required
        />
      </div>

      {/* Mobile */}
      <div>
        <label htmlFor="mobile" className="block font-medium mb-1">Mobile</label>
        <input
          id="mobile"
          name="mobile"
          type="tel"
          value={basicInfo.mobile}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border-[2px] border-gray-300 shadow-md outline-none 
            transition-all duration-200 
            focus:border-purple-500 focus:outline-black"
          required
        />
      </div>

      {/* Location */}
      <div>
        <label htmlFor="location" className="block font-medium mb-1">Location</label>
        <input
          id="location"
          name="location"
          type="text"
          value={basicInfo.location}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border-[2px] border-gray-300 shadow-md outline-none 
            transition-all duration-200 
            focus:border-purple-500 focus:outline-black"
          required
        />
      </div>
    </div>
  );
};

export default BasicInfoForm;
