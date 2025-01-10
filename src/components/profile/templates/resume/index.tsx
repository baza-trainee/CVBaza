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
      <div className="max-w-[1600px] mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Resume Templates</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8 auto-rows-fr">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <div className="mb-3">
                <h2 className="text-lg font-semibold text-gray-700">{template.name}</h2>
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
