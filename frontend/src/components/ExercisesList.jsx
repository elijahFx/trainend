import React, { useEffect } from "react";
import AddExercise from "./AddExercise";
import Exercise from "./Exercise";
import { useGetExercisesQuery } from "../apis/exerciseApi";
import DeleteAll from "./DeleteAll";
import { useSelector } from "react-redux";

export default function ExercisesList() {
  const { data, isLoading, error, refetch } = useGetExercisesQuery();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      refetch();
    }
  }, [isLoggedIn, refetch]);

  return (
    <div className="exercises_list">
      {/* Loader while loading */}
      {isLoading && <div className="loader"></div>}

      {/* Error popup if there's an error */}
      {error && (
        <div className="error-popup">
          <p>Ошибка при загрузке упражнений. Пожалуйста, попробуйте снова.</p>
          <p>Более подробная информация об ошибке</p>
          <p>Статус ошибки: {error.status}</p>
          <p>Сообщение об ошибке: {error.error}</p>
        </div>
      )}

      {/* Content only when data is loaded */}
      {!isLoading && !error && (
        <>
          <div className="left_container">
            <AddExercise />
            <DeleteAll type="exercises" />
          </div>
          <div className="exercise_container">
            {data.map((el, indx) => {
              return (
                <Exercise
                  name={el.name}
                  reps={el.reps}
                  sets={el.sets}
                  weight={el.weight}
                  dateOfChange={el.dateOfChange}
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
        </>
      )}
    </div>
  );
}
