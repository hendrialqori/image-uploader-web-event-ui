export const SERVER = import.meta.env.VITE_SERVER;
export const API = SERVER + "/api/v1"
export const STATIC = SERVER + "/upload"

export const TOKEN = "token"

// error type response
export const VALIDATION_ERROR = "VALIDATION_ERROR"
export const RESPONSE_ERROR = "RESPONSE_ERROR"
export const UNKNOWN_ERROR = "UNKNOWN_ERROR"
export const AUTH_ERROR = "AUTH_ERROR"
export const FILE_UPLOAD_ERROR = "FILE_UPLOAD_ERROR"

// image option
export const REUSABLE_UTENSILS = "Reusable Utensils";
export const NON_REUSABLE_UTENSILS = "Non Reusable Utensils";
export const WATER_CONTAINER_TUMBLER = "Water Container/Tumbler";
export const PUBLIC_TRANSPORTATION = "Public Transportation";
export const PERTAMAX_PERSONAL_VEHICLE = "Pertamax Personal Vehicle";
export const NON_PERTAMAX_PERSONAL_VEHICLE = "Non Pertamax Personal Vehicle";
export const ELECTRIC_VEHICLE = "Electric Vehicle";
export const LITTER_FILTER = "Litter Filter";
export const SINGLE_WASTE_BIN = "Single Waste Bin";

// params key
export const PAGE = "page";
export const SORT_TYPE = "sort_type";
export const SORT_KEY = "sort_key";
export const USER_SEARCH = "user_search";
export const USER_SELECT = "user_select";