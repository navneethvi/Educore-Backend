// src/interfaces/student.interface.ts
import { Document } from "mongoose";

export interface IStudent extends Document {
  _id: string;
  name: string;
  email: string;
  phone: number;
  password: string;
  interests: string[];
  is_blocked?: boolean;
  image?: string;
  following?: string[];
  role: string;
  token?: string;
}

export interface INewStudent {
  name: string;
  email: string;
  phone: number;
  password: string;
  interests: string[];
  following: string[];
  role: string;
}
