/* eslint-disable unicorn/filename-case */
import { EditFromFields } from '../common/abstract';
import { RFIMap } from './RFIAttributes';

export class EditRFI extends EditFromFields{
    entityMap:Map<string, string>
    constructor(entityMap) {
        super(entityMap);  
    }
}

export const RFI = new EditRFI(RFIMap)