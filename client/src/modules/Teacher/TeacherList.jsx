import React, { useState, useEffect } from 'react';
import TeacherCard from '../Teacher/Teacher';
import Pagination from '../Pagination/Pagination';

export const TeachersList = () => {
  const [teachers, setTeachers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchTeachers = async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const data = {
          teachers: [
            { id: 1, name: 'John Doe', hourlyWage: '$50', skills: ['Math', 'Physics'], imageUrl: 'https://via.placeholder.com/150' },
            { id: 2, name: 'Jane Smith', hourlyWage: '$40', skills: ['Chemistry', 'Biology'], imageUrl: 'https://via.placeholder.com/150' },
            { id: 3, name: 'Alice Johnson', hourlyWage: '$45', skills: ['History', 'Geography'], imageUrl: 'https://via.placeholder.com/150' },
          ],
          totalPages: 3
        };
      
        setTeachers(data.teachers);
        setTotalPages(data.totalPages);
    };

    fetchTeachers();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      {teachers.map(teacher => (
        <TeacherCard key={teacher.id} teacher={teacher} />
      ))}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

