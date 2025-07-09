import { useSelector } from "react-redux";

import { fallback } from "../../data/fallBack";
import { MdEmail, MdLocationPin, MdPhone } from "react-icons/md";

const Theme2 = () => {
  const resume = useSelector((state) => state.resume.currentResume);

 const basicInfo = resume.basicInfo?.name ? resume.basicInfo : fallback.basicInfo;
  const skills = resume.skills?.technical?.length
    ? resume.skills
    : fallback.skills;
  const others = resume.others?.languages?.length
    ? resume.others
    : fallback.others;
  const summary = resume.summary || fallback.summary;
  // const workExperience = resume.workExperience?.length
  //   ? resume.workExperience
  //   : fallback.workExperience;
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
  <div className="
  w-full max-w-[800px]
  p-4 sm:p-6
  border-[2px] border-gray-300
  shadow-md bg-white rounded-md
  font-sans text-gray-800 space-y-8
  mx-auto
  print:w-[800px] print:shadow-none print:border-none
">
  
  {/* Header */}
       <div className="text-center border-b pb-4">
    <h1 className="text-2xl sm:text-4xl font-bold uppercase">{basicInfo?.name}</h1>
    <h2 className="text-lg sm:text-xl text-pink-600 font-medium">{basicInfo?.designation}</h2>
  </div>


       {/* Grid Info */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 border-b pb-6">
    <div>
      <h3 className="font-semibold text-gray-700 mb-1">Contact</h3>
      {/* <p className="text-sm">{basicInfo.email}</p> */}
      <div className="flex items-center gap-2">
            <MdPhone className="text-[#636e72]" />
            <span>{basicInfo.mobile}</span>
          </div>
      {/* <p className="text-sm">{basicInfo.mobile}</p>
      <p className="text-sm">{basicInfo.location}</p> */}
      <div className="flex items-center gap-2">
            <MdEmail className="text-[#636e72]" />
            <span className="break-all">{basicInfo.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <MdLocationPin className="text-[#636e72]" />
            <span>{basicInfo.location}</span>
          </div>
    </div>
   

        <div>
      <h3 className="text-base font-semibold uppercase tracking-wide mb-1">Skills</h3>
      <ul className="list-disc list-inside text-sm space-y-1">
        {skills.technical.map((skill, i) => <li key={i}>{skill}</li>)}
      </ul>
    </div>


          <div>
      <h3 className="text-base font-semibold uppercase tracking-wide mb-1">Languages</h3>
      <ul className="list-disc list-inside text-sm space-y-1">
        {others.languages.map((lang, i) => <li key={i}>{lang}</li>)}
      </ul>
    </div>
  </div>

      <div className=" bg-[#ffffff]  space-y-8">
        <div>
          <p className="text-2xl font-bold text-[#2f3542] tracking-tight">
            Profile
          </p>
          
          <p className="text-sm text-gray-700 mt-2 whitespace-pre-line">
            {summary}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold uppercase text-[#2f3542] border-b border-gray-200 pb-1">
            Experience
          </h3>
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
  <ul className="mt-2 space-y-2 text-sm list-disc list-inside">
    {certifications.map((cert, i) => (
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
  );
};

export default Theme2;
