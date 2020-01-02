import {HttpStatus} from '../enum/status.enum';
import {HttpException} from "./http-exception";

export class NotFoundFileException extends HttpException {
  constructor(path?: string) {
    super(`Not found file: ${path}`, HttpStatus.BAD_REQUEST);
  }
}
