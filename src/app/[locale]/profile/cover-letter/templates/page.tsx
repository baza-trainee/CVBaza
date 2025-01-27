// import { ClassicTemplate } from "@/components/profile/resume/templates/classic-template";
import { ShortTemplate } from "@/components/profile/cover-letter/templates/short-template";

// import { Templates } from "@/components/profile/resume/templates";

const LetterTemplatesPage = () => {
  const data = {
    title: "My Cover Letter",
    name: "Джон Доу",
    profession: "Інженер програмного забезпечення",
    position: "Старший інженер програмного забезпечення",
    company: "Google",
    location: "Київ, Україна",
    phone: "+380 XX XXX XXXX",
    email: "john@example.com",
    nameRecipient: "Бос Бос",
    positionRecipient: "Інженер",
    text: "summary summary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summary summary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary",
    template: "short",
  };
  // const data = {
  //   title: "title",
  //   name: "name",
  //   profession: "profession",
  //   email: "email",
  //   phone: "phone",
  //   location: "location",
  //   address: "address",
  //   github: "github",
  //   linkedin: "linkedin",
  //   behance: "behance",
  //   telegram: "telegram",
  //   dribbble: "dribbble",
  //   adobePortfolio: "adobePortfolio",
  //   skills: ["skills", "skills"],
  //   educations: ["educations", "educations"],
  //   education: [
  //     {
  //       institution: "string",
  //       degree: "string",
  //       startDate: "string",
  //       endDate: "string",
  //     },
  //   ],
  //   workExperiences: [{ description: "string" }],
  //   languages: [{ language: "languages" }],
  //   summary:
  //     "summary summary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary summarysummarysummary ",
  //   template: "classic",
  // };

  // return <Templates />;
  return <ShortTemplate data={data} />;
  // return <ClassicTemplate data={data} />;
};

export default LetterTemplatesPage;
