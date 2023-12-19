export interface Course{
  id: string;
  description: string;
  available: boolean;
  title: string;
  lecturerId: string;
  totalQuotes: number;
  freeQuotes: number
  courseRating : number;
  startDate: Date;
  endDate: Date;
  enrolledStudents:number
}
