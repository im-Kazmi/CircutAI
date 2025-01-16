export class ErrorsClass extends Error {
  public readonly statusCode: number;
  public readonly errorCode: string;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode: number = 500,
    errorCode: string = "INTERNAL_ERROR",
    isOperational: boolean = true,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message: string, errorCode: string = "BAD_REQUEST") {
    return new ErrorsClass(message, 400, errorCode, true);
  }

  static unauthorized(message: string, errorCode: string = "UNAUTHORIZED") {
    return new ErrorsClass(message, 401, errorCode, true);
  }

  static forbidden(message: string, errorCode: string = "FORBIDDEN") {
    return new ErrorsClass(message, 403, errorCode, true);
  }

  static notFound(message: string, errorCode: string = "NOT_FOUND") {
    return new ErrorsClass(message, 404, errorCode, true);
  }

  static internal(message: string, errorCode: string = "INTERNAL_ERROR") {
    return new ErrorsClass(message, 500, errorCode, false);
  }
}
