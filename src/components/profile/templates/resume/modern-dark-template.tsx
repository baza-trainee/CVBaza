import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";

export const ModernDarkTemplate = () => {
  return (
    <div className="w-full max-w-4xl bg-white shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-6 bg-slate-800 p-6 text-white">
        <div className="h-24 w-24 overflow-hidden rounded-full">
          <Image
            src="/cat.jpg"
            width={100}
            height={100}
            alt="Profile"
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold">BAZA TRAINEE</h1>
          <p className="text-gray-300">MARKETING MANAGER</p>
        </div>
      </div>

      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-1/3 space-y-8 bg-gray-50 p-6">
          <section>
            <h2 className="mb-4 font-bold">CONTACT</h2>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@example.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+1 234 567 890</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>New York, USA</span>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 font-bold">SKILLS</h2>
            <ul className="space-y-1 text-sm">
              <li>Management</li>
              <li>Teamwork</li>
              <li>Time Management</li>
              <li>Leadership</li>
              <li>Written Communication</li>
              <li>Critical Thinking</li>
              <li>Digital Marketing</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 font-bold">LANGUAGES</h2>
            <ul className="space-y-1 text-sm">
              <li>English (Native)</li>
              <li>Spanish (Fluent)</li>
              <li>French (Basic)</li>
              <li>Korean Intermediate</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 font-bold">REFERENCE</h2>
            <div className="text-sm">
              <p className="font-medium">Estelle Perry</p>
              <p>Marketing Director</p>
              <p>Phone: 123-456-789</p>
              <p>Email: estelle@example.com</p>
            </div>
          </section>
        </div>

        {/* Main Content */}
        <div className="w-2/3 space-y-8 p-6">
          <section>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-white">
                <span className="text-sm">1</span>
              </div>
              <h2 className="font-bold">PROFILE</h2>
            </div>
            <p className="text-sm text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </section>

          <section>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-white">
                <span className="text-sm">2</span>
              </div>
              <h2 className="font-bold">WORK EXPERIENCE</h2>
            </div>
            <div className="space-y-4">
              {[
                {
                  title: "Marketing Manager & Specialist",
                  company: "Microsoft Studio",
                  period: "2020 - PRESENT",
                  duties: [
                    "Develop and execute international marketing strategies and campaigns",
                    "Lead a collaborative and results-driven team",
                    "Conduct market research to identify emerging trends",
                  ],
                },
                {
                  title: "Marketing Manager & Specialist",
                  company: "Fadget Studio",
                  period: "2018 - 2020",
                  duties: [
                    "Managed marketing campaigns across multiple channels",
                    "Analyzed campaign performance and optimized strategies",
                  ],
                },
              ].map((job, index) => (
                <div key={index} className="text-sm">
                  <div className="mb-1 flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{job.title}</h3>
                      <p className="text-gray-600">{job.company}</p>
                    </div>
                    <span className="text-gray-500">{job.period}</span>
                  </div>
                  <ul className="list-inside list-disc pl-2 text-gray-600">
                    {job.duties.map((duty, i) => (
                      <li key={i}>{duty}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-white">
                <span className="text-sm">3</span>
              </div>
              <h2 className="font-bold">EDUCATION</h2>
            </div>
            <div className="space-y-4">
              {[
                {
                  degree: "Master of Business Administration",
                  school: "School of Business, Harvard University",
                  period: "2018 - 2020",
                  gpa: "GPA: 3.8",
                },
                {
                  degree: "Bachelor of Business Management",
                  school: "School of Business, Stanford University",
                  period: "2014 - 2018",
                  gpa: "GPA: 3.9",
                },
              ].map((edu, index) => (
                <div key={index} className="text-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{edu.degree}</h3>
                      <p className="text-gray-600">{edu.school}</p>
                      <p className="text-gray-500">{edu.gpa}</p>
                    </div>
                    <span className="text-gray-500">{edu.period}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
