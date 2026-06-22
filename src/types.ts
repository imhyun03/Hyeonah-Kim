/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AnalyticsEvent {
  id: string;
  timestamp: string;
  path: string;
  eventType: 'pageview' | 'click' | 'hover' | 'contact_submit';
  elementId?: string;
  elementText?: string;
  sessionToken: string;
  device: {
    browser: string;
    os: string;
    isMobile: boolean;
    screen: string;
  };
  referrer: string;
}

export interface ContactSubmission {
  id: string;
  timestamp: string;
  name: string;
  organization: string;
  role: string;
  email: string;
  phone: string;
  category: 'consulting' | 'lecture' | 'partnership' | 'other';
  message: string;
  status: 'pending' | 'reviewed';
}

export interface ProgramItem {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  description: string;
  features: string[];
  target: string;
  process: string[];
}

export interface TrackRecordItem {
  id: string;
  client: string;
  category: 'government' | 'education' | 'local' | 'university';
  programTitle: string;
  activityType: string;
  year: string;
  achievement: string;
  logoInitial: string;
}

export interface DashboardMetric {
  title: string;
  value: string;
  change: string;
  subtext: string;
  iconName: string;
}
