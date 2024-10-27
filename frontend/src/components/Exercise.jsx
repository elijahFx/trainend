import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDeleteExerciseMutation, useEditExerciseMutation } from "../apis/exerciseApi";
import debounce from "lodash/debounce"; // Import lodash debounce

export default function Exercise({
  id,
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

  const isInitialRender = useRef(true);

  // Track initial values using refs
  const initialSets = useRef(sets);
  const initialReps = useRef(reps);
  const initialWeight = useRef(weight);
  const initialTime = useRef(time);

  // Use the deleteExercise and editExercise mutation hooks
  const [deleteExercise] = useDeleteExerciseMutation();
  const [editExercise] = useEditExerciseMutation();

  // Debounced version of the updateExercise function
  const updateExercise = async (updatedData) => {
    try {
      await editExercise(updatedData).unwrap();
      console.log("Упражнение обновлено");
    } catch (error) {
      console.error("Ошибка обновления упражнения:", error);
    }
  };

  const debouncedUpdateExercise = useCallback(
    debounce((updatedData) => updateExercise(updatedData), 500),
    []
  );

  // Effect to handle editing the exercise when local state changes
  useEffect(() => {
    // Skip if it's the initial render
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    // Only update if the current values are different from the initial ones
    if (
      currentSets !== initialSets.current ||
      currentReps !== initialReps.current ||
      currentWeight !== initialWeight.current ||
      currentTime !== initialTime.current
    ) {
      const updatedData = {
        id,
        sets: currentSets,
        reps: currentReps,
        weight: currentWeight,
        time: currentTime,
      };
      
      // Call the debounced function
      debouncedUpdateExercise(updatedData);

      // Update the initial refs to the new values
      initialSets.current = currentSets;
      initialReps.current = currentReps;
      initialWeight.current = currentWeight;
      initialTime.current = currentTime;
    }
  }, [currentSets, currentReps, currentWeight, currentTime, id]);

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
