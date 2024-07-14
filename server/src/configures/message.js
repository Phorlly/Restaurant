const statusMessages = {
  200: "OK",
  201: "Created",
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  500: "Internal Server Error",
  // Add other status codes and messages as needed
};

const showMessage = (res, statusCode, { message = "", data = null }) => {
  const defaultMessage = statusMessages[statusCode] || "Unknown Status";
  const finalMessage = message || defaultMessage;

  return res.status(statusCode).json({ message: finalMessage, data });
};

module.exports = { showMessage };
