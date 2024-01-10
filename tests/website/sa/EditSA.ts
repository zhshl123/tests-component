/* eslint-disable unicorn/filename-case */
import { EditFromFields } from '../common/abstract';
import { SAMap } from './SAAttributes';

export class EditSA extends EditFromFields{
    entityMap:Map<string, string>
    constructor(entityMap) {
        super(entityMap);  
    }
}

export const SA = new EditSA(SAMap)