export interface IUser {
  name: string;
  username: string;
  email: string;
  phone: number | string;
  address: IUserAddress;
}

export interface IUserAddress {
  street?: string;
  suite?: string;
  city?: string;
  zipcode?: string;
}

export interface IUserResponse extends IUser {
  id: number;
}

export interface ITodo {
  id?: number | string;
  title: string;
  userId: number;
  completed: boolean;
}
