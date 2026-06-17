import { google } from 'googleapis';

// Interface for normalized file data
export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime?: string;
  thumbnailLink?: string;
  iconLink?: string;
  webContentLink?: string; // Direct download
  webViewLink?: string; // Open in Drive
}

export interface DriveStats {
  totalFiles: number;
  totalSize: number;
  fileTypes: Record<string, number>;
}

const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];

function getDriveService() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  let privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!clientEmail || !privateKey) {
    throw new Error('Google Drive API credentials are not set in environment variables.');
  }

  // Handle potential escaping issues with the private key
  // Remove quotes if they were included in the env variable
  privateKey = privateKey.replace(/"/g, '').replace(/\\n/g, '\n');

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
    scopes: SCOPES,
  });

  return google.drive({ version: 'v3', auth });
}

export async function getFiles(): Promise<{ files: DriveFile[], stats: DriveStats }> {
  const drive = getDriveService();
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

  if (!folderId) {
    throw new Error('GOOGLE_DRIVE_FOLDER_ID is not set.');
  }

  try {
    // We fetch files within the specified folder
    const response = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields: 'files(id, name, mimeType, size, modifiedTime, thumbnailLink, iconLink, webContentLink, webViewLink)',
      orderBy: 'modifiedTime desc',
      pageSize: 1000, // Adjust as needed or implement pagination
    });

    const files = (response.data.files || []) as DriveFile[];
    
    // Calculate stats
    let totalSize = 0;
    const fileTypes: Record<string, number> = {};

    files.forEach(file => {
      if (file.size) {
        totalSize += parseInt(file.size, 10);
      }
      
      const type = getFileType(file.mimeType);
      fileTypes[type] = (fileTypes[type] || 0) + 1;
    });

    const stats: DriveStats = {
      totalFiles: files.length,
      totalSize,
      fileTypes,
    };

    return { files, stats };
  } catch (error) {
    console.error('Error fetching files from Google Drive:', error);
    throw new Error('Failed to fetch files from Google Drive');
  }
}

export async function getFile(id: string): Promise<DriveFile> {
  const drive = getDriveService();
  
  try {
    const response = await drive.files.get({
      fileId: id,
      fields: 'id, name, mimeType, size, modifiedTime, thumbnailLink, iconLink, webContentLink, webViewLink',
    });

    return response.data as DriveFile;
  } catch (error) {
    console.error('Error fetching file details:', error);
    throw new Error('Failed to fetch file details');
  }
}

export async function getFileStream(id: string) {
  const drive = getDriveService();
  
  try {
    const response = await drive.files.get({
      fileId: id,
      alt: 'media',
    }, { responseType: 'stream' });

    return response.data;
  } catch (error) {
    console.error('Error fetching file stream:', error);
    throw new Error('Failed to fetch file stream');
  }
}

function getFileType(mimeType: string): string {
  if (mimeType.includes('pdf')) return 'PDF';
  if (mimeType.includes('word') || mimeType.includes('document')) return 'Document';
  if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return 'Spreadsheet';
  if (mimeType.includes('powerpoint') || mimeType.includes('presentation')) return 'Presentation';
  if (mimeType.startsWith('image/')) return 'Image';
  if (mimeType.startsWith('video/')) return 'Video';
  if (mimeType === 'application/vnd.google-apps.folder') return 'Folder';
  return 'Other';
}
