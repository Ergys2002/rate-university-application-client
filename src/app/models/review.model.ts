import {Course} from "./course.model";

export interface ReviewModel{
  userId : string;
  courseId : string;
  message : string;
  rating : number;
  createdAt: Date;
  course: Course;
}
