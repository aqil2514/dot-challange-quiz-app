import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import type { QuestConfigSchemaType } from "@/features/quiz/menu/schema/quest-config.schema";
import type { TriviaCategories } from "@/features/quiz/menu/types/quiz-category.types";
import { fetcher } from "@/lib/fetcher";
import { Controller, type UseFormReturn } from "react-hook-form";
import useSWR from "swr";

interface Props {
  form: UseFormReturn<QuestConfigSchemaType>;
}

export function MenuQuizCategory({ form }: Props) {
  const { data, isLoading, error } = useSWR<TriviaCategories>(
    "https://opentdb.com/api_category.php",
    fetcher,
  );

  if (error)
    return (
      <div>
        <p>Terjadi kesalahan saat ambil data kategori</p>
      </div>
    );

  if (isLoading)
    return (
      <div className="flex gap-4 items-center">
        <Spinner />
        <p className="text-muted-foreground font-semibold">
          Mengambil data kategori...
        </p>
      </div>
    );

  if (!data)
    return (
      <div>
        <p>Data tidak ditemukan</p>
      </div>
    );

  const isSubmitting = form.formState.isSubmitting;

  return (
    <FieldGroup>
      <Controller
        control={form.control}
        name="category"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Kategori</FieldLabel>
            <Select
              value={String(field.value)}
              onValueChange={(e) => {
                const value = Number(e);
                const isMixCategory = value === -1;
                field.onChange(value);

                const categoryName =
                  data.trivia_categories.find((cat) => cat.id === value)
                    ?.name ?? "Semua Kategori";

                form.setValue(
                  "categoryName",
                  isMixCategory ? "Semua Kategori" : categoryName,
                );
              }}
              disabled={isSubmitting}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Kategori Quiz" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectGroup>
                  <SelectItem value="-1">Semua Kategori</SelectItem>
                  {data.trivia_categories.map((category) => (
                    <SelectItem value={String(category.id)} key={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <FieldDescription>
              Hanya bisa mengambil 1 kategori. Jika ingin banyak kategori, pilih
              "Semua Kategori"
            </FieldDescription>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
}
