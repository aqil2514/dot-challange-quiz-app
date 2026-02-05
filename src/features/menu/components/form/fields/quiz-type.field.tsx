import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { QuestConfigSchemaType } from "@/features/menu/schema/quest-config.schema";
import { Controller, type UseFormReturn } from "react-hook-form";

interface Props {
  form: UseFormReturn<QuestConfigSchemaType>;
}

const data: { id: QuestConfigSchemaType["type"]; name: string }[] = [
  {
    id: "any",
    name: "Campur",
  },
  {
    id: "boolean",
    name: "Benar / Salah",
  },
  {
    id: "multiple",
    name: "Pilihan Ganda",
  },
];

export function MenuQuizType({ form }: Props) {
  const isSubmitting = form.formState.isSubmitting;

  return (
    <FieldGroup>
      <Controller
        control={form.control}
        name="type"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Tipe Quiz</FieldLabel>
            <Select
              value={field.value}
              onValueChange={(e) => field.onChange(e)}
              disabled={isSubmitting}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Tipe Quiz" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectGroup>
                  {data.map((typeQuiz) => (
                    <SelectItem value={typeQuiz.id} key={typeQuiz.id}>
                      {typeQuiz.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
}
