export const alertType = (statusCode) => {
  if (statusCode >= 200 && statusCode <= 299) {
    return "success";
  } else if (statusCode >= 400 && statusCode <= 599) {
    return "error";
  }
};
