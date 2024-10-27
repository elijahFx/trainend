import React, { useState } from "react";
import { useAddExerciseMutation } from "../apis/exerciseApi";

export default function AddExercise() {
  // Form state
  const [exerciseType, setExerciseType] = useState("");
  const [exerciseName, setExerciseName] = useState("");
  const [sets, setSets] = useState("");
  const [repsOrTime, setRepsOrTime] = useState("");
  const [weight, setWeight] = useState("");

  // RTK Query Mutation Hook
  const [addExercise] = useAddExerciseMutation();

  // Form submission handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the mutation function to create a new exercise
      await addExercise({
        type: exerciseType,
        name: exerciseName,
        sets: parseInt(sets, 10),
        reps: parseInt(repsOrTime, 10),
        weight: parseFloat(weight),
        time: 3123,
        dateOfChange: "daewqe41231",
        progress: "dasdadd",
        user_id: "3123123dfasdasd"
      }).unwrap(); // `.unwrap()` helps to handle errors easily

      // Reset form fields
      setExerciseType("");
      setExerciseName("");
      setSets("");
      setRepsOrTime("");
      setWeight("");

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
