import { Ensure, equals, isPresent } from '@serenity-js/assertions';
import { Duration, Question, Task, Wait } from '@serenity-js/core';
import { Attribute, By, Click, Enter, isVisible, Key, PageElement, PageElements, Press, Switch } from '@serenity-js/web'

import { OK, SEARCH, SUCCEEDED } from '../../DefaultStaticParams';
import { clickButton } from '../common';
import { EditFromFields } from '../common/abstract';
import { browseFund } from '../fund/BrowseFundFields';
import { scopingMap } from './ScopingAttributes';

export class ScopingFinancialTabFields extends EditFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);

    }

    /********************************** scoping Summary table **************************************** */
    /**
     * 给scoping数据表填值
     * @param rowNumber 行号，包含表头， 第一行为0，以此类推
     * @param colNumber 列序号，不含首列， 第一列为0， 以此类推
     * @param value 要填的值
     * @returns 
     */
    fillScopingSummaryTableCell = (rowNumber: number, colNumber: number, value: string) => {
        return Task.where(`#actor fill scoping allocation table cell row:${rowNumber}, column:${colNumber} with value ${value}`,
            Click.on(this.scopingSummaryTableCell(rowNumber, colNumber)),
            Enter.theValue(value).into(this.scopingSummaryTableCell(rowNumber, colNumber))

        )
    }

    checkScopingSummaryTableCellValue = (rowNumber: number, colNumber: number, value: string) => {
        return Task.where(`#actor check scoping allocation table cell row:${rowNumber}, column:${colNumber} with value ${value}`,
            Ensure.eventually(Attribute.called('initialvalue').of(this.scopingSummaryTableCell(rowNumber, colNumber)), equals(value))
        )
    }

    checkScopingSummaryTableCellIsReadOnly = (rowNumber: number, colNumber: number) => {
        return Task.where(`#actor check scoping allocation table cell row:${rowNumber}, column:${colNumber} is read only`,
            Ensure.eventually(Attribute.called('disabled').of(this.scopingSummaryTableCell(rowNumber, colNumber)), equals('disabled'))
        )
    }

    /**
     * 选择scoping status选项
     * @param itemName 选项的值
     * @returns 
     */
    selectScopingStatus = (itemName: string) => {
        return Task.where(`#actor select scoping status with value ${itemName}`,
            Click.on(this.scopingStatusDropdownInputField()),
            Ensure.eventually(this.scopingStatusDropdownBox(), isVisible()),
            Click.on(this.scopingStatusDropdownItem(itemName))

        )
    }

    /**
     * 检查scoping status选项
     * @param itemName 选项的值
     * @returns 
     */
    checkScopingStatus = (itemName: string) => {
        return Task.where(`#actor check scoping status with value ${itemName}`,
            Ensure.eventually(Attribute.called('initialvalue').of(this.scopingStatusDropdownInputField()), equals(itemName)),

        )
    }

    /**
     * scoping 数据表的行
     * @param rowNumber 行号，包含表头， 第一行为0，以此类推
     * @returns 
     */
    scopingSummaryTableRow = (rowNumber: number) =>
        PageElements.located(By.css('#ctl00_body_financialEvaluation_dgFinancial tr'))
            .nth(rowNumber)
            .describedAs('scoping allocation table row:' + rowNumber)

    /**
     * scoping 数据表的单元格
     * @param rowNumber 行号，包含表头， 第一行为0，以此类推
     * @param colNumber 列序号，不含首列， 第一列为0， 以此类推
     * @returns 
     */
    scopingSummaryTableCell = (rowNumber: number, colNumber: number) =>
        PageElements.located(By.css('input'))
            .nth(colNumber)
            .of(this.scopingSummaryTableRow(rowNumber))

    scopingStatusDropdownInputField = () =>
        PageElement.located(By.css(`[aria-owns="ctl00_body_financialEvaluation_ddlStatus_listbox"]`))

    scopingStatusDropdownBox = () =>
        PageElement.located(By.id('ctl00_body_financialEvaluation_ddlStatus-list'))

    scopingStatusDropdownItem = (itemName: string) =>
        PageElement.located(By.css(`[title="${itemName}"]`))
            .of(this.scopingStatusDropdownBox())

    scopingTypeDropdownInputfield = () =>
        PageElement.located(By.css(`[aria-owns="ctl00_body_financialEvaluation_dgScopingPage_listbox"]`))
            .describedAs('scoping type dropdown input field')

    scopingTypeDropdownBox = () =>
        PageElement.located(By.id('ctl00_body_financialEvaluation_dgScopingPage-list'))

    scopingTypeDropdownItem = (itemName: string) =>
        PageElement.located(By.css(`[title="${itemName}"]`))
            .of(this.scopingTypeDropdownBox())

    /**
     * scoping 的类型
     * @param value 要选的值
     * @returns 
     */
    selectScopingType = (value: string) => {
        return Task.where(`#actor select scoping type with value ${value}`,
            Click.on(this.scopingTypeDropdownInputfield()),
            Ensure.eventually(this.scopingTypeDropdownBox(), isVisible()),
            Click.on(this.scopingTypeDropdownItem(value))

        )
    }



    /*********************************** Scoping Detail table************************************ */
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

    scopingDetailTableTopButton = (buttonName: string) =>{
        buttonName = buttonName.replace(' ', '')
        return PageElement.located(By.css(`[name="ctl00$body$financialEvaluation$btn${buttonName}"]`))
            .describedAs('scoping detail table button')
    }

    /************************* Promote Scoping Data As Budget ********************** */
    scopingBudgetDate = (fieldName: string) =>{
        const mappedFieldName = scopingMap.get(fieldName)
        return PageElement.located(By.id('ctl00_body_divApproveDate_' + mappedFieldName))
    }

    fillScopingBudgetDate = (fieldName: string, value: string) => {
        const dateArray: string[] = value.split('')
        return Task.where(`#actor fill scoping budget date ${fieldName} with ${value}`,
            Click.on(this.scopingBudgetDate(fieldName)),
            Press.the(dateArray[0], dateArray[1], Key.ArrowRight,
                dateArray[3], dateArray[4], Key.ArrowRight,
                dateArray[6], dateArray[7], dateArray[8], dateArray[9])
                .in(this.scopingBudgetDate(fieldName)),
        );
    }

    checkScopingBudgetDateValue = (fieldName: string, value: string) => {
        return Task.where(`#actor check scoping budget date ${fieldName} with ${value}`,
            Ensure.eventually(Attribute.called('value').of(this.scopingBudgetDate(fieldName)), equals(value))
        );
    }

}

export const scopingFinancial = new ScopingFinancialTabFields(scopingMap)