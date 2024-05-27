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
    { id: 'b1', title: ['Advanced Writing Techniques', 'Advanced Writing Techniques', 'Advanced Writing Techniques'], price: 1000, description: 'Explore advanced concepts in writing and editing.', images: [
      'data:image/jpeg;base64,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'
    ] },
    { id: 'b2', title: ['Creative Writing Essentials', 'Creative Writing Essentials', 'Creative Writing Essentials'], price: 1000, description: 'A foundational course for aspiring writers.', images: [
      'data:image/jpeg;base64,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'
    ] }
  ],
  courses: [
    { id: 'c1', title: ['Creative Writing Workshop', 'Creative Writing Workshop', 'Creative Writing Workshop'], 
    price: 10000, description: 'Hands-on workshop for improving your writing.', images: ['https://images.unsplash.com/photo-1534774592507-488885376ad3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8N3wzMjg4NzcwfHxlbnwwfHx8fHw%3D'] },
    { id: 'c2', title: ['Editing Masterclass', 'Editing Masterclass', 'Editing Masterclass'], 
    price: 20000, description: 'Learn editing from a professional.', images: ['data:image/jpeg;base64,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'] }
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
