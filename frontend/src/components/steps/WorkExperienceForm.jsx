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

  const handleRemove = (index) => {
    const updated = workExperience.filter((_, i) => i !== index);
    dispatch(updateField({ section: "workExperience", value: updated }));
  };

  return (
    <div className="space-y-8 bg-white/30 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-purple-200">
      <h2 className="text-2xl font-bold text-purple-700 border-b pb-2">
        🧳 Work Experience
      </h2>

      {workExperience.map((work, index) => (
        <div
          key={index}
          className="space-y-5 p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-purple-200 shadow-sm relative group transition-all duration-300 hover:shadow-lg"
        >
          {workExperience.length > 1 && (
            <button
              onClick={() => handleRemove(index)}
              className="absolute top-0 right-1 text-red-500 hover:text-red-700 text-lg font-bold"
              title="Remove"
            >
              ✖
            </button>
          )}
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="🏢 Company Name"
              value={work.company}
              onChange={(e) => handleChange(index, "company", e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-purple-500 outline-none w-full"
            />

            <input
              type="text"
              placeholder="💼 Position"
              value={work.position}
              onChange={(e) => handleChange(index, "position", e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-purple-500 outline-none w-full"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="date"
              value={work.startDate}
              onChange={(e) => handleChange(index, "startDate", e.target.value)}
              onClick={(e) => e.target.showPicker?.()}
              className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-purple-500 outline-none w-full"
            />

            <input
              type="date"
              value={work.endDate}
              onChange={(e) => handleChange(index, "endDate", e.target.value)}
              onClick={(e) => e.target.showPicker?.()}
              disabled={work.currentlyWorking}
              className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-purple-500 outline-none w-full disabled:opacity-50"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={work.currentlyWorking}
              onChange={(e) =>
                handleChange(index, "currentlyWorking", e.target.checked)
              }
              className="w-5 h-5 accent-purple-600"
            />
            <label className="text-sm text-gray-700 font-medium">
              Currently Working Here
            </label>
          </div>

          <textarea
            placeholder="📝 Describe your role, achievements, tools used..."
            value={work.description}
            onChange={(e) => handleChange(index, "description", e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-purple-500 outline-none resize-none"
            rows={5}
          />
        </div>
      ))}

      <button
        type="button"
        onClick={handleAdd}
        className="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
      >
        + Add More Experience
      </button>
    </div>
  );
};

export default WorkExperienceForm;
