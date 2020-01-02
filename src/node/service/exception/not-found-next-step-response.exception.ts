import {HttpStatus} from "../enum/status.enum";
import {HttpException} from "./http-exception";

export class NotFoundNextStepResponseException extends HttpException {
  constructor() {
    super('Not found next step response', HttpStatus.BAD_REQUEST);
  }
}
