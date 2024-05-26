import React, { useEffect, useState } from "react";
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import cl from "./AuthorProfile.module.css";
import { Icon } from "../../components/UI/Icon/Icon.jsx";
import { useParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AuthorProducts } from "../../modules/AuthorProducts/AuthorProducts.jsx";
import { EditModalForm } from "../../modules/EditModalForm/EditModalForm.jsx";
import Modal from 'react-modal';

const mockAuthor = {
  profilePicture: "https://via.placeholder.com/150",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phoneNumber: "123-456-7890",
  age: 35,
  averageRating: 4.5,
  hourlyRate: 50,
  skills: ["Writing", "Editing", "Content Creation"],
  books: [
    { id: 'b1', title: 'Advanced Writing Techniques', description: 'Explore advanced concepts in writing and editing.' },
    { id: 'b2', title: 'Creative Writing Essentials', description: 'A foundational course for aspiring writers.' }
  ],
  courses: [
    { id: 'c1', title: 'Creative Writing Workshop', description: 'Hands-on workshop for improving your writing.' },
    { id: 'c2', title: 'Editing Masterclass', description: 'Learn editing from a professional.' }
  ],
  schedule: [
    { date: '2024-06-01', slots: ['10:00 AM', '11:00 AM', '1:00 PM'] },
    { date: '2024-06-02', slots: ['9:00 AM', '12:00 PM', '2:00 PM'] }
  ]
};

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className={cl.stars}>
      {'★'.repeat(fullStars)}
      {halfStar && '☆'}
      {'☆'.repeat(emptyStars)}
    </div>
  );
};

const localizer = momentLocalizer(moment);

const AuthorProfile = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { id } = useParams();
  const [author, setAuthor] = useState(mockAuthor); 
  const [activeTab, setActiveTab] = useState(location?.state?.url === "courses" ? "courses" : "books");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const getInitials = (name) => {
    return name ? name.split(" ").map(n => n[0]).join("").toUpperCase() : "";
  };

  const events = author.schedule.flatMap(day =>
    day.slots.map(slot => ({
      title: "Teaching",
      start: moment(`${day.date} ${slot}`, "YYYY-MM-DD hh:mm A").toDate(),
      end: moment(`${day.date} ${slot}`, "YYYY-MM-DD hh:mm A").add(1, 'hours').toDate()
    }))
  );

  useEffect(() => {

    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAuthor(mockAuthor);
    };

    loadData();
  }, [id]);

  const handleHireClick = () => {
    setIsHireModalOpen(true);
  };

  const handleHireSubmit = () => {
    console.log(`Hiring ${author.firstName} ${author.lastName} on ${selectedDate} at ${selectedSlot} for ${selectedLesson}`);
    setIsHireModalOpen(false);
  };

  return (
    <div className={cl.root}>
      <div className={cl.bg} />
      <div className={cl.wrapper}>
        <div className={cl.main}>
          <div className={cl.leftSide}>
            <div className={cl.block}>
              <div className={cl.avatar}>
                {author.profilePicture ? (
                  <img src={author.profilePicture} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div className={cl.iconText}>{getInitials(`${author.firstName} ${author.lastName}`)}</div>
                )}
              </div>
              <div className={cl.name}>{`${author.firstName} ${author.lastName}`}</div>
              <div className={cl.email}>
                <Icon name='email' />
                <span className={cl.text}>{author.email}</span>
              </div>
              <div className={cl.phone}>
                <Icon name='phone' />
                <span className={cl.text}>{author.phoneNumber}</span>
              </div>
              <div className={cl.detail}>{`Age: ${author.age}`}</div>
              <div className={cl.detail}>
                Rating: <StarRating rating={author.averageRating} />
              </div>
              <div className={cl.detail}>{`Hourly Rate: $${author.hourlyRate}`}</div>
              <div className={cl.skills}>
                {author.skills.map(skill => <div key={skill} className={cl.skill}>{skill}</div>)}
              </div>
              <button onClick={handleHireClick} className={cl.hireButton}>Hire Me</button>
            </div>
            {isEditModalOpen && (
              <EditModalForm onClose={() => setIsEditModalOpen(false)} />
            )}
          </div>
          <div className={cl.rightSide}>
            <div className={cl.switch}>
              <div
                className={`${cl.switchText} ${activeTab === "books" ? cl.active : ""}`}
                onClick={() => setActiveTab("books")}
              >
                Books
              </div>
              <div
                className={`${cl.switchText} ${activeTab === "courses" ? cl.active : ""}`}
                onClick={() => setActiveTab("courses")}
              >
                Courses
              </div>
            </div>
            <div className={cl.content}>
              {activeTab === "books" && <AuthorProducts isLoading={false} products={author.books} />}
              {activeTab === "courses" && <AuthorProducts isLoading={false} products={author.courses} />}
              <div className={cl.calendar}>
                <h3>Teacher Calendar</h3>
                <Calendar
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: 500 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isHireModalOpen}
        onRequestClose={() => setIsHireModalOpen(false)}
        className={cl.modal}
        overlayClassName={cl.overlay}
      >
        <h2>Hire {author.firstName} {author.lastName}</h2>
        <div className={cl.modalContent}>
          <label>
            Select Date:
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </label>
          <label>
            Select Time Slot:
            <select value={selectedSlot} onChange={(e) => setSelectedSlot(e.target.value)}>
              <option value="">Select Time Slot</option>
              {author.schedule.flatMap(day => day.slots.map(slot => (
                <option key={`${day.date}-${slot}`} value={`${day.date} ${slot}`}>{`${day.date} ${slot}`}</option>
              )))}
            </select>
          </label>
          <label>
            Select Lesson:
            <select value={selectedLesson} onChange={(e) => setSelectedLesson(e.target.value)}>
              <option value="">Select Lesson</option>
              {author.books.concat(author.courses).map(lesson => (
                <option key={lesson.id} value={lesson.title}>{lesson.title}</option>
              ))}
            </select>
          </label>
          <button onClick={handleHireSubmit} className={cl.submitButton}>Submit</button>
        </div>
      </Modal>
    </div>
  );
};

export { AuthorProfile };
