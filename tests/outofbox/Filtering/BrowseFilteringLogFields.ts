import { SearchFromFields } from '../common/abstract';
import { FilteringMap } from './FilteringAttributes';

export class BrowseFilteringLogFields extends SearchFromFields{
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);
    }
}

const filteringLogMap = new Map()
filteringLogMap.set('Project', 'cstm_ProjectId')

export const browseFilteringLog = new BrowseFilteringLogFields(FilteringMap)