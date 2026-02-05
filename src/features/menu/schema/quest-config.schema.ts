import z from "zod";

export const questConfigSchema = z.object({
  amount: z.number().max(50, "Maksimal soal adalah 50"),
  category: z.number(),
  categoryName: z.string(),
  difficulty: z.enum(["easy", "medium", "hard", "any"]),
  type: z.enum(["multiple", "boolean", "any"]),
});

export type QuestConfigSchemaType = z.infer<typeof questConfigSchema>;

export const defaultValues: QuestConfigSchemaType = {
  amount: 10,
  category: -1,
  categoryName: "Semua Kategori",
  difficulty: "any",
  type: "any",
};
