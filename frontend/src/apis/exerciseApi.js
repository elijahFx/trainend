import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const URLS = ["http://localhost:5000"];
const BASE_URL = URLS[0];

export const exerciseApi = createApi({
  reducerPath: "exerciseApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Exercises"], // Add this line to define tag types
  endpoints: (builder) => ({
    getExercises: builder.query({
      query: () => "exercises",
      providesTags: ["Exercises"], // Provide a tag for caching
    }),

    addExercise: builder.mutation({
      query: (newExercise) => ({
        url: "exercises",
        method: "POST",
        body: newExercise,
      }),
      invalidatesTags: ["Exercises"], // Invalidate cache on add
    }),

    editExercise: builder.mutation({
      query: ({ id, ...updatedExercise }) => ({
        url: `exercises/${id}`,
        method: "PUT",
        body: updatedExercise,
      }),
      invalidatesTags: ["Exercises"], // Invalidate cache on edit
    }),

    deleteExercise: builder.mutation({
      query: (id) => ({
        url: `exercises/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Exercises"], // Invalidate cache on delete
    }),

    deleteAllExercises: builder.mutation({
      query: () => ({
        url: "exercises/all",
        method: "DELETE",
      }),
      invalidatesTags: ["Exercises"], // Invalidate cache on delete all
    }),
  }),
});

export const {
  useGetExercisesQuery,
  useAddExerciseMutation,
  useEditExerciseMutation,
  useDeleteExerciseMutation,
  useDeleteAllExercisesMutation,
} = exerciseApi;
