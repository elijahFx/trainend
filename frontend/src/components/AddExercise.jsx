import React, { useState } from "react";
import { useAddExerciseMutation } from "../apis/exerciseApi";
import { nanoid } from "nanoid";
import getFormattedDateTime from "../utils/dates";
import { useSelector } from "react-redux";

export default function AddExercise() {
  // Form state
  const [exerciseType, setExerciseType] = useState("");
  const [exerciseName, setExerciseName] = useState("");
  const [sets, setSets] = useState("");
  const [repsOrTime, setRepsOrTime] = useState("");
  const [weight, setWeight] = useState("");
  const [time, setTime] = useState("");

  const user_id = useSelector((state) => state?.auth?.user?.id);
  

  // RTK Query Mutation Hook
  const [addExercise] = useAddExerciseMutation();

  const exMap = { "На повторения": "countable", "На время": "time" };

  function handleChange(e) {
    setExerciseType(e.target.value);
  }

  // Form submission handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the mutation function to create a new exercise
      await addExercise({
        type: exMap[exerciseType],
        name: exerciseName,
        sets: parseInt(sets, 10),
        reps:
          exerciseType === "На повторения" ? parseInt(repsOrTime, 10) : null,
        weight: exerciseType === "На повторения" ? parseFloat(weight) : null,
        time: exerciseType === "На время" ? parseInt(time, 10) : null,
        dateOfChange: getFormattedDateTime(),
        progress: "dasdadd",
        user_id: user_id,
        id: nanoid(),
      }).unwrap(); // `.unwrap()` helps to handle errors easily

      // Reset form fields
      setExerciseType("");
      setExerciseName("");
      setSets("");
      setRepsOrTime("");
      setWeight("");
      setTime("");

      console.log("Exercise added successfully");
    } catch (error) {
      console.error("Error adding exercise:", error);
    }
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
            onChange={(e) => handleChange(e)}
            required
          >
            <option value="">Выберите тип</option>
            <option value="На повторения">На повторения</option>
            <option value="На время">На время</option>
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

        {/* Conditionally render inputs based on exerciseType */}
        {exerciseType === "На повторения" && (
          <>
            <div className="form-group">
              <label htmlFor="repsOrTime">Повторения</label>
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
          </>
        )}

        {exerciseType === "На время" && (
          <div className="form-group">
            <label htmlFor="time">Время (мин)</label>
            <input
              type="number"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
        )}

        <button type="submit" className="submit-btn">
          Добавить упражнение
        </button>
      </form>
    </div>
  );
}
