import {
    API_SUCCESS,
    API_FAIL,
    GET_CHARTS_DATA
} from "./actionTypes";

interface Action {
    type: string;
    payload: {
        actionType: string;
        data?: any;
        error?: any;
    };
}

const INIT_STATE = {
    chartsData: []
};

const Dashboard = (state = INIT_STATE, action: Action) => {
    switch (action.type) {
        case API_SUCCESS:
            switch (action.payload.actionType) {
                case GET_CHARTS_DATA:
                    return {
                        ...state,
                        chartsData: action.payload.data
                    };
                default:
                    return state;
            }
        case API_FAIL:
            switch (action.payload.actionType) {
                case GET_CHARTS_DATA:
                    return {
                        ...state,
                        chartsDataError: action.payload.error
                    };
                default:
                    return state;
            }
        default:
            return state;
    }
}

export default Dashboard;