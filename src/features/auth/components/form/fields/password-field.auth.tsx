import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import type { LoginSchemaType } from "@/features/auth/schema/login.schema";
import { Controller, type UseFormReturn } from "react-hook-form";
import { Eye, EyeOff, KeyRound } from "lucide-react";
import { useState } from "react";

interface Props {
  form: UseFormReturn<LoginSchemaType>;
}

export function PasswordField({ form }: Props) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <FieldGroup>
      <Controller
        name="password"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <InputGroup>
              <InputGroupInput
                {...field}
                placeholder="password..."
                id="password"
                aria-invalid={fieldState.invalid}
                type={showPassword ? "text" : "password"}
              />
              <InputGroupAddon align={"inline-start"}>
                <KeyRound />
              </InputGroupAddon>
              <InputGroupAddon align={"inline-end"}>
                <InputGroupButton
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye /> : <EyeOff />}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
}
