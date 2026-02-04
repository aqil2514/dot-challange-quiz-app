import { type UseFormReturn } from "react-hook-form";
import {
  type LoginSchemaType,
} from "../../schema/login.schema";
import { UsernameField } from "./fields/username-field.auth";
import { PasswordField } from "./fields/password-field.auth";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/store/auth.store";
import { dummyUser } from "../../data/dummy-user";

interface Props {
  form: UseFormReturn<LoginSchemaType>;
}

export function AuthLoginForm({ form }: Props) {
  const { login } = useAuth();

  const submitHandler = (values: LoginSchemaType) => {
    const isExist = dummyUser.find((user) => user.username === values.username);
    if (!isExist) return toast.error(`User ${values.username} tidak ditemukan`);

    const isCorrectPassword = dummyUser.find(
      (user) => user.password === values.password,
    );
    if (!isCorrectPassword)
      return toast.error("Pasword salah. Silahkan coba lagi!");

    login(values.username);
    toast.success(`Login berhasil! Selamat datang ${values.username}`);
  };

  return (
    <form
      onSubmit={form.handleSubmit(submitHandler, () =>
        toast.error("Login gagal! Silahkan coba lagi"),
      )}
      className="space-y-4"
    >
      <UsernameField form={form} />
      <PasswordField form={form} />
      <Button variant={"outline"} className="w-full" type="submit">
        Login
      </Button>
    </form>
  );
}
