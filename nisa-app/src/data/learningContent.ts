export interface Lesson {
  id: string;
  title: string;
  emoji: string;
  durationMin: number;
  xp: number;
  status: 'done' | 'current' | 'locked';
  content: LessonContent[];
}

export interface LessonContent {
  type: 'text' | 'highlight' | 'tip' | 'quiz';
  body: string;
  options?: string[];
  correctIndex?: number;
}

export const lessons: Lesson[] = [
  {
    id: 'nisa-basics',
    title: 'NISAってなに？',
    emoji: '📖',
    durationMin: 3,
    xp: 50,
    status: 'done',
    content: [
      {
        type: 'text',
        body: 'NISAとは「少額投資非課税制度」のことです。難しく聞こえますが、簡単に言うと「投資で得た利益に税金がかからない特別な口座」のことです！',
      },
      {
        type: 'highlight',
        body: '通常、投資で利益が出ると約20%の税金がかかります。でもNISA口座ならゼロ！',
      },
      {
        type: 'tip',
        body: '2024年から「新NISA」が始まり、年間360万円まで非課税で投資できるようになりました。',
      },
      {
        type: 'quiz',
        body: 'NISAで投資した場合、利益への税金は？',
        options: ['約20%かかる', '約10%かかる', 'ゼロ！'],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'investment-fear',
    title: '投資ってこわくない',
    emoji: '💪',
    durationMin: 4,
    xp: 60,
    status: 'done',
    content: [
      {
        type: 'text',
        body: '「投資は怖い」と思っていませんか？確かにリスクはあります。でも、長期間・少額から・分散して積み立てることで、リスクをぐっと減らすことができます！',
      },
      {
        type: 'highlight',
        body: '過去30年間で、世界の株式に分散投資した場合、年平均7%程度のリターンがありました。',
      },
      {
        type: 'tip',
        body: '毎月少額をコツコツ積み立てる「ドルコスト平均法」を使えば、高い時も安い時も自動的に分散して買えます！',
      },
    ],
  },
  {
    id: 'diversification',
    title: '分散投資とは？',
    emoji: '🎯',
    durationMin: 3,
    xp: 50,
    status: 'current',
    content: [
      {
        type: 'text',
        body: '「卵は一つのカゴに盛るな」という言葉を聞いたことがありますか？これが分散投資の考え方です！',
      },
      {
        type: 'text',
        body: '1つの会社の株だけ買うと、その会社が倒産したら全部なくなります。でも100社に分散すると、1社がダメでも他の99社がカバーしてくれます。',
      },
      {
        type: 'highlight',
        body: '「全世界株式」の投資信託を1つ買うだけで、世界中の数千社に自動で分散できます！',
      },
      {
        type: 'quiz',
        body: '分散投資のメリットは？',
        options: ['利益が必ず増える', 'リスクを減らせる', '税金がゼロになる'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'market-crash',
    title: '暴落したらどうする？',
    emoji: '📉',
    durationMin: 5,
    xp: 70,
    status: 'locked',
    content: [
      {
        type: 'text',
        body: '市場が暴落すると、多くの人はパニックになって売ってしまいます。でもそれは大きな間違い！',
      },
      {
        type: 'highlight',
        body: '長期投資では、暴落は「バーゲンセール」。むしろ安く買えるチャンスです！',
      },
      {
        type: 'tip',
        body: '積立投資を続けていれば、暴落時にはより多くの口数を買えます。これが長期投資の強みです。',
      },
    ],
  },
  {
    id: 'long-term',
    title: '長期投資の考え方',
    emoji: '🌱',
    durationMin: 4,
    xp: 60,
    status: 'locked',
    content: [
      {
        type: 'text',
        body: '長期投資の最大の武器は「複利」です。複利とは利息にも利息がつくこと。アインシュタインが「人類最大の発明」と呼んだと言われています！',
      },
      {
        type: 'highlight',
        body: '月1万円を年5%で30年積み立てると、元本360万円が約830万円になります！',
      },
    ],
  },
];

export interface Product {
  id: string;
  name: string;
  shortName: string;
  stars: number;
  fee: string;
  feeNum: number;
  riskLevel: 'low' | 'mid' | 'high';
  riskLabel: string;
  type: 'growth' | 'balance' | 'safe';
  nyaisaComment: string;
  nisaCompatible: boolean;
}

export const products: Product[] = [
  {
    id: 'emax-all-country',
    name: 'eMAXIS Slim 全世界株式（オール・カントリー）',
    shortName: 'オルカン',
    stars: 5,
    fee: '0.1133%',
    feeNum: 0.1133,
    riskLevel: 'mid',
    riskLabel: 'バランス',
    type: 'growth',
    nyaisaComment: '世界中の約3,000社に一気に分散！「全世界に投資したい」ならまずこれにゃ。人気No.1商品！',
    nisaCompatible: true,
  },
  {
    id: 'emax-sp500',
    name: 'eMAXIS Slim 米国株式（S&P500）',
    shortName: 'S&P500',
    stars: 5,
    fee: '0.09372%',
    feeNum: 0.09372,
    riskLevel: 'high',
    riskLabel: '成長型',
    type: 'growth',
    nyaisaComment: 'アップル・マイクロソフト・アマゾンなどアメリカの超優良企業500社に投資！手数料が業界最安水準にゃ！',
    nisaCompatible: true,
  },
  {
    id: 'tawara-advanced',
    name: 'たわらノーロード先進国株式',
    shortName: 'たわら先進国',
    stars: 4,
    fee: '0.1023%',
    feeNum: 0.1023,
    riskLevel: 'mid',
    riskLabel: 'バランス',
    type: 'growth',
    nyaisaComment: '日本以外の先進国23ヵ国・約1,300社に投資！購入手数料ゼロで始められるにゃ。',
    nisaCompatible: true,
  },
  {
    id: 'emax-balance',
    name: 'eMAXIS Slim バランス（8資産均等型）',
    shortName: '8資産バランス',
    stars: 4,
    fee: '0.143%',
    feeNum: 0.143,
    riskLevel: 'low',
    riskLabel: '安心型',
    type: 'balance',
    nyaisaComment: '株・債券・不動産8種類に均等分散！値動きが穏やかで安定重視の方におすすめにゃ。',
    nisaCompatible: true,
  },
];
