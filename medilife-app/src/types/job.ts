// ============================================
// Job-related type definitions
// ============================================

import type { MultilingualText, ResidenceStatus, JlptLevel } from './user';

/** Employment type for a job listing */
export enum EmploymentType {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  CONTRACT = 'CONTRACT',
  DISPATCH = 'DISPATCH',
}

/** Status of a job application */
export enum ApplicationStatus {
  APPLIED = 'APPLIED',
  SCREENING = 'SCREENING',
  INTERVIEW = 'INTERVIEW',
  OFFERED = 'OFFERED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  WITHDRAWN = 'WITHDRAWN',
}

/** Salary information stored as JSON */
export interface SalaryInfo {
  min?: number;
  max?: number;
  currency?: string;
  period?: 'hourly' | 'monthly' | 'yearly';
}

/** A job listing */
export interface Job {
  id: string;
  companyName: string;
  companyLogoUrl: string | null;
  title: MultilingualText;
  description: MultilingualText;
  requirements: MultilingualText;
  salary: SalaryInfo;
  location: string;
  prefecture: string;
  employmentType: EmploymentType;
  visaTypes: ResidenceStatus[];
  industry: string;
  requiredLevel: JlptLevel | null;
  benefits: MultilingualText | null;
  isActive: boolean;
  isMediflow: boolean;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

/** Job with nested relations */
export interface JobWithRelations extends Job {
  applications: JobApplication[];
  savedBy: SavedJob[];
}

/** A user's application to a job */
export interface JobApplication {
  id: string;
  userId: string;
  jobId: string;
  status: ApplicationStatus;
  resumeUrl: string | null;
  coverLetter: string | null;
  appliedAt: Date;
  updatedAt: Date;
}

/** Job application with the related job data */
export interface JobApplicationWithJob extends JobApplication {
  job: Job;
}

/** A saved/bookmarked job */
export interface SavedJob {
  id: string;
  userId: string;
  jobId: string;
  createdAt: Date;
}

/** Saved job with the related job data */
export interface SavedJobWithJob extends SavedJob {
  job: Job;
}
