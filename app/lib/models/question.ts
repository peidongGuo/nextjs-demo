export type QuestionsTable = {
  id: string;
  type: string;
  title: string;
  options?: string[] | null[];
  answer: string | null;
  score: number;
  analysis: string;
  difficulty?: number;
  tags?: string[];
  create_at: Date; // TIMESTAMP
  update_at: Date; // TIMESTAMP
};
