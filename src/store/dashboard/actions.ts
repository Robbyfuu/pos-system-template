import {
    API_SUCCESS,
    API_FAIL,
    GET_CHARTS_DATA
} from "./actionTypes";

export const apiSuccess = (actionType: any, data: any) => ({
    type: API_SUCCESS,
    payload: { actionType, data },
});

export const apiFail = (actionType: any, error: any) => ({
    type: API_FAIL,
    payload: { actionType, error },
});

// charts data
export const getChartsData = (periodType: any) => ({
    type: GET_CHARTS_DATA,
    payload: periodType
});
