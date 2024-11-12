import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled, { keyframes } from "styled-components";
import Event from "./Event"; // Assuming Event is defined elsewhere
import NoEvents from "./NoEvents";
import { useAddEventMutation, useGetEventsQuery } from "../../apis/eventApi";
import { nanoid } from "nanoid";
import { useSelector } from "react-redux";

const CalendarWrapper = styled.div`
  display: flex;
  gap: 20px;
  height: 75vh;
  min-height: 75vh;
  padding: 10px 40px;
`;

const Section = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledButton = styled.button`
  padding: 10px 15px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const StyledSelect = styled.select`
  padding: 8px;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const StyledInput = styled.input`
  padding: 8px;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const StyledLabel = styled.label`
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const EventsList = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
  width: 100%;
  text-align: center;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const EventForm = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const CalendarContainer = styled.div`
  .today-tile {
    background-color: white;
    border: 1px solid black !important;
  }
 

  .highlight-tile {
    color: white !important;
    font-weight: bold;
    box-shadow: 0px 0px 10px;
    animation: ${fadeIn} 0.3s ease-out;
  }
  .low-importance {
    background-color: lightgreen !important;
  }
  .medium-importance {
    background-color: rgb(226, 226, 114) !important;
  }
  .high-importance {
    background-color: rgb(255, 67, 67) !important;
  }
`;

const LegendContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
`;

const ColorSquare = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background-color: ${({ color }) => color};
  ${({ border }) => border && `border: 1px solid black;`}
`;

export default function CalendarList() {
  const user_id = useSelector((state) => state?.auth?.user?.id);

  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventInput, setEventInput] = useState({
    date: "",
    description: "",
    time: "",
    importance: "low",
  });

  const { data, isLoading, error, refetch } = useGetEventsQuery();

  const [addEvent] = useAddEventMutation();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      refetch();
    }
  }, [isLoggedIn, refetch]);

  useEffect(() => {
    setEvents(data);
  }, [data]);

  const handleAddEvent = async (e) => {
    e.preventDefault();
    if (eventInput.date && eventInput.description && eventInput.time) {
      try {
        await addEvent({
          id: nanoid(),
          user_id: user_id,
          date: eventInput.date,
          time: eventInput.time,
          description: eventInput.description,
          importance: eventInput.importance,
        }).unwrap();

        setEventInput({
          date: "",
          description: "",
          time: "",
          importance: "low",
        });
      } catch (error) {
        console.log(`У нас серьезная ошибка: ${error}`);
      }
    }
  };

  const handleDateClick = (date) => {
    const localDateString = date.toLocaleDateString("en-CA");
    setSelectedDate(localDateString);
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const addHighlightClass = ({ date, view }) => {
    if (view !== "month") return null;

    const today = new Date();
    const isToday = isSameDay(date, today);

    // Find events for the specific date
    const eventsForDate = events?.filter((event) =>
      isSameDay(new Date(event.date), date)
    );

    // Determine the highest importance level for the date
    let importanceClass = "";
    if (eventsForDate.length > 0) {
      const importanceLevels = ["low", "medium", "high"];
      const highestImportance = eventsForDate.reduce((prev, curr) =>
        importanceLevels.indexOf(curr.importance) >
        importanceLevels.indexOf(prev.importance)
          ? curr
          : prev
      ).importance;

      importanceClass = `${highestImportance}-importance`;
    }

    // Add the "today-tile" class if it's today, otherwise just return the importance class
    return isToday ? `today-tile ${importanceClass}` : importanceClass;
  };

  return (
    <CalendarWrapper>
      {/* Event Form Section */}
      <Section>
        <h3>Добавление события</h3>
        <EventForm onSubmit={handleAddEvent}>
          <StyledLabel>
            Дата события:
            <StyledInput
              type="date"
              value={eventInput.date}
              onChange={(e) =>
                setEventInput({ ...eventInput, date: e.target.value })
              }
              required
            />
          </StyledLabel>
          <StyledLabel>
            Описание события:
            <StyledInput
              type="text"
              value={eventInput.description}
              onChange={(e) =>
                setEventInput({ ...eventInput, description: e.target.value })
              }
              required
            />
          </StyledLabel>
          <StyledLabel>
            Время события:
            <StyledInput
              type="time"
              value={eventInput.time}
              onChange={(e) =>
                setEventInput({ ...eventInput, time: e.target.value })
              }
              required
            />
          </StyledLabel>
          <StyledLabel>
            Важность события:
            <StyledSelect
              value={eventInput.importance}
              onChange={(e) =>
                setEventInput({ ...eventInput, importance: e.target.value })
              }
            >
              <option value="low">Малая важность</option>
              <option value="medium">Средняя важность</option>
              <option value="high">Большая важность</option>
            </StyledSelect>
          </StyledLabel>
          <StyledButton type="submit">Добавить событие</StyledButton>
        </EventForm>
      </Section>

      {/* Calendar Section */}
      <Section>
        <h3>Календарь</h3>
        <CalendarContainer>
          <Calendar
            onClickDay={handleDateClick}
            tileClassName={addHighlightClass}
          />
        </CalendarContainer>

        <LegendContainer>
          <LegendItem>
            <ColorSquare color="white" border="1" />
            Сегодняшний день
          </LegendItem>
          <LegendItem>
            <ColorSquare color="lightgreen" />
            Малая важность
          </LegendItem>
          <LegendItem>
            <ColorSquare color="rgb(226, 226, 114)" />
            Средняя важность
          </LegendItem>
          <LegendItem>
            <ColorSquare color="red" />
            Большая важность
          </LegendItem>
        </LegendContainer>
      </Section>

      {/* Events List Section */}
      <Section>
        <h3>
          События на{" "}
          {new Date(selectedDate).toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </h3>
        <EventsList>
          {events?.filter((event) => event.date === selectedDate).length > 0 ? (
            events
              .filter((event) => event.date === selectedDate)
              .sort((a, b) => a.time.localeCompare(b.time))
              .map((event, indx) => (
                <Event num={indx + 1} key={event.id} {...event} />
              ))
          ) : (
            <NoEvents /> // Отображаем NoEvents, если нет событий
          )}
        </EventsList>
      </Section>
    </CalendarWrapper>
  );
}
