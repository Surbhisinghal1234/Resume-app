import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import {
  nextStep,
  prevStep,
  setStep,
  resetForm,
  addResume,
  updateResume as updateResumeInStore,
} from "../features/resume/resumeSlice";
import {
  useAddResumeMutation,
  useUpdateResumeMutation,
} from "../features/resume/resumeApi";
import { toast } from "react-toastify";

// Form Steps
import BasicInfoForm from "./steps/BasicInfoForm";
import WorkExperienceForm from "./steps/WorkExperienceForm";
import QualificationForm from "./steps/QualificationForm";
import CertificationForm from "./steps/CertificationForm";
import SkillsForm from "./steps/SkillsForm";
import OthersForm from "./steps/OthersForm";

// Themes
import Theme1 from "./themes/Theme1";
import Theme2 from "./themes/Theme2";
import Theme3 from "./themes/Theme3";
import Theme4 from "./themes/Theme4";
import SummeryForm from "./steps/SummeryForm";

const FormTab = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const step = useSelector((state) => state.resume.step);
  const currentResume = useSelector((state) => state.resume.currentResume);
  const selectedTheme = useSelector((state) => state.resume.selectedTheme);
  const isEdit = useSelector((state) => state.resume.isEdit);

  const [addResumeApi] = useAddResumeMutation();
  const [updateResumeApi] = useUpdateResumeMutation();

  // For PDF download
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    contentRef:  componentRef,
    documentTitle: "My_Resume",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...currentResume,
       user: currentUser.uid, 
      theme: selectedTheme,
    };

    try {
      if (isEdit && currentResume.id) {
        await updateResumeApi({ id: currentResume.id, updatedData: payload });
        dispatch(updateResumeInStore(payload));
        console.log("Submitting payload:", payload);
        toast.success("Resume updated successfully!");
      } else {
        const response = await addResumeApi(payload).unwrap();
        dispatch(addResume(response));
        toast.success("Resume created successfully!");
      }

      dispatch(resetForm());
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <BasicInfoForm />;
      case 2:
        return <WorkExperienceForm />;
      case 3:
        return <QualificationForm />;
      case 4:
        return <CertificationForm />;
      case 5:
        return <SkillsForm />;
        case 6:
        return <SummeryForm />;
      case 7:
        return <OthersForm />;
      default:
        return <BasicInfoForm />;
    }
  };

  const renderThemePreview = () => {
    switch (selectedTheme) {
      case "Theme1":
        return <Theme1 />;
      case "Theme2":
        return <Theme2 />;
      case "Theme3":
        return <Theme3 />;
      case "Theme4":
        return <Theme4 />;
      default:
        return (
          <div className="text-gray-500 text-center mt-10">
            Please select a theme to preview your resume.
          </div>
        );
    }
  };

  const steps = [
    "Basic Info",
    "Work Experience",
    "Qualification",
    "Certifications",
    "Skills",
    "Summary",
    "Others",

  ];

  return (
    <div className="flex flex-col lg:flex-row gap-10">
      {/* Left: Form Area */}
      <form
        onSubmit={handleSubmit}
        className="w-full lg:w-1/2 space-y-6 border-r pr-4"
      >
        {/* Step Navigation Buttons */}
        

<div className="flex flex-wrap gap-3 bg-purple-50 p-4 rounded-2xl shadow-sm border border-purple-200">
  {steps.map((label, index) => {
    const isActive = step === index + 1;
    return (
      <button
        key={index}
        type="button"
        onClick={() => dispatch(setStep(index + 1))}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
          ${isActive
            ? "bg-purple-600 text-white shadow-md"
            : "bg-white text-purple-600 border border-purple-400 hover:bg-purple-100"}
        `}
      >
        <span className={`w-6 h-6 flex items-center justify-center rounded-full font-bold
          ${isActive ? "bg-white text-purple-600" : "bg-purple-100 text-purple-700 border border-purple-300"}
        `}>
          {index + 1}
        </span>
        {label}
      </button>
    );
  })}
</div>

        {/* Current Form Step */}
        {renderStep()}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              type="button"
              onClick={() => dispatch(prevStep())}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              ⬅ Previous
            </button>
          )}

          {step < 6 ? (
            <button
              type="button"
              onClick={() => dispatch(nextStep())}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded"
            >
              Next ➡
            </button>
          ) : (
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded"
            >
              {isEdit ? "Update Resume" : "Create Resume"}
            </button>
          )}
        </div>
      </form>

      {/* Right: Live Theme Preview with PDF download */}
      <div className="">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handlePrint}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded"
          >
            Download PDF
          </button>
        </div>

        <div ref={componentRef} className=" rounded-lg  bg-white">
          {renderThemePreview()}
        </div>
      </div>
    </div>
  );
};

export default FormTab;
