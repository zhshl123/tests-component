/* eslint-disable unicorn/filename-case */
import { isPresent } from '@serenity-js/assertions';
import { Check, Duration, Log, Question, Task, Wait } from '@serenity-js/core';

import { SEARCH } from '../../DefaultStaticParams';
import { SearchFromFields } from '.././common/abstract';
import { checkGridList, clickButton } from '../common';
import { DSIMap } from './DSIAttributes';

export class BrowseDSI extends SearchFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);

    }

    searchItemInBrowsePage = (fieldName: string, itemName: string | Question<any>) => {
        return Task.where(`#actor search item: ${itemName} with ${fieldName}`,
            this.fillTextInputField(fieldName, itemName),
            clickButton.using(SEARCH),
            Wait.for(Duration.ofSeconds(3)),
            checkGridList(),
        )
    }
}

export const browseDSIInfo = new BrowseDSI(DSIMap) 