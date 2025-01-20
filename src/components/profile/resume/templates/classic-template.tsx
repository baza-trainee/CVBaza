import Image from "next/image";
import { format, parseISO } from "date-fns";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaBehance, FaDribbble, FaTelegram } from "react-icons/fa";
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
  return (
    <h3 className="mb-4 bg-black-400 text-center text-lg font-bold uppercase text-white">
      {title}
    </h3>
  );
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
          <Icon className="h-4 w-4 min-w-4 text-gray-600" />
          <span className="text-[13px]">{text}</span>
        </a>
      ) : (
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 min-w-4 text-gray-600" />
          <span className="text-[13px]">{text}</span>
        </div>
      )}
    </>
  );
};

export const ClassicTemplate = ({ data }: { data: ResumeData }) => {
  console.log(data);
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
                {data.phone && <ContactItem icon={Phone} text={data.phone} />}
                {data.location && (
                  <ContactItem icon={MapPin} text={data.location} />
                )}
                {data.email && (
                  <ContactItem
                    icon={Mail}
                    text={data.email}
                    isLink={true}
                    link={`mailto:${data.email}`}
                  />
                )}
                {data.telegram && (
                  <ContactItem
                    icon={FaTelegram}
                    text="Telegram"
                    isLink={true}
                    link={data.telegram}
                  />
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
                  <ContactItem
                    icon={Linkedin}
                    text="Linkedin"
                    isLink={true}
                    link={data.linkedin}
                  />
                )}
                {data.github && (
                  <ContactItem
                    icon={Github}
                    text="Github"
                    isLink={true}
                    link={data.github}
                  />
                )}
                {data.behance && (
                  <ContactItem
                    icon={FaBehance}
                    text="Behance"
                    isLink={true}
                    link={data.behance}
                  />
                )}
                {data.dribbble && (
                  <ContactItem
                    icon={FaDribbble}
                    text="Dribbble"
                    isLink={true}
                    link={data.dribbble}
                  />
                )}
                {data.adobePortfolio && (
                  <ContactItem
                    icon={SiAdobeacrobatreader}
                    text="Adobe Portfolio"
                    isLink={true}
                    link={data.adobePortfolio}
                  />
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
                    className="rounded-md bg-gray-300 px-2 py-1 text-[13px]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages Section */}
          {data.languages?.length > 0 && (
            <div>
              <SectionTitle title="Languages" />
              <div className="space-y-2">
                {data.languages.map((language, index) => (
                  <div key={index} className="flex justify-between text-[13px]">
                    <span>{language.name}</span>
                    <span className="text-gray-600">{language.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="flex-1 space-y-8 p-4">
          {/* Experience Section */}
          {data.workExperiences?.length ? (
            <div>
              <SectionTitle title="Work Experience" />
              <div className="space-y-4">
                {data.workExperiences.map((exp, index) => (
                  <div key={index} className="space-y-1">
                    <h4 className="font-bold">{exp.position}</h4>
                    {exp.company && (
                      <p className="text-sm text-gray-600">
                        {exp.company} | {formatDate(exp.startDate as string)} -{" "}
                        {formatDate(exp.endDate as string)}
                      </p>
                    )}
                    <p className="text-sm">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {/* Education Section */}
          {data.educations?.length > 0 && (
            <div>
              <SectionTitle title="Education" />
              <div className="space-y-4">
                {data.educations.map((edu, index) => (
                  <div key={index} className="space-y-1">
                    <h4 className="font-bold">{edu.degree}</h4>
                    {edu.institution && (
                      <p className="text-sm text-gray-600">
                        {edu.institution} |{" "}
                        {formatDate(edu.startDate as string)} -{" "}
                        {formatDate(edu.endDate as string)}
                      </p>
                    )}
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
