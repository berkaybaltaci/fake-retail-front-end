export interface UserInfo {
  userName: string | undefined;
  email: string | undefined;
}

export interface IProduct {
  id: string;
  name: string;
  imagePath: string;
  isNew: boolean;
  description: string;
}