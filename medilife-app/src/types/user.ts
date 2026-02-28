// ============================================
// User-related type definitions
// ============================================

/** Supported locales for multilingual content */
export type Locale = 'ja' | 'vi' | 'en' | 'zh' | 'id' | 'tl' | 'my';

/** Multilingual text stored as a record of locale to translated string */
export type MultilingualText = Partial<Record<Locale, string>>;

/** Residence status (visa type) for foreign nationals in Japan */
export enum ResidenceStatus {
  SPECIFIED_SKILLED_1 = 'SPECIFIED_SKILLED_1',
  SPECIFIED_SKILLED_2 = 'SPECIFIED_SKILLED_2',
  TECHNICAL_INTERN_1 = 'TECHNICAL_INTERN_1',
  TECHNICAL_INTERN_2 = 'TECHNICAL_INTERN_2',
  TECHNICAL_INTERN_3 = 'TECHNICAL_INTERN_3',
  EPA = 'EPA',
  STUDENT = 'STUDENT',
  PERMANENT_RESIDENT = 'PERMANENT_RESIDENT',
  SPOUSE = 'SPOUSE',
  LONG_TERM_RESIDENT = 'LONG_TERM_RESIDENT',
  ENGINEER_SPECIALIST = 'ENGINEER_SPECIALIST',
  IKUJIKYU = 'IKUJIKYU',
  OTHER = 'OTHER',
}

/** JLPT (Japanese Language Proficiency Test) level */
export enum JlptLevel {
  NONE = 'NONE',
  N5 = 'N5',
  N4 = 'N4',
  N3 = 'N3',
  N2 = 'N2',
  N1 = 'N1',
}

/** Application subscription tier */
export enum AppTier {
  FREE = 'FREE',
  PLUS = 'PLUS',
  PRO = 'PRO',
}

/** Core user profile */
export interface User {
  id: string;
  email: string;
  phone: string | null;
  name: string;
  nameKana: string | null;
  nationality: string;
  nativeLanguage: string;
  dateOfBirth: Date | null;
  gender: string | null;
  avatarUrl: string | null;
  residenceStatus: ResidenceStatus | null;
  residenceCardNo: string | null;
  currentAddress: string | null;
  prefecture: string | null;
  city: string | null;
  japaneseLevel: JlptLevel | null;
  occupation: string | null;
  employer: string | null;
  subscriptionTier: AppTier;
  stripeCustomerId: string | null;
  lineUserId: string | null;
  fcmToken: string | null;
  onboardingDone: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/** User with all relations loaded */
export interface UserWithRelations extends User {
  visaRecords: import('./visa').VisaRecord[];
  hospitalBookings: import('./hospital').HospitalBooking[];
  jobApplications: import('./job').JobApplication[];
  savedJobs: import('./job').SavedJob[];
  subscription: Subscription | null;
  notifications: Notification[];
  lifeGuideBookmarks: LifeGuideBookmark[];
  learningProgress: LearningProgress[];
  communityPosts: CommunityPost[];
  aiConversations: AiConversation[];
  remittanceRecords: RemittanceRecord[];
}

// ============================================
// Subscription
// ============================================

export interface Subscription {
  id: string;
  userId: string;
  stripeSubscriptionId: string;
  tier: AppTier;
  status: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// Notification
// ============================================

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: MultilingualText;
  body: MultilingualText;
  data: Record<string, unknown> | null;
  isRead: boolean;
  createdAt: Date;
}

// ============================================
// Life Guide
// ============================================

export enum LifeGuideCategory {
  HOUSING = 'HOUSING',
  BANKING = 'BANKING',
  TRANSPORT = 'TRANSPORT',
  TAX_PENSION = 'TAX_PENSION',
  GARBAGE = 'GARBAGE',
  EMERGENCY = 'EMERGENCY',
  SHOPPING = 'SHOPPING',
  COMMUNICATION = 'COMMUNICATION',
  CHILDCARE = 'CHILDCARE',
  LEGAL_RIGHTS = 'LEGAL_RIGHTS',
  CULTURE = 'CULTURE',
  FOOD = 'FOOD',
}

export interface LifeGuideArticle {
  id: string;
  category: LifeGuideCategory;
  subcategory: string | null;
  title: MultilingualText;
  content: MultilingualText;
  summary: MultilingualText;
  prefecture: string | null;
  city: string | null;
  tags: string[];
  isPublished: boolean;
  viewCount: number;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface LifeGuideBookmark {
  id: string;
  userId: string;
  articleId: string;
  createdAt: Date;
}

// ============================================
// Learning Progress
// ============================================

export interface LearningProgress {
  id: string;
  userId: string;
  lessonType: string;
  lessonId: string;
  score: number | null;
  timeSpent: number;
  isCompleted: boolean;
  completedAt: Date | null;
  createdAt: Date;
}

// ============================================
// Community
// ============================================

export interface CommunityGroup {
  id: string;
  name: MultilingualText;
  description: MultilingualText;
  category: string;
  language: string;
  memberCount: number;
  imageUrl: string | null;
  isOfficial: boolean;
  createdAt: Date;
}

export interface CommunityPost {
  id: string;
  userId: string;
  groupId: string;
  content: string;
  language: string;
  imageUrls: string[];
  likeCount: number;
  replyCount: number;
  isAnonymous: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// AI Conversation
// ============================================

export interface AiConversation {
  id: string;
  userId: string;
  category: string;
  messages: Record<string, unknown>;
  language: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// Remittance
// ============================================

export interface RemittanceProvider {
  id: string;
  name: string;
  logoUrl: string | null;
  website: string;
  affiliateUrl: string | null;
  countries: string[];
  fee: Record<string, unknown>;
  exchangeRate: Record<string, unknown> | null;
  speed: string;
  rating: number | null;
  isPartner: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface RemittanceRecord {
  id: string;
  userId: string;
  providerId: string;
  amount: number;
  receivedAmount: number | null;
  currency: string;
  fee: number | null;
  exchangeRate: number | null;
  country: string;
  status: string;
  sentAt: Date;
}
