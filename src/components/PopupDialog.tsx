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
    <div className="fixed z-50 inset-0 overflow-y-auto popup-dialog">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl">
          <div className="p-4">
            <button className="float-right m-4 text-gray-600 hover:text-gray-800 focus:outline-none" onClick={onClose}>
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{student.name}</h2>
            <img src={student.avatarURL} alt={student.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
            <p className="text-gray-600 mb-4">
              Lectures Attended: {student.lecturesAttended} / Total Lectures:{' '}
              {student.totalLectures}
            </p>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Marks</h3>
            <ul>
              {Object.entries(student.marks).map(([key, value]) => (
                <li key={key} className="text-gray-700 mb-2">
                  <p className="font-medium">{value.subjectTitle}</p>
                  <p>Total Marks: {value.totalMarks}</p>
                  <p>Marks Obtained: {value.marksObtained}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupDialog;
