export interface UserProps {
  id: string;
  name: string | null;
  username: string | null;
  bio: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  coverImage: string | null;
  profileImage: string | null;
  hashedPassword: string | null;
  createdAt: Date;
  updatedAt: Date;
  followingIds: string[];
  hasNotification: boolean | null;
}

export interface User extends Omit<UserProps, 'createdAt' | 'updatedAt'> {
  followersCount?: number;
  createdAt: string | Date;
  updatedAt: string | Date;
}
