import React from 'react';

const TeacherCard = ({ teacher }) => {
 const name = `${teacher.firstName}${teacher.lastName ? ' ' + teacher.lastName : ''}`;

    
  return (
    <div className="teacher-card">
      <img src={teacher.profilePicture} alt={name} className="teacher-image"/>
      <h3>{name}</h3>
      <p>{teacher.hourlyRate} per hour</p>
      <p>{teacher.skills.join(', ')}</p>
    </div>
  );
};

export default TeacherCard;
