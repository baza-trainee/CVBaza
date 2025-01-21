import Image from "next/image";
import { format, parseISO } from "date-fns";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  FaDribbble,
  FaRegCircle,
  FaTelegram,
  FaUserCircle,
} from "react-icons/fa";
import { IoLogoBehance } from "react-icons/io5";
import { LuGraduationCap } from "react-icons/lu";
import { MdOutlineWorkOutline } from "react-icons/md";
import { SiAdobeacrobatreader } from "react-icons/si";
import { Github } from "@/components/icons/github";
import { Linkedin } from "@/components/icons/linkedin";
import { ResumeData } from "@/types/resume";

const formatDate = (date: string) => {
  if (!date) return "";
  try {
    return format(parseISO(date), "MMM yyyy");
  } catch {
    return date;
  }
};

const SectionTitle = ({ title }: { title: string }) => {
  return <h3 className="text-lg font-bold text-blue-800">{title}</h3>;
};
const ContactItem = ({
  icon: Icon,
  text,
  link,
  isLink = false,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  text: string;
  link?: string;
  isLink?: boolean;
}) => {
  return (
    <>
      {isLink ? (
        <a href={link} className="flex items-center gap-2">
          <Icon className="h-4 w-4 min-w-4" />
          <span className="text-[12px]">{text}</span>
        </a>
      ) : (
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 min-w-4" />
          <span className="text-[12px]">{text}</span>
        </div>
      )}
    </>
  );
};

export const ModernDarkTemplate = ({ data }: { data: ResumeData }) => {
  return (
    <div className="flex h-full w-full flex-col bg-white">
      {/* Header */}
      <div className="flex h-[8rem] flex-col gap-2 bg-blue-900 p-8 text-white">
        <div className="flex items-start gap-4">
          {data.photo && (
            <div className="relative h-32 w-32 translate-y-[40%] overflow-hidden rounded-full border-4 border-white">
              <Image
                src={data.photo}
                alt={data.name}
                width={128}
                height={128}
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <div className="flex flex-1 flex-col items-center justify-center text-left">
            <h1 className="text-3xl font-bold">{data.name}</h1>
            <p className="text-xl">{data.profession}</p>
          </div>
        </div>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* Left Column */}
        <div className="w-1/3 bg-gray-100 px-2">
          {/* Contact Info */}
          {(data.email || data.phone || data.location) && (
            <div className="mt-[6rem]">
              <SectionTitle title="Contact" />
              <div className="mt-4 space-y-4">
                {data.email && (
                  <ContactItem
                    icon={Mail}
                    text={data.email}
                    link={`mailto:${data.email}`}
                    isLink
                  />
                )}
                {data.phone && <ContactItem icon={Phone} text={data.phone} />}
                {data.location && (
                  <ContactItem icon={MapPin} text={data.location} />
                )}
                {data.telegram && (
                  <ContactItem
                    icon={FaTelegram}
                    text={data.telegram}
                    link={data.telegram}
                    isLink
                  />
                )}
                {data.github && (
                  <ContactItem
                    icon={Github}
                    text="Github"
                    link={data.github}
                    isLink
                  />
                )}
                {data.linkedin && (
                  <ContactItem
                    icon={Linkedin}
                    text="Linkedin"
                    link={data.linkedin}
                    isLink
                  />
                )}
                {data.behance && (
                  <ContactItem
                    icon={IoLogoBehance}
                    text="Behance"
                    link={data.behance}
                    isLink
                  />
                )}
                {data.dribbble && (
                  <ContactItem
                    icon={FaDribbble}
                    text="Dribbble"
                    link={data.dribbble}
                    isLink
                  />
                )}
                {data.adobePortfolio && (
                  <ContactItem
                    icon={SiAdobeacrobatreader}
                    text="Adobe Portfolio"
                    link={data.adobePortfolio}
                    isLink
                  />
                )}
              </div>
            </div>
          )}

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <div className="mt-4">
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
                {data.languages.map((language, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{language.language}</span>
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
                    <div className="flex flex-col sm:items-start sm:justify-between">
                      <h4 className="whitespace-nowrap font-medium">
                        {exp.company}
                      </h4>
                      <p className="mb-1 text-sm font-[500] text-gray-600">
                        {exp.position}
                      </p>
                      {exp.company && (
                        <span className="mt-1 text-[12px] text-gray-700 sm:mt-0">
                          {formatDate(exp.startDate as string)} -{" "}
                          {formatDate(exp.endDate as string)}
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-gray-500">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education Section */}
          {data.educations && data.educations.length > 0 && (
            <div className="relative z-0 mb-8 border-l border-l-blue-800 pl-6">
              <LuGraduationCap className="absolute left-[-1rem] top-0 z-30 rounded-full bg-blue-800 p-1 text-3xl text-white" />
              <SectionTitle title="Education" />
              <FaRegCircle className="absolute left-[-0.5rem] top-[50%] bg-white text-sm" />
              <hr className="mb-4 border border-blue-800" />
              <div className="space-y-6">
                {data.educations.map((edu, i) => (
                  <div key={i}>
                    <div className="flex flex-col sm:items-start sm:justify-between">
                      <h4 className="font-medium">{edu.institution}</h4>
                      <p className="text-sm text-gray-600">{edu.degree}</p>
                      <span className="mt-1 text-[12px] text-gray-700 sm:mt-0">
                        {formatDate(edu.startDate as string)} -{" "}
                        {formatDate(edu.endDate as string)}
                      </span>
                    </div>
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
