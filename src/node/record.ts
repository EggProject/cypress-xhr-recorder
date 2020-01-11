import {RecordStateModel} from './model/record-state.model';
import {createAndStartRecordControllerApp} from './function/create-and-start-record-controller-app.function';
import {createAndStartRecordProxyApp} from './function/create-and-start-record-proxy-app.function';

/**
 *
 * @param state
 */
export function startNodeApps(state = new RecordStateModel()) {
  createAndStartRecordControllerApp(state);
  createAndStartRecordProxyApp(state);
}

startNodeApps();
