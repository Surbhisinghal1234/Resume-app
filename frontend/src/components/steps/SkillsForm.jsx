import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../../features/resume/resumeSlice";
import { useState, useEffect } from "react";

const SkillsForm = () => {
  const dispatch = useDispatch();
  const skills = useSelector((state) => state.resume.currentResume.skills);

  // Default value if not present
  useEffect(() => {
    if (!skills.technical || !skills.soft) {
      dispatch(
        updateField({
          section: "skills",
          value: {
            technical: skills.technical || [],
            soft: skills.soft || [],
          },
        })
      );
    }
  }, [dispatch, skills]);

  const [inputValues, setInputValues] = useState({
    technical: "",
    soft: "",
  });

  const handleInputChange = (type, value) => {
    setInputValues((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleKeyDown = (e, type) => {
    if (e.key === "Enter" && inputValues[type].trim()) {
      e.preventDefault();
      const newSkill = inputValues[type].trim();
      if (!skills[type].includes(newSkill)) {
        const updated = {
          ...skills,
          [type]: [...skills[type], newSkill],
        };
        dispatch(updateField({ section: "skills", value: updated }));
      }
      setInputValues((prev) => ({
        ...prev,
        [type]: "",
      }));
    }
  };

  const handleRemoveSkill = (type, index) => {
    const updated = {
      ...skills,
      [type]: skills[type].filter((_, i) => i !== index),
    };
    dispatch(updateField({ section: "skills", value: updated }));
  };

  const renderTags = (type) => (
    <div className="flex flex-wrap gap-2 mt-2">
      {skills[type]?.map((skill, index) => (
        <div
          key={index}
          className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center"
        >
          <span>{skill}</span>
          <button
            onClick={() => handleRemoveSkill(type, index)}
            className="ml-2 text-red-500 font-bold"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );

  return (

    <>
    <div className="space-y-8 bg-white/30 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-purple-200">
  <h2 className="text-2xl font-bold text-purple-700 border-b pb-2">💼 Skills</h2>

  {/* Technical Skills */}
  <div>
    <h3 className="font-medium text-lg text-purple-600 mb-1">🛠️ Technical Skills</h3>
    {renderTags("technical")}
    <input
      type="text"
      placeholder="e.g. HTML, CSS, React..."
      value={inputValues.technical}
      onChange={(e) => handleInputChange("technical", e.target.value)}
      onKeyDown={(e) => handleKeyDown(e, "technical")}
      className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-300 bg-white/80 backdrop-blur-sm shadow-sm
        focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-500 transition-all duration-200"
    />
  </div>

  {/* Soft Skills */}
  <div>
    <h3 className="font-medium text-lg text-purple-600 mb-1">🤝 Soft Skills</h3>
    {renderTags("soft")}
    <input
      type="text"
      placeholder="e.g. Communication, Leadership..."
      value={inputValues.soft}
      onChange={(e) => handleInputChange("soft", e.target.value)}
      onKeyDown={(e) => handleKeyDown(e, "soft")}
      className="w-full mt-2 px-4 py-3 rounded-xl border border-gray-300 bg-white/80 backdrop-blur-sm shadow-sm
        focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-500 transition-all duration-200"
    />
  </div>
</div>

    </>
  );
};

export default SkillsForm;
