import React from "react";
import AddExercise from "./AddExercise";
import exs from "../db.json";
import Exercise from "./Exercise";

export default function ExercisesList() {
  return (
    <div className="exercises_list">
      <AddExercise />
      <div className="exercise_container">
        {exs.map((el, indx) => {
          return (
            <Exercise
              name={el.name}
              reps={el.reps}
              sets={el.sets}
              weight={el.weight}
              timeOfChange={el.timeOfChange}
              user_id={el.user_id}
              type={el.type}
              time={el.time}
              key={indx}
              num={indx}
            />
          );
        })}
      </div>
    </div>
  );
}
