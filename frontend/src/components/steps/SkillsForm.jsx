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
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Skills</h2>

      {/* Technical Skills */}
      <div>
        <h3 className="font-medium">Technical Skills</h3>
        {renderTags("technical")}
        <input
          type="text"
          placeholder="Type and press Enter"
          value={inputValues.technical}
          onChange={(e) => handleInputChange("technical", e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, "technical")}
          className="w-full px-4 py-3 rounded-xl border-[2px] border-gray-300 shadow-md outline-none 
            transition-all duration-200 
            focus:border-[2px] focus:border-purple-500  focus:outline-[1.5px] focus:outline-black"
        />
      </div>

      {/* Soft Skills */}
      <div>
        <h3 className="font-medium">Soft Skills</h3>
        {renderTags("soft")}
        <input
          type="text"
          placeholder="Type and press Enter"
          value={inputValues.soft}
          onChange={(e) => handleInputChange("soft", e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, "soft")}
          className="w-full px-4 py-3 rounded-xl border-[2px] border-gray-300 shadow-md outline-none 
            transition-all duration-200 
            focus:border-[2px] focus:border-purple-500  focus:outline-[1.5px] focus:outline-black"
        />
      </div>
    </div>
  );
};

export default SkillsForm;
