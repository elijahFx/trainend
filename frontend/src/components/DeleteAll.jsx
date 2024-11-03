import React from "react";
import { useDeleteAllExercisesMutation } from "../apis/exerciseApi"; // Assuming you have a mutation for deleting all exercises
import { useDeleteAllAddictionsMutation } from "../apis/addictionApi";
import { confirmAlert } from 'react-confirm-alert'; // Import confirmAlert
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import CSS for styling

export default function DeleteAllExercises({ type }) {
  let text;

  if (type === "exercises") {
    text = "упражнения";
  } else if (type === "addictions") {
    text = "зависимости";
  }
  
  // RTK Query Mutation Hook
  const [deleteAllExercises] = useDeleteAllExercisesMutation();
  const [deleteAllAddictions] = useDeleteAllAddictionsMutation();

  // Function to handle deletion
  const handleDeleteAll = () => {
    // Show confirmation dialog
    confirmAlert({
      title: 'Подтверждение удаления',
      message: `Вы уверены, что хотите удалить все ${text}?`,
      buttons: [
        {
          label: 'Да',
          onClick: async () => {
            try {
              if (type === "exercises") {
                await deleteAllExercises().unwrap(); // Call your delete function here
                console.log("Все упражнения успешно удалены");
              } else if (type === "addictions") {
                await deleteAllAddictions().unwrap(); // Call your delete function here
                console.log("Все зависимости успешно удалены");
              }
            } catch (error) {
              console.error("Ошибка при удалении:", error);
            }
          },
        },
        {
          label: 'Нет',
          onClick: () => console.log('Удаление отменено'), // Optional action on cancel
        },
      ],
    });
  };

  return (
    <div className="delete-all-container">
      <button className="delete-all-btn" onClick={handleDeleteAll}>
        Удалить все {text}
      </button>
    </div>
  );
}
