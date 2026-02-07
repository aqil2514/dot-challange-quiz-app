import { useForm } from "react-hook-form";
import {
  defaultValues,
  questConfigSchema,
  type QuestConfigSchemaType,
} from "../../schema/quest-config.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { MenuQuizNumber } from "./fields/quiz-number.field";
import { toast } from "sonner";
import { MenuQuizCategory } from "./fields/quiz-category.field";
import { MenuQuizDifficulty } from "./fields/quiz-difficulty.field";
import { MenuQuizType } from "./fields/quiz-type.field";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { Spinner } from "@/components/ui/spinner";
import type {
  QuizApiResult,
  QuizItemWithId,
} from "../../types/quiz-api-result.types";
import { useQuizStore } from "@/store/quiz/quiz.store";
import { QuizTimerField } from "./fields/quiz-timer.field";

interface Props {
  onSubmitSuccess: () => void;
}

const buildQuery = (values: QuestConfigSchemaType) => {
  const url = new URL("api.php", "https://opentdb.com");

  Object.entries(values).forEach(([key, value]) => {
    if (
      value === undefined ||
      value === null ||
      value === "any" ||
      value === -1 ||
      key === "categoryName" ||
      key === "isWithTimer" ||
      key === "timerDuration"
    )
      return;

    url.searchParams.append(key, String(value));
  });

  return url.toString();
};

const apiMessage: Record<number, string> = {
  0: "Berhasil. Data soal berhasil diambil.",
  1: "Tidak ada hasil. Jumlah soal tidak mencukupi untuk permintaan ini.",
  2: "Parameter tidak valid. Terdapat argumen yang tidak sesuai.",
  3: "Token tidak ditemukan. Token sesi tidak ada.",
  4: "Token habis. Semua soal untuk permintaan ini sudah digunakan. Silakan reset token.",
  5: "Terlalu banyak permintaan. Silakan tunggu beberapa detik sebelum mencoba lagi.",
};

export function MenuForm({ onSubmitSuccess }: Props) {
  const { updateMeta, updateQuiz, progress, clearProgress } = useQuizStore();
  const form = useForm<QuestConfigSchemaType>({
    mode: "onChange",
    resolver: zodResolver(questConfigSchema),
    defaultValues,
  });

  const isSubmitting = form.formState.isSubmitting;

  const submitHandler = async (values: QuestConfigSchemaType) => {
    const url = buildQuery(values);

    try {
      const { data } = await axios.get<QuizApiResult>(url);

      const quizWithId: QuizItemWithId[] = data.results.map((quiz, i) => ({
        ...quiz,
        quizId: `quiz-${i + 1}`,
      }));

      if (data.response_code === 0) {
        toast.success(apiMessage[data.response_code]);
        updateMeta("config", values);
        updateQuiz(quizWithId);
        onSubmitSuccess();
        return;
      }

      toast.error(apiMessage[data.response_code])
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(submitHandler, () =>
        toast.error("Masih ada data yang belum sesuai"),
      )}
      className="space-y-4"
    >
      <Separator />
      <Button
        onClick={() => {
          form.reset();

          toast.info("Pengaturan telah direset");
        }}
        variant={"outline"}
        type="reset"
      >
        Reset
      </Button>
      <div className="grid grid-cols-2 gap-4 items-center">
        <MenuQuizNumber form={form} />
        <QuizTimerField form={form} />
      </div>
      <MenuQuizCategory form={form} />
      <div className="grid grid-cols-2 gap-4">
        <MenuQuizDifficulty form={form} />
        <MenuQuizType form={form} />
      </div>
      <Separator />

      <div className="flex justify-between gap-4">
        <Button variant={"outline"} type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <span className="flex gap-1 items-center">
              <Spinner />
              <p>Memulai Kuiz...</p>
            </span>
          ) : (
            "Mulai Kuiz"
          )}
        </Button>
        <div className="space-x-4">
          <Button
            variant={"outline"}
            type="button"
            disabled={!progress}
            onClick={() => {
              updateMeta("quizStatus", "play");
            }}
          >
            Lanjutkan Kuiz
          </Button>
          <Button
            variant={"outline"}
            type="button"
            disabled={!progress}
            onClick={() => {
              clearProgress();
              toast.success("Progres berhasil dihapus");
            }}
          >
            Hapus Progres
          </Button>
        </div>
      </div>
    </form>
  );
}
