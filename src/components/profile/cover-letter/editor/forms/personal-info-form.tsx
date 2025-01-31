import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditorFormProps } from "@/types/letter";
import { personalInfoSchema } from "./schema";

export const PersonalInfoForm = ({
  letterData,
  setLetterData,
}: EditorFormProps) => {
  const t = useTranslations("FormLetter");

  const form = useForm({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: letterData?.name || "",
      profession: letterData?.profession || "",
      position: letterData?.position || "",
      location: letterData?.location || "",
      phone: letterData?.phone || "",
      email: letterData?.email || "",
      company: letterData?.company || "",
      nameRecipient: letterData?.nameRecipient || "",
      positionRecipient: letterData?.positionRecipient || "",
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch((values) => {
      setLetterData({ ...letterData, ...values });
    });
    return unsubscribe;
  }, [form, letterData, setLetterData]);

  return (
    <div className="mx-auto w-full max-w-md space-y-6 p-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {t("steps.personalInfo.title")}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t("steps.personalInfo.description")}
        </p>
      </div>

      <Form {...form}>
        <form className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("labels.name")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("placeholders.name")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {letterData.template === "detailed" && (
            <FormField
              control={form.control}
              name="profession"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("labels.profession")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("placeholders.profession")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("labels.location")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("placeholders.location")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("labels.phone")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("placeholders.phone")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("labels.email")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("placeholders.email")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {letterData.template === "detailed" && (
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("labels.company")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("placeholders.company")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {letterData.template === "detailed" && (
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("labels.position")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("placeholders.position")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {letterData.template === "detailed" && (
            <FormField
              control={form.control}
              name="nameRecipient"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("labels.nameRecipient")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("placeholders.nameRecipient")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {letterData.template === "detailed" && (
            <FormField
              control={form.control}
              name="positionRecipient"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("labels.positionRecipient")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("placeholders.positionRecipient")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </form>
      </Form>
    </div>
  );
};
