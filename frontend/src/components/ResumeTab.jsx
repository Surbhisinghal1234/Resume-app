import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { MdEdit, MdDelete, MdDownload } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useGetResumesQuery, useDeleteResumeMutation } from "../features/resume/resumeApi";
import { setStep, setIsEdit, loadResumeForEdit } from "../features/resume/resumeSlice";
import { useReactToPrint } from "react-to-print";
import Theme1 from "./themes/Theme1";
import Theme2 from "./themes/Theme2";
import Theme3 from "./themes/Theme3";
import Theme4 from "./themes/Theme4";
import { toast } from "react-toastify";
const ResumeTab = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: resumes = [], isLoading, error } = useGetResumesQuery();
  const [deleteResume] = useDeleteResumeMutation();

  const componentRefs = useRef({}); 
  const [printResumeId, setPrintResumeId] = useState(null);

  const handlePrint = useReactToPrint({
    content: () => {
      return componentRefs.current[printResumeId];
    },
    documentTitle: "My_Resume",
  });


  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this resume?")) {
      try {
        await deleteResume(id).unwrap();
        console.log(id, "id")
        toast.success("Resume deleted successfully");
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete resume");
      }
    }
  };

  const handleEdit = (resume) => {
    dispatch(loadResumeForEdit(resume));
    dispatch(setIsEdit(true));
    dispatch(setStep(1));
    navigate("/create-resume", { state: { tab: "form" } });
    console.log({ state: { tab: "form" }})
  };

  const renderTheme = (resume) => {
    switch (resume.theme) {
      case "Theme1":
        return <Theme1 resume={resume} />;
      case "Theme2":
        return <Theme2 resume={resume} />;
      case "Theme3":
        return <Theme3 resume={resume} />;
      case "Theme4":
        return <Theme4 resume={resume} />;
      default:
        return <div>No theme selected</div>;
    }
  };

  if (isLoading) return <p>Loading resumes...</p>;
  if (error) return <p>Error loading resumes</p>;

  return (
//     <div className="p-6 space-y-6">
//       <h2 className="text-2xl font-bold ">My Resumes</h2>
// <div className="flex flex-wrap gap-6">
//       {resumes.map((resume, i) => (
//         <div
//           key={resume._id || i}
//           className="relative border rounded p-4 bg-white shadow-md w-[25rem] h-[30rem] overflow-y-auto hide-scrollbar"
//         >
//           {/* Action Buttons */}
//           <div className="absolute right-3 top-3 flex gap-3">
//             <MdEdit
//               className="text-blue-600 cursor-pointer hover:scale-110"
//               size={22}
//               onClick={() => handleEdit(resume)}
//             />
//             <MdDelete
//               className="text-red-500 cursor-pointer hover:scale-110"
//               size={22}
//               onClick={() => handleDelete(resume._id)}
//             />
//           <MdDownload
//                 className="text-green-600 cursor-pointer hover:scale-110"
//                 size={22}
//                 onClick={() => {
//                   setPrintResumeId(resume._id); // set current ID
//                   setTimeout(() => handlePrint(), 100);
//                 }}
//               />
//             </div>

//             {/* Hidden Preview */}
//             <div className="hidden">
//               <div
//                 id={`resume-${resume._id}`}
//                 ref={(el) => (componentRefs.current[resume._id] = el)} // set ref
//               >
//                 {renderTheme(resume)}
//               </div>
//             </div>

//           {/* Resume Summary Preview */}
//           <div className="mt-2">
//             <h4 className="font-semibold mb-1">Basic Info</h4>
//             <p>Name: {resume.basicInfo?.name}</p>
//             <p>Email: {resume.basicInfo?.email}</p>
//             <p>Mobile: {resume.basicInfo?.mobile}</p>
//             <p>Location: {resume.basicInfo?.location}</p>
//           </div>

//           <div className="mt-4">
//             <h4 className="font-semibold">Work Experience</h4>
//             {resume.workExperience?.map((exp, idx) => (
//               <div key={idx} className="ml-4 mb-1">
//                 <p>Company: {exp.company}</p>
//                 <p>Position: {exp.position}</p>
//               <p>
//   Duration: {exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate}
// </p>
//                 <p>Description: {exp.description}</p>
//               </div>
//             ))}
//           </div>
//            {/* Summary */}
//         <div className="mt-4">
//           <h4 className="font-semibold">
//             Professional Summary
//           </h4>
//          <p> {resume.summary} </p>
//         </div>


//           <div className="mt-4">
//             <h4 className="font-semibold">Education</h4>
//             {resume.qualification?.map((q, idx) => (
//               <div key={idx} className="ml-4 mb-1">
//                 <p>Degree: {q.degree}</p>
//                 <p>Institution: {q.institution}</p>
//                 <p>Year: {q.year}</p>
//               </div>
//             ))}
//           </div>

//           <div className="mt-4">
//             <h4 className="font-semibold">Certifications</h4>
//             {resume.certification?.map((cert, idx) => (
//               <div key={idx} className="ml-4 mb-1">
//                 <p>Title: {cert.title}</p>
//                 <p>Authority: {cert.authority}</p>
//                 <p>Year: {cert.year}</p>
//               </div>
//             ))}
//           </div>

//           <div className="mt-4">
//             <h4 className="font-semibold">Skills</h4>
//             <p>Technical: {resume.skills?.technical?.join(", ")}</p>
//             <p>Soft: {resume.skills?.soft?.join(", ")}</p>
//           </div>

//           <div className="mt-4">
//             <h4 className="font-semibold">Others</h4>
//             <p>Hobbies: {resume.others?.hobbies?.join(", ")}</p>
//             <p>Languages: {resume.others?.languages?.join(", ")}</p>
//           </div>
//         </div>
//       ))}
// </div>
//     </div>

<>

<div className="p-6 min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
  <h2 className="text-3xl font-bold text-gray-800 mb-8">My Resumes</h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
    {resumes.map((resume, i) => (
      <div
        key={resume._id || i}
        className="relative overflow-y-scroll h-[30rem] hide-scrollbar rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200"
      >
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2 z-10">
          <MdEdit
            className="text-blue-600 hover:text-blue-800 hover:scale-110 transition-transform cursor-pointer"
            size={22}
            title="Edit"
            onClick={() => handleEdit(resume)}
          />
          <MdDelete
            className="text-red-500 hover:text-red-700 hover:scale-110 transition-transform cursor-pointer"
            size={22}
            title="Delete"
            onClick={() => handleDelete(resume._id)}
          />
          <MdDownload
            className="text-green-500 hover:text-green-700 hover:scale-110 transition-transform cursor-pointer"
            size={22}
            title="Download"
            onClick={() => {
              setPrintResumeId(resume._id);
              setTimeout(() => handlePrint(), 100);
            }}
          />
        </div>

        {/* Hidden Preview */}
        <div className="hidden">
          <div
            id={`resume-${resume._id}`}
            ref={(el) => (componentRefs.current[resume._id] = el)}
          >
            {renderTheme(resume)}
          </div>
        </div>

        {/* Resume Details */}
        <div className="space-y-4 text-sm text-gray-700">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">🧑 Basic Info</h3>
            <p><strong>Name:</strong> {resume.basicInfo?.name}</p>
            <p><strong>Email:</strong> {resume.basicInfo?.email}</p>
            <p><strong>Mobile:</strong> {resume.basicInfo?.mobile}</p>
            <p><strong>Location:</strong> {resume.basicInfo?.location}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-1">💼 Experience</h3>
            {resume.workExperience?.map((exp, idx) => (
              <div key={idx} className="pl-2 border-l-2 border-gray-300 ml-2 space-y-1">
                <p><strong>Company:</strong> {exp.company}</p>
                <p><strong>Position:</strong> {exp.position}</p>
                <p><strong>Duration:</strong> {exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate}</p>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-1">📝 Summary</h3>
            <p className="italic">{resume.summary}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-1">🎓 Education</h3>
            {resume.qualification?.map((q, idx) => (
              <div key={idx} className="ml-2 space-y-1">
                <p><strong>Degree:</strong> {q.degree}</p>
                <p><strong>Institution:</strong> {q.institution}</p>
                <p><strong>Year:</strong> {q.year}</p>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-1">📜 Certifications</h3>
            {resume.certification?.map((cert, idx) => (
              <div key={idx} className="ml-2 space-y-1">
                <p><strong>Title:</strong> {cert.title}</p>
                <p><strong>Authority:</strong> {cert.authority}</p>
                <p><strong>Year:</strong> {cert.year}</p>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-1">🧠 Skills</h3>
            <p><strong>Technical:</strong> {resume.skills?.technical?.join(", ")}</p>
            <p><strong>Soft:</strong> {resume.skills?.soft?.join(", ")}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-1">🎯 Others</h3>
            <p><strong>Hobbies:</strong> {resume.others?.hobbies?.join(", ")}</p>
            <p><strong>Languages:</strong> {resume.others?.languages?.join(", ")}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

</>
  );
};

export default ResumeTab;
