import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../../features/resume/resumeSlice";
import { useEffect } from "react";

const QualificationForm = () => {
  const dispatch = useDispatch();
  const qualification = useSelector(
    (state) => state.resume.currentResume.qualification
  );

  // Inject default qualification if array is empty
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
    const updated = qualification.map((item) => ({ ...item })); // deep copy
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

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Qualification</h2>

      {qualification.map((edu, index) => (
        <div
          key={index}
          className="w-full px-4 py-3 rounded-xl border-[2px] border-gray-400 shadow-md outline-none 
        transition-all duration-200 
        focus:border-[2px] focus:border-purple-500  focus:outline-[1.5px] focus:outline-black space-y-2"
        >
          <input
            placeholder="Degree / Course"
            value={edu.degree}
            onChange={(e) => handleChange(index, "degree", e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-[2px] border-gray-300 shadow-md outline-none 
          transition-all duration-200 
          focus:border-[2px] focus:border-purple-500  focus:outline-[1.5px] focus:outline-black"
          />
          <input
            placeholder="Institute / University"
            value={edu.institution}
            onChange={(e) => handleChange(index, "institution", e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-[2px] border-gray-300 shadow-md outline-none 
          transition-all duration-200 
          focus:border-[2px] focus:border-purple-500  focus:outline-[1.5px] focus:outline-black"
          />
          <input
            placeholder="Year of Passing"
            value={edu.year}
            onChange={(e) => handleChange(index, "year", e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-[2px] border-gray-300 shadow-md outline-none 
          transition-all duration-200 
          focus:border-[2px] focus:border-purple-500  focus:outline-[1.5px] focus:outline-black"
          />
          <input
            placeholder="Grade / Percentage"
            value={edu.grade}
            onChange={(e) => handleChange(index, "grade", e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-[2px] border-gray-300 shadow-md outline-none 
          transition-all duration-200 
          focus:border-[2px] focus:border-purple-500  focus:outline-[1.5px] focus:outline-black"
          />
        </div>
      ))}

      <button
        onClick={handleAdd}
        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded"
      >
        + Add More
      </button>
    </div>
  );
};

export default QualificationForm;
