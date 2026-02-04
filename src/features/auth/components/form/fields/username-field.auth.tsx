import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import type { LoginSchemaType } from "@/features/auth/schema/login.schema";
import { Controller, type UseFormReturn } from "react-hook-form";
import { User } from "lucide-react";

interface Props {
  form: UseFormReturn<LoginSchemaType>;
}

export function UsernameField({ form }: Props) {
  return (
    <FieldGroup>
      <Controller
        name="username"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <InputGroup>
              <InputGroupInput
                {...field}
                placeholder="Username..."
                id="username"
                aria-invalid={fieldState.invalid}
              />
              <InputGroupAddon align={"inline-start"}>
                <User />
              </InputGroupAddon>
            </InputGroup>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
}
