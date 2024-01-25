import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
    tagTypes: ['Recipe'],
    endpoints: builder => ({
      getRecipes: builder.query({
        query: () => '/recipes',
        providesTags: ['Recipe'], // Optional: for automatic cache revalidation
      }),
    }),
});

export const { useGetRecipesQuery } = apiSlice;