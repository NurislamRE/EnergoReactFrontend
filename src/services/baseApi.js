import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
//import GetAccessToken from '../services/token';

//  http://172.20.254.120:5000/

//  http://172.20.254.89:5000/

//  https://localhost:5000/


export const baseApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://localhost:44492/',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;            
             headers.set('Authorization', `Bearer ${token}`);
            return headers;
        }
    }),
    endpoints: (builder) => ({
    }),
})

export const {
} = baseApi;