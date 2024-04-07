const { db } = require('@vercel/postgres');

const questions_data = [
  {
    id: '1660930633728188418',
    type: 1,
    title: '下面哪个表达式的结果和其他三项不同？',
    options: [
      "not ''",
      '4 != 3 + 2 and 5 == 3',
      '5 > 2 + 1 or 3 < 2 * 4',
      '1 + 4 <= 5',
    ],
    answer: 'B',
    score: 2,
    analysis: '',
    difficulty: 0,
    tags: [],
  },
  {
    id: '1660930633732382722',
    type: 1,
    title: '运行这段程序，输出的结果是？',
    options: ['6', '5', '4', '3'],
    answer: 'D',
    score: 2,
    analysis: '',
    difficulty: 0,
    tags: [],
  },
  {
    id: '1660930633732382723',
    type: 1,
    title: '执行下列代码的结果为？',
    options: ['1', '3', '5', '8'],
    answer: 'A',
    score: 2,
    analysis: '',
    difficulty: 0,
    tags: [],
  },
  {
    id: '1660930633732382724',
    type: 1,
    title: '运行如下代码，输出的结果是？',
    options: ['0', '1', '2', '5'],
    answer: 'D',
    score: 2,
    analysis: '',
    difficulty: 0,
    tags: [],
  },
  {
    id: '1660930633732382725',
    type: 1,
    title: '运行下面的代码，一共可以打出多少个a？',
    options: ['12', '10', '8', '6'],
    answer: 'A',
    score: 2,
    analysis: '',
    difficulty: 0,
    tags: [],
  },
  {
    id: '1660930633736577026',
    type: 1,
    title: '以下选项中，属于计算机输入设备的是：',
    options: ['显示器', '控制器', '键盘', '存储器'],
    answer: 'C',
    score: 2,
    analysis: '',
    difficulty: 0,
    tags: [],
  },
  {
    id: '1660930633736577027',
    type: 1,
    title: '运行下列代码，会打印出多少个数字？',
    options: ['0', '1', '2', '3'],
    answer: 'C',
    score: 2,
    analysis: '',
    difficulty: 0,
    tags: [],
  },
  {
    id: '1660930633736577028',
    type: 1,
    title: '运行上述代码，输入：1，以下说法错误的是？',
    options: [
      '变量x中存储的是字符串',
      '执行print(x + y)，结果为1357',
      'int(x)会把字符串’1‘转换为数字1',
      '执行print(y + z)，结果为3571',
    ],
    answer: 'D',
    score: 2,
    analysis: '',
    difficulty: 0,
    tags: [],
  },
  {
    id: '1660930633736577029',
    type: 1,
    title: "下面哪一行代码的输出结果不是'cooool'？",
    options: [
      "print('c' + 'oooo' + 'l')",
      "print('c' + 'o' * 3 + 'l')",
      "print('c' + 'ooo' + 'o' * 1 + 'l')",
      "print('c' + 'oo' * 2 + 'l')",
    ],
    answer: 'B',
    score: 2,
    analysis: '',
    difficulty: 0,
    tags: [],
  },
  {
    id: '1660930633740771329',
    type: 1,
    title: '运行下列的代码，输出的结果为？',
    options: ['6', '5', '4', '3'],
    answer: 'A',
    score: 2,
    analysis: '',
    difficulty: 0,
    tags: [],
  },
  {
    id: '1660930633740771330',
    type: 1,
    title: '执行下列的代码，结果为：',
    options: ['1', '9', '0', '11'],
    answer: 'A',
    score: 2,
    analysis: '',
    difficulty: 0,
    tags: [],
  },
  {
    id: '1660930633744965634',
    type: 1,
    title: '下列说法正确的是？',
    options: [
      'int()命令可以将任何字符串转换成数字类型',
      "int('333')会将字符串333转换成数字333",
      "在Python中，打印'1'+'2'和int('1')+int('2')的结果是一样的",
      'int()命令的括号中，必须填入数字',
    ],
    answer: 'B',
    score: 2,
    analysis: '',
    difficulty: 0,
    tags: [],
  },
  {
    id: '1660930633744965635',
    type: 1,
    title: '想要让画笔t向前移动60步，可以使用以下哪个命令？',
    options: ['t.right(60)', 't.left(60)', 't.forward(60)', 't.circle(60)'],
    answer: 'C',
    score: 2,
    analysis: '',
    difficulty: 0,
    tags: [],
  },
  {
    id: '1660930633744965636',
    type: 1,
    title: '22 % 3 的结果是',
    options: ['7', '1', '0', '5'],
    answer: 'B',
    score: 2,
    analysis: '',
    difficulty: 0,
    tags: [],
  },
  {
    id: '1660930633744965637',
    type: 1,
    title: '执行下列代码后，结果为？',
    options: ['小小，小小', '小小，a', 'a，a', 'a，小小'],
    answer: 'B',
    score: 2,
    analysis: '',
    difficulty: 0,
    tags: [],
  },
  {
    id: '1660930633749159937',
    type: 2,
    title: '以下关于分支语句的说法中，错误的是？',
    options: [
      '单分支语句中，当if语句后边的条件不成立时，会执行它的下级代码',
      '并列分支语句中，if语句的下级代码可能会被多次执行',
      '二分支语句中，if语句的下级代码和else的下级代码，只会执行其中一个',
      '多分支语句中，下级代码可能会被执行多次',
    ],
    answer: 'A、D',
    score: 3,
    analysis: '',
    difficulty: 0,
    tags: [],
  },
  {
    id: '1660930633749159938',
    type: 2,
    title: '下列说法正确的是？',
    options: [
      '每个if语句后面都必须有elif或else语句',
      'if - elif - else语句可以嵌套使用',
      '当if语句的条件表达式为真时，才会执行if语句的下级代码',
      '当代码中有多个if语句并列时，只会执行第1个if语句',
    ],
    answer: 'B、C',
    score: 3,
    analysis: '',
    difficulty: 0,
    tags: [],
  },
  {
    id: '1660930633749159939',
    type: 2,
    title: '关于这段代码，以下描述正确的是？',
    options: [
      'm是数字，不是字符串',
      'l是字符串，不是数字',
      '执行print(n)，结果为5',
      '执行print(n+l)，结果为2345',
    ],
    answer: 'A、B、D',
    score: 3,
    analysis: '',
    difficulty: 0,
    tags: [],
  },
  {
    id: '1660930633749159940',
    type: 1,
    title: '运行下列哪段代码，输出的结果是2.0？',
    options: [
      "print('1.0' * 2)",
      'print(1 + 1.0)',
      'print(4 // 2)',
      'print(6 % 2)',
    ],
    answer: 'B',
    score: 3,
    analysis: '',
    difficulty: 0,
    tags: [],
  },
  {
    id: '1660930633753354241',
    type: 2,
    title: '运行选项中的程序，能输出6的是？',
    options: [
      'print(1 + 5)',
      "print(1 + '5')",
      'print(2 * 3)',
      "print('1' + '5')",
    ],
    answer: 'A、C',
    score: 3,
    analysis: '',
    difficulty: 0,
    tags: [],
  },
  {
    id: '1660930826846527490',
    type: 3,
    title:
      '【题目描述】北京冬奥会马上就要开幕了。为了欢迎各个国家远道而来的运动员，小梦同学打算编写一段程序，实现以下功能：输入一个国家名，输出北京冬奥会欢迎这个国家的运动员。请你帮助小梦同学完成这个程序吧！',
    options: [null, null, null, null],
    answer: null,
    score: 10,
    analysis: '',
    difficulty: 0,
    tags: [],
  },
  {
    id: '1660931066576166913',
    type: 3,
    title:
      '【题目描述】某快递公司的运费计算规则如图所示；请你设计一个程序，实现以下功能：输入一个正整数，表示将要寄出的物品重量，输出需要支付的运费。',
    options: [null, null, null, null],
    answer: null,
    score: 10,
    analysis: '',
    difficulty: 0,
    tags: [],
  },
  {
    id: '1660931181881778177',
    type: 3,
    title:
      '【题目描述】三角形的三个内角和是180度，请编写程序，在输入一个三角形的两个内角度数后，可以输出第三个角的度数。',
    options: [null, null, null, null],
    answer: null,
    score: 15,
    analysis: '',
    difficulty: 0,
    tags: [],
  },
  {
    id: '1660931328288153602',
    type: 3,
    title:
      '【题目描述】方方去超市购物买了好多好吃的。他想写一个小程序，能够直接计算购买的东西总价格。方方会先告诉程序自己一共买了几样东西，然后依次输入每一种商品的价格，最后程序可以自动打印出结果。请你帮他实现程序内容。（程序中要有表示计算过程的语句）',
    options: [null, null, null, null],
    answer: null,
    score: 20,
    analysis: '',
    difficulty: 0,
    tags: [],
  },
];

async function seedQuestions(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "questions" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS questions (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title TEXT,
        creator TEXT,
        type TEXT,
        options TEXT[],
        answer TEXT,
        score INT,
        analysis TEXT,
        difficulty INT,
        tags TEXT[],
        create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    console.log(`Created "questions" table`);

    // Insert data into the "questions" table
    const insertedQuestions = await Promise.all(
      questions_data.map(async (question) => {
        return client.sql`
        INSERT INTO questions (title,creator,type,score,options,tags,analysis,answer,difficulty)
        VALUES (${question.title}, ${question.creator}, ${question.type}, ${question.score}, ${question.options}, ${question.tags}, ${question.analysis}, ${question.answer}, ${question.difficulty})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedQuestions.length} questions`);

    return {
      createTable,
      questions: insertedQuestions,
    };
  } catch (error) {
    console.error('Error seeding questions:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedQuestions(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
