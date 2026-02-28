// ============================================
// MediLife Super App - Type Definitions
// Re-exports all types from domain modules
// ============================================

// --- User & common types ---
export type { Locale, MultilingualText } from './user';
export {
  ResidenceStatus,
  JlptLevel,
  AppTier,
  LifeGuideCategory,
} from './user';
export type {
  User,
  UserWithRelations,
  Subscription,
  Notification,
  LifeGuideArticle,
  LifeGuideBookmark,
  LearningProgress,
  CommunityGroup,
  CommunityPost,
  AiConversation,
  RemittanceProvider,
  RemittanceRecord,
} from './user';

// --- Visa types ---
export { VisaStatus } from './visa';
export type {
  VisaRecord,
  VisaRecordWithRelations,
  VisaReminder,
  VisaChecklist,
} from './visa';

// --- Hospital types ---
export { BookingStatus } from './hospital';
export type {
  OpeningHours,
  Hospital,
  HospitalWithBookings,
  HospitalBooking,
  HospitalBookingWithHospital,
} from './hospital';

// --- Job types ---
export { EmploymentType, ApplicationStatus } from './job';
export type {
  SalaryInfo,
  Job,
  JobWithRelations,
  JobApplication,
  JobApplicationWithJob,
  SavedJob,
  SavedJobWithJob,
} from './job';
