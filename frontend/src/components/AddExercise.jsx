import React, { useState } from "react";

export default function AddExercise() {
  const [exerciseType, setExerciseType] = useState("");
  const [exerciseName, setExerciseName] = useState("");
  const [sets, setSets] = useState("");
  const [repsOrTime, setRepsOrTime] = useState("");
  const [weight, setWeight] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Call your RTK Query mutation here to create an exercise
    console.log({
      exerciseType,
      exerciseName,
      sets,
      repsOrTime,
      weight,
    });
    // Reset form fields
    setExerciseType("");
    setExerciseName("");
    setSets("");
    setRepsOrTime("");
    setWeight("");
  };

  return (
    <div className="form-container">
      <form className="exercise-form" onSubmit={handleFormSubmit}>
        <h2>Добавить упражнение</h2>
        <div className="form-group">
          <label htmlFor="exerciseType">Тип упражнения</label>
          <select
            id="exerciseType"
            value={exerciseType}
            onChange={(e) => setExerciseType(e.target.value)}
            required
          >
            <option value="">Выберите тип</option>
            <option value="strength">На повторения</option>
            <option value="cardio">На время</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="exerciseName">Название упражнения</label>
          <input
            type="text"
            id="exerciseName"
            value={exerciseName}
            onChange={(e) => setExerciseName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="sets">Подходы</label>
          <input
            type="number"
            id="sets"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="repsOrTime">
            {exerciseType === "cardio" ? "Время (мин)" : "Повторения"}
          </label>
          <input
            type="number"
            id="repsOrTime"
            value={repsOrTime}
            onChange={(e) => setRepsOrTime(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="weight">Вес (кг)</label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Добавить упражнение
        </button>
      </form>
    </div>
  );
}
