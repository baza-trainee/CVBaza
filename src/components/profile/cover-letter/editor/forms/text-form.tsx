// import { useState } from "react";
// import { useLocale, useTranslations } from "next-intl";
import { useTranslations } from "next-intl";
// import { BsStars } from "react-icons/bs";
// import { generateSummary } from "@/app/actions/generate-summary";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
// import { useToast } from "@/hooks/use-toast";
import { EditorFormProps } from "@/types/letter";

export const TextForm = ({ letterData, setLetterData }: EditorFormProps) => {
  // const [isGenerating, setIsGenerating] = useState(false);
  // const { toast } = useToast();
  const t = useTranslations("Form");
  // const locale = useLocale();

  // const handleGenerateText = async () => {
  //   try {
  //     setIsGenerating(true);

  //     if (!letterData.name || !letterData.profession) {
  //       throw new Error(t("validation.required"));
  //     }

  //     const formattedData = {
  //       fullName: letterData.name,
  //       position: letterData.profession,
  //     };

  //     // actions
  //     const text = await generateSummary(formattedData, locale);
  //     setLetterData({ ...letterData, text });

  //     toast({
  //       title: t("text.success"),
  //       description: t("text.successMessage"),
  //     });
  //   } catch (error) {
  //     console.error("Error generating the text:", error);
  //     toast({
  //       title: t("text.error"),
  //       description:
  //         error instanceof Error ? error.message : t("text.errorMessage"),
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setIsGenerating(false);
  //   }
  // };

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
          // onClick={handleGenerateText}
          // disabled={isGenerating}
          type="button"
          variant="ai"
          size="sm"
        >
          {/* {isGenerating ? t("text.generating") : t("text.generate")} <BsStars /> */}
        </Button>
      </div>

      <Textarea
        value={letterData.text || ""}
        onChange={(e) => setLetterData({ ...letterData, text: e.target.value })}
        placeholder={t("placeholders.description")}
        className="min-h-[200px]"
      />
    </div>
  );
};
