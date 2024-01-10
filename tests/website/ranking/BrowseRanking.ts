import { Ensure, isPresent } from '@serenity-js/assertions';
import { Check, Duration, Log, Question, Task, Wait } from '@serenity-js/core';
import { By, Click, PageElement, PageElements } from '@serenity-js/web'

import { SEARCH, SUCCEEDED } from '../../DefaultStaticParams';
import { SearchFromFields } from '.././common/abstract';
import { clickButton } from '../common';
import { checkGridList, gridLinkTdList, gridTextTdList } from '../common/GridList';
import { ranking } from './EditRanking';
import { rankingMap } from './RankingAttributes';

export class BrowseRankingPhase extends SearchFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);

    }

    emptyGrid = () =>
        PageElement.located(By.css('.cstdgaux'))
            .describedAs('empty grid')

    checkSearchResult = (itemName: string | Question<any>, expectedResult: string | Question<any>) => {
        return expectedResult === SUCCEEDED ? Task.where(`#actor check search item: ${itemName} exists`,
            Check.whether(
                gridTextTdList(itemName), isPresent()
            ).andIfSo(
                Log.the(itemName + ' is present')
            ).otherwise(
                Ensure.eventually(gridLinkTdList(itemName), isPresent())
            )

        ) : Task.where(`#actor check search item: ${itemName} not exists`,
            Ensure.eventually(this.emptyGrid(), isPresent())
        );
    }

    searchItemInBrowsePage = (fieldName: string, itemName: string | Question<any>) => {
        return Task.where(`#actor search item: ${itemName} with ${fieldName}`,
            ranking.fillTextInputField(fieldName, itemName),
            clickButton.using(SEARCH),
            Wait.for(Duration.ofSeconds(3)),
            checkGridList(),

        )
    }

    NewScopingAreaEditIcon = () =>
        PageElements.located(By.css(`[title="Edit"]`)).last()
            .describedAs('Edit Icon of Ranking')

    clickNewEditIcon = () => {
        return Task.where(`#actor click New Edit Icon`,
            Click.on(this.NewScopingAreaEditIcon())
        )
    }
}

export const browseRanking = new BrowseRankingPhase(rankingMap)