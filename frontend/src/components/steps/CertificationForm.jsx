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


  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Certifications</h2>

      {certifications.map((cert, index) => (
        <div key={index} className="w-full px-4 py-3 rounded-xl border-[2px] border-gray-400 shadow-md outline-none 
             transition-all duration-200 
             focus:border-[2px] focus:border-purple-500  focus:outline-[1.5px] focus:outline-black space-y-2">
          <input
            placeholder="Certification Title"
            value={cert.title}
            onChange={(e) => handleChange(index, "title", e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-[2px] border-gray-300 shadow-md outline-none 
             transition-all duration-200 
             focus:border-[2px] focus:border-purple-500  focus:outline-[1.5px] focus:outline-black"
          />
          <input
            placeholder="Issuing Authority"
            value={cert.authority}
            onChange={(e) => handleChange(index, "authority", e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-[2px] border-gray-300 shadow-md outline-none 
             transition-all duration-200 
             focus:border-[2px] focus:border-purple-500  focus:outline-[1.5px] focus:outline-black"
          />
          <input
            placeholder="Year"
            value={cert.year}
            onChange={(e) => handleChange(index, "year", e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-[2px] border-gray-300 shadow-md outline-none 
             transition-all duration-200 
             focus:border-[2px] focus:border-purple-500  focus:outline-[1.5px] focus:outline-black"
          />
        </div>
      ))}

      <button 
      type="button"
        onClick={handleAdd}
        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded"
      >
        + Add More
      </button>

      
    </div>
  );
};

export default CertificationForm;
