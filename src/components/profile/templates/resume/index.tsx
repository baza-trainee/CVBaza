import { ClassicTemplate } from "./classic-template";
import { ModernDarkTemplate } from "./modern-dark-template";

const templates = [
  {
    id: 1,
    name: "Classic Template",
    component: ClassicTemplate,
  },
  {
    id: 2,
    name: "Modern Dark",
    component: ModernDarkTemplate,
  },
  {
    id: 3,
    name: "Modern Dark",
    component: ModernDarkTemplate,
  },
];

export const ResumeTemplates = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-[1600px]">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">
          Resume Templates
        </h1>
        <div className="grid auto-rows-fr grid-cols-1 gap-8 md:grid-cols-2 2xl:grid-cols-3">
          {templates.map((template) => (
            <div
              key={template.id}
              className="rounded-lg bg-white p-4 shadow-md transition-shadow duration-200 hover:shadow-lg"
            >
              <div className="mb-3">
                <h2 className="text-lg font-semibold text-gray-700">
                  {template.name}
                </h2>
              </div>
              <div className="transform transition-transform duration-200 hover:scale-[0.98]">
                <template.component />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
