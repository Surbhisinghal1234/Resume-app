import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../../features/resume/resumeSlice";
import { useEffect } from "react";

const CertificationForm = () => {
  const dispatch = useDispatch();
  const certifications = useSelector(
    (state) => state.resume.currentResume.certification
  );

  // Default empty entry if none exists
  useEffect(() => {
    if (certifications.length === 0) {
      dispatch(
        updateField({
          section: "certification",
          value: [
            {
              title: "",
              authority: "",
              year: "",
            },
          ],
        })
      );
    }
  }, [dispatch, certifications]);

  const handleChange = (index, field, value) => {
    const updated = certifications.map((item) => ({ ...item })); // deep copy
    updated[index][field] = value;
    dispatch(updateField({ section: "certification", value: updated }));
  };

  const handleAdd = () => {
    const updated = [
      ...certifications,
      {
        title: "",
        authority: "",
        year: "",
      },
    ];
    dispatch(updateField({ section: "certification", value: updated }));
  };
const handleRemove = (index) => {
  const updated = certifications.filter((_, i) => i !== index);
  dispatch(updateField({ section: "certification", value: updated }));
};

  return (
  

    <div className="space-y-6  bg-white/30 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-purple-200">
  <h2 className="text-2xl font-bold text-purple-700 border-b pb-2">📜 Certifications</h2>

  {certifications.map((cert, index) => (
    <div
      key={index}
      className="space-y-3 p-5 rounded-2xl bg-white/70 backdrop-blur-md border border-purple-200 shadow-md transition-all duration-200 relative"
    >
      {/* Optional remove button */}
      {certifications.length > 1 && (
        <button
          onClick={() => handleRemove(index)}
          className="absolute top-[-4px] right-1 text-sm text-red-500 hover:text-red-700 font-medium"
        >
          ✖
        </button>
      )}

      <input
        type="text"
        placeholder="🎓 Certification Title"
        value={cert.title}
        onChange={(e) => handleChange(index, "title", e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/80 backdrop-blur-sm shadow-sm
        focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-500 transition-all duration-200"
      />

      <input
        type="text"
        placeholder="🏛️ Issuing Authority"
        value={cert.authority}
        onChange={(e) => handleChange(index, "authority", e.target.value)}
        className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/80 backdrop-blur-sm shadow-sm
        focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-500 transition-all duration-200"
      />

      <input
        type="text"
        placeholder="📅 Year"
        value={cert.year}
        onChange={(e) => handleChange(index, "year", e.target.value)}
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
    + Add More Certification
  </button>
</div>

  );
};

export default CertificationForm;
