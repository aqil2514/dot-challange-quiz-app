import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { splitSecondsPadded } from "@/lib/utils";
import { useQuizStore } from "@/store/quiz/quiz.store";
import { InfinityIcon, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function QuizTimer() {
  const { progress, meta, updateMeta } = useQuizStore();
  const config = meta.config;
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0);

  useEffect(() => {
    if (!progress) return;
    const endAt = progress.endAt;
    if (!endAt) return;

    const tick = () => {
      const remainingMs = endAt - Date.now();
      const remaining = Math.max(0, Math.ceil(remainingMs / 1000));

      setRemainingSeconds(remaining);

      if (remaining === 0) {
        toast.info("Waktu habis! Kuis berakhir")
        updateMeta("quizStatus", "finished");
      }
    };

    tick();
    const interval = setInterval(tick, 1000);

    return () => clearInterval(interval);
  }, [progress, updateMeta]);

  if (!progress || !config) throw new Error("Progress dan Konfig belum diatur");
  const { endAt } = progress;

  const { hh, mm, ss } = splitSecondsPadded(remainingSeconds);
  return (
    <div className="flex justify-between">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" size={"icon"}>
            <Menu />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ingin kembali?</AlertDialogTitle>
            <AlertDialogDescription>
              Progres saat ini akan tetap disimpan dan bisa dilanjutkan. Namun
              jika Anda menggunakan waktu, waktunya masih tetap berjalan
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                updateMeta("quizStatus", "idle");
              }}
            >
              Lanjutkan
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {!endAt ? (
        <InfinityIcon />
      ) : (
        <div className="flex font-mono">
          <p>{hh}</p>
          <p>:</p>
          <p>{mm}</p>
          <p>:</p>
          <p>{ss}</p>
        </div>
      )}
    </div>
  );
}
