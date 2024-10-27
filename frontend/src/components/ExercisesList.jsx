import React, { useEffect } from "react";
import AddExercise from "./AddExercise";
import Exercise from "./Exercise";
import { useGetExercisesQuery } from "../apis/exerciseApi";
import exs from "../db.json";
import DeleteAllExercises from "./DeleteAllExercises";

export default function ExercisesList() {
  const { data, isLoading, error } = useGetExercisesQuery();

  const render = !data ? exs : data;

  return (
    <div className="exercises_list">
      <div className="left_container">
        <AddExercise />
        <DeleteAllExercises />
      </div>
      <div className="exercise_container">
        {render.map((el, indx) => {
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
              id={el.id}
            />
          );
        })}
      </div>
    </div>
  );
}
