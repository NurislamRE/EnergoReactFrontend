import { baseApi } from "./baseApi";

export const dataApi = baseApi.injectEndpoints({
  reducerPath: "dataApi",
  tagTypes: ["OrgObjects", "OrgData", "RatingData"],
  endpoints: (builder) => ({
    getData: builder.query({
      query: ({ startYear, endYear, startPeriod, endPeriod, organization }) => {
        return {
          url: "getReportData/",
          params: { startYear, endYear, startPeriod, endPeriod, organization },
        };
      },
    }),
    getCurData: builder.query({
      query: ({ endYear, endPeriod, orgId }) => {
        return {
          url: "getCurReportData/",
          params: { endYear, endPeriod, orgId },
        };
      },
    }),
    getSummaryData: builder.query({
      query: ({ startYear, endYear, startPeriod, endPeriod }) => {
        return {
          url: "getSummaryData/",
          params: { startYear, endYear, startPeriod, endPeriod },
        };
      },
    }),
    getRatingData: builder.query({
      query: ({ year, period }) => {
        return {
          url: "getRatingData/",
          params: { year, period },
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "RatingData", id })),
              { type: "RatingData", id: "List" },
            ]
          : [{ type: "RatingData", id: "List" }],
    }),
    saveRatingData: builder.mutation({
      query: ({ id, orgId, ratingId, year, period, energoRating, fireRating, securityRating}) => ({
        url: "saveRatingData/",
        method: "POST",
        params: { id, orgId, ratingId, year, period, energoRating, fireRating, securityRating },
      }),
      invalidatesTags: [{ type: "RatingData", id: "List" }],
    }),
    getDictionaryData: builder.query({
      query: (orgId) => {
        return {
          url: "getDictionaryData/",
          params: { orgId: orgId },
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "OrgObjects", id })),
              { type: "OrgObjects", id: "List" },
            ]
          : [{ type: "OrgObjects", id: "List" }],
    }),
    addObject: builder.mutation({
      query: (body) => ({
        url: "addObject/",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "OrgObjects", id: "List" }],
    }),
    editObject: builder.mutation({
      query: (body) => ({
        url: "editObject/",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "OrgObjects", id: "List" }],
    }),
    deleteObject: builder.mutation({
      query: (body) => ({
        url: "deleteObject/",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "OrgObjects", id: "List" }],
    }),
    getOrgData: builder.query({
      query: ({ year, period, orgId }) => {
        return {
          url: "getOrgData/",
          params: { year, period, orgId },
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.electro.map(({ id }) => ({ type: "OrgData", id })),
              { type: "OrgData", id: "List" },
            ]
          : [{ type: "OrgData", id: "List" }],
    }),
    editOrgData: builder.mutation({
      query: (body) => ({
        url: "editOrgData/",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "OrgData", id: "List" }],
    }),
  }),
});

export const {
  useGetDataQuery,
  useGetCurDataQuery,
  useGetSummaryDataQuery,
  useGetDictionaryDataQuery,
  useGetRatingDataQuery,
  useSaveRatingDataMutation,
  useAddObjectMutation,
  useEditObjectMutation,
  useDeleteObjectMutation,
  useGetOrgDataQuery,
  useEditOrgDataMutation,
} = dataApi;
