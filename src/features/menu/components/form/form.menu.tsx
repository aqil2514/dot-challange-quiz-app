import { useForm } from "react-hook-form";
import {
  defaultValues,
  questConfigSchema,
  type QuestConfigSchemaType,
} from "../../schema/quest-config.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/store/auth.store";
import { MenuQuizNumber } from "./fields/quiz-number.field";
import { toast } from "sonner";
import { MenuQuizCategory } from "./fields/quiz-category.field";
import { MenuQuizDifficulty } from "./fields/quiz-difficulty.field";
import { MenuQuizType } from "./fields/quiz-type.field";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { Spinner } from "@/components/ui/spinner";
import type { QuizApiResult } from "../../types/quiz-api-result.types";

const buildQuery = (values: QuestConfigSchemaType) => {
  const url = new URL("api.php", "https://opentdb.com");

  Object.entries(values).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "any" || value === 0)
      return;

    url.searchParams.append(key, String(value));
  });

  return url.toString();
};

export function MenuForm() {
  const { logout } = useAuth();
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

      toast.success("Kuiz berhasil diambil");
      console.log(data);
    } catch (error) {
      console.error(error);
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
      <MenuQuizNumber form={form} />
      <MenuQuizCategory form={form} />
      <div className="grid grid-cols-2 gap-4">
        <MenuQuizDifficulty form={form} />
        <MenuQuizType form={form} />
      </div>
      <Separator />

      <div className="flex justify-center gap-4">
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
        <Button onClick={() => form.reset()} variant={"outline"} type="reset">
          Reset
        </Button>
        <Button onClick={logout} variant="destructive" type="button">
          Logout
        </Button>
      </div>
    </form>
  );
}
