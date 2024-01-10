
import { DataTable } from '@cucumber/cucumber';
import { equals, not, } from '@serenity-js/assertions';
import { Check, Duration, Question, Task, Wait } from '@serenity-js/core'
import { Attribute, By, Click, Cookie, isVisible, PageElement } from '@serenity-js/web'

import { BATCH_DELETE, DELETE, FAILED, INSERT, LOAD_FROM, OK, SAVE, SUCCEEDED } from '../../../DefaultStaticParams';
import { checkBulkEditSetionButtonVisible, checkButtonVisible, checkMessagePopupBox, clickButton, clickMessagePopupButton, formatted_now, waitMessagePopupBoxVisible } from '../../common';
import { APPROVED, COOKIE_CONTRACT_NAME } from '../../common/statics';
import { contractTab } from '../components';
import { contract } from '../components/EditContractFields';
import { fillContractNotRequiredFields } from '../CreateContract';

/**
 * 切换tab
 * @returns 
 */
export const clickContractTab = {
    using: (tabName) =>
        Task.where(`#actor click contract tab: ${tabName}`,
            Click.on(ContractGeneralInfo.contractTab(tabName)),

        )
}

/**
 * line items tab
 * @returns 
 */
export const clickContractLineItemsTab = () =>
    Task.where(`#actor click contract tab: Line items`,
        Click.on(ContractGeneralInfo.contractLineItemsTab()),

    )

/**
 * splitting line items tab
 * @returns 
 */
export const clickContractSplittingLineItemsTab = () =>
    Task.where(`#actor click contract tab: Spplitting Line items`,
        Click.on(ContractGeneralInfo.contractSplittingLineItemsTab()),
    )

export const changeContractStatus = {
    using: (targetStatus: string) => {
        return Task.where(`#actor change contract status into ${targetStatus}`,

            contract.selectDropdownItem('Contract Status', targetStatus),

            Check.whether(
                // 判断是否修改的目标状态为approved
                Attribute.called('title').of(contract.dropdownField('Contract Status')), equals(APPROVED)
            ).andIfSo(
                // 如果是的话，start date和end date如果为空的话，需要填值
                Check.whether(Attribute.called('value').of(contract.dateInputField('Start Date')), not(equals(''))
                ).andIfSo(
                    contract.selectDateToday('Start Date', 0)
                ),

            ),

            // 提交保存
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
            Wait.for(Duration.ofSeconds(2))
        )

    }

}

export const checkContractReadOnlyContract = () =>
    Task.where(`#actor check contract read only`,
        checkButtonVisible.using(DELETE, FAILED),

        contractTab.clickTab('Line Items'),
        Wait.for(Duration.ofSeconds(3)),
        checkBulkEditSetionButtonVisible.using(INSERT, FAILED),
        checkBulkEditSetionButtonVisible.using(LOAD_FROM, FAILED),
        checkBulkEditSetionButtonVisible.using(BATCH_DELETE, FAILED),

    )

export const updateContractGeneralInfo = {
    using: (contractInfo: DataTable, updatedContractName: string) => {
        const timestamp = formatted_now

        return Task.where(`#actor update contract general information`,
            contract.fillTextInputField('Contract Name', updatedContractName + timestamp),
            contract.setCookie(COOKIE_CONTRACT_NAME, updatedContractName + timestamp),
            contract.fillTextInputField('Contract Number', updatedContractName + timestamp),
            contract.selectItemInlookupPopup('Prime Contractor', contractInfo.rowsHash().PrimeContractor, 'Vendor ID'),
            Wait.for(Duration.ofSeconds(5)),

            // 非必填字段
            fillContractNotRequiredFields.using(contractInfo),

            // 提交
            clickButton.using(SAVE),
            checkMessagePopupBox(),
            Wait.for(Duration.ofSeconds(2)),

        )
    }

}

export const checkUpdatedContractGeneralInfo = {
    using: (contractInfo: DataTable) => {

        return Task.where(`#actor check updated contract general information`,
            contract.checkTextInputFieldValue('Contract Name', Cookie.called(COOKIE_CONTRACT_NAME).value(), SUCCEEDED),
            contract.checkTextInputFieldValue('Contract Number', Cookie.called(COOKIE_CONTRACT_NAME).value(), SUCCEEDED),
            contract.checkLookupInputFieldSingleValue('Prime Contractor', contractInfo.rowsHash().PrimeContractor, SUCCEEDED),
            contract.checkDateInputFieldValue('Award Date', contractInfo.rowsHash().AwardDate, SUCCEEDED),
            contract.checkDateInputFieldValue('Signed Date', contractInfo.rowsHash().SignedDate, SUCCEEDED),
            contract.checkTextInputFieldValue('Contact Person', contractInfo.rowsHash().ContactPerson, SUCCEEDED),
            contract.checkNumberInputFieldValue('DBE Participation Goal', contractInfo.rowsHash().DBEParticipationGoal, SUCCEEDED),
            contract.checkNumberInputFieldValue('Retainage Rate', contractInfo.rowsHash().RetainageRate, SUCCEEDED),
            // 动态出现的fields
            Check.whether(contract.lookupInputFieldUl('Parent Contract'), isVisible())
                .andIfSo(
                    contract.checkLookupInputFieldSingleValue('Parent Contract', contractInfo.rowsHash().ParentContract, SUCCEEDED),
                ),

            //动态出现的fields
            Check.whether(contract.dateInputField('NTP Date'), isVisible())
                .andIfSo(
                    contract.checkDateInputFieldValue('NTP Date', contractInfo.rowsHash().NTPDate, SUCCEEDED),
                    contract.checkDateInputFieldValue('Substantial Completion Date', contractInfo.rowsHash().SubstantialCompletionDate, SUCCEEDED),
                    contract.checkDateInputFieldValue('Final Completion Date', contractInfo.rowsHash().FinalCompletionDate, SUCCEEDED),
                ),

            // Contract Timeline
            contract.checkDateInputFieldValue('Start Date', contractInfo.rowsHash().StartDate, SUCCEEDED),
            contract.checkNumberInputFieldValue('Duration', contractInfo.rowsHash().Duration, SUCCEEDED),
            contract.checkDateInputFieldValue('End Date', contractInfo.rowsHash().EndDate, SUCCEEDED),

        )

    }

}

export const deleteContract = {
    using: (contractNo: string | Question<any>) =>
        Task.where(`#actor delete contract ${contractNo}`,
            clickButton.using(DELETE),
            clickMessagePopupButton.using(OK),
            Wait.for(Duration.ofSeconds(5))

        )
}

/**
 * Edit contract 的General 组件
 */
export class ContractGeneralInfo {
    static contractTabPanel = () =>
        PageElement.located(By.id('ctl00_cipTabs_UcContractTabs_divTab'))
            .describedAs('Contract tab panel')

    static contractTab = (tabName: string) =>
        PageElement.located(By.cssContainingText('a', tabName))
            .of(this.contractTabPanel())
            .describedAs('Contract tab:' + tabName)

    static contractLineItemsTab = () =>
        PageElement.located(By.css(`[tabid="2"]`))
            .of(this.contractTabPanel())
            .describedAs('Contract line Items tab')

    static contractSplittingLineItemsTab = () =>
        PageElement.located(By.css(`[tabid="3"]`))
            .of(this.contractTabPanel())
            .describedAs('Contract Splitting line Items tab')

    static contractStatusDropdownField = () =>
        PageElement.located(By.css(`[name="ctl00$body$ContractStatusID$ddlPicklist_input"]`))
            .describedAs('Contract Status dropdown field')

    static contractStatusDropdownListBox = () =>
        PageElement.located(By.id('ctl00_body_ContractStatusID_ddlPicklist-list'))
            .describedAs('Contract Status dropdown list box')

    static contractStatus = (statusName: string) =>
        PageElement.located(By.css(`[title="${statusName}"]`))
            .describedAs('Contract Status' + statusName)

    static startDateInputField = () =>
        PageElement.located(By.id('ctl00_body_BeginDate_layDateTime'))
            .describedAs('Contreact Time Line Start Date input field')

    static startDateCalendarIcon = () =>
        PageElement.located(By.css(`[aria-controls="ctl00_body_BeginDate_layDateTime_dateview"]`))
            .describedAs('Contreact Time Line Start Date calendar icon')

    static endDateInputField = () =>
        PageElement.located(By.id('ctl00_body_EndDate_layDateTime'))
            .describedAs('Contreact Time Line End Date input field')

    static endDateCalendarIcon = () =>
        PageElement.located(By.css(`[aria-controls="ctl00_body_EndDate_layDateTime_dateview"]`))
            .describedAs('Contreact Time Line End Date calendar icon')

}