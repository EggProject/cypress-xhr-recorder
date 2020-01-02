import {HttpException} from "./http-exception";
import {HttpStatus} from "../enum/status.enum";

export class JsonParseErrorException extends HttpException {
  constructor() {
    super('JSON Parse error', HttpStatus.I_AM_A_TEAPOT);
  }
}
