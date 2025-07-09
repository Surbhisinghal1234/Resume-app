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
   <div className="space-y-6 bg-white/30 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-purple-200">
  <h2 className="text-2xl font-bold text-purple-700 border-b pb-2">📝 Professional Summary</h2>

  <div>
    <label htmlFor="summary" className="block text-lg font-medium text-purple-600 mb-2">
      Write a short summary about yourself
    </label>
    <textarea
      id="summary"
      name="summary"
      rows="6"
      placeholder="E.g. Passionate frontend developer with experience in React.js, responsive design, and building intuitive UI..."
      value={summary}
      onChange={handleChange}
      className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/80 backdrop-blur-sm shadow-sm resize-none
        focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-500 transition-all duration-200"
      required
    />
  </div>
</div>

  );
};

export default SummeryForm;
