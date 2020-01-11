/**
 *
 */
export abstract class AbstractStateModel {
  private _disableNextRecord = false;

  get disableNextRecord(): boolean {
    return this._disableNextRecord;
  }

  set disableNextRecord(value: boolean) {
    this._disableNextRecord = value;
  }
}
