import React from 'react';
import { Student } from '../types';
import './PopupDialog.css'

interface Props {
  open: boolean;
  onClose: () => void;
  student: Student;
}

const PopupDialog: React.FC<Props> = ({ open, onClose, student }) => {
  if (!open) {
    return null;
  }

  return (
    <div className="popup-dialog">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h2>{student.name}</h2>
        <img src={student.avatarURL} alt={student.name} />
        <p>
          Lectures Attended: {student.lecturesAttended} / Total Lectures:{' '}
          {student.totalLectures}
        </p>
        <h3>Marks</h3>
        <ul>
          {Object.entries(student.marks).map(([key, value]) => (
            <li key={key}>
              <p>Subject: {value.subjectTitle}</p>
              <p>Total Marks: {value.totalMarks}</p>
              <p>Marks Obtained: {value.marksObtained}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PopupDialog;
