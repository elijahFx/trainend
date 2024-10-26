import React, { useState, useEffect } from "react";
import { useDeleteExerciseMutation, useEditExerciseMutation } from "../apis/exerciseApi"; // Import the mutation hooks

// Debounce function
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default function Exercise({
  id, // Make sure to pass the exercise ID to this component
  name,
  reps,
  sets,
  timeOfChange,
  weight,
  type,
  user_id,
  time,
  num,
}) {
  const typeOfExercise = type === "countable" ? "На повторения" : "На время";

  // Local state to manage sets, reps, weight, and time
  const [currentSets, setCurrentSets] = useState(sets);
  const [currentReps, setCurrentReps] = useState(reps);
  const [currentWeight, setCurrentWeight] = useState(weight);
  const [currentTime, setCurrentTime] = useState(time);

  // Use the deleteExercise and editExercise mutation hooks
  const [deleteExercise] = useDeleteExerciseMutation();
  const [editExercise] = useEditExerciseMutation();

  // Debounce the changes
  const debouncedSets = useDebounce(currentSets, 500);
  const debouncedReps = useDebounce(currentReps, 500);
  const debouncedWeight = useDebounce(currentWeight, 500);
  const debouncedTime = useDebounce(currentTime, 500);

  // Effect to handle editing the exercise when debounced values change
  useEffect(() => {
    const updateExercise = async () => {
      try {
        await editExercise({ id, sets: debouncedSets, reps: debouncedReps, weight: debouncedWeight, time: debouncedTime }).unwrap();
        console.log("Упражнение обновлено");
      } catch (error) {
        console.error("Ошибка обновления упражнения:", error);
      }
    };

    updateExercise();
  }, [debouncedSets, debouncedReps, debouncedWeight, debouncedTime, id, editExercise]);

  // Handlers for increasing/decreasing sets, reps, weight, and time
  const increaseSets = () => setCurrentSets((prev) => prev + 1);
  const decreaseSets = () => setCurrentSets((prev) => (prev > 1 ? prev - 1 : 1));
  const increaseReps = () => setCurrentReps((prev) => prev + 1);
  const decreaseReps = () => setCurrentReps((prev) => (prev > 1 ? prev - 1 : 1));
  const increaseWeight = () => setCurrentWeight((prev) => prev + 0.5); // Increment weight by 0.5 kg/lbs
  const decreaseWeight = () => setCurrentWeight((prev) => (prev > 0 ? prev - 0.5 : 0)); // Decrement weight by 0.5 kg/lbs, no negative weight
  const increaseTime = () => setCurrentTime((prev) => prev + 1); // Increment time by 1 minute
  const decreaseTime = () => setCurrentTime((prev) => (prev > 1 ? prev - 1 : 1)); // Decrement time, minimum 1 minute

  // Handler for deleting the exercise
  const handleDelete = async () => {
    try {
      await deleteExercise(id).unwrap(); // Call the deleteExercise mutation with the exercise ID
      console.log("Упражнение удалено");
    } catch (error) {
      console.error("Ошибка удаления упражнения:", error);
    }
  };

  return (
    <div className="exercise-card">
      <button onClick={handleDelete} className="delete-button">
        ❌
      </button>
      <div className="exercise-header">
        <h3>
          {num + 1}. {name}
        </h3>
      </div>
      <div className="exercise-details">
        {type === "countable" ? (
          <>
            <div className="exercise-info">
              <span className="label">Подходы:</span>
              <div className="value-with-arrows">
                <button onClick={increaseSets} className="arrow-button">
                  ▲
                </button>
                <span className="value">{currentSets}</span>
                <button onClick={decreaseSets} className="arrow-button">
                  ▼
                </button>
              </div>
            </div>
            <div className="exercise-info">
              <span className="label">Повторения:</span>
              <div className="value-with-arrows">
                <button onClick={increaseReps} className="arrow-button">
                  ▲
                </button>
                <span className="value">{currentReps}</span>
                <button onClick={decreaseReps} className="arrow-button">
                  ▼
                </button>
              </div>
            </div>
            <div className="exercise-info">
              <span className="label">Вес:</span>
              <div className="value-with-arrows">
                <button onClick={increaseWeight} className="arrow-button">
                  ▲
                </button>
                <span className="value">{currentWeight} кг.</span>
                <button onClick={decreaseWeight} className="arrow-button">
                  ▼
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="exercise-info">
            <span className="label">Время:</span>
            <div className="value-with-arrows">
              <button onClick={increaseTime} className="arrow-button">
                ▲
              </button>
              <span className="value">{currentTime} минут</span>
              <button onClick={decreaseTime} className="arrow-button">
                ▼
              </button>
            </div>
          </div>
        )}
        <div className="exercise-info">
          <span className="label">Тип упражнения:</span>
          <span className="value">{typeOfExercise}</span>
        </div>
        <div className="exercise-info">
          <span className="label">Последнее изменение: </span>
          <span className="value"> {`${timeOfChange}`}</span>
        </div>
      </div>
    </div>
  );
}
