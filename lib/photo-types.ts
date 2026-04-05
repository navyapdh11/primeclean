// PrimeClean Photo Management Types

export type PhotoType = 'before' | 'after' | 'staff_verification' | 'quality_report' | 'damage_report';
export type PhotoStatus = 'pending' | 'processing' | 'ready' | 'failed';

export interface Photo {
  id: string;
  booking_id?: string;
  staff_id?: string;
  type: PhotoType;
  status: PhotoStatus;
  url: string;
  thumbnail_url?: string;
  file_name: string;
  file_size: number;
  width?: number;
  height?: number;
  mime_type: string;
  edit_config?: PhotoEditConfig;
  alt_text?: string;
  notes?: string;
  uploaded_by: string;
  created_at: string;
  updated_at: string;
}

export interface PhotoEditConfig {
  crop?: { x: number; y: number; width: number; height: number };
  rotation?: number;
  flip_horizontal?: boolean;
  flip_vertical?: boolean;
  edited_at: string;
  edited_by: string;
}

export interface UploadProgress {
  file_id: string;
  file_name: string;
  progress: number;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  error?: string;
  photo_id?: string;
}

export interface PhotoListResponse {
  photos: Photo[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}
