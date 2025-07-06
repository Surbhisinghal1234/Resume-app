import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { MdEdit, MdDelete, MdDownload } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useGetResumesQuery, useDeleteResumeMutation } from "../features/resume/resumeApi";
import { updateResume, setStep, setIsEdit } from "../features/resume/resumeSlice";
import { useReactToPrint } from "react-to-print";
import Theme1 from "./themes/Theme1";
import Theme2 from "./themes/Theme2";
import Theme3 from "./themes/Theme3";
import Theme4 from "./themes/Theme4";

const ResumeTab = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: resumes = [], isLoading, error } = useGetResumesQuery();
  const [deleteResume] = useDeleteResumeMutation();

  const componentRef = useRef({});

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "My_Resume",
  });

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this resume?")) {
      try {
        await deleteResume(id).unwrap();
        alert("Resume deleted");
      } catch (err) {
        console.error(err);
        alert("Failed to delete resume");
      }
    }
  };

  const handleEdit = (resume) => {
    dispatch(updateResume({ ...resume, id: resume._id }));
    dispatch(setIsEdit(true));
    dispatch(setStep(1));
    navigate("/create-resume", { state: { tab: "form" } });
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
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">My Resumes</h2>

      {resumes.map((resume, i) => (
        <div
          key={resume._id || i}
          className="relative border rounded p-4 bg-white shadow-md"
        >
          {/* Action Buttons */}
          <div className="absolute right-3 top-3 flex gap-3">
            <MdEdit
              className="text-blue-600 cursor-pointer hover:scale-110"
              size={22}
              onClick={() => handleEdit(resume)}
            />
            <MdDelete
              className="text-red-500 cursor-pointer hover:scale-110"
              size={22}
              onClick={() => handleDelete(resume._id)}
            />
            <MdDownload
              className="text-green-600 cursor-pointer hover:scale-110"
              size={22}
              onClick={() => {
                componentRef.current = document.getElementById(`resume-${resume._id}`);
                setTimeout(() => handlePrint(), 100);
              }}
            />
          </div>

          {/* Hidden Preview for Download */}
          <div className="hidden">
            <div id={`resume-${resume._id}`} ref={(el) => (componentRef.current = el)}>
              {renderTheme(resume)}
            </div>
          </div>

          {/* Resume Summary Preview */}
          <div className="mt-2">
            <h4 className="font-semibold mb-1">Basic Info</h4>
            <p>Name: {resume.basicInfo?.name}</p>
            <p>Email: {resume.basicInfo?.email}</p>
            <p>Mobile: {resume.basicInfo?.mobile}</p>
            <p>Location: {resume.basicInfo?.location}</p>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold">Work Experience</h4>
            {resume.workExperience?.map((exp, idx) => (
              <div key={idx} className="ml-4 mb-1">
                <p>Company: {exp.company}</p>
                <p>Position: {exp.position}</p>
                <p>Duration: {exp.startDate} - {exp.endDate}</p>
                <p>Description: {exp.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <h4 className="font-semibold">Education</h4>
            {resume.qualification?.map((q, idx) => (
              <div key={idx} className="ml-4 mb-1">
                <p>Degree: {q.degree}</p>
                <p>Institution: {q.institution}</p>
                <p>Year: {q.year}</p>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <h4 className="font-semibold">Certifications</h4>
            {resume.certification?.map((cert, idx) => (
              <div key={idx} className="ml-4 mb-1">
                <p>Title: {cert.title}</p>
                <p>Authority: {cert.authority}</p>
                <p>Year: {cert.year}</p>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <h4 className="font-semibold">Skills</h4>
            <p>Technical: {resume.skills?.technical?.join(", ")}</p>
            <p>Soft: {resume.skills?.soft?.join(", ")}</p>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold">Others</h4>
            <p>Hobbies: {resume.others?.hobbies?.join(", ")}</p>
            <p>Languages: {resume.others?.languages?.join(", ")}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResumeTab;
