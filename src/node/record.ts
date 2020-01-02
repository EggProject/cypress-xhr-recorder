import {StateModel} from './model/state.model';
import {createAndStartRecordControllerApp} from './function/create-and-start-record-controller-app.function';
import {createAndStartRecordProxyApp} from './function/create-and-start-record-proxy-app.function';

export function startNodeApps(state: StateModel) {
  createAndStartRecordControllerApp(state);
  createAndStartRecordProxyApp(state);
}

startNodeApps({
  runAppServer: false,
  runProxyServer: false,
  queue: {}
});