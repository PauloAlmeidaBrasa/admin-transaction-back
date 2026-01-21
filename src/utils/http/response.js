class ApiResponse {
  static success(res, key, data, statusCode = 200) {
    return res.status(statusCode).json({
      [key]: data,
    });
  }

  static error(res, message, statusCode = 400, details = null) {
    return res.status(statusCode).json({
      error: {
        message,
        details,
      },
    });
  }
  static message(res, message, statusCode = 200, additionalData = {}) {
    return res.status(statusCode).json({
      status: true,
      message,
      ...additionalData, 
    });
  }
}

module.exports = ApiResponse;
