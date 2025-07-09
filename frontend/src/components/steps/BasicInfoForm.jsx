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
    // <div className="space-y-6">
    //   <h2 className="text-xl font-semibold">Basic Information</h2>

    //   {/* Name */}
    //   <div>
    //     <label htmlFor="name" className="block font-medium mb-1">Name</label>
    //     <input
    //       id="name"
    //       name="name"
    //       type="text"
    //       value={basicInfo.name}
    //       onChange={handleChange}
    //       className="w-full px-4 py-3 rounded-xl border-[2px] border-gray-300 shadow-md outline-none 
    //         transition-all duration-200 
    //         focus:border-purple-500 focus:outline-black"
    //       required
    //     />
    //   </div>

    //   {/* Email */}
    //   <div>
    //     <label htmlFor="email" className="block font-medium mb-1">Email</label>
    //     <input
    //       id="email"
    //       name="email"
    //       type="email"
    //       value={basicInfo.email}
    //       onChange={handleChange}
    //       className="w-full px-4 py-3 rounded-xl border-[2px] border-gray-300 shadow-md outline-none 
    //         transition-all duration-200 
    //         focus:border-purple-500 focus:outline-black"
    //       required
    //     />
    //   </div>

    //   {/* Mobile */}
    //   <div>
    //     <label htmlFor="mobile" className="block font-medium mb-1">Mobile</label>
    //     <input
    //       id="mobile"
    //       name="mobile"
    //       type="tel"
    //       value={basicInfo.mobile}
    //       onChange={handleChange}
    //       className="w-full px-4 py-3 rounded-xl border-[2px] border-gray-300 shadow-md outline-none 
    //         transition-all duration-200 
    //         focus:border-purple-500 focus:outline-black"
    //       required
    //     />
    //   </div>

    //   {/* Location */}
    //   <div>
    //     <label htmlFor="location" className="block font-medium mb-1">Location</label>
    //     <input
    //       id="location"
    //       name="location"
    //       type="text"
    //       value={basicInfo.location}
    //       onChange={handleChange}
    //       className="w-full px-4 py-3 rounded-xl border-[2px] border-gray-300 shadow-md outline-none 
    //         transition-all duration-200 
    //         focus:border-purple-500 focus:outline-black"
    //       required
    //     />
    //   </div>
    // </div>

    <div className="space-y-6 bg-white/30 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-purple-200">
  <h2 className="text-2xl font-bold text-purple-700 border-b pb-2">🧾 Basic Information</h2>

  {/* Form Fields */}
  {[
    { id: "name", label: "Full Name", type: "text" },
    { id: "email", label: "Email Address", type: "email" },
    { id: "mobile", label: "Mobile Number", type: "tel" },
    { id: "location", label: "Current Location", type: "text" },
  ].map(({ id, label, type }) => (
    <div key={id}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={basicInfo[id]}
        onChange={handleChange}
        required
        className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/70 backdrop-blur-sm shadow-sm 
          focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-500 
          transition-all duration-200 text-gray-800 placeholder-gray-400"
        placeholder={`Enter your ${label.toLowerCase()}`}
      />
    </div>
  ))}
</div>

  );
};

export default BasicInfoForm;
