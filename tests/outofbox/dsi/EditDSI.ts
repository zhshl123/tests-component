/* eslint-disable unicorn/filename-case */
import { EditFromFields } from '../common/abstract';
import { DSIMap } from './DSIAttributes';

export class EditDSI extends EditFromFields{
    entityMap:Map<string, string>
    constructor(entityMap) {
        super(entityMap);  
    }
}

export const DSI = new EditDSI(DSIMap)