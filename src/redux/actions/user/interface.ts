export interface AddAffiliateType {
  profilePicture: string;
  bio: string;
  username: string;
  email: string;
  password: string;
  paypalEmail: string;
  linkToPlatform?: string;
}

export interface UploadedFileType {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  path: string;
  size: number;
  filename: string;
}
