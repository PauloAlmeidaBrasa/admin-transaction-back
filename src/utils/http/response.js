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
}

module.exports = ApiResponse;
