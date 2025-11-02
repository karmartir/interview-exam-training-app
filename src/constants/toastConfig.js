// Get durations from environment or use defaults
const SUCCESS_DURATION =
  parseInt(process.env.REACT_APP_TOAST_SUCCESS_DURATION) || 2000;
const ERROR_DURATION =
  parseInt(process.env.REACT_APP_TOAST_ERROR_DURATION) || 3000;
const INFO_DURATION =
  parseInt(process.env.REACT_APP_TOAST_INFO_DURATION) || 2000;

export const TOAST_CONFIG = {
  success: {
    position: "top-center",
    autoClose: SUCCESS_DURATION,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  },
  error: {
    position: "top-center",
    autoClose: ERROR_DURATION,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  },
  info: {
    position: "top-right",
    autoClose: INFO_DURATION,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  },
};
