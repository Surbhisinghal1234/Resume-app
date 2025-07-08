import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',

  baseQuery: fetchBaseQuery({
    // baseUrl: 'http://localhost:5000/api',
    baseUrl: 'https://resume-app-l3ob.onrender.com/api',

    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    signupUser: builder.mutation({
      query: (signupData) => ({
        url: '/signup',
        method: 'POST',
        body: signupData,
      }),
    }),

    loginUser: builder.mutation({
      query: (loginData) => ({
        url: "/",
        method: "POST",
        body: loginData,
      }),
    }),

//     getProfile: builder.query({
//   query: () => ({
//     url: "/user/profile",
//     method: "GET",
//   }),
// }),

sendOtp: builder.mutation({
  query: (inputData) => ({
    url: "/auth/forgot-password",
    method: "POST",
    body: inputData,
  }),
}),
verifyOtp: builder.mutation({
  query: (data) => ({
    url: "/auth/verify-otp",
    method: "POST",
    body: data,
  }),
}),

resetPassword: builder.mutation({
  query: (data) => ({
    url: "/auth/reset-password",
    method: "POST",
    body: data,
  }),
}),


  }),

  
});

export const { useSignupUserMutation , useLoginUserMutation, useSendOtpMutation, useVerifyOtpMutation,
   useResetPasswordMutation} = authApi;
