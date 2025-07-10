import { useSelector } from "react-redux";
import { fallback } from "../../data/fallBack";

import { MdEmail, MdLocationPin, MdPhone } from "react-icons/md";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Theme1 = () => {
  const resume = useSelector((state) => state.resume.currentResume);

  const basicInfo = resume.basicInfo?.name
    ? resume.basicInfo
    : fallback.basicInfo;
  const skills = resume.skills?.technical?.length
    ? resume.skills
    : fallback.skills;
  const others = resume.others?.languages?.length
    ? resume.others
    : fallback.others;
  const summary = resume.summary || fallback.summary;

  const workExperience = resume.workExperience?.some(
    (exp) => exp.company || exp.position || exp.description
  )
    ? resume.workExperience
    : fallback.workExperience;

  const qualification = resume.qualification?.some(
    (qua) => qua.degree || qua.institution || qua.year || qua.gradeOrPercentage
  )
    ? resume.qualification
    : fallback.qualification;

  const certification = resume.certification?.some(
    (cert) => cert.title || cert.authority || cert.year
  )
    ? resume.certification
    : fallback.certification;

  console.log("Using fallback?", !resume.qualification?.length);
  console.log("qualification:", qualification);

  return (
    <div
      className="
  flex flex-col lg:flex-row
  w-full max-w-[800px]
  border-2 border-gray-300 shadow-md min-h-fit
  bg-white rounded-md font-sans text-gray-800 overflow-hidden
  mx-auto
  print:flex-row print:w-[800px] print:shadow-none print:border-none
"
    >
      {/* Left Sidebar */}
      <div
        className="
  w-full lg:w-1/3
  bg-gradient-to-b from-[#d1d8e0] to-[#f5f6fa]
  text-[#2f3542] px-6 py-8 sm:py-10 space-y-6
  print:w-1/3
"
      >
        <div className="w-24 h-24 mx-auto rounded-full bg-white shadow flex items-center justify-center text-3xl font-bold text-[#576574]">
          {(basicInfo?.name || "A")[0]}
        </div>

        <div className="text-sm space-y-2">
          <h3 className="text-base font-semibold uppercase tracking-wide">
            Contact
          </h3>
          <div className="flex items-center gap-2">
            <MdPhone className="text-[#636e72]" />
            <span>{basicInfo.mobile}</span>
          </div>
          <div className="flex items-center gap-2">
            <MdEmail className="text-[#636e72]" />
            <span className="break-all">{basicInfo.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <MdLocationPin className="text-[#636e72]" />
            <span>{basicInfo.location}</span>
          </div>
          {basicInfo.linkedin && (
            <div className="flex gap-2">
              <FaLinkedin className="text-[#636e72] mt-1" />
              <a
                href={basicInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="underline  break-all"
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
                className="underline break-all "
              >
                {basicInfo.github}
              </a>
            </div>
          )}
        </div>
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

      {/* Right Content */}
      <div className="w-full lg:w-2/3 bg-white p-4 sm:p-6 md:p-10 space-y-8 print:w-2/3">
        <div>
          <h1 className="text-3xl font-extrabold text-[#2f3542] tracking-tight">
            {basicInfo?.name}
          </h1>
          <p className="text-[#ff6b6b] font-medium text-sm">
            {basicInfo?.designation}
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
          {qualification.map((edu, index) => (
            <div key={index} className="mt-2">
              <p className="font-bold text-sm">{edu.degree}</p>
              <p className="text-sm text-gray-600">{edu.institution}</p>
              <p className="text-xs text-[#ff6b6b] italic">{edu.year}</p>
              <p className="text-xs text-[#ff6b6b] italic">
                {edu.gradeOrPercentage}
              </p>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-lg font-semibold uppercase text-[#2f3542] border-b border-gray-200 pb-1">
            Certifications
          </h3>
          <ul className="mt-2 space-y-2 text-sm list-disc list-inside">
            {certification.map((cert, i) => (
              <li key={i}>
                <span className="font-medium">{cert.title}</span>
                <span className="text-gray-600"> — {cert.authority}</span>
                <span className="text-purple-600 italic ml-1">
                  ({cert.year})
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Theme1;
