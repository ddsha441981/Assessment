export const API_BASE_URL = "http://localhost:9292/api/v1";

export const API_BASE_URL_PINCODE = "https://api.zippopotam.us/IN";

//LOGIN
export const LOGIN_URL = `${API_BASE_URL}/auth/signin`;
export const SIGN_UP_URL = `${API_BASE_URL}/auth/signup`;
export const FORGOT_PASSWORD_URL = `${API_BASE_URL}/auth/forgot/password`;

//USER
export const GET_USER_PROFILE_URL = `${API_BASE_URL}/user`;
export const GET_USER_LIST_URL = `${API_BASE_URL}/userlist`;

//Incident
export const ADD_INCIDENT_URL = `${API_BASE_URL}/incidents/create`;
export const LIST_INCIDENT_URL = `${API_BASE_URL}/incidents/user`;
export const SEARCH_INCIDENT_URL = `${API_BASE_URL}/incidents/search`;
export const UPDATE_INCIDENT_URL = `${API_BASE_URL}/incidents`;