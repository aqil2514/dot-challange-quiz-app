import { LogoutButton } from "@/components/atoms/logout-button";

export function HeaderComponent() {
  return (
    <div className="w-full bg-white px-4 py-4 flex justify-end fixed top-0 left-0">
      <LogoutButton />
    </div>
  );
}
