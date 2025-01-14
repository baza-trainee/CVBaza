import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaRegCircle, FaUserCircle } from "react-icons/fa";
import { IoLogoBehance } from "react-icons/io5";
import { LuGraduationCap } from "react-icons/lu";
import { MdOutlineWorkOutline } from "react-icons/md";
import { Github } from "@/components/icons/github";
import { Linkedin } from "@/components/icons/linkedin";
import { ResumeData } from "@/types/resume";

const SectionTitle = ({ title }: { title: string }) => {
  return <h3 className="text-lg font-bold text-blue-800">{title}</h3>;
};

export const ModernDarkTemplate = ({ data }: { data: ResumeData }) => {
  return (
    <div className="flex h-[297mm] w-[210mm] flex-col bg-white">
      {/* Header */}
      <div className="flex flex-col gap-2 bg-blue-900 p-8 text-white">
        <div className="flex items-center gap-4">
          {data.photo && (
            <div className="relative h-32 w-32 translate-x-[20%] translate-y-[60%] overflow-hidden rounded-full border-4 border-white">
              <Image
                src={data.photo}
                alt={data.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="flex flex-1 flex-col items-center justify-center text-left">
            <h1 className="text-3xl font-bold">{data.name}</h1>
            <p className="text-xl">{data.profession}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Left Column */}
        <div className="w-1/3 space-y-6 bg-gray-100 p-8">
          {/* Contact Info */}
          {data.email ||
            data.phone ||
            (data.location && (
              <div className="mt-6">
                <SectionTitle title="Contact" />
                <div className="mt-4 space-y-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 min-w-4" />
                    <span className="text-sm">
                      {data.email ? data.email : "-"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 min-w-4" />
                    <span className="text-sm">
                      {data.phone ? data.phone : "-"}{" "}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 min-w-4" />
                    <span className="text-sm">
                      {data.location ? data.location : "-"}
                    </span>
                  </div>
                  {data.github && (
                    <a
                      href={data.github ? data.github : "#"}
                      target="_blank"
                      className="flex items-center gap-2"
                    >
                      <Github className="h-4 w-4 min-w-4" />
                      <span className="text-sm">GitHub</span>
                    </a>
                  )}
                  {data.linkedin && (
                    <a
                      href={data.linkedin ? data.linkedin : "#"}
                      target="_blank"
                      className="flex items-center gap-2"
                    >
                      <Linkedin className="h-4 w-4 min-w-4" />
                      <span className="text-sm">LinkedIn</span>
                    </a>
                  )}
                  {data.behance && (
                    <a
                      href={data.behance ? data.behance : "#"}
                      target="_blank"
                      className="flex items-center gap-2"
                    >
                      <IoLogoBehance className="h-4 w-4 min-w-4" />
                      <span className="text-sm">Behance</span>
                    </a>
                  )}
                </div>
              </div>
            ))}

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <div>
              <SectionTitle title="Skills" />
              <div className="mt-4 space-y-2">
                {data.skills.slice(0, 8).map((skill, i) => (
                  <div key={i} className="text-sm">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <div>
              <SectionTitle title="Languages" />
              <div className="mt-4 space-y-2">
                {data.languages.map((language) => (
                  <div key={language.id}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{language.name}</span>
                      <span className="text-sm text-gray-600">
                        {language.level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="w-3/5 space-y-6 px-4 pt-8">
          {/* Profile Section */}
          {data.summary && (
            <div className="relative z-0 mb-8 border-l border-l-blue-800 pl-6">
              <FaUserCircle className="absolute left-[-1rem] top-0 z-30 bg-white text-3xl" />
              <SectionTitle title="Profile" />
              <FaRegCircle className="absolute left-[-0.5rem] top-[50%] bg-white text-sm" />
              <hr className="mb-4 border border-blue-800" />
              <p className="text-sm text-gray-600">{data.summary}</p>
            </div>
          )}

          {/* Work Experience Section */}
          {data.workExperiences && (
            <div className="relative z-0 mb-8 border-l border-l-blue-800 pl-6">
              <MdOutlineWorkOutline className="absolute left-[-1rem] top-0 z-30 rounded-full bg-blue-800 p-1 text-3xl text-white" />
              <SectionTitle title="Work Experience" />
              <FaRegCircle className="absolute left-[-0.5rem] top-[50%] bg-white text-sm" />
              <hr className="mb-4 border border-blue-800" />
              <div className="space-y-6">
                {data.workExperiences.slice(0, 2).map((exp) => (
                  <div key={exp.id}>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                      <h4 className="font-medium">{exp.position}</h4>
                      <span className="mt-1 text-sm text-gray-500 sm:mt-0">
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>
                    <p className="mb-1 text-sm font-[500] text-gray-600">
                      {exp.company}
                    </p>
                    <p className="text-sm text-gray-500">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education Section */}
          {data.education && (
            <div className="relative z-0 mb-8 border-l border-l-blue-800 pl-6">
              <LuGraduationCap className="absolute left-[-1rem] top-0 z-30 rounded-full bg-blue-800 text-3xl text-white" />
              <SectionTitle title="Education" />
              <FaRegCircle className="absolute left-[-0.5rem] top-[50%] bg-white text-sm" />
              <hr className="mb-4 border border-blue-800" />
              <div className="space-y-4">
                {data.education.map((edu) => (
                  <div key={edu.id}>
                    <h4 className="font-medium">{edu.degree}</h4>
                    <p className="text-sm text-gray-600">{edu.institution}</p>
                    <p className="text-sm text-gray-500">
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
