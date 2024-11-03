import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URLS = ["http://localhost:5000"];
const BASE_URL = URLS[0];

export const addictionApi = createApi({
  reducerPath: "addictionApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Addictions"], // Define tag types
  endpoints: (builder) => ({
    getAddictions: builder.query({
      query: () => "addictions",
      providesTags: ["Addictions"], // Provide a tag for caching
    }),

    addAddiction: builder.mutation({
      query: (newAddiction) => ({
        url: "addictions",
        method: "POST",
        body: newAddiction,
      }),
      invalidatesTags: ["Addictions"], // Invalidate cache on add
    }),

    editAddiction: builder.mutation({
      query: ({ id, ...updatedAddiction }) => ({
        url: `addictions/${id}`,
        method: "PATCH",
        body: updatedAddiction,
      }),
      invalidatesTags: ["Addictions"], // Invalidate cache on edit
    }),

    deleteAddiction: builder.mutation({
      query: (id) => ({
        url: `addictions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Addictions"], // Invalidate cache on delete
    }),

    deleteAllAddictions: builder.mutation({
      query: () => ({
        url: "addictions/all",
        method: "DELETE",
      }),
      invalidatesTags: ["Addictions"], // Invalidate cache on delete all
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetAddictionsQuery,
  useAddAddictionMutation,
  useEditAddictionMutation,
  useDeleteAddictionMutation,
  useDeleteAllAddictionsMutation,
} = addictionApi;
