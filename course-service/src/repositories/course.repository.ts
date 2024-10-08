import mongoose, { Model } from "mongoose";
import { ICourseRepository } from "../interfaces/course.repository.interface";
import { CourseDocument } from "../models/course.model";
import { CourseForCard } from "../interfaces/course.interface";
import { logger } from "@envy-core/common";

class CourseRepository implements ICourseRepository {
  private readonly courseModel: Model<CourseDocument>;

  constructor(courseModel: Model<CourseDocument>) {
    this.courseModel = courseModel;
  }

  public async save(
    courseData: Partial<CourseDocument>
  ): Promise<CourseDocument> {
    const course = new this.courseModel(courseData);
    return await course.save();
  }

  public async findById(courseId: string): Promise<CourseDocument | null> {
    return await this.courseModel.findById(courseId);
  }

  public async getCoursesByTutor(
    tutor_id: string,
    page: number,
    limit: number,
    isApproved: boolean
  ): Promise<CourseDocument[] | null> {
    logger.info(
      `Fetching courses with params: tutorId: ${tutor_id}, page: ${page}, limit: ${limit}, isApproved: ${isApproved}`
    );

    return await this.courseModel
      .aggregate([
        {
          $match: {
            is_approved: isApproved,
            tutor_id: new mongoose.Types.ObjectId(tutor_id),
          },
        },
        {
          $project: {
            _id: 1,
            category: 1,
            title: 1,
            price: 1,
            thumbnail: 1,
            lessoncount: { $size: "$lessons" },
            enrollments: 1,
          },
        },
        {
          $skip: (page - 1) * limit,
        },
        {
          $limit: limit,
        },
      ])
      .exec();
  }

  public async countCoursesByTutor(
    tutor_id: string,
    isApproved: boolean
  ): Promise<number> {
    return await this.courseModel
      .find({ tutor_id: tutor_id, is_approved: isApproved })
      .countDocuments()
      .exec();
  }

  public async getAllCourses(
    isApproved: boolean,
    page: number,
    limit: number
  ): Promise<CourseForCard[]> {
    const skip = (page - 1) * limit;

    logger.info(isApproved)

    const courses = await this.courseModel
      .aggregate([
        {
          $match: { is_approved: isApproved }, // Filter by is_approved status
        },
        {
          $project: {
            _id: 1,
            title: 1,
            category: 1,
            level: 1,
            thumbnail: 1,
            tutor_id: 1,
            is_approved: 1,
            enrollments: 1,
            price: 1,
            lessons: { $size: "$lessons" },
          },
        },
        { $skip: skip },
        { $limit: limit },
      ])
      .exec();

    return courses;
  }

  public async getCourseDetails(
    course_id: string
  ): Promise<CourseDocument | null> {
    return this.courseModel.findOne({ _id: course_id }).exec();
  }

  public async deleteCourse(course_id: string): Promise<boolean> {
    try {
      const result = await this.courseModel.deleteOne({ _id: course_id });

      return result.deletedCount > 0;
    } catch (error) {
      console.error("Error deleting course:", error);
      return false;
    }
  }
}

export default CourseRepository;
