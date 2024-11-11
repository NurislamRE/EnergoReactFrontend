import { baseApi } from "./baseApi";

export const dictionaryApi = baseApi.injectEndpoints({
  reducerPath: "dictionaryApi",
  tagTypes: ["Dictionary"],
  endpoints: (builder) => ({
    getOrganizations: builder.query({
      query: (orgId) => {
        return {
          url: "getOrganizations/",
          params: orgId
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Organization", id })),
              { type: "Organization", id: "List" },
            ]
          : [{ type: "Organization", id: "List" }],
    }),
    getMainOrganizations: builder.query({
      query: () => "getMainOrganizations",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Organization", id })),
              { type: "Organization", id: "List" },
            ]
          : [{ type: "Organization", id: "List" }],
    }),
    getPeriods: builder.query({
      query: (name) => {
        return {
          url: "getPeriods/",
          params: name,
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Period", id })),
              { type: "Period", id: "List" },
            ]
          : [{ type: "Period", id: "List" }],
    }),
  }),
});

export const {
  useGetOrganizationsQuery,
  useGetMainOrganizationsQuery,
  useGetPeriodsQuery,
} = dictionaryApi;
