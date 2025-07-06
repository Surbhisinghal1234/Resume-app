import { useState } from "react";
import ThemeTab from "../components/ThemeTab";
import FormTab from "../components/FormTab";
import ResumeTab from "../components/ResumeTab";

const CreateResume = () => {
  const [activeTab, setActiveTab] = useState("theme");

  const renderTabOutlet = () => {
    switch (activeTab) {
      case "theme":
        return <ThemeTab />;
      case "form":
        return <FormTab />;
      case "resume":
        return <ResumeTab />;
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="  mx-auto mt-8 p-4 bg-white/90  rounded">
      <div className="mt-6 mx-auto w-5xl shadow-purple-500/20 border-0 mb-[2rem] p-4 rounded-xl flex gap-4 justify-center  bg-white/30 backdrop-blur-lg transition-all duration-500 transform hover:-translate-y-1 shadow-[0_10px_20px_rgba(168,85,247,0.3),_0_6px_6px_rgba(168,85,247,0.3)] hover:shadow-[0_20px_25px_rgba(168,85,247,0.4),_0_10px_10px_rgba(168,85,247,0.3)]">
        <button
          className={`px-4 py-2 rounded font-semibold transition-all duration-300   ${
            activeTab === "theme"
              ? "border-b-4 border-black/50 text-white bg-gradient-to-r from-purple-600 to-pink-600 font-bold"
              : "bg-gray-100 shadow-md hover:shadow-lg border-b-4 border-gray-100"
          }`}
          onClick={() => setActiveTab("theme")}
        >
          🧩 Choose Template
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold transition-all duration-300   ${
            activeTab === "form"
              ? "border-b-4 border-black/50 text-white bg-gradient-to-r from-purple-600 to-pink-600 font-bold"
              : "bg-gray-100 shadow-md hover:shadow-lg"
          }`}
          onClick={() => setActiveTab("form")}
        >
         ✏️ Create Resume
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold transition-all duration-300   ${
            activeTab === "resume"
              ? "border-b-4 border-black/50 text-white bg-gradient-to-r from-purple-600 to-pink-600 font-bold"
              : "bg-gray-100 shadow-md hover:shadow-lg"
          }`}
          onClick={() => setActiveTab("resume")}
        >
          📄 My Resumes
        </button>
      </div>
      <div className="mt-4">{renderTabOutlet()}</div>
    </div>
  );
};

export default CreateResume;