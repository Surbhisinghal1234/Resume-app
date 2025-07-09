
import { useSelector } from "react-redux";
import { fallback } from "../../data/fallBack";
import { MdEmail, MdLocationPin, MdPhone } from "react-icons/md";

const Theme3 = () => {
  const resume = useSelector((state) => state.resume.currentResume);

  const basicInfo = resume.basicInfo?.name ? resume.basicInfo : fallback.basicInfo;
  const skills = resume.skills?.technical?.length ? resume.skills : fallback.skills;
  const others = resume.others?.languages?.length ? resume.others : fallback.others;
  const summary = resume.summary || fallback.summary;
  const workExperience = resume.workExperience?.some(
    (exp) => exp.company || exp.position || exp.description
  )
    ? resume.workExperience
    : fallback.workExperience;
  const education = resume.education?.length ? resume.education : fallback.education;
  const certifications = resume.certifications?.length ? resume.certifications : fallback.certifications;

  return (
    <div className="w-full max-w-5xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden font-sans text-zinc-950 print:shadow-none print:border-none print:max-w-[800px]">
      {/* Header Section */}
      <div className="bg-[#2f3542] text-white py-8 px-6 sm:px-10 text-center">
        <h1 className="text-4xl font-bold uppercase">{basicInfo.name}</h1>
        <p className="text-lg italic text-[#ff6b6b]">{basicInfo.designation}</p>
        <p className="text-sm mt-2 max-w-3xl mx-auto whitespace-pre-line">{summary}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3">
        {/* Sidebar */}
        <div className="bg-[#f1f2f6] py-8 px-6 space-y-6">
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-[#2f3542] mb-2">Contact</h3>
            <div className="text-sm space-y-2">
              <div className="flex items-center gap-2">
                <MdPhone /> <span>{basicInfo.mobile}</span>
              </div>
              <div className="flex items-center gap-2">
                <MdEmail /> <span className="break-all">{basicInfo.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <MdLocationPin /> <span>{basicInfo.location}</span>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-lg font-semibold text-[#2f3542] mb-2">Skills</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {skills.technical.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </div>

          {/* Languages */}
          <div>
            <h3 className="text-lg font-semibold text-[#2f3542] mb-2">Languages</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {others.languages.map((lang, i) => (
                <li key={i}>{lang}</li>
              ))}
            </ul>
          </div>

          {/* Hobbies */}
          <div>
            <h3 className="text-lg font-semibold text-[#2f3542] mb-2">Hobbies</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {others.hobbies.map((hobby, i) => (
                <li key={i}>{hobby}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 py-8 px-6 space-y-8">
          {/* Experience */}
          <div>
            <h2 className="text-xl font-bold text-[#2f3542] border-b border-gray-300 pb-2 mb-4">Experience</h2>
            {workExperience.map((exp, i) => (
              <div key={i} className="mb-4">
                <h3 className="text-md font-semibold">{exp.position}</h3>
                <p className="text-sm text-gray-600">
                  {exp.company} | {exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate}
                </p>
                <p className="text-sm mt-1 whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xl font-bold text-[#2f3542] border-b border-gray-300 pb-2 mb-4">Education</h2>
            {education.map((edu, i) => (
              <div key={i} className="mb-3">
                <p className="font-semibold text-sm">{edu.degree}</p>
                <p className="text-sm text-gray-600">{edu.institution}</p>
                <p className="text-xs italic text-[#ff6b6b]">{edu.year}</p>
              </div>
            ))}
          </div>

          {/* Certifications */}
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
    </div>
  );
};

export default Theme3;