import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const resumeApi = createApi({
  reducerPath: "resumeApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:5000/api",
    baseUrl: "https://resume-app-l3ob.onrender.com/api",

    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    submitResume: builder.mutation({
      query: (resumeData) => ({
        url: "/resume", 
        method: "POST",
        body: resumeData,
      }),
    }),
    getResumes: builder.query({
      query: () => ({
        url: "/resume",
        method: "GET",
      }),
    }),

  deleteResume: builder.mutation({
      query: (id) => ({
        url: `/resume/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["Resume"],
    }),
    editResume: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/resume/${id}`,
        method: 'PUT',
        body: updatedData,
      }),
    }),
  }),
});

export const { useSubmitResumeMutation, useGetResumesQuery,   useDeleteResumeMutation,
  useEditResumeMutation } = resumeApi;
