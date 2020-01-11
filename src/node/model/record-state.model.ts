import {AbstractStateModel} from './abstract-state.model';

/**
 *
 */
export class RecordStateModel extends AbstractStateModel {
  /**
   * Ebbe gyujtjuk a rogziteni kivant xhr kereseket
   */
  private _queue: { [key: string]: any } = {};

  get queue(): { [p: string]: any } {
    return this._queue;
  }

  set queue(value: { [p: string]: any }) {
    this._queue = value;
  }
}
