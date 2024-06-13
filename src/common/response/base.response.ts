export class BaseResponse {
  data: any | any[] | null;
  message: string;
  statusCode: number;
  timestamp: string;

  constructor(
    data: any,
    message: string,
    statusCode: number,
    timestamp: string,
  ) {
    this.data = data;
    this.message = message;
    this.statusCode = statusCode;
    this.timestamp = timestamp;
  }
}
