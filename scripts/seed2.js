const { db } = require('@vercel/postgres');

const questions = '1660930633728188418,1660930633732382722,1660930633732382723';
const paper1 = {
  id: '110544b2-4001-4271-9855-fec4b6a6442a',
  title: '2022练习题库四级c++模拟试卷1（理论+编程）',
  creator: 'admin',
  level: 4,
  total_score: 100,
  duration: 90,
  tags: '编程实践,python',
  questions: questions,
};
async function seedPapers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "papers" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS papers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title TEXT,
        creator TEXT,
        level INT,
        total_score INT,
        duration INT,
        tags TEXT,
        questions TEXT,
        create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    console.log(`Created "papers" table`);

    // Insert data into the "papers" table
    const insertedPapers = await Promise.all(
      [paper1].map(async (paper1) => {
        return client.sql`
        INSERT INTO papers (title,creator,level,total_score,duration,tags,questions)
        VALUES ( ${paper1.title}, ${paper1.creator}, ${paper1.level}, ${paper1.total_score}, ${paper1.duration}, ${paper1.tags}, ${paper1.questions})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedPapers.length} papers`);

    return {
      createTable,
      papers: insertedPapers,
    };
  } catch (error) {
    console.error('Error seeding papers:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedPapers(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
