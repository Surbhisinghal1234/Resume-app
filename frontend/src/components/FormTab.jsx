import { useSelector, useDispatch } from "react-redux";
import BasicInfoForm from "../components/steps/BasicInfoForm";
import WorkExperienceForm from "../components/steps/WorkExperienceForm";
import CertificationForm from "../components/steps/CertificationForm";
import SkillsForm from "../components/steps/SkillsForm";
import OthersForm from "../components/steps/OthersForm";
import QualificationForm from "./steps/QualificationForm";
import { setStep } from "../features/resume/resumeSlice"; 
import ThemePreview from "./ThemePreview";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const FormTab = () => {
  const dispatch = useDispatch();
  const step = useSelector((state) => state.resume.step);
  const selectedTheme = useSelector((state) => state.resume.selectedTheme);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Resume",
  });

  // Mapping Redux step to tab key and vice-versa
  const stepToTabKey = {
    1: "basic",
    2: "work",
    3: "qualification",
    4: "certification",
    5: "skills",
    6: "others",
  };

  const tabKeyToStep = {
    basic: 1,
    work: 2,
    qualification: 3,
    certification: 4,
    skills: 5,
    others: 6,
  };

  const renderSubTabContent = () => {
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
        return <OthersForm />;
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <>
      {/* Tab buttons */}
      <div className="mt-6 mx-auto w-5xl shadow-purple-500/20 border-0 mb-[2rem] p-4 rounded-xl flex gap-4 justify-center  bg-white/30 backdrop-blur-lg transition-all duration-500 transform hover:-translate-y-1 shadow-[0_10px_20px_rgba(168,85,247,0.3),_0_6px_6px_rgba(168,85,247,0.3)] hover:shadow-[0_20px_25px_rgba(168,85,247,0.4),_0_10px_10px_rgba(168,85,247,0.3)]">
        {[
          { key: "basic", label: "Basic Info" },
          { key: "work", label: "Work Experience" },
          { key: "qualification", label: "Qualification" },
          { key: "certification", label: "Certification" },
          { key: "skills", label: "Skills" },
          { key: "others", label: "Others" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => dispatch(setStep(tabKeyToStep[tab.key]))}
            className={`px-4 py-2 rounded font-semibold transition-all duration-300 ${
              stepToTabKey[step] === tab.key
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                : "bg-gray-100 shadow-md hover:shadow-lg"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex justify-between gap-4 ">
        {/* Left side: Form and tabs */}
       
          {/* Form content */}
          <div className=" mx-auto w-full shadow-2xl border border-gray-300 shadow-purple-500/20  bg-white/80 backdrop-blur-lg hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1 p-4 rounded-xl">
            {renderSubTabContent()}
          </div>
       

        {/* Right side: Preview */}
        <div className=" ">
          {selectedTheme ? (
            <>
              <div className="mb-4 text-right">
                <button
                  onClick={handlePrint}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded  "
                >
                  Download PDF
                </button>
              </div>
              <div ref={componentRef}>
                <ThemePreview theme={selectedTheme} />
              </div>
            </>
          ) : (
            <div className="p-6 border rounded text-gray-500 bg-white shadow text-center">
              No theme selected
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default FormTab;
