import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../../features/resume/resumeSlice";

const SummeryForm = () => {
  const dispatch = useDispatch();
  const summary = useSelector((state) => state.resume.currentResume.summary);

  const handleChange = (e) => {
  dispatch(
    updateField({
      section: "summary", 
      value: e.target.value,
    })
  );
};
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Summery</h2>

      {/* Name */}
      <div>
  
        <textarea
          id="name"
          name="name"
          type="text"
          value={summary}
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

export default SummeryForm;
