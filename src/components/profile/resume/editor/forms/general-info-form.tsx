import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { templates } from "@/constants";
import { EditorFormProps } from "@/types/resume";
import { GeneralInfoFormValues, generalInfoSchema } from "./schema";

export const GeneralInfoForm = ({
  resumeData,
  setResumeData,
}: EditorFormProps) => {
  const form = useForm<GeneralInfoFormValues>({
    resolver: zodResolver(generalInfoSchema),
    defaultValues: {
      template: resumeData?.template || templates.CLASSIC,
      title: resumeData?.title || "",
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({ ...resumeData, ...values });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  return (
    <div className="mx-auto w-full max-w-md space-y-6 p-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">General Info</h1>
        <p className="text-sm text-muted-foreground">
          Choose your template and set resume title
        </p>
      </div>

      <Form {...form}>
        <form className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resume Title</FormLabel>
                <FormControl>
                  <Input placeholder="My Resume" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="template"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Template</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={templates.CLASSIC}>Classic</SelectItem>
                    <SelectItem value={templates.MODERN_DARK}>
                      Modern Dark
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <div className="mt-4 text-sm text-muted-foreground">
        <pre className="mt-4 rounded-lg bg-slate-950 p-4">
          {JSON.stringify(resumeData, null, 2)}
        </pre>
      </div>
    </div>
  );
};
