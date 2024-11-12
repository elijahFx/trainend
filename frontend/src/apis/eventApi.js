import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URLS = ["http://localhost:5000"];
const BASE_URL = URLS[0];

export const eventApi = createApi({
  reducerPath: "eventApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.user?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Events"],
  endpoints: (builder) => ({

    getEvents: builder.query({
      query: () => "events",
      providesTags: ["Events"],
      refetchOnMountOrArgChange: true,
    }),

    addEvent: builder.mutation({
      query: (newEvent) => ({
        url: "events",
        method: "POST",
        body: newEvent,
      }),
      invalidatesTags: ["Events"], // Invalidate cache on add
    }),

    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `events/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Events"], // Invalidate cache on delete
    }),

    toggleIsDone: builder.mutation({
      query: (data) => ({
        url: `events/${data.id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Events"] // Invalidate cache on toggle
    }),

  }),
});

export const { useAddEventMutation, useDeleteEventMutation, useGetEventsQuery, useToggleIsDoneMutation } = eventApi;
