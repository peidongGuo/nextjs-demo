export type PapersType = {
  id: string; // UUID
  title: string; // TEXT
  creator: string; // TEXT
  level: number; // INT
  total_score: number; // INT
  duration: number; // INT
  tags: string; // TEXT
  questions: string; // TEXT
  create_at: Date; // TIMESTAMP
  update_at: Date; // TIMESTAMP
};

export type Paper = {
  id: string;
  title: string;
  total_score: number;
  duration: number;
  question_count: number;
  question_types: {
    single_choice: number;
    multiple_choice: number;
    judgment: number;
    code: number;
  };
  create_time: string;
  update_time: string;
  tags: string[];
  questions: Question[];
};
