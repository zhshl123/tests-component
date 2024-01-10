/* eslint-disable unicorn/filename-case */
import { Ensure, isPresent } from '@serenity-js/assertions';
import { Duration, Question, Task, Wait } from '@serenity-js/core';
import { By, PageElement } from '@serenity-js/web'

import { SEARCH, SUCCEEDED } from '../../DefaultStaticParams';
import { SearchFromFields } from '.././common/abstract';
import { clickButton } from '../common';
import { checkGridList, gridLinkTdList } from '../common/GridList';
import { CSMap } from './CSAttributes';

export class BrowseCS extends SearchFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);

    }

    emptyGrid = () =>
        PageElement.located(By.css('.cstdgaux'))
            .describedAs('empty grid')

    checkSearchResult = (itemName: string | Question<any>, expectedResult: string | Question<any>) => {

        return expectedResult === SUCCEEDED ? Task.where(`#actor check search item: ${itemName} exists`,
            Ensure.eventually(gridLinkTdList(itemName), isPresent())
        ) : Task.where(`#actor check search item: ${itemName} not exists`,
            Ensure.eventually(this.emptyGrid(), isPresent())
        );
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

export const browseCSInfo = new BrowseCS(CSMap)