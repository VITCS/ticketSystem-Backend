var HttpStatus = require('http-status-codes');

/**
 * Build error response for validation errors.
 *
 * @param   {Error} err
 * @returns {Object}
 */
const buildError = (err) => {
  // HTTP errors
  if (err.isBoom) {
    return {
      code: err.output.statusCode,
      message: err.output.payload.message || err.output.payload.error
    };
  }

  // Return INTERNAL_SERVER_ERROR for all other cases
  return {
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
  };
}

const buildJoiError = (err) => {

  console.log('*******build error')
  console.log(`err ${JSON.stringify(err)}`);
  console.log(`err.isJoi ${err.error.details}`);

  // Validation errors
  if (err.error.isJoi) {

    console.log('build error in isJoi')
    return {
      code: 610,
      message: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST),
      details:
        err.error.details &&
        err.error.details.map(err => {
          return {
            message: err.message,
            code: err.code,
            param: err.path.join('.')
          };
        })
    };
  }
}

module.exports = { 
  buildError,
  buildJoiError
};