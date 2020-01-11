import {Express, Request, Response} from 'express';
import {AbstractStateModel} from '../model/abstract-state.model';

/**
 *
 * @param app
 * @param state
 * @param methodType
 * @param route
 */
export function addDisableNextRecordRoute(app: Express, state: AbstractStateModel, methodType = 'post', route = '/disable-next-record') {
  // @ts-ignore
    app[methodType](route, (req: Request, res: Response) => {
    state.disableNextRecord = true;
    return res.json({ disableNextRecord: true });
  });
}
