import { LogoutButton } from "@/components/atoms/logout-button";
import { MainContainer } from "@/components/layouts/containers/main-containers";
import { ItemHorizontal } from "@/components/molecules/item-horizontal";
import { useQuizStore } from "@/store/quiz/quiz.store";
import he from "he";

export function QuizPlayTemplate() {
  const { quiz } = useQuizStore();

  return (
    <MainContainer>
      <ul>
        {quiz.map((q, i) => (
          <li key={`Kuiz-${i + 1}`}>
            <ItemHorizontal
              label={`Pertanyaan ke-${i + 1}`}
              value={he.decode(q.question)}
            />
          </li>
        ))}
      </ul>
      <LogoutButton />
    </MainContainer>
  );
}
