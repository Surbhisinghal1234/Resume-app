import { useDispatch, useSelector } from "react-redux";
import { updateField, nextStep } from "../../features/resume/resumeSlice";

const BasicInfoForm = () => {
  const dispatch = useDispatch();
  const basicInfo = useSelector((state) => state.resume.currentResume.basicInfo);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Directly update Redux on every change
    dispatch(
      updateField({
        section: "basicInfo",
        value: {
          ...basicInfo,
          [name]: value,
        },
      })
    );
  };

  const handleNext = () => {
    dispatch(nextStep());
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Basic Information</h2>

      <div>
        <label>Name</label>
        <input
          name="name"
          value={basicInfo.name}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border-[2px] border-gray-300 shadow-md outline-none 
             transition-all duration-200 
             focus:border-[2px] focus:border-purple-500  focus:outline-[1.5px] focus:outline-black"
        />
      </div>

      <div>
        <label>Email</label>
        <input
          name="email"
          value={basicInfo.email}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border-[2px] border-gray-300 shadow-md outline-none 
             transition-all duration-200 
             focus:border-[2px] focus:border-purple-500  focus:outline-[1.5px] focus:outline-black"
        />
      </div>

      <div>
        <label>Mobile</label>
        <input
          name="mobile"
          value={basicInfo.mobile}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border-[2px] border-gray-300 shadow-md outline-none 
             transition-all duration-200 
             focus:border-[2px] focus:border-purple-500  focus:outline-[1.5px] focus:outline-black"
        />
      </div>

      <div>
        <label>Location</label>
        <input
          name="location"
          value={basicInfo.location}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border-[2px] border-gray-300 shadow-md outline-none 
             transition-all duration-200 
             focus:border-[2px] focus:border-purple-500  focus:outline-[1.5px] focus:outline-black"
        />
      </div>
<div className="text-right mt-10">
      <button
        onClick={handleNext}
        className="bg-gradient-to-r  from-purple-600 to-pink-600 text-white px-4 py-2 rounded"
      >
        Next
      </button>
        </div>
    </div>
  );
};

export default BasicInfoForm;
