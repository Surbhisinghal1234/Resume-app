import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const resumeApi = createApi({
  reducerPath: "resumeApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:5000/api",
    // baseUrl: "https://resume-app-mzu8.onrender.com/api",
    baseUrl: import.meta.env.VITE_API_URL,

    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
   tagTypes: ["Resume"],
  endpoints: (builder) => ({
    addResume: builder.mutation({
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
  providesTags: ["Resume"],
}),

  deleteResume: builder.mutation({
      query: (id) => ({
        url: `/resume/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["Resume"],
    }),
    updateResume: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/resume/${id}`,
        method: 'PUT',
        body: updatedData,
      }),
    }),

      

  }),
});

export const { useAddResumeMutation, useGetResumesQuery,   useDeleteResumeMutation,
  useUpdateResumeMutation, useGetSingleResumeQuery  } = resumeApi;
