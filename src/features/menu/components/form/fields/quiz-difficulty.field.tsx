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

const data: { id: QuestConfigSchemaType["difficulty"]; name: string }[] = [
  {
    id: "any",
    name: "Campur",
  },
  {
    id: "easy",
    name: "Mudah",
  },
  {
    id: "medium",
    name: "Lumayan",
  },
  {
    id: "hard",
    name: "Sulit",
  },
];

export function MenuQuizDifficulty({ form }: Props) {
  const isSubmitting = form.formState.isSubmitting;
  return (
    <FieldGroup>
      <Controller
        control={form.control}
        name="difficulty"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Kategori</FieldLabel>
            <Select
              value={field.value}
              onValueChange={(e) => field.onChange(e)}
              disabled={isSubmitting}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Kategori Quiz" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectGroup>
                  {data.map((diff) => (
                    <SelectItem value={diff.id} key={diff.id}>
                      {diff.name}
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
