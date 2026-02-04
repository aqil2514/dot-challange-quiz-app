import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AuthLoginForm } from "./form/login-form.auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UsersContent } from "./users/users.auth";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useForm } from "react-hook-form";
import {
  defaultValue,
  loginSchema,
  type LoginSchemaType,
} from "../schema/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

export function AuthLoginCard() {
  const [content, setContent] = useState<string>("login-form");

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: defaultValue,
  });

  const userSelectHandle = (username: string, password: string) => {
    setContent("login-form");
    form.setValue("password", password);
    form.setValue("username", username);

    toast.success(`Menggunakan akun dengan username ${username}. Silahkan login!`)
  };

  return (
    <Card className="w-xl space-y-4">
      <Tabs value={content} onValueChange={setContent} className="w-full">
        <TabsList className="mx-auto">
          <TabsTrigger value="login-form">Login</TabsTrigger>
          <TabsTrigger value="users">Daftar Akun</TabsTrigger>
        </TabsList>
        <CardHeader className="flex flex-col gap-2 items-center justify-center my-4">
          <CardTitle>
            {content === "login-form" ? "Login Form" : "Daftar Akun"}
          </CardTitle>
          <CardDescription>
            {content === "login-form"
              ? " Login untuk melanjutkan aplikasi quiz"
              : "Berikut adalah daftar akun yang bisa digunakan"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-52">
            <TabsContent value="login-form">
              <AuthLoginForm form={form} />
            </TabsContent>
            <TabsContent value="users">
              <UsersContent onButtonClick={userSelectHandle} />
            </TabsContent>
          </ScrollArea>
        </CardContent>
      </Tabs>
    </Card>
  );
}
