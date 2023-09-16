export interface ProfileData {
  username: string;
  bio: string;
  image?: string;
  following?: boolean;
  email?: string;
}

export interface ProfileRO {
  profile: ProfileData;
}