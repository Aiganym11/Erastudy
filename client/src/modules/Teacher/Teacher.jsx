import React from 'react';

const TeacherCard = ({ teacher }) => {
  return (
    <div className="teacher-card">
      <img src={teacher.imageUrl} alt={teacher.name} className="teacher-image"/>
      <h3>{teacher.name}</h3>
      <p>{teacher.hourlyWage} per hour</p>
      <p>{teacher.skills.join(', ')}</p>
    </div>
  );
};

export default TeacherCard;
