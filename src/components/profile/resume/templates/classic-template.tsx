import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { IoLogoBehance } from "react-icons/io5";
import { Github } from "@/components/icons/github";
import { Linkedin } from "@/components/icons/linkedin";
import { ResumeData } from "@/types/resume";

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <h3 className="mb-4 bg-black-400 text-center text-lg font-bold uppercase text-white">
      {title}
    </h3>
  );
};

export const ClassicTemplate = ({ data }: { data: ResumeData }) => {
  return (
    <div className="h-[297mm] w-[210mm] bg-white text-black-400 shadow-lg">
      {/* Header Section */}
      <div className="flex flex-col gap-8 sm:flex-row">
        <div className="flex h-full min-h-[12rem] w-full items-center justify-center bg-gray-200 sm:w-1/3">
          {data.photo && (
            <div className="h-32 w-32 overflow-hidden rounded-full border-[0.7rem] border-white">
              <Image
                src={data.photo}
                width={100}
                height={100}
                alt={`${data.name}'s photo`}
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col items-start justify-center py-2 text-left">
          <h1 className="mb-1 text-center text-xl font-bold sm:text-left sm:text-2xl">
            {data.name}
          </h1>
          {data.profession && (
            <p className="mb-1 text-center text-sm font-[600] text-gray-600 sm:text-left">
              {data.profession}
            </p>
          )}
          {data.summary && (
            <p className="mt-4 text-sm text-gray-600">{data.summary}</p>
          )}
        </div>
      </div>

      <div className="flex h-[calc(297mm-12rem)]">
        {/* Left Column */}
        <div className="w-1/3 space-y-8 bg-gray-200 px-2">
          {/* Contact Section */}
          {(data.email || data.phone || data.location) && (
            <div className="my-2">
              <SectionTitle title="Contact" />
              <div className="space-y-6">
                {data.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 min-w-4 text-gray-600" />
                    <span className="text-sm">{data.email}</span>
                  </div>
                )}
                {data.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 min-w-4 text-gray-600" />
                    <span className="text-sm">{data.phone}</span>
                  </div>
                )}
                {data.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 min-w-4 text-gray-600" />
                    <span className="text-sm">{data.location}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Social Links */}
          {(data.linkedin || data.github || data.behance) && (
            <div>
              <SectionTitle title="Social" />
              <div className="space-y-6">
                {data.linkedin && (
                  <div className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4 min-w-4 text-gray-600" />
                    <span className="text-sm">{data.linkedin}</span>
                  </div>
                )}
                {data.github && (
                  <div className="flex items-center gap-2">
                    <Github className="h-4 w-4 min-w-4 text-gray-600" />
                    <span className="text-sm">{data.github}</span>
                  </div>
                )}
                {data.behance && (
                  <div className="flex items-center gap-2">
                    <IoLogoBehance className="h-4 w-4 min-w-4 text-gray-600" />
                    <span className="text-sm">{data.behance}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Skills Section */}
          {data.skills?.length > 0 && (
            <div>
              <SectionTitle title="Skills" />
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-gray-300 px-3 py-1 text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="flex-1 space-y-8 p-4">
          {/* Experience Section */}
          {data.workExperiences?.length > 0 && (
            <div>
              <SectionTitle title="Work Experience" />
              <div className="space-y-4">
                {data.workExperiences.map((exp, index) => (
                  <div key={index} className="space-y-1">
                    <h4 className="font-bold">{exp.position}</h4>
                    <p className="text-sm text-gray-600">
                      {exp.company} | {exp.startDate} - {exp.endDate}
                    </p>
                    <p className="text-sm">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education Section */}
          {data.education?.length > 0 && (
            <div>
              <SectionTitle title="Education" />
              <div className="space-y-4">
                {data.education.map((edu, index) => (
                  <div key={index} className="space-y-1">
                    <h4 className="font-bold">{edu.degree}</h4>
                    <p className="text-sm text-gray-600">
                      {edu.institution} | {edu.startDate} - {edu.endDate}
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
