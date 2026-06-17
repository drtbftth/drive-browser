import { useQuery } from '@tanstack/react-query';
import { DriveFile, DriveStats } from '@/lib/drive';

interface FilesResponse {
  files: DriveFile[];
  stats: DriveStats;
}

export function useFiles() {
  return useQuery<FilesResponse>({
    queryKey: ['drive-files'],
    queryFn: async () => {
      const res = await fetch('/api/files');
      if (!res.ok) {
        throw new Error('Failed to fetch files');
      }
      return res.json();
    },
  });
}
