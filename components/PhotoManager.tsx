'use client';

import { useState, useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

interface Photo {
  id: string;
  url: string;
  thumbnail_url?: string;
  type: string;
  status: string;
  file_size: number;
  width?: number;
  height?: number;
  alt_text?: string;
  booking_id?: string;
  edit_config?: any;
  created_at: string;
}

interface UploadProgress {
  file_id: string;
  file_name: string;
  progress: number;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  error?: string;
}

interface PhotoManagerProps {
  initialPhotos: Photo[];
  bookingId?: string;
  onPhotosChange?: (photos: Photo[]) => void;
}

export default function PhotoManager({ initialPhotos, bookingId, onPhotosChange }: PhotoManagerProps) {
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos);
  const [uploads, setUploads] = useState<UploadProgress[]>([]);
  const [selectedType, setSelectedType] = useState('after');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const newUploads: UploadProgress[] = acceptedFiles.map((file) => ({
      file_id: crypto.randomUUID(),
      file_name: file.name,
      progress: 0,
      status: 'uploading',
    }));

    setUploads((prev) => [...prev, ...newUploads]);

    for (let i = 0; i < acceptedFiles.length; i++) {
      const file = acceptedFiles[i];
      const upload = newUploads[i];

      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', selectedType);
        if (bookingId) formData.append('bookingId', bookingId);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/photos/upload', false);

        await new Promise<void>((resolve, reject) => {
          xhr.upload.addEventListener('progress', (e) => {
            if (e.lengthComputable) {
              const progress = Math.round((e.loaded / e.total) * 100);
              setUploads((prev) =>
                prev.map((u) => (u.file_id === upload.file_id ? { ...u, progress } : u))
              );
            }
          });

          xhr.addEventListener('load', () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              const result = JSON.parse(xhr.responseText);
              if (result.success) {
                setUploads((prev) =>
                  prev.map((u) =>
                    u.file_id === upload.file_id
                      ? { ...u, status: 'completed' as const, photo_id: result.photo.id }
                      : u
                  )
                );
                setPhotos((prev) => [result.photo, ...prev]);
                if (onPhotosChange) onPhotosChange([result.photo, ...photos]);
                resolve();
              } else {
                reject(new Error(result.error || 'Upload failed'));
              }
            } else {
              reject(new Error('Upload failed'));
            }
          });

          xhr.addEventListener('error', () => reject(new Error('Network error')));
          xhr.send(formData);
        });
      } catch (error: any) {
        setUploads((prev) =>
          prev.map((u) =>
            u.file_id === upload.file_id
              ? { ...u, status: 'error' as const, error: error.message }
              : u
          )
        );
      }
    }

    // Clean up completed uploads after 3 seconds
    setTimeout(() => {
      setUploads((prev) => prev.filter((u) => u.status !== 'completed'));
    }, 3000);
  }, [selectedType, bookingId, onPhotosChange, photos]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
    maxSize: 10 * 1024 * 1024,
  });

  const handleDelete = async (photoId: string) => {
    if (!confirm('Delete this photo?')) return;
    setIsDeleting(photoId);

    try {
      const res = await fetch(`/api/photos/delete?photoId=${photoId}`, { method: 'DELETE' });
      const result = await res.json();

      if (result.success) {
        setPhotos((prev) => prev.filter((p) => p.id !== photoId));
        if (onPhotosChange) onPhotosChange(photos.filter((p) => p.id !== photoId));
      }
    } catch {
      alert('Failed to delete photo');
    } finally {
      setIsDeleting(null);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const statusColors: Record<string, string> = {
    ready: 'bg-green-500',
    processing: 'bg-blue-500',
    pending: 'bg-yellow-500',
    failed: 'bg-red-500',
  };

  const typeLabels: Record<string, string> = {
    before: 'Before',
    after: 'After',
    staff_verification: 'Staff ID',
    quality_report: 'Quality',
    damage_report: 'Damage',
  };

  const activeUploads = uploads.filter((u) => u.status === 'uploading' || u.status === 'processing');
  const hasErrors = uploads.some((u) => u.status === 'error');

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
        }`}
      >
        <input {...getInputProps()} />
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <p className="mt-2 text-sm text-gray-600">
          {isDragActive ? 'Drop photos here' : 'Drag & drop photos, or click to select'}
        </p>
        <p className="text-xs text-gray-500">JPEG, PNG, WebP up to 10MB</p>
      </div>

      {/* Type Selector */}
      <div className="flex items-center gap-4">
        <label htmlFor="photo-type" className="text-sm font-medium text-gray-700">Photo type:</label>
        <select
          id="photo-type"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="input max-w-xs"
        >
          {Object.entries(typeLabels).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      {/* Upload Progress */}
      {activeUploads.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Uploading...</h3>
          {activeUploads.map((upload) => (
            <div key={upload.file_id} className="flex items-center gap-3">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full transition-all"
                  style={{ width: `${upload.progress}%` }}
                />
              </div>
              <span className="text-xs text-gray-500 w-20 text-right">{upload.progress}%</span>
              <span className="text-xs text-gray-600 truncate max-w-[150px]">{upload.file_name}</span>
            </div>
          ))}
        </div>
      )}

      {/* Upload Errors */}
      {hasErrors && (
        <div className="space-y-2">
          {uploads.filter((u) => u.status === 'error').map((upload) => (
            <div key={upload.file_id} className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm flex justify-between" role="alert">
              <span>{upload.file_name}: {upload.error}</span>
            </div>
          ))}
        </div>
      )}

      {/* Photo Gallery */}
      {photos.length > 0 ? (
        <div>
          <h3 className="text-lg font-semibold mb-4">Photos ({photos.length})</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="group relative aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedPhoto(photo)}
              >
                <img
                  src={photo.thumbnail_url || photo.url}
                  alt={photo.alt_text || photo.type}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Status dot */}
                <div className={`absolute top-2 right-2 w-3 h-3 rounded-full border-2 border-white ${statusColors[photo.status] || 'bg-gray-400'}`} />

                {/* Type badge */}
                <span className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded">
                  {typeLabels[photo.type] || photo.type}
                </span>

                {/* Hover actions */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(photo.id); }}
                    disabled={isDeleting === photo.id}
                    className="p-2 bg-white rounded-full hover:bg-red-50 transition-colors disabled:opacity-50"
                    aria-label={`Delete photo ${photo.id}`}
                  >
                    {isDeleting === photo.id ? (
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="mt-2 text-gray-600">No photos uploaded yet</p>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Photo preview"
        >
          <div className="relative max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.alt_text || 'Photo preview'}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-2 right-2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70"
              aria-label="Close preview"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {selectedPhoto.alt_text && (
              <p className="mt-2 text-white text-center text-sm">{selectedPhoto.alt_text}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
