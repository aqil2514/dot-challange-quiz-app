import { Controller, type UseFormReturn } from "react-hook-form";
import type { QuestConfigSchemaType } from "../../../schema/quest-config.schema";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface Props {
  form: UseFormReturn<QuestConfigSchemaType>;
}

export function MenuQuizNumber({ form }: Props) {
  const isSubmitting = form.formState.isSubmitting;
  return (
    <FieldGroup>
      <Controller
        control={form.control}
        name="amount"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Jumlah Soal</FieldLabel>
            <Input
              {...field}
              type="number"
              value={field.value}
              max={50}
              onChange={(e) => field.onChange(e.target.valueAsNumber)}
              disabled={isSubmitting}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
}
