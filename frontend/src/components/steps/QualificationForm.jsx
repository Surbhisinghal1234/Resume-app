import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../../features/resume/resumeSlice";
import { useEffect } from "react";


const QualificationForm = () => {
  const dispatch = useDispatch();
  const qualification = useSelector(
    (state) => state.resume.currentResume.qualification
  );

  useEffect(() => {
    if (qualification.length === 0) {
      dispatch(
        updateField({
          section: "qualification",
          value: [
            {
              degree: "",
              institution: "",
              year: "",
              grade: "",
            },
          ],
        })
      );
    }
  }, [dispatch, qualification]);

  const handleChange = (index, field, value) => {
    const updated = qualification.map((item) => ({ ...item }));
    updated[index][field] = value;
    dispatch(updateField({ section: "qualification", value: updated }));
  };

  const handleAdd = () => {
    const updated = [
      ...qualification,
      {
        degree: "",
        institution: "",
        year: "",
        grade: "",
      },
    ];
    dispatch(updateField({ section: "qualification", value: updated }));
  };

  const handleDelete = (index) => {
  const updated = qualification.filter((_, i) => i !== index);
  dispatch(updateField({ section: "qualification", value: updated }));
};
  return (
    <div className="space-y-6 bg-white/30 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-purple-200">
      <h2 className="text-2xl font-bold text-purple-700 border-b pb-2">🎓 Qualification</h2>

      {qualification.map((edu, index) => (
        <div
          key={index}
          className="space-y-3 p-5 rounded-2xl bg-white/70 backdrop-blur-md border border-purple-200 shadow-md transition-all duration-200"
        >

                {/* 🗑️ Delete Button */}
      {qualification.length > 1 && (
        <button
          type="button"
          onClick={() => handleDelete(index)}
          className="absolute top-[-4px] right-1 text-red-500 hover:text-red-700 hover:scale-110 transition"
        >
          ✖
        </button>
      )}

          <input
            type="text"
            placeholder="🎓 Degree / Course"
            value={edu.degree}
            onChange={(e) => handleChange(index, "degree", e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/80 backdrop-blur-sm shadow-sm
            focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-500 transition-all duration-200"
          />

          <input
            type="text"
            placeholder="🏫 Institute / University"
            value={edu.institution}
            onChange={(e) => handleChange(index, "institution", e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/80 backdrop-blur-sm shadow-sm
            focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-500 transition-all duration-200"
          />

          <input
            type="text"
            placeholder="📅 Year of Passing"
            value={edu.year}
            onChange={(e) => handleChange(index, "year", e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/80 backdrop-blur-sm shadow-sm
            focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-500 transition-all duration-200"
          />

          <input
            type="text"
            placeholder="📊 Grade / Percentage"
            value={edu.gradeOrPercentage}
            onChange={(e) => handleChange(index, "gradeOrPercentage", e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/80 backdrop-blur-sm shadow-sm
            focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-500 transition-all duration-200"
          />
        </div>
      ))}

      <button
        type="button"
        onClick={handleAdd}
        className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
      >
        + Add More Qualification
      </button>
    </div>
  );
};

export default QualificationForm;
