export type ApplicationStatus = 'new' | 'in_progress' | 'completed' | 'cancelled';

export interface ApplicationInsert {
  name: string;
  email?: string;
  phone: string;
  message: string;
}

export interface ApplicationRow {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  message: string;
  status: ApplicationStatus;
  created_at: string;
}

// News types
export interface NewsInsert {
  title: string;
  slug: string;
  content: string;
  preview_text: string;
  preview_image?: string;
  tags?: string[];
  published?: boolean;
}

export interface NewsRow {
  id: string;
  title: string;
  slug: string;
  content: string;
  preview_text: string;
  preview_image: string | null;
  tags: string[];
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface NewsUpdate {
  title?: string;
  slug?: string;
  content?: string;
  preview_text?: string;
  preview_image?: string | null;
  tags?: string[];
  published?: boolean;
}

export interface Database {
  public: {
    Tables: {
      applications: {
        Row: ApplicationRow;
        Insert: ApplicationInsert;
        Update: Partial<ApplicationInsert & { status: ApplicationStatus }>;
      };
      news: {
        Row: NewsRow;
        Insert: NewsInsert;
        Update: NewsUpdate;
      };
    };
  };
}
