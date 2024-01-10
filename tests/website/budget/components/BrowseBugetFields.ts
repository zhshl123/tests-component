import { Ensure, isPresent } from '@serenity-js/assertions';
import { Duration, Log, Task, Wait } from '@serenity-js/core';
import { By, Click, Enter, PageElement } from '@serenity-js/web';

import { SEARCH } from '../../../DefaultStaticParams';
import { checkGridList, clickButton, openPage } from '../../common';
import { SearchFromFields } from '../../common/abstract';
import { budgetAttributesMap } from './BudgetAttributes';

export class BrowseBudgetFields extends SearchFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);

    }

    searchItemWithFundAndProjetct = (pageName: string, conditons: Map<string, string>) =>
        Task.where(`#actor search budget with ${conditons}`,
            openPage.using(pageName),

            this.selectItemInlookupPopup('Associated Project', conditons.get('Associated Project'), 'Project Name'),
            this.selectItemInlookupPopup('Fund', conditons.get('Fund'), 'Fund ID'),

            clickButton.using(SEARCH),
            Wait.for(Duration.ofSeconds(3)),
            checkGridList(),
        )

    /**
     * 选择fiscal year
     * @param fieldName 字段名称 StartFiscalYear/EndFiscalYear
     * @param itemName 要选择的值
     * @returns 
     */
    selectFiscalYearDropdownItem = (fieldName: string, itemName: string) => {

        return Task.where(`#actor searchs single item : ${itemName} in ${fieldName} lookup dropdown list`,

            Click.on(this.fiscalYearDropdownInputField(fieldName)),
            Ensure.eventually(this.lookupDropdownList(fieldName), isPresent()),
            Enter.theValue(itemName).into(this.fiscalYearDropdownInputField(fieldName)),

            Ensure.eventually(this.lookupDropdownList(fieldName), isPresent()),
            Click.on(this.fiscalYearDropdownItem(fieldName, itemName))

        )
    }
    /**
     * Fiscal Year的两个搜索框
     * @param fieldName 字段名称 StartFiscalYear/EndFiscalYear
     * @returns 
     */
    fiscalYearDropdownInputField = (fieldName: string) =>
        PageElement.located(By.css(`[aria-owns="ctl00_body_A0_FiscalYear_ddl${fieldName}_listbox"]`))
            .describedAs('Fiscal Year dropdown input field')

    fiscalYearDropdownBox = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_A0_FiscalYear_ddl' + fieldName + '-list'))
            .describedAs('Fiscal Year dropdown box')

    fiscalYearDropdownList = (fieldName: string) =>
        PageElement.located(By.css('li'))
            .of(this.fiscalYearDropdownBox(fieldName))
            .describedAs('Fiscal Year dropdown list')

    fiscalYearDropdownItem = (fieldName: string, itemName: string) =>
        PageElement.located(By.cssContainingText('span', itemName))
            .of(this.fiscalYearDropdownBox(fieldName))
            .describedAs('Fiscal Year dropdown item')

    selectAllCheckBoxInBudgetGrid = () =>
        PageElement.located(By.id('ctl00_body_gvBudget_head_GridView_HearderCheckBox'))
            .describedAs('select all checkbox in budget grid')

    deleteSelectedIcon = () =>
        PageElement.located(By.id('ctl00_body_gvBudget_ctl01_btnDeleteSelected'))
            .describedAs('delete selected icon')

}

export const browseBudget = new BrowseBudgetFields(budgetAttributesMap)

