import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { EducationValues } from "../schema";

interface EducationItemProps {
  id: string;
  form: UseFormReturn<EducationValues>;
  index: number;
  remove: (index: number) => void;
}

export const EducationItem = ({
  id,
  form,
  index,
  remove,
}: EducationItemProps) => {
  const t = useTranslations("Form");
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  return (
    <div
      className={cn(
        "space-y-3 rounded-md border bg-background p-3",
        isDragging && "relative z-50 cursor-grab shadow-xl"
      )}
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <div className="flex justify-between gap-2">
        <span className="font-semibold">
          {t("labels.education")} {index + 1}
        </span>
        <GripHorizontal
          className="size-5 cursor-grab text-muted-foreground focus:outline-none"
          {...attributes}
          {...listeners}
        />
      </div>

      <div className="grid gap-3">
        <FormField
          control={form.control}
          name={`educations.${index}.degree`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("fields.degree")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value || ""}
                  autoComplete="off"
                  data-form-type="other"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`educations.${index}.institution`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("fields.institution")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value || ""}
                  autoComplete="off"
                  data-form-type="other"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name={`educations.${index}.startDate`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("fields.startDate")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
                    placeholder={t("placeholders.startDate")}
                    autoComplete="off"
                    data-form-type="other"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`educations.${index}.endDate`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("fields.endDate")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
                    placeholder={t("placeholders.endDate")}
                    autoComplete="off"
                    data-form-type="other"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <Button variant="destructive" type="button" onClick={() => remove(index)}>
        {t("education.remove")}
      </Button>
    </div>
  );
};
