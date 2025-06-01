export interface TagCount {
  name: string;
  value: number;
}

export interface FeedbackStats {
  tagsStatus: TagCount[];
  likePercent: number;
  dislikePercent: number;
}

export interface ActivityStat {
  date: string;
  users: number;
  bots: number;
  lawyers: number;
}

export interface SummaryStats {
  totalUsers: number;
  totalBots: number;
  totalLawyers: number;
  totalFeedback: number;
  totalSubscriptions: number;
  totalVideoConsultations: number;
  totalConversations: number;
  userGrowth: number;
  botGrowth: number;
  lawyerGrowth: number;
  feedbackGrowth: number;
  subscriptionGrowth: number;
  vcGrowth: number;
  conversationGrowth: number;
}

export interface CombinedStats {
  feedback: FeedbackStats;
  activity: ActivityStat[];
  summary: SummaryStats;
}
