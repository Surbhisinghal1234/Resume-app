import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../../features/resume/resumeSlice";
import { useEffect } from "react";

const WorkExperienceForm = () => {
  const dispatch = useDispatch();
  const workExperience = useSelector(
    (state) => state.resume.currentResume.workExperience
  );

  // Inject  default object if empty
  useEffect(() => {
    if (workExperience.length === 0) {
      dispatch(
        updateField({
          section: "workExperience",
          value: [
            {
              company: "",
              position: "",
              startDate: "",
              endDate: "",
              description: "",
            },
          ],
        })
      );
    }
  }, [dispatch, workExperience]);

  const handleChange = (index, field, value) => {
    const updated = workExperience.map((item) => ({ ...item }));
    updated[index][field] = value;
    dispatch(updateField({ section: "workExperience", value: updated }));
  };

  const handleAdd = () => {
    const updated = [
      ...workExperience,
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ];
    dispatch(updateField({ section: "workExperience", value: updated }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Work Experience</h2>

      {workExperience.map((work, index) => (
        <div
          key={index}
          className="w-full px-4 py-3 rounded-xl border-[2px] border-gray-400 shadow-md outline-none 
            transition-all duration-200 
            focus:border-[2px] focus:border-purple-500 focus:outline-[1.5px] focus:outline-black space-y-2"
        >
          <input
            placeholder="Company Name"
            value={work.company}
            onChange={(e) => handleChange(index, "company", e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-[2px] border-gray-300 shadow-md outline-none 
              transition-all duration-200 
              focus:border-[2px] focus:border-purple-500 focus:outline-[1.5px] focus:outline-black"
          />
          <input
            placeholder="Position"
            value={work.position}
            onChange={(e) => handleChange(index, "position", e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-[2px] border-gray-300 shadow-md outline-none 
              transition-all duration-200 
              focus:border-[2px] focus:border-purple-500 focus:outline-[1.5px] focus:outline-black"
          />
          <input
            placeholder="Start Date"
            value={work.startDate}
            onChange={(e) => handleChange(index, "startDate", e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-[2px] border-gray-300 shadow-md outline-none 
              transition-all duration-200 
              focus:border-[2px] focus:border-purple-500 focus:outline-[1.5px] focus:outline-black"
          />
          <input
            placeholder="End Date"
            value={work.endDate}
            onChange={(e) => handleChange(index, "endDate", e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-[2px] border-gray-300 shadow-md outline-none 
              transition-all duration-200 
              focus:border-[2px] focus:border-purple-500 focus:outline-[1.5px] focus:outline-black"
          />
          <textarea
            placeholder="Description"
            value={work.description}
            onChange={(e) =>
              handleChange(index, "description", e.target.value)
            }
            className="w-full px-4 py-3 rounded-xl border-[2px] border-gray-300 shadow-md outline-none 
              transition-all duration-200 
              focus:border-[2px] focus:border-purple-500 focus:outline-[1.5px] focus:outline-black"
          />
        </div>
      ))}

      <button
        onClick={handleAdd}
        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded"
      >
        + Add Experience
      </button>
    </div>
  );
};

export default WorkExperienceForm;
