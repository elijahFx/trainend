import React from "react";
import { useDeleteAllExercisesMutation } from "../apis/exerciseApi"; // Assuming you have a mutation for deleting all exercises

export default function DeleteAllExercises() {
  // RTK Query Mutation Hook
  const [deleteAllExercises] = useDeleteAllExercisesMutation();

  // Function to handle deletion
  const handleDeleteAll = async () => {
    // Show confirmation dialog
    const confirmed = window.confirm(
      "Вы уверены, что хотите удалить все упражнения?"
    );

    if (confirmed) {
      try {
        // Call the mutation function to delete all exercises
        await deleteAllExercises().unwrap(); // Call your delete function here

        console.log("All exercises deleted successfully");
      } catch (error) {
        console.error("Error deleting exercises:", error);
      }
    }
  };

  return (
    <div className="delete-all-container">
      <button className="delete-all-btn" onClick={handleDeleteAll}>
        Удалить все упражнения
      </button>
    </div>
  );
}
