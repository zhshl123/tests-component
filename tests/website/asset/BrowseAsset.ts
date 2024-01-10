import { Duration, Question, Task, Wait } from '@serenity-js/core';
import { By, PageElement } from '@serenity-js/web'

import { SEARCH } from '../../DefaultStaticParams';
import { SearchFromFields } from '.././common/abstract';
import { clickButton } from '../common';
import { checkGridList } from '../common/GridList';
import { assetMap } from './AssetAttributes';

export class BrowseAsset extends SearchFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);

    }

    textInputField = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_txt' + this.entityMap.get(fieldName)))
            .describedAs('text input input field: ' + fieldName)

    searchItemInBrowsePage = (fieldName: string, itemName: string | Question<any>) => {
        return Task.where(`#actor search item: ${itemName} with ${fieldName}`,
            this.fillTextInputField(fieldName, itemName),
            clickButton.using(SEARCH),
            Wait.for(Duration.ofSeconds(3)),
            checkGridList(),
        )
    }

}

export const browseAssetInfo = new BrowseAsset(assetMap)