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

export interface Database {
  public: {
    Tables: {
      applications: {
        Row: ApplicationRow;
        Insert: ApplicationInsert;
        Update: Partial<ApplicationInsert & { status: ApplicationStatus }>;
      };
    };
  };
}

