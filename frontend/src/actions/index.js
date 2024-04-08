export const FETCH_JOBS_REQUEST = 'FETCH_JOBS_REQUEST';
export const FETCH_JOBS_SUCCESS = 'FETCH_JOBS_SUCCESS';
export const FETCH_JOBS_FAILURE = 'FETCH_JOBS_FAILURE';

export const fetchJobsRequest = () => ({
    type: FETCH_JOBS_REQUEST,
});

export const fetchJobsSuccess = (jobs) => ({
    type: FETCH_JOBS_SUCCESS,
    payload: jobs,
});

export const fetchJobsFailure = (error) => ({
    type: FETCH_JOBS_FAILURE,
    payload: error,
});

export const fetchJobsFromBackend = () => {
    return async (dispatch) => {
        dispatch(fetchJobsRequest());
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/getAll`);
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const data = await response.json();
            dispatch(fetchJobsSuccess(data));
            return response;
        } catch (error) {
            dispatch(fetchJobsFailure(error.message));
            return error;
        }
    };
};

export const addDataToBackend = async (newData) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newData),
        });
        if (!response.ok) {
            throw new Error('Error adding new data.');
        }
        console.log("responce", response)
        fetchJobsFromBackend();
        return response;
    } catch (error) {
        console.error('Error adding new data:', error);
        throw error;
    }
};
