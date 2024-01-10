import { Check, Duration, Log, Question, Task, Wait } from '@serenity-js/core';
import { By, Click, Enter, isVisible,PageElement, PageElements } from '@serenity-js/web';

import { EditFromFields } from '../common/abstract';

export class ProjectFundFields extends EditFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);
    }

    /**
     * 选择列表中第一个fund到selected fund list中
     * @param fundName 资金名称
     * @returns 
     */
    addFundToSelectedList = (fundName: string | Question<any>) => {
        return Task.where(`#actor select fund: ${fundName} to selected fund list `,
            Check.whether(
                this.unselectedFundList(fundName).first(), isVisible()
            ).andIfSo(
                Click.on(this.unselectedFundList(fundName).first()),
                Click.on(this.addFundIcon()),
                Wait.for(Duration.ofSeconds(5)),
            ).otherwise(
                Check.whether(
                    this.selectedFundList(fundName).first(), isVisible()
                ).andIfSo(
                    Log.the(`fund ${fundName} already selected`)
                ).otherwise(
                    Log.the(`fund ${fundName} not exist`)
                )
            )
        )
    }

    /**
     * 搜索目标fund
     * @param fundName 资金名称
     * @returns 
     */
    searchFund = (fundName: string | Question<any>) => {
        return Task.where(`#actor search fund: ${fundName}`,
            Enter.theValue(fundName).into(this.searchFundInputField()),
            Click.on(this.searchFundIcon()),
            Wait.for(Duration.ofSeconds(3)),
            
        )
    }

    searchFundInputField = () =>
        PageElement.located(By.id('ctl00_body_txtSearchUnSelectedFund'))
            .describedAs('search fund input field')

    searchFundIcon = () =>
        PageElement.located(By.id('ctl00_body_btnSearchUnSelectedFund'))
            .describedAs('search fund icon')

    unselectedFundList = (fundName: string | Question<any>) =>
        PageElements.located(By.cssContainingText('#ctl00_body_sltUnSelectedFunds option', fundName))
            .describedAs(`unselected funds list: ${fundName}`)

    selectedFundList = (fundName: string | Question<any>) =>
        PageElements.located(By.cssContainingText('#ctl00_body_sltSelectedFunds option', fundName))
            .describedAs(`selected funds list: ${fundName}`)

    addFundIcon = () =>
        PageElement.located(By.id('ctl00_body_imgbtnFundAdd'))
            .describedAs('add fund icon')

}

export const projectFund = new ProjectFundFields(new Map())