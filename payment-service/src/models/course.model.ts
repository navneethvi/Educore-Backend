import { Document, Schema, model, Types } from "mongoose";

interface CourseDocument extends Document {
  edited: any;
  _id: Types.ObjectId;
  title: string;
  description: string;
  category: string;
  level: string;
  thumbnail: string;
  tutor_id: Types.ObjectId | string;
  is_approved: boolean;
  enrollments: number;
  price: number;
  lessons: {
    title: string;
    goal: string;
    video: string;
    materials: string;
    homework: string;
  }[];
}

const courseSchema: Schema<CourseDocument> = new Schema({
  title: { type: String, },
  description: { type: String },
  category: { type: String },
  level: { type: String },
  thumbnail: { type: String },
  tutor_id: { type: Schema.Types.ObjectId, ref: "Tutor"},
  is_approved: { type: Boolean, default: false },
  enrollments: { type: Number, default: 0 },
  price: { type: Number },
  lessons: [{
    title: { type: String },
    goal: { type: String },
    video: { type: String },
    materials: { type: String },
    homework: { type: String },
  }],
});

const Course = model<CourseDocument>("Course", courseSchema);

export default Course;

export { CourseDocument };