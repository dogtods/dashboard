// This service simulates the GAS JSON endpoints.

export const mockSignals = {
  summary: {
    totalArticles: 1420,
    emergingSignals: 24,
    criticalAlerts: 3,
  },
  topSignals: [
    { id: '1', title: 'PFAS規制強化へ 環境省が検討開始', category: 'PFAS', impact: 'High', date: '2026-05-24', score: 92 },
    { id: '2', title: '次世代太陽光パネル 義務化の動き', category: 'Energy', impact: 'Medium', date: '2026-05-23', score: 85 },
    { id: '3', title: 'アスベスト廃棄の厳格化ガイドライン', category: 'Waste', impact: 'High', date: '2026-05-22', score: 88 },
    { id: '4', title: '生態系保護と再エネ開発の両立へ', category: 'Cross-category', impact: 'Medium', date: '2026-05-21', score: 75 },
  ]
};

export const mockBubbleData = Array.from({ length: 50 }).map((_, i) => ({
  id: `bubble-${i}`,
  date: new Date(2026, 4, Math.floor(Math.random() * 25) + 1).toISOString(),
  cluster: ['PFAS系', '自然共生', 'エネルギー', '廃棄物', '水質'][Math.floor(Math.random() * 5)],
  count: Math.floor(Math.random() * 20) + 1,
  category: ['pfas', 'ecosystem', 'energy', 'waste', 'cross'][Math.floor(Math.random() * 5)],
}));

export const mockNetworkData = {
  nodes: [
    { id: 'PFAS規制', group: 'pfas', radius: 20 },
    { id: '環境省', group: 'actor', radius: 15 },
    { id: '水質汚濁防止法', group: 'pfas', radius: 10 },
    { id: '太陽光パネル', group: 'energy', radius: 18 },
    { id: '廃棄物処理', group: 'waste', radius: 12 },
    { id: 'リサイクル義務', group: 'cross', radius: 15 },
  ],
  links: [
    { source: 'PFAS規制', target: '環境省', value: 5 },
    { source: 'PFAS規制', target: '水質汚濁防止法', value: 3 },
    { source: '太陽光パネル', target: '廃棄物処理', value: 2 },
    { source: 'リサイクル義務', target: '太陽光パネル', value: 4 },
    { source: 'リサイクル義務', target: '廃棄物処理', value: 4 },
    { source: '環境省', target: 'リサイクル義務', value: 3 },
  ]
};

export const mockOpportunities = [
  { id: 'o1', title: 'PFAS代替素材の提案', industry: '化学・素材', score: 95, action: '代替素材ラインナップの拡販キャンペーン' },
  { id: 'o2', title: '太陽光パネルリサイクルソリューション', industry: '産廃処理', score: 88, action: '早期導入割引パッケージの提案' },
  { id: 'o3', title: '排水モニタリングIoT', industry: '製造業全般', score: 82, action: 'コンプライアンス診断の無料オファー' },
];

export const mockProposals = [
  { id: 'p1', title: '【要対応】PFAS規制強化に関するソリューションご提案', industry: '化学', urgency: 'High', template: '平素は格別のご高配を賜り... 先日の環境省発表を受け...' },
  { id: 'p2', title: '再エネ設備・廃棄計画の最適化提案', industry: 'インフラ', urgency: 'Medium', template: 'FIT終了後の設備更新および... ガイドラインに準拠した...' },
];

// Helper to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchApi = async (endpoint: string, type: string) => {
  await delay(800); // simulate network
  
  if (endpoint === '/exec') {
    switch (type) {
      case 'summary': return mockSignals;
      case 'bubble': return mockBubbleData;
      case 'network': return mockNetworkData;
      case 'opportunities': return mockOpportunities;
      case 'proposals': return mockProposals;
      default: return null;
    }
  }
  throw new Error('Not found');
};
