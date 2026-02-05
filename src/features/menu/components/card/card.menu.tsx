import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/store/auth.store";
import { MenuForm } from "../form/form.menu";

export function MenuCard() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <Card className="w-xl">
      <CardHeader>
        <CardTitle className="text-center">Menu Utama</CardTitle>
        <CardDescription className="text-center">
          Selamat Datang {user.username}!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <MenuForm />
      </CardContent>
      <CardFooter>
        
      </CardFooter>
    </Card>
  );
}
