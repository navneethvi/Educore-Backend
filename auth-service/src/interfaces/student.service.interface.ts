import { IStudent } from "../interfaces/student.interface";
import { CreateStudentDto } from "../dtos/student.dto";

export interface IStudentService {
  createStudent(studentData: CreateStudentDto): Promise<IStudent>;
  signinStudent(email: string, password: string): Promise<IStudent | null>;
  recoverAccount(email: string): Promise<void>;
  updatePassword(email: string, newPassword: string): Promise<void>;
}