export interface Student {
  name: string;
  avatarURL: string;
  lecturesAttended: number;
  totalLectures: number;
  marks: Record<string, {
    subjectTitle: string;
    totalMarks: number;
    marksObtained: number;
  }>;
}

export interface FetchStudentsParams {
  searchTerm?: string,
  limit?: number,
  skip?: number
}
