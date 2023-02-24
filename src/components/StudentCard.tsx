import React from "react";
import {Student} from '../types';

interface Props {
  student: Student;
  onClick: Function
}

const StudentCard: React.FC<Props> = ({ student, onClick }) => {
  return (
    <div
      className="shadow-md rounded-md bg-white p-6 cursor-pointer hover:bg-gray-100 transition-all duration-200"
      onClick={() => onClick()}
    >
      <div className="flex items-center mb-4">
        <img
          src={student.avatarURL}
          alt={student.name}
          className="h-12 w-12 rounded-full object-cover mr-4"
        />
        <h2 className="text-2xl font-medium">{student.name}</h2>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-gray-500 text-sm">
          Attended: {student.lecturesAttended} / {student.totalLectures}
        </p>
        <div className="text-right">
          <h3 className="text-lg font-medium mb-2">Marks</h3>
          {Object.keys(student.marks).map((subject) => (
            <div key={subject} className="mb-2">
              <h4 className="text-sm font-medium">
                {student.marks[subject].subjectTitle}
              </h4>
              <p className="text-gray-500 text-sm">
                Obtained: {student.marks[subject].marksObtained} /{" "}
                {student.marks[subject].totalMarks}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
