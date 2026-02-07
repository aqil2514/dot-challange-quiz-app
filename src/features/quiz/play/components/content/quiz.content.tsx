import { Card, CardContent } from "@/components/ui/card";
import { QuizQuestion } from "./question.quiz";
import { QuizAnswer } from "./answer.quiz";
import { Separator } from "@/components/ui/separator";
import { QuizFooter } from "./footer.quiz";
import { QuizTimer } from "./timer.quiz";

export function QuizContent() {
  return (
    <Card className="w-5xl">
      <CardContent className="space-y-4">
        <QuizTimer />
        <Separator />
        <QuizQuestion />
        <Separator />
        <QuizAnswer />
        <Separator />
        <QuizFooter />
      </CardContent>
    </Card>
  );
}
