// ============================================
// Visa-related type definitions
// ============================================

import type { MultilingualText, ResidenceStatus } from './user';

/** Current status of a visa record */
export enum VisaStatus {
  ACTIVE = 'ACTIVE',
  EXPIRING_SOON = 'EXPIRING_SOON',
  RENEWAL_PENDING = 'RENEWAL_PENDING',
  EXPIRED = 'EXPIRED',
  CHANGED = 'CHANGED',
}

/** A single visa record tracking residence status and validity */
export interface VisaRecord {
  id: string;
  userId: string;
  residenceStatus: ResidenceStatus;
  issueDate: Date;
  expiryDate: Date;
  renewalDeadline: Date;
  status: VisaStatus;
  notes: string | null;
  documentUrls: string[];
  createdAt: Date;
  updatedAt: Date;
}

/** Visa record with nested relations */
export interface VisaRecordWithRelations extends VisaRecord {
  reminders: VisaReminder[];
  checklist: VisaChecklist[];
}

/** A scheduled reminder for visa-related deadlines */
export interface VisaReminder {
  id: string;
  visaRecordId: string;
  reminderDate: Date;
  reminderType: string;
  isSent: boolean;
  createdAt: Date;
}

/** A checklist item for visa application/renewal documents */
export interface VisaChecklist {
  id: string;
  visaRecordId: string;
  documentName: MultilingualText;
  description: MultilingualText;
  isRequired: boolean;
  isCompleted: boolean;
  fileUrl: string | null;
  order: number;
}
