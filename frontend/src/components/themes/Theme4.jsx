import { useSelector } from "react-redux";

import { fallback } from "../../data/fallBack";
import { MdEmail, MdLocationPin, MdPhone} from "react-icons/md";
import { FaGithub, FaLinkedin } from "react-icons/fa";


const Theme4 = () => {
  const resume = useSelector((state) => state.resume.currentResume);

 const basicInfo = resume.basicInfo?.name ? resume.basicInfo : fallback.basicInfo;
  const skills = resume.skills?.technical?.length
    ? resume.skills
    : fallback.skills;
  const others = resume.others?.languages?.length
    ? resume.others
    : fallback.others;
  const summary = resume.summary || fallback.summary;
 
  const workExperience =
  resume.workExperience?.some(exp => exp.company || exp.position || exp.description)
    ? resume.workExperience
    : fallback.workExperience;
   const qualification =
  resume.qualification?.some(qua => qua.degree || qua.institution || qua.year || qua.gradeOrPercentage)
    ? resume.qualification
    : fallback.qualification;


  const certification =resume.certification?.some(cert => cert.title || cert.authority || cert.year)
    ? resume.certification : fallback.certification;


  return (
   <div className="
  w-full max-w-[800px] mx-auto 
  bg-white rounded-md font-sans text-gray-800 space-y-8 
  print:w-[800px] print:shadow-none print:border-none
">
     
     {/* Header */}
  <div className="bg-gray-800 text-white rounded-t-md p-4 sm:p-6 shadow">
    <h1 className="text-2xl sm:text-4xl font-bold uppercase">
      {basicInfo?.name}
    </h1>
    <h2 className="text-lg sm:text-xl text-pink-600 font-medium">
      {basicInfo?.designation}
    </h2>
    <div className="text-sm mt-2 break-words">
      {basicInfo.email} &nbsp; | &nbsp; {basicInfo.mobile} &nbsp; | &nbsp; {basicInfo.location}
    </div>
        {basicInfo.linkedin && (
  <div className="flex gap-2">
    <FaLinkedin className="text-[#636e72] mt-1" />
    <a
      href={basicInfo.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className=" underline break-all"
    >
      {basicInfo.linkedin}
    </a>
  </div>
)}

{basicInfo.github && (
  <div className="flex  gap-2">
    <FaGithub className="text-[#636e72] mt-1" />
    <a
      href={basicInfo.github}
      target="_blank"
      rel="noopener noreferrer"
      className=" underline break-all "
    >
      {basicInfo.github}
    </a>
  </div>
)}
  </div>

        {/* Content */}
  <div className="px-4 sm:px-6 py-4">
    {/* Summary */}
    <div className="border-b pb-4 mb-4">
      <h2 className="text-lg font-bold mb-2 text-gray-900 uppercase">
        Professional Summary
      </h2>
      <p>{summary}</p>
    </div>


         {/* Experience */}
    <div className="border-b pb-4 mb-4">
      <h2 className="text-lg font-bold mb-2 text-gray-900 uppercase">
        Professional Experience
      </h2>
      {workExperience.map((exp, index) => (
        <div key={index} className="mt-4">
          <h4 className="font-bold">{exp.position}</h4>
          <p className="text-sm text-gray-600">
            {exp.company} • {exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate}
          </p>
          <p className="text-sm mt-1 whitespace-pre-line">{exp.description}</p>
        </div>
      ))}
    </div>

    {/* Skills + Languages Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 border-b pb-6">
      <div>
  <h3 className="text-base font-semibold uppercase tracking-wide mb-1">
    Skills
  </h3>

  {skills.technical?.length > 0 && (
    <>
      <p className="font-medium text-sm">Technical Skills</p>
      <ul className="list-disc list-inside text-sm space-y-1">
        {skills.technical.map((skill, i) => (
          <li key={i}>{skill}</li>
        ))}
      </ul>
    </>
  )}

  {skills.soft?.length > 0 && (
    <>
      <p className="font-medium text-sm mt-2">Soft Skills</p>
      <ul className="list-disc list-inside text-sm space-y-1">
        {skills.soft.map((skill, i) => (
          <li key={i}>{skill}</li>
        ))}
      </ul>
    </>
  )}
</div>

     <div>
          <h3 className="text-base font-semibold uppercase tracking-wide mb-1">
            Languages
          </h3>
          <ul className="list-disc list-inside text-sm space-y-1">
            {others.languages.map((lang, i) => (
              <li key={i}>{lang}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-base font-semibold uppercase tracking-wide mb-1">
            Hobbies
          </h3>
          <ul className="list-disc list-inside text-sm space-y-1">
            {others.hobbies.map((hobbie, i) => (
              <li key={i}>{hobbie}</li>
            ))}
          </ul>
        </div>
    </div>

      
       
       
 {/* Education */}
    <div className="space-y-6 mt-6">
      <div>
        <h3 className="text-lg font-semibold uppercase text-[#2f3542] border-b border-gray-200 pb-1">Education</h3>
        {qualification.map((edu, index) => (
          <div key={index} className="mt-2">
            <p className="font-bold text-sm">{edu.degree}</p>
            <p className="text-sm text-gray-600">{edu.institution}</p>
            <p className="text-xs text-[#ff6b6b] italic">{edu.year}</p>
            <p className="text-xs text-[#ff6b6b] italic">{edu.gradeOrPercentage}</p>

          </div>
        ))}
      </div>

      {/* Certifications */}
     <div>
  <h3 className="text-lg font-semibold uppercase text-[#2f3542] border-b border-gray-200 pb-1">
    Certifications
  </h3>
  <ul className="mt-2 space-y-2 text-sm list-disc list-inside">
    {certification.map((cert, i) => (
      <li key={i}>
        <span className="font-medium">{cert.title}</span>
        <span className="text-gray-600"> — {cert.authority}</span>
        <span className="text-purple-600 italic ml-1">({cert.year})</span>
      </li>
    ))}
  </ul>
</div>
    </div>
  </div>
</div>

  );
};

export default Theme4;
