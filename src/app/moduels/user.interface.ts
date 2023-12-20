import { Model } from 'mongoose';

export type Iuser = {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
  orders: {
    productName: string;
    price: number;
    quantity: number;
  }[];
};

// isUserExists
export type userMethod = {
  isUserExists(userId: string): Promise<Iuser | null>;
};

export type userModel = Model<Iuser, Record<string, never>, userMethod>;
