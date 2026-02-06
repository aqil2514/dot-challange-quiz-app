import { ItemHorizontal } from "@/components/molecules/item-horizontal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { useQuizStore } from "@/store/quiz/quiz.store";
import type { QuestConfigSchemaType } from "../schema/quest-config.schema";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const difficultLabel: Record<QuestConfigSchemaType["difficulty"], string> = {
  any: "Campur",
  easy: "Mudah",
  medium: "Lumayan",
  hard: "Sulit",
};

const quizType: Record<QuestConfigSchemaType["type"], string> = {
  any: "Campur",
  boolean: "Benar / Salah",
  multiple: "Pilihan Ganda",
};

export function MenuConfirmationDialog({ onOpenChange, open }: Props) {
  const { meta, resetMeta, resetQuiz, updateMeta, playQuiz } =
    useQuizStore();
  const config = meta.config;

  if (!config) return null;

  const cancelHandle = () => {
    resetMeta();
    resetQuiz();
  };

  const playHandle = () => {
    playQuiz();
    toast.info("Quiz dimulai! Selamat mengerjakan");
    updateMeta("quizStatus", "play");
  };

  return (
    <AlertDialog onOpenChange={onOpenChange} open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Lanjut Mainkan Kuis?</AlertDialogTitle>
          <AlertDialogDescription>
            Anda akan memainkan kuiz dengan konfigurasi seperti berikut
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Separator />
        <div className="px-4 space-y-4">
          <ItemHorizontal
            label="Jumlah Soal :"
            value={`${config.amount} Soal`}
          />
          <ItemHorizontal label="Kategori :" value={`${config.categoryName}`} />
          <ItemHorizontal
            label="Tingkat Kesulitan :"
            value={`${difficultLabel[config.difficulty]}`}
          />
          <ItemHorizontal
            label="Tipe Soal :"
            value={`${quizType[config.type]}`}
          />
        </div>
        <Separator />
        <AlertDialogFooter>
          <AlertDialogCancel onClick={cancelHandle}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={playHandle}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
