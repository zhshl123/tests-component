/* eslint-disable unicorn/filename-case */
import { isPresent } from '@serenity-js/assertions';
import { Check, Duration, Log, Question, Task, Wait } from '@serenity-js/core';

import { SEARCH } from '../../DefaultStaticParams';
import { SearchFromFields } from '../common/abstract';
import { checkGridList, clickButton } from '../common';
import { RFIMap } from './RFIAttributes';

export class BrowseRFI extends SearchFromFields{
    entityMap:Map<string, string>
    constructor(entityMap) {
        super(entityMap);
        
    }

    
}

export const browseRFIInfo = new BrowseRFI(RFIMap) 