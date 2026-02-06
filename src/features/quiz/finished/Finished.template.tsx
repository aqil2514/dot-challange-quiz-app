import { MainContainer } from "@/components/layouts/containers/main-containers";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FinishedSummary } from "./components/summary.finished";
import { FinishedDetail } from "./components/detail.finished";
import { Separator } from "@/components/ui/separator";
import { FinishedFooter } from "./components/footer.finished";

export function QuizFinishedTemplate() {
  return (
    <MainContainer className="flex-col gap-4">
      <Card className="w-5xl">
        <CardHeader>
          <CardTitle className="text-center">Soal Telah Diselesaikan</CardTitle>
          <CardDescription className="text-center">
            Berikut adalah informasi hasil pengerjaan soal Anda
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FinishedSummary />
          <Separator />
          <FinishedDetail />
          <Separator />
        </CardContent>
        <CardFooter>
            <FinishedFooter />
        </CardFooter>
      </Card>
    </MainContainer>
  );
}
