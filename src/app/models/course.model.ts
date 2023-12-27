export interface Course{
  id: string;
  description: string;
  available: boolean;
  title: string;
  lecturerId: string;
  totalQuotes: number;
  courseRating : number;
  startDate: Date;
  endDate: Date;
  enrolledStudents:number
  picture: string;
}


