export interface UserProps {
  id: string;
  name: string | null;
  username: string | null;
  bio: string | null;
  email: string | null;
  emailVerified: string | null;
  image: string | null;
  coverImage: string | null;
  profileImage: string | null;
  hashedPassword: string | null;
  createdAt: string;
  updatedAt: string;
  followingIds: string[];
  hasNotification: boolean | null;
}
