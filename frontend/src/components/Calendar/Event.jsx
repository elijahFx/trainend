import React, { useState } from "react";
import styled from "styled-components";
import {
  useDeleteEventMutation,
  useToggleIsDoneMutation,
} from "../../apis/eventApi";

const EventWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 50px;
  height: auto;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
  background-color: ${({ importance, isDone }) =>
    isDone
      ? "lightgreen"
      : importance === "high"
      ? "#FF4343"
      : importance === "medium"
      ? "#E2E272"
      : importance === "low"
      ? "#90EE90"
      : "wheat"};
  border: 1px solid black;
  margin-top: 3px;
  position: relative;
  padding: 10px;
  cursor: pointer;
  transition: height 0.3s ease;
  opacity: ${({ isDone }) => (isDone ? 0.75 : 1)};
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  display: flex;
  gap: 5px;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: red;
  &:hover {
    color: darkred;
  }
`;

const DoneCheckbox = styled.span`
  cursor: pointer;
  font-size: 16px;
  color: green;
`;

const DateTime = styled.p`
  font-size: 12px;
  font-style: italic;
  margin: 0;
`;

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 100%;
  overflow: hidden; // Hide the overflowed description
`;

const DescriptionText = styled.p`
  margin: 0;
  white-space: nowrap; // Prevent wrapping of description initially
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  user-select: none;
`;

const FullDescription = styled.p`
  margin: 0;
  white-space: normal;
  user-select: none;
`;

export default function Event({
  description,
  date,
  time,
  importance,
  isDone,
  num,
  id,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const [toggleIsDone] = useToggleIsDoneMutation();

  // Handle toggle of expanded description
  const handleClick = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const [deleteEvent] = useDeleteEventMutation();

  // Truncate description after 5 words with ellipsis
  const truncatedDescription = description.split(" ").slice(0, 5).join(" ");
  const remainingDescription = description
    .slice(truncatedDescription.length)
    .trim();

  async function handleDelete() {
    try {
      await deleteEvent(id).unwrap();
    } catch (error) {
      console.log(`Ошибка ${error}`);
    }
  }

  async function handleDone() {
    await toggleIsDone({ id: id, isDone: !isDone }).unwrap();
  }

  return (
    <EventWrapper
      importance={importance}
      isDone={isDone}
      $isExpanded={isExpanded}
      onClick={handleClick}
    >
      <ButtonWrapper>
        <DoneCheckbox onClick={handleDone}>{isDone ? "✔️" : "✅"}</DoneCheckbox>
        <Button onClick={handleDelete}>🗑️</Button>
      </ButtonWrapper>
      <DateTime>
        {new Date(date).toLocaleDateString("ru-RU")} - {time}
      </DateTime>
      <DescriptionWrapper>
        <DescriptionText>
          {num}. {truncatedDescription}
          {remainingDescription && !isExpanded && "..."}
        </DescriptionText>
        {isExpanded && (
          <FullDescription>{remainingDescription}</FullDescription>
        )}
      </DescriptionWrapper>
    </EventWrapper>
  );
}
