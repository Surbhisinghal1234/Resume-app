import { useState } from "react";
import ThemeTab from "../components/ThemeTab";
import FormTab from "../components/FormTab";
import ResumeTab from "../components/ResumeTab";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const CreateResume = () => {
  const location = useLocation();
  

const [activeTab, setActiveTab] = useState(location.state?.tab || "theme");
useEffect(() => {
  if (location.state?.tab) {
    setActiveTab(location.state.tab);
    // Prevent stale state reuse
    window.history.replaceState({}, document.title);
  }
}, [location]);


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
    <div className="  mx-auto mt-8 p-4 bg-white/90 rounded max-w-[1300px]">
     
      <div className="mt-6 mx-auto w-full mb-8 p-4 rounded-2xl flex flex-col md:flex-row gap-4 justify-center items-center bg-white/20 backdrop-blur-lg shadow-lg transition-all duration-500 transform hover:-translate-y-1 hover:shadow-2xl border border-purple-200">
  {[
    { label: "Choose Template", value: "theme", icon: "🧩" },
    { label: "Create Resume", value: "form", icon: "✏️" },
    { label: "My Resumes", value: "resume", icon: "📄" },
  ].map((tab) => (
    <button
      key={tab.value}
      onClick={() => setActiveTab(tab.value)}
      className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 tracking-wide
        ${
          activeTab === tab.value
            ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md scale-105"
            : "bg-white text-purple-700 border border-purple-200 hover:bg-purple-100 hover:text-purple-900"
        }
      `}
    >
      <span className="text-lg">{tab.icon}</span>
      {tab.label}
    </button>
  ))}
</div>

      <div className="mt-4">{renderTabOutlet()}</div>
    </div>
  );
};

export default CreateResume;