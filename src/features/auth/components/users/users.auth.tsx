import { ItemHorizontal } from "@/components/molecules/item-horizontal";
import { dummyUser } from "../../data/dummy-user";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface Props {
  onButtonClick: (username: string, password: string) => void;
}

export function UsersContent({ onButtonClick }: Props) {
  return (
    <div className="pr-6">
      {dummyUser.map((user, i, array) => (
        <div key={user.username} className="space-y-4">
          <div className="space-y-1">
            <div className="flex gap-4 items-center justify-between">
              <p className="font-semibold underline">User {i + 1}</p>
              <Button
                size={"xs"}
                variant={"outline"}
                onClick={() => onButtonClick(user.username, user.password)}
              >
                Gunakan Akun Ini
              </Button>
            </div>
            <ItemHorizontal label="Username" value={user.username} />
            <ItemHorizontal label="Password" value={user.password} />
          </div>
          {i !== array.length - 1 && <Separator className="my-4" />}
        </div>
      ))}
    </div>
  );
}
