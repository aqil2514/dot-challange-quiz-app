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

interface Props {
  onSubmitSuccess: () => void;
}

export function MenuCard({ onSubmitSuccess }: Props) {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <Card className="w-xl mt-10">
      <CardHeader>
        <CardTitle className="text-center">Menu Utama</CardTitle>
        <CardDescription className="text-center">
          Selamat Datang {user.username}!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <MenuForm onSubmitSuccess={onSubmitSuccess} />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
