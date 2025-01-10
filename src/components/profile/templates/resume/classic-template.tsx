import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";

export const ClassicTemplate = () => {
  return (
    <div className="w-full max-w-4xl bg-white shadow-lg">
      {/* Header Section */}
      <div className="flex gap-8 p-8">
        <div className="h-32 w-32 overflow-hidden rounded-full bg-gray-200">
          <Image
            src="/cat.jpg"
            width={100}
            height={100}
            alt="Profile"
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h1 className="mb-1 text-4xl font-bold">BAZA</h1>
          <h2 className="mb-4 text-2xl text-gray-600">TRAINEE</h2>
          <p className="text-gray-600">Art Director</p>
        </div>
      </div>

      <div className="flex">
        {/* Left Column */}
        <div className="w-1/3 bg-gray-50 p-6">
          {/* Contact Section */}
          <div className="mb-8">
            <h3 className="mb-4 text-lg font-bold text-gray-800">CONTACT</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-600" />
                <span className="text-sm">email@example.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-600" />
                <span className="text-sm">+1 234 567 890</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-600" />
                <span className="text-sm">New York, USA</span>
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div className="mb-8">
            <h3 className="mb-4 text-lg font-bold text-gray-800">EDUCATION</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Bachelor of Design</h4>
                <p className="text-sm text-gray-600">Woodrow University</p>
                <p className="text-sm text-gray-500">2015-2019</p>
              </div>
              <div>
                <h4 className="font-medium">Bachelor in Design</h4>
                <p className="text-sm text-gray-600">Woodrow University</p>
                <p className="text-sm text-gray-500">2015-2019</p>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-800">SKILLS</h3>
            <div className="space-y-3">
              {[
                "Web Design",
                "UI/UX",
                "Graphic Design",
                "SEO",
                "Marketing",
                "Branding",
              ].map((skill) => (
                <div key={skill} className="flex items-center gap-2">
                  <div className="flex-1">{skill}</div>
                  <div className="h-2 w-24 rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-gray-600"
                      style={{ width: "80%" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-2/3 p-6">
          {/* Work Experience Section */}
          <div className="mb-8">
            <h3 className="mb-4 text-lg font-bold text-gray-800">
              WORK EXPERIENCE
            </h3>
            <div className="space-y-6">
              {[2019, 2017, 2015, 2013].map((year) => (
                <div key={year} className="border-l-2 border-gray-200 pl-4">
                  <div className="flex items-start justify-between">
                    <h4 className="font-medium">SENIOR GRAPHIC DESIGNER</h4>
                    <span className="text-sm text-gray-500">
                      {year} - {year + 2}
                    </span>
                  </div>
                  <p className="mb-1 text-sm text-gray-600">FADGET STUDIO</p>
                  <p className="text-sm text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* References Section */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-800">REFERENCES</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium">Estelle Darcy</h4>
                <p className="text-sm text-gray-600">Senior Designer</p>
                <p className="text-sm text-gray-500">+123 456 789</p>
              </div>
              <div>
                <h4 className="font-medium">Margaret Roseau</h4>
                <p className="text-sm text-gray-600">Art Director</p>
                <p className="text-sm text-gray-500">+123 456 789</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
