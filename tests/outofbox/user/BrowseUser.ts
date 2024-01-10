
import { SearchFromFields } from '../common/abstract';
import { userMap } from './UserAttributes';

export class BrowseUser extends SearchFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);

    }

}

export const browseUserInfo = new BrowseUser(userMap)