import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const URLS = ["http://localhost:5000"];
const BASE_URL = URLS[0];

export const exerciseApi = createApi({
  reducerPath: "exerciseApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getExercises: builder.query({
      query: () => "exercises",
    }),

    addExercise: builder.mutation({
      query: (newExercise) => ({
        url: "exercises",
        method: "POST",
        body: newExercise,
      }),
    }),

    editExercise: builder.mutation({
      query: ({ id, ...updatedExercise }) => ({
        url: `exercises/${id}`,
        method: "PUT",
        body: updatedExercise,
      }),
    }),

    deleteExercise: builder.mutation({
      query: (id) => ({
        url: `exercises/${id}`,
        method: "DELETE",
      }),
    }),

    deleteAllExercises: builder.mutation({
      query: () => ({
        url: "exercises",
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetExercisesQuery,
  useAddExerciseMutation,
  useEditExerciseMutation,
  useDeleteExerciseMutation,
  useDeleteAllExercisesMutation
} = exerciseApi;
