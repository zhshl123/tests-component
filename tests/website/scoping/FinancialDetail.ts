import { Ensure, equals, isPresent } from '@serenity-js/assertions';
import { Duration, Question, Task, Wait } from '@serenity-js/core';
import { Attribute, By, Click, Enter, PageElement, PageElements, Switch } from '@serenity-js/web'

import { OK, SEARCH, SUCCEEDED } from '../../DefaultStaticParams';
import { clickButton } from '../common';
import { LineItemFields } from '../common/abstract';
import { browseFund } from '../fund/BrowseFundFields';
import { scopingMap } from './ScopingAttributes';

export class EditFinancialDetail extends LineItemFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);

    }

    /**
    * scoping Detail Project Cost数据表填值
    * @param rowNumber 第一行为0，以此类推
    * @param colNumber 第一列为0，以此类推
    * @param value 要填的值
    * @returns 
    */
    fillScopingDetailProjectCostTableCurrencyCell = (rowNumber: number, colNumber: number, value: string) => {
        return Task.where(`#actor fill scoping detail project cost table cell row:${rowNumber}, column:${colNumber} with value ${value}`,
            Click.on(this.scopingDetailProjectCostTableCurrencyCell(rowNumber, colNumber)),
            Enter.theValue(value).into(this.scopingDetailProjectCostTableCurrencyCell(rowNumber, colNumber))

        )
    }

    checkScopingDetailProjectCostTableCurrencyCellValue = (rowNumber: number, colNumber: number, value: string) => {
        return Task.where(`#actor check scoping allocation table cell row:${rowNumber}, column:${colNumber} with value ${value}`,
            Ensure.eventually(Attribute.called('initialvalue').of(this.scopingDetailProjectCostTableCurrencyCell(rowNumber, colNumber)), equals(value))
        )
    }

    checkScopingDetailProjectCostTableFootCurrencyCellValue = (colNumber: number, value: string) => {
        return Task.where(`#actor check scoping allocation table foot cell column:${colNumber} with value ${value}`,
            Ensure.eventually(Attribute.called('initialvalue').of(this.scopingDetailProjectCostTableFootCurrencyCell(colNumber)), equals(value))
        )
    }

    fillPhaseDropdownInputField = (rowNumber: number, colNumber: number, value: string) => {
        return Task.where(`#actor fill dropdown input row: ${rowNumber}, column:${colNumber} with ${value}`,
            Click.on(this.scopingDetailProjectCostTableAttributeCell(rowNumber, colNumber)),
            Enter.theValue(value).into(this.scopingDetailProjectCostTableAttributeCell(rowNumber, colNumber)),
            Click.on(this.scopingDetailProjectCostTableHeadRow())
        );
    }

    /**
     * 在scoping Detail Project Cost数据表的fund弹窗中搜索目标fund
     * @param rowNumber 第一行为0，以此类推
     * @param value 要填的值
     * @returns 
     */
    searchScopingDetailProjectCostTableFundInPopup = (rowNumber: number, value: string | Question<any>) => {
        return Task.where(`#actor search fund:${value} in scoping detail project cost table fund row:${rowNumber} lookup popup`,
            Click.on(this.scopingDetailProjectCostTableFundLookupIcon(rowNumber)),
            Ensure.eventually(this.scopingDetailProjectCostTableFundLookupPopup(), isPresent()),
            Wait.for(Duration.ofSeconds(5)),
            Switch.to(this.scopingDetailProjectCostTableFundLookupPopup()).and(
                browseFund.fillTextInputField('Fund Name', value),
                clickButton.using(SEARCH),
                Wait.for(Duration.ofSeconds(3)),
                browseFund.checkSearchResult(value, SUCCEEDED),
                Click.on(PageElements.located(By.css(`td [type="radio"]`)).first()),
                clickButton.using(OK)
            ),

        )
    }

    SyncButton = () =>
        PageElement.located(By.id('ctl00_body_fakePopupExtender_btnSync'))
            .describedAs('scoping page Sync button')

    scopingDetailProjectCostTable = () =>
        PageElement.located(By.css('.cdatagrid.cdatagrid--auto'))
            .describedAs('scoping detail project cost table')

    /**
     * scoping Detail Project Cost表的表头所在行
     * @returns 
     */
    scopingDetailProjectCostTableHeadRow = () =>
        PageElement.located(By.css('thead'))
            .of(this.scopingDetailProjectCostTable())
            .describedAs(`scoping detail project cost table head row`)

    /**
     * scoping Detail Project Cost表的表体的行
     * @param rowNumber 第一行为0，以此类推
     * @returns 
     */
    scopingDetailProjectCostTableRow = (rowNumber: number) =>
        PageElements.located(By.css('tbody tr')).nth(rowNumber)
            .of(this.scopingDetailProjectCostTable())
            .describedAs(`scoping detail project cost table row:${rowNumber}`)

    /**
     * scoping Detail Project Cost表的表体的行
     * @param rowNumber 第一行为0，以此类推
     * @param colNumber 列序号，第一列为0，以此类推
     * @returns 
     */
    scopingDetailProjectCostTableAttributeCell = (rowNumber: number, colNumber) =>
        PageElements.located(By.css(`td[cellname="AttributeCell"] input`)).nth(colNumber)
            .of(this.scopingDetailProjectCostTableRow(rowNumber))
            .describedAs(`scoping detail project cost table row:${rowNumber}`)

    /**
     * scoping Detail Project Cost表的表体的填金额的列
     * @param rowNumber 第一行为0，以此类推
     * @param colNumber 第一列为0，以此类推
     * @returns 
     */
    scopingDetailProjectCostTableCurrencyCell = (rowNumber: number, colNumber: number) =>
        PageElements.located(By.css('td.currency input')).nth(colNumber)
            .of(this.scopingDetailProjectCostTableRow(rowNumber))
            .describedAs(`scoping detail project cost table row:${rowNumber}, column:${colNumber} cell`)

    scopingDetailProjectCostTableFootCurrencyCell = (colNumber: number) =>
        PageElements.located(By.css('tfoot td.currency input')).nth(colNumber)
            .of(this.scopingDetailProjectCostTable())
            .describedAs(`scoping detail project cost table foot column:${colNumber} cell`)

    scopingDetailProjectCostTableFundLookupIcon = (rowNumber: number,) =>
        PageElement.located(By.css(`[popupdivid="divPopup_cstm_FundId"]`))
            .of(this.scopingDetailProjectCostTableRow(rowNumber))
            .describedAs(`scoping detail project cost table row:${rowNumber} fund lookup icon`)

    scopingDetailProjectCostTableFundLookupPopup = () =>
        PageElement.located(By.css('#divPopup_cstm_FundId iframe'))

    scopingDetailProjectCostTableFundLookupInputField = (rowNumber: number) =>
        PageElement.located(By.css(`input[columnname="cstm_FundId"]`))
            .of(this.scopingDetailProjectCostTableRow(rowNumber))

    syncButton = () =>
        PageElement.located(By.css('#cipActionBarWrapper #ctl00_body_fakePopupExtender_btnSync'))
            .describedAs('scoping page Sync button')

    scopingDetailTab = (tabName: string) =>
        PageElement.located(By.cssContainingText('#ctl00_body_financialEvaluation_tbWorkSheet li a', tabName))
            .describedAs('scoping detail tab:' + tabName)

    scopingDetailProjectCostTableOptionCell = (rowNumber: number) =>
        PageElement.located(By.css(`[data-column-type="command"]`))
            .of(this.scopingDetailProjectCostTableRow(rowNumber))
            .describedAs('scoping detail Project cost table option cell')

    scopingDetailProjectCostTableOptionButton = (rowNumber: number, buttonName: string) =>
        PageElement.located(By.css(`a[title="${buttonName}"]`))
            .of(this.scopingDetailProjectCostTableOptionCell(rowNumber))
            .describedAs('scoping detail Project Cost table option button:' + buttonName)

    scopingDetailProjectCostTableAdjustButton = (rowNumber: number) =>
        PageElements.located(By.css('a')).nth(4)
            .of(this.scopingDetailProjectCostTableOptionCell(rowNumber))
            .describedAs('scoping detail Project Cost table adjust button')

    scopingDetailTableTopButton = (buttonName: string) => {
        buttonName = buttonName.replace(' ', '')
        return PageElement.located(By.css(`[name="ctl00$body$financialEvaluation$btn${buttonName}"]`))
            .describedAs('scoping detail table button')
    }

}

export const financialDetail = new EditFinancialDetail(scopingMap)