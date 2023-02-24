import axios, { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Student } from '../types'

const instance: AxiosInstance = axios.create();

const mock: MockAdapter = new MockAdapter(instance);

function generateStudents(amount: number): Student[] {
  const students: Student[] = [];
  for (let i = 0; i < amount; i++) {
    students.push({
      name: `Student ${i}`,
      avatarURL: 'https://loremflickr.com/300/300',
      lecturesAttended: Math.floor(Math.random() * 20) + 1,
      totalLectures: 30,
      marks: {
        math: {
          subjectTitle: "Introduction to mathematics",
          totalMarks: 100,
          marksObtained: Math.floor(Math.random() * 100) + 1,
        }
      },
    });
  }
  return students
}

// mock the GET request to /students with query parameters
mock.onGet('/students').reply((config) => {
  const students = generateStudents(1000)
  const searchTerm: string | undefined = config.params?.searchTerm?.toString();
  const limit: number = config.params?.limit ? parseInt(config.params?.limit.toString()) : 20;
  const skip: number = config.params?.skip ? parseInt(config.params?.skip.toString()) : 0;
  console.log('mock.onGet', config.params)

  const filteredStudents: Student[] = searchTerm
    ? students.filter((student: Student) => student.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : students;

  const totalRecords: number = filteredStudents.length;

  const pagedStudents: Student[] = filteredStudents.slice(skip, skip + limit);

  return [
    200, { "totalRecords": totalRecords, "students": pagedStudents }
  ]
});

export default instance;
