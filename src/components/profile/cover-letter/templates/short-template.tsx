// import { format, parseISO } from "date-fns";
import { ResumeData } from "@/types/resume";

// const formatDate = (date: string) => {
//   if (!date) return "";
//   try {
//     return format(parseISO(date), "MMM yyyy");
//   } catch {
//     return date;
//   }
// };

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <h3 className="mb-4 bg-black-400 text-center text-lg font-bold uppercase text-white">
      {title}
    </h3>
  );
};

export const ShortTemplate = ({ data }: { data: ResumeData }) => {
  return (
    <div className="aspect-[210/297] h-fit w-full bg-white text-black-400">
      {/* Header Section */}
      <div className="flex flex-col gap-8 sm:flex-row">
        <div className="flex flex-1 flex-col items-start justify-center p-6 text-left">
          <h1 className="mb-1 text-center text-xl font-bold sm:text-left sm:text-2xl">
            {data.name}
          </h1>
          {data.profession && (
            <p className="mb-1 text-center text-sm font-[600] text-gray-600 sm:text-left">
              {data.profession}
            </p>
          )}
        </div>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* Header Section */}
        <div className="w-1/3 space-y-8 bg-gray-200 px-2">
          {/* Recipient Section */}
          <div className="my-2">
            <SectionTitle title="Contact" />
          </div>
        </div>

        <div className="flex-1 space-y-8 p-4">
          {/* Text Section */}
          <div>
            <SectionTitle title="Education" />
            <div className="space-y-4">Data</div>
          </div>
        </div>
      </div>
    </div>
  );
};
