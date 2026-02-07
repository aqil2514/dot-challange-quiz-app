import { Controller, useWatch, type UseFormReturn } from "react-hook-form";
import type { QuestConfigSchemaType } from "../../../schema/quest-config.schema";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { TimePicker } from "@/components/molecules/time-picker/time-picker";
import { Switch } from "@/components/ui/switch";
import { dateToSeconds, secondsToDate } from "@/lib/utils";

interface Props {
  form: UseFormReturn<QuestConfigSchemaType>;
}

export function QuizTimerField({ form }: Props) {
  const isWithTimer = useWatch({
    control: form.control,
    name: "isWithTimer",
  });

  return (
    <div className="space-y-4">
      <FieldGroup>
        <Controller
          control={form.control}
          name="isWithTimer"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex gap-4 items-center">
                <Switch
                  id={field.name}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <FieldLabel htmlFor={field.name}>Mulai dengan waktu</FieldLabel>
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <FieldGroup>
        <Controller
          control={form.control}
          name="timerDuration"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Durasi Kuis</FieldLabel>
              <TimePicker
                date={secondsToDate(field.value)}
                setDate={(date) => {
                  if(!date) return;
                  const seconds = dateToSeconds(date);
                  field.onChange(seconds);
                }}
                disabled={!isWithTimer}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </div>
  );
}
