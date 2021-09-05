/**
 * Class representing an API error.
 * @extends Error
 */
class APIError extends Error {
	/**
	 * Creates an API error.
	 * @param {string} message - Error message.
	 * @param {number} status - HTTP status code of error.
	 * @param {boolean} isPublic - Whether the message should be visible to user or not.
	 */
	constructor({ message, errors, stack, status = 500, isPublic = false }) {
		super(message);
		this.name = this.constructor.name;
		this.message = message;
		this.errors = errors;
		this.status = status;
		this.isPublic = isPublic;
		this.isOperational = true;
		this.stack = stack;
	}
}

module.exports = APIError;
