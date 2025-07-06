import { fallback } from "../../data/fallBack";
import { MdEmail, MdLocationPin, MdPhone } from "react-icons/md";

const Theme1 = ({ resume }) => {
  const basicInfo = resume.basicInfo || {};
  const work = resume.workExperience?.[0] || {};
  const education = resume.qualification?.[0] || {};
  const skills = resume.skills || {};
  const others = resume.others || {};
  const summary = resume.summary?.text || fallback.summary;

  return (
    <div className="flex w-[800px] border-2 border-gray-300 shadow-md min-h-fit bg-white rounded-md font-sans text-gray-800">
      {/* Left Sidebar */}
      <div className="w-1/3 bg-gradient-to-b from-[#d1d8e0] to-[#f5f6fa] text-[#2f3542] px-6 py-10 space-y-6">
        <div className="w-24 h-24 mx-auto rounded-full bg-white shadow flex items-center justify-center text-3xl font-bold text-[#576574]">
          {(basicInfo.name || fallback.name)[0]}
        </div>

        <div className="text-center">
          <h2 className="text-xl font-bold">
            {basicInfo.name || fallback.name}
          </h2>
          <p className="text-sm text-[#576574]">
            {basicInfo.designation || fallback.designation}
          </p>
        </div>

        <div className="text-sm space-y-2">
          <h3 className="text-base font-semibold uppercase tracking-wide">
            Contact
          </h3>
          <div className="flex items-center gap-2">
            <MdPhone className="text-[#636e72]" />
            <span>{basicInfo.mobile || fallback.mobile}</span>
          </div>
          <div className="flex items-center gap-2">
            <MdEmail className="text-[#636e72]" />
            <span className="break-all">
              {basicInfo.email || fallback.email}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MdLocationPin className="text-[#636e72]" />
            <span>{basicInfo.location || fallback.location}</span>
          </div>
        </div>

        <div>
          <h3 className="text-base font-semibold uppercase tracking-wide mb-1">
            Skills
          </h3>
          <ul className="list-disc list-inside text-sm space-y-1">
            {(skills.technical?.length
              ? skills.technical
              : fallback.skills
            ).map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-base font-semibold uppercase tracking-wide mb-1">
            Languages
          </h3>
          <ul className="list-disc list-inside text-sm space-y-1">
            {(others.languages?.length
              ? others.languages
              : fallback.languages
            ).map((lang, i) => (
              <li key={i}>{lang}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-base font-semibold uppercase tracking-wide mb-1">
            Hobbies
          </h3>
          <ul className="list-disc list-inside text-sm space-y-1">
            {(others.hobbies?.length
              ? others.hobbies
              : fallback.hobbies
            ).map((hobbie, i) => (
              <li key={i}>{hobbie}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Main Section */}
      <div className="w-2/3 bg-[#ffffff] p-10 space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-[#2f3542] tracking-tight">
            {basicInfo.name || fallback.name}
          </h1>
          <p className="text-[#ff6b6b] font-medium text-sm">
            {basicInfo.designation || fallback.designation}
          </p>
          <p className="text-sm text-gray-700 mt-2 whitespace-pre-line">
            {summary}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold uppercase text-[#2f3542] border-b border-gray-200 pb-1">
            Experience
          </h3>
          <h4 className="font-bold mt-2">{work.role || fallback.work.role}</h4>
          <p className="text-sm text-gray-600">
            {work.company || fallback.work.company} •{" "}
            {work.duration || fallback.work.duration}
          </p>
          <ul className="list-disc ml-5 mt-1 space-y-1 text-sm text-gray-700">
            {(Array.isArray(work.description) && work.description.length > 0
              ? work.description
              : fallback.work.description
            ).map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold uppercase text-[#2f3542] border-b border-gray-200 pb-1">
            Education
          </h3>
          <p className="font-bold mt-2 text-sm">
            {education.degree || fallback.education.degree}
          </p>
          <p className="text-sm text-gray-600">
            {education.institution || fallback.education.institution}
          </p>
          <p className="text-xs text-[#ff6b6b] italic">
            {education.year || fallback.education.year}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Theme1;
