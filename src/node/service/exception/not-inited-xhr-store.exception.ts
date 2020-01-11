import {HttpStatus} from "../enum/status.enum";
import {HttpException} from "./http-exception";

/**
 *
 */
export class NotInitedXhrStoreException extends HttpException {
  constructor() {
    super('Not inited xhr store', HttpStatus.BAD_REQUEST);
  }
}
