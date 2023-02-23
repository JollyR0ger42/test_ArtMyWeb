import React from "react";
import {Student} from '../types';

const avaClass = {
  width: '40px',
  height: '40px',
}

const rootClass = {
  padding: '10px',
  border: '#000 solid 1px'
}

interface Props {
  student: Student;
}

const StudentCard: React.FC<Props> = ({ student }) => {
  return (
    <div style={rootClass}>
      <h2>{student.name}</h2>
      <img style={avaClass} src={student.avatarURL} alt={student.name} />
      <p>
        Attended: {student.lecturesAttended} / {student.totalLectures}
      </p>
      <h3>Marks</h3>
      {Object.keys(student.marks).map((subject) => (
        <div key={subject}>
          <h4>{student.marks[subject].subjectTitle}</h4>
          <p>
            Obtained: {student.marks[subject].marksObtained} /{" "}
            {student.marks[subject].totalMarks}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StudentCard;
