import {RecordStateModel} from './model/record-state.model';
import {createAndStartRecordControllerApp} from './function/create-and-start-record-controller-app.function';
import {createAndStartRecordProxyApp} from './function/create-and-start-record-proxy-app.function';

export function startNodeApps(
  state: RecordStateModel = {
    queue: {}
  }
) {
  createAndStartRecordControllerApp(state);
  createAndStartRecordProxyApp(state);
}

startNodeApps();
