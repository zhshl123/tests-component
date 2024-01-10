
import { EditFromFields } from '../common/abstract';
import { bulletinMap } from './BulletinAttributes';

export class EditBulletin extends EditFromFields{
    entityMap:Map<string, string>
    constructor(entityMap) {
        super(entityMap);  
    }  
}

export const bulletin = new EditBulletin(bulletinMap)
