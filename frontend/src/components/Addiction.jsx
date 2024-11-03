import React, { useState, useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Importing styles for confirmation dialog
import {
  useDeleteAddictionMutation,
  useEditAddictionMutation,
} from "../apis/addictionApi";
import getFormattedDateTime from "../utils/dates";

const stages = [
  { hours: 0, label: "Первые шаги", color: "#d3d3d3" },
  { hours: 24, label: "Рекрут", color: "#8bc34a" },
  { days: 3, label: "Первый из рекрутов", color: "#4caf50" },
  { days: 7, label: "Солдат", color: "#388e3c" },
  { days: 15, label: "Сержант", color: "#009688" },
  { days: 30, label: "Старший сержант", color: "#00bcd4" },
  { months: 2, label: "Полковник", color: "#03a9f4" },
  { months: 3, label: "Генерал", color: "#3f51b5" },
  { months: 6, label: "Верховный главнокомандующий", color: "#673ab7" },
  { years: 1, label: "Легенда", color: "#9c27b0" },
];

function AddictionProgress({ name, type, id, user_id, date }) {
  const parseDate = (dateString) => {
    const [datePart, timePart] = dateString.split(" - ");
    const [day, month, year] = datePart.split(".").map(Number);
    const [hour, minute] = timePart.split(":").map(Number);
    return new Date(year, month - 1, day, hour, minute); // month is 0-indexed
  };

  const [startDate, setStartDate] = useState(
    () => parseDate(date) || new Date()
  );
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [elapsedTime, setElapsedTime] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [newAddictionName, setNewAddictionName] = useState(name || "");

  const [deleteAddiction] = useDeleteAddictionMutation();
  const [editAddiction] = useEditAddictionMutation();

  async function handleDeleteAddiction() {
    console.log("мы тут");

    try {
      await deleteAddiction(id).unwrap();
      console.log("Успешно удалено");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const updateProgress = () => {
      const now = new Date();
      const timeElapsed = now - startDate;

      let remainingTime = timeElapsed;
      const years = Math.floor(remainingTime / (365 * 24 * 60 * 60 * 1000));
      remainingTime %= 365 * 24 * 60 * 60 * 1000;
      const months = Math.floor(remainingTime / (30 * 24 * 60 * 60 * 1000));
      remainingTime %= 30 * 24 * 60 * 60 * 1000;
      const weeks = Math.floor(remainingTime / (7 * 24 * 60 * 60 * 1000));
      remainingTime %= 7 * 24 * 60 * 60 * 1000;
      const days = Math.floor(remainingTime / (24 * 60 * 60 * 1000));
      remainingTime %= 24 * 60 * 60 * 1000;
      const hours = Math.floor(remainingTime / (60 * 60 * 1000));

      setElapsedTime(
        `Твое время: ${years} лет, ${months} месяцев, ${weeks} недель, ${days} дней, ${hours} часов`
      );

      let stageIndex = 0;
      let nextStageTime = stages[0].hours * 60 * 60 * 1000;
      let currentStageTime = 0;

      for (let i = 0; i < stages.length; i++) {
        const stage = stages[i];
        currentStageTime = nextStageTime;

        if (stage.years) {
          nextStageTime = stage.years * 365 * 24 * 60 * 60 * 1000;
        } else if (stage.months) {
          nextStageTime = stage.months * 30 * 24 * 60 * 60 * 1000;
        } else if (stage.days) {
          nextStageTime = stage.days * 24 * 60 * 60 * 1000;
        } else if (stage.hours) {
          nextStageTime = stage.hours * 60 * 60 * 1000;
        }

        if (timeElapsed < nextStageTime) {
          stageIndex = i;
          break;
        }
      }

      setCurrentStageIndex(stageIndex);

      const stageStartTime = currentStageTime;
      const stageEndTime = nextStageTime;
      const percentage =
        ((timeElapsed - stageStartTime) / (stageEndTime - stageStartTime)) *
        100;
      setProgressPercentage(Math.min(100, percentage));
    };

    const interval = setInterval(updateProgress, 1000 * 60 * 10);
    updateProgress();
    return () => clearInterval(interval);
  }, [startDate]);

  const resetProgress = async () => {
    try {
      await editAddiction({ id, date: getFormattedDateTime() }).unwrap();

      setStartDate(new Date());
      setCurrentStageIndex(0);
      setProgressPercentage(0);
      setElapsedTime("Твое время: 0 лет, 0 месяцев, 0 недель, 0 дней, 0 часов");
    } catch (error) {
      console.log(error);
    }
  };

  const editProgress = () => {
    setIsEditing(!isEditing);
  };

  const saveEdit = async () => {
    console.log("тута");

    if (!newAddictionName.trim()) return; // Prevent saving empty names
    setIsEditing(false);

    await editAddiction({ id, name: newAddictionName }).unwrap();
    console.log("тута");
    console.log("Новое название привычки:", newAddictionName);
  };

  const deleteProgress = () => {
    confirmAlert({
      title: "Подтвердите удаление",
      message: "Вы уверены, что хотите удалить эту привычку?",
      buttons: [
        {
          label: "Да",
          onClick: () => {
            handleDeleteAddiction();
          },
        },
        {
          label: "Нет",
        },
      ],
    });
  };

  const currentStage = stages[currentStageIndex];
  const circleColor = currentStage.color;

  return (
    <div className="addiction-progress">
      <div
        className="circle"
        style={{
          backgroundColor: circleColor,
          borderColor: circleColor,
          background: `conic-gradient(${circleColor} ${progressPercentage}%, #d3d3d3 ${progressPercentage}%)`,
        }}
      >
        <div className="circle-content">
          {isEditing ? (
            <input
              type="text"
              value={newAddictionName}
              onChange={(e) => setNewAddictionName(e.target.value)}
              className="edit-input"
              placeholder="Введите новое название привычки" // Placeholder for better UX
            />
          ) : (
            <h3>{newAddictionName}</h3>
          )}
          <p>Твой ранг: {currentStage.label}</p>
          <p>{elapsedTime}</p>
        </div>
      </div>
      <div className="button-group">
        {isEditing ? (
          <button onClick={saveEdit} className="save-btn">
            Сохранить
          </button>
        ) : (
          <button onClick={editProgress} className="edit-btn">
            Редактировать
          </button>
        )}
        <button onClick={deleteProgress} className="delete-btn">
          Удалить
        </button>
        <button onClick={resetProgress} className="reset-btn">
          Обнулить
        </button>
      </div>
    </div>
  );
}

export default AddictionProgress;
