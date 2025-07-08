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
              currentlyWorking: false,
            },
          ],
        })
      );
    }
  }, [dispatch, workExperience]);

  const handleChange = (index, field, value) => {
    const updated = workExperience.map((item) => ({ ...item }));
    if (field === "currentlyWorking" && value === true) {
      updated[index]["endDate"] = ""; // clear end date
    }
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
        currentlyWorking: false,
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
            type="date"
            placeholder="Start Date"
            onClick={(e) => e.target.showPicker?.()}
            value={work.startDate}
            onChange={(e) => handleChange(index, "startDate", e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-[2px] border-gray-300 shadow-md outline-none 
              transition-all duration-200 
              focus:border-[2px] focus:border-purple-500 focus:outline-[1.5px] focus:outline-black"
          />
          <input
            type="date"
            placeholder="End Date"
            onClick={(e) => e.target.showPicker?.()}
            value={work.endDate}
            onChange={(e) => handleChange(index, "endDate", e.target.value)}
            disabled={work.currentlyWorking}
            className="w-full px-4 py-3 rounded-xl border-[2px] border-gray-300 shadow-md outline-none 
    transition-all duration-200 
    focus:border-[2px] focus:border-purple-500 focus:outline-[1.5px] focus:outline-black disabled:opacity-50"
          />

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={work.currentlyWorking}
              onChange={(e) =>
                handleChange(index, "currentlyWorking", e.target.checked)
              }
              className="w-4 h-4"
            />
            <label className="text-sm">Currently Working Here</label>
          </div>
          <textarea
            placeholder="Description"
            value={work.description}
            onChange={(e) => handleChange(index, "description", e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-[2px] border-gray-300 shadow-md outline-none 
              transition-all duration-200 
              focus:border-[2px] focus:border-purple-500 focus:outline-[1.5px] focus:outline-black"
          />
        </div>
      ))}

      <button
        type="button"
        onClick={handleAdd}
        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded"
      >
        + Add Experience
      </button>
    </div>
  );
};

export default WorkExperienceForm;
