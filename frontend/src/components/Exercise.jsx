import React, { useState } from "react";

export default function Exercise({
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

  // Handlers for increasing/decreasing sets, reps, weight, and time
  const increaseSets = () => setCurrentSets((prev) => prev + 1);
  const decreaseSets = () =>
    setCurrentSets((prev) => (prev > 1 ? prev - 1 : 1));
  const increaseReps = () => setCurrentReps((prev) => prev + 1);
  const decreaseReps = () =>
    setCurrentReps((prev) => (prev > 1 ? prev - 1 : 1));
  const increaseWeight = () => setCurrentWeight((prev) => prev + 0.5); // Increment weight by 0.5 kg/lbs
  const decreaseWeight = () =>
    setCurrentWeight((prev) => (prev > 0 ? prev - 0.5 : 0)); // Decrement weight by 0.5 kg/lbs, no negative weight
  const increaseTime = () => setCurrentTime((prev) => prev + 1); // Increment time by 1 minute
  const decreaseTime = () =>
    setCurrentTime((prev) => (prev > 1 ? prev - 1 : 1)); // Decrement time, minimum 1 minute

  // Handler for deleting the exercise
  const handleDelete = () => {
    console.log("упражнение удалено");
    // You can also add more logic here to remove the exercise from the parent component's state if needed
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
