import { MainContainer } from "@/components/layouts/containers/main-containers";
import { MenuCard } from "./components/card/card.menu";
import { useState } from "react";
import { MenuConfirmationDialog } from "./dialog/confirmation-dialog.menu";

export function MenuTemplate() {
  const [confirmationDialog, setConfirmationDialog] = useState<boolean>(false);

  return (
    <MainContainer>
      <MenuCard onSubmitSuccess={() => setConfirmationDialog(true)} />

      <MenuConfirmationDialog
        onOpenChange={setConfirmationDialog}
        open={confirmationDialog}
      />
    </MainContainer>
  );
}
