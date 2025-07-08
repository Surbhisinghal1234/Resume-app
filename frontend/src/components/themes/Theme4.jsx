import { useSelector } from "react-redux";

import { fallback } from "../../data/fallBack";
import { MdEmail, MdLocationPin, MdPhone } from "react-icons/md";

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
  const education = resume.education?.length
    ? resume.education
    : fallback.education;
  const certifications = resume.certifications?.length
    ? resume.certifications
    : fallback.certifications;
    


  return (
    <div className="w-[800px]  border-[2px] border-gray-300 shadow-md  min-h-fit bg-white rounded-md font-sans text-gray-800 space-y-8">
     
      <div className="bg-gray-800 text-white rounded-t-md p-6 shadow">
        <h1 className="text-4xl font-bold uppercase">
          {basicInfo?.name } 
        </h1>
        <h2 className="text-xl text-pink-600 font-medium">
          {basicInfo?.designation}
        </h2>

        <div className="text-sm mt-2" >{basicInfo.email} &nbsp; | &nbsp; {basicInfo.mobile} &nbsp; | &nbsp; {basicInfo.email}</div>
      </div>

      <div className="bg-white shadow p-6">
        {/* Summary */}
        <div className="border-b pb-4 mb-4">
          <h2 className="text-lg font-bold mb-2 text-gray-900 uppercase">
            Professional Summary
          </h2>
         <p> {summary} </p>
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
                {exp.company} • {exp.startDate} -{" "}
                {exp.currentlyWorking ? "Present" : exp.endDate}
              </p>
              <p className="text-sm mt-1 whitespace-pre-line">
                {exp.description}
              </p>
            </div>
          ))}
        </div>

      <div className="grid grid-cols-3 gap-6 border-b pb-6">
             
   
       <div>
          <h3 className="text-base font-semibold uppercase tracking-wide mb-1">
            Skills
          </h3>
          <ul className="list-disc list-inside text-sm space-y-1">
            {skills.technical.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
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
        </div>

      <div className=" bg-[#ffffff]  space-y-8">
       
       

        <div>
          <h3 className="text-lg font-semibold uppercase text-[#2f3542] border-b border-gray-200 pb-1">
            Education
          </h3>
          {education.map((edu, index) => (
            <div key={index} className="mt-2">
              <p className="font-bold text-sm">{edu.degree}</p>
              <p className="text-sm text-gray-600">{edu.institution}</p>
              <p className="text-xs text-[#ff6b6b] italic">{edu.year}</p>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-lg font-semibold uppercase text-[#2f3542] border-b border-gray-200 pb-1">
            Certifications
          </h3>
          <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
            {certifications.map((cert, i) => (
              <li key={i}>{cert}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </div>

  );
};

export default Theme4;
