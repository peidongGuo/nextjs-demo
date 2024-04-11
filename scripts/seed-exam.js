const { db } = require('@vercel/postgres');

const createExamData1 = {
  id: '166093063',
  user_id: '410544b2-4001-4271-9855-fec4b6a6442a',
  paper_id: '534c9ec8-6b5d-4db6-9bc1-c487ed75879f',
  score: 6,
  start_time: '2022-12-06 12:00:00',
  end_time: '2022-12-06 13:30:00',
  duration: 90,
  status: 'finished',
  right_count: 3,
  total_count: 10,
  answers: [
    {
      question_id: 'e947b9e9-84e5-4663-a3e3-3310ca2fc853',
      answer: 'B',
    },
    {
      question_id: '62ac62b7-7a08-43a3-81cf-d7e13c00c821',
      answer: 'D',
    },
    {
      question_id: 'f73b7854-f9a4-4f3f-becf-43eebb12bebb',
      answer: 'A',
    },
  ],
};

async function seedExams(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "exams" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS exams (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID,
        paper_id UUID,
        score INT,
        start_time TEXT,
        end_time TEXT,
        duration INT,
        status TEXT,
        right_count INT,
        total_count INT,
        answers JSON[],
        create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    console.log(`Created "exams" table`);

    // Insert data into the "exams" table
    const insertedExams = await Promise.all(
      [createExamData1].map(async (exam1) => {
        return client.sql`
        INSERT INTO exams (user_id,paper_id,score,start_time,end_time,duration,status,right_count,total_count,answers)
        VALUES ( ${exam1.user_id}, ${exam1.paper_id}, ${exam1.score}, ${exam1.start_time}, ${exam1.end_time}, ${exam1.duration}, ${exam1.status}, ${exam1.right_count}, ${exam1.total_count}, ${exam1.answers})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedExams.length} exams`);

    return {
      createTable,
      exams: insertedExams,
    };
  } catch (error) {
    console.error('Error seeding exams:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedExams(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
