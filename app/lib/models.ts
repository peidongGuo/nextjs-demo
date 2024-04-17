export type PapersTable = {
  id: string; // UUID
  title: string; // TEXT
  creator: string; // TEXT
  level: number; // INT
  total_score: number; // INT
  duration: number; // INT
  tags: string[]; // TEXT
  questions: string[]; // TEXT
  create_at?: Date; // TIMESTAMP
  update_at?: Date; // TIMESTAMP
};

export type Paper = {
  id: string;
  title: string;
  total_score: number;
  duration: number;
  level: number;
  question_count: number;
  question_types: {
    single_choice: number;
    multiple_choice: number;
    judgment: number;
    code: number;
  };
  create_time?: string;
  update_time?: string;
  tags: string[];
  questions: QuestionsTable[];
};

export enum QuestionType {
  single_choice = 'single_choice',
  multiple_choice = 'multiple_choice',
  judgment = 'judgment',
  code = 'code',
}

export type QuestionsTable = {
  id: string;
  type: QuestionType;
  title: string;
  options?: string[] | null[];
  answer: string | null;
  score: number;
  analysis?: string;
  difficulty?: number;
  tags?: string[];
  create_at?: Date; // TIMESTAMP
  update_at?: Date; // TIMESTAMP
};

export enum UserRoles {
  admin = 'admin',
  customer = 'customer',
}

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  phone_number?: string;
  role: UserRoles;
  create_time?: string;
  update_time?: string;
};

export enum ExamStatus {
  finished = 'finished',
  suspended = 'suspended',
  progress = 'progress',
}

export type ExamsTable = {
  id: string;
  user_id: string;
  paper_id: string;
  score: number;
  start_time: string;
  end_time: string;
  duration: number;
  status: ExamStatus;
  right_count: number;
  total_count: number;
  answers: Record<string, string>;
  create_at?: Date; // TIMESTAMP
  update_at?: Date; // TIMESTAMP
};

export type Exam = {
  id: string;
  userinfo: User;
  paper: Paper;
  score: number;
  start_time: string;
  end_time: string;
  duration: number;
  status: ExamStatus;
  right_count: number;
  total_count: number;
  answers: Record<string, string>;
};

export enum OrderStatus {
  succeed = 'succeed',
  failed = 'failed',
  paying = 'paying',
}

export type Order = {
  id: string;
  userinfo: User;
  paper: Paper;
  status: OrderStatus;
  create_time: string;
  pay_time: string;
  price: number;
};
