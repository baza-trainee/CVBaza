import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { BsStars } from "react-icons/bs";
import { toast } from "sonner";
import { generateTextGemini } from "@/app/actions/generate-text-gemini";
import { useResumeData } from "@/components/profile/resume/hooks/use-resume-data";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { EditorFormProps } from "@/types/letter";

export const TextForm = ({ letterData, setLetterData }: EditorFormProps) => {
  const { resumeData } = useResumeData();
  const [isGenerating, setIsGenerating] = useState(false);
  const t = useTranslations("FormLetter");
  const locale = useLocale();
  const MAX_CHARACTERS = 700;

  const handleGenerateText = async () => {
    try {
      setIsGenerating(true);

      if (!letterData.name || !letterData.profession) {
        throw new Error(t("validation.required"));
      }

      const formattedData = {
        fullName: letterData.name,
        profession: letterData.profession,
        position: letterData.position,
        company: letterData.company,
        nameRecipient: letterData.nameRecipient,
        skills: resumeData?.skills,
        workExperience: resumeData?.workExperiences,
      };

      const text = await generateTextGemini(formattedData, locale);
      setLetterData({ ...letterData, text });

      toast.success(t("text.successMessage"), {
        description: t("text.success"),
      });
    } catch (error) {
      console.error("Error generating the text:", error);
      toast.error(t("text.errorMessage"), {
        description: error instanceof Error ? error.message : t("text.error"),
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length <= MAX_CHARACTERS) {
      setLetterData({ ...letterData, text: newText });
    }
  };

  const remainingCharacters = MAX_CHARACTERS - (letterData.text?.length || 0);

  return (
    <div className="flex w-full max-w-2xl flex-col gap-4 p-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{t("steps.text.title")}</h2>
        <p className="text-sm text-muted-foreground">
          {t("steps.text.description")}
        </p>
      </div>

      <div className="flex items-center justify-center py-4">
        <Button
          onClick={handleGenerateText}
          disabled={isGenerating}
          type="button"
          variant="ai"
          size="sm"
        >
          {isGenerating ? t("text.generating") : t("text.generate")} <BsStars />
        </Button>
      </div>

      <Textarea
        value={letterData.text || ""}
        // onChange={(e) => setLetterData({ ...letterData, text: e.target.value })}
        onChange={handleTextChange}
        placeholder={t("placeholders.description")}
        className="min-h-[200px]"
      />
      <div className="mt-2 text-sm text-muted-foreground">
        {t("steps.text.counterStart")}
        {remainingCharacters}&nbsp;
        {t("steps.text.counterFinish")}
      </div>
    </div>
  );
};
