import { DataTable } from '@cucumber/cucumber';
import { equals, isPresent, not } from '@serenity-js/assertions';
import { Check, Duration, Task, Wait } from '@serenity-js/core';
import { Attribute, Click, Cookie, isVisible } from '@serenity-js/web';

import { ADD, BATCH_DELETE, BATCH_UPDATE, DELETE, FAILED, INSERT, LOAD_FROM, OK, SAVE, SUCCEEDED } from '../../DefaultStaticParams';
import { checkBulkEditSetionButtonVisible, checkButtonVisible, checkMessagePopupBox, checkSectionButtonVisible, clickButton, clickMessagePopupButton, clickSectionButton, formatted_now, openPage, waitMessagePopupBoxInvisible, waitMessagePopupBoxVisible } from '../common';
import { APPROVED, COOKIE_CONTRACT_NAME, COOKIE_CONTRACT_NO } from '../common/statics';
import { ADD_CONTRACT } from '../common/statics/StaticPageName';
import { contractDefaultLineItemSlitting } from './components/ContractDefaultLineItemSplittingFields';
import { contractTab } from './components/ContractTab';
import { contract } from './components/EditContractFields';

export class ContractCrud {
    contractType: string

    /**
     * 添加contract
     */
    addByAllFields = (contractInfo: DataTable) => {
        return Task.where(`#actor submit add contract information with all fields`,
            openPage.using(ADD_CONTRACT),
            // 添加等待时间，以确保页面加载完成
            Wait.for(Duration.ofSeconds(2)),
            // 填入必填字段
            this.addByRequiredFields(contractInfo.rowsHash().ContractType,
                contractInfo.rowsHash().ContractNo,
                contractInfo.rowsHash().ContractName,
                contractInfo.rowsHash().PrimeContractor),

            // 填入非必填字段
            this.fillNotRequiredFields(contractInfo, ''),

            // 提交
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
            Wait.for(Duration.ofSeconds(5)),
        )
    }

    addByRequiredFields = (contractType: string, contractNo: string, contractName: string, primeContractor: string) => {
        const timestamp = formatted_now
        this.contractType = contractType
        return Task.where(`#actor fill contract with required fields and save`,

            // 选完Contract Type，会有一个刷新页面的动作，所以需要等待刷新完成在进行后续的信息填写
            contract.selectDropdownItem('Contract Type', contractType),
            Wait.for(Duration.ofSeconds(5)),
            // 设置contractNo = 前缀+时间戳 ，以免出现contractNo重复
            contract.fillTextInputField('Contract No.', contractNo + timestamp),
            // 设置cookie，后续可能要用到Contract No.
            contract.setCookie(COOKIE_CONTRACT_NO, contractNo + timestamp),

            contract.fillTextInputField('Contract Name', contractName + timestamp),
            contract.setCookie(COOKIE_CONTRACT_NAME, contractName + timestamp),

            // 选完Prime Contractor，会有一个刷新页面的动作，所以需要等待刷新完成在进行后续的信息填写
            contract.selectItemInlookupPopup('Prime Contractor', primeContractor, 'Vendor ID'),
            Wait.for(Duration.ofSeconds(5)),

            // 提交
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
            Wait.for(Duration.ofSeconds(5)),

        )
    }

    fillNotRequiredFields = (contractInfo: DataTable, parentContract: string) => {

        return Task.where(`#actor fill contract with not required fields`,

            contract.fillDateInputField('Award Date', contractInfo.rowsHash().AwardDate),
            contract.fillDateInputField('Signed Date', contractInfo.rowsHash().SignedDate),
            contract.fillTextInputField('Contact Person', contractInfo.rowsHash().ContactPerson),
            contract.fillTextInputField('Description', contractInfo.rowsHash().Description),
            contract.fillNumberInputField('DBE Participation Goal', contractInfo.rowsHash().DBEParticipationGoal),
            contract.fillNumberInputField('Retainage Rate', contractInfo.rowsHash().RetainageRate),
            contract.fillNumberInputField('Maximum Retainage Percentage', contractInfo.rowsHash().MaximumRetainagePercentage),
            Check.whether(
                contract.lookupInputField('Parent Contract'), isPresent()
            ).andIfSo(
                contract.selectItemInlookupPopup('Parent Contract', parentContract, 'Contract No.'),
            ),

            //动态出现的日历
            Check.whether(contract.dateInputField('NTP Date'), isVisible())
                .andIfSo(
                    contract.fillDateInputField('NTP Date', contractInfo.rowsHash().NTPDate),
                    contract.fillDateInputField('Substantial Completion Date', contractInfo.rowsHash().SubstantialCompletionDate),
                    contract.fillDateInputField('Final Completion Date', contractInfo.rowsHash().FinalCompletionDate),
                    // Contract Timeline
                    contract.fillDateInputField('Start Date', contractInfo.rowsHash().StartDate),
                    contract.fillDateInputField('End Date', contractInfo.rowsHash().EndDate),
                ).otherwise(
                    // Contract Timeline
                    contract.fillDateInputField('Start Date', contractInfo.rowsHash().StartDate),
                    contract.fillDateInputField('End Date', contractInfo.rowsHash().EndDate),
                )

        )
    }

    addDefaultLineItemSplitting = {
        using: (contractDefaultLineItems: DataTable) =>
            Task.where(`#actor add contract default line items`,
                clickSectionButton.using(ADD),

                Check.whether(contractDefaultLineItemSlitting.lookupIcon('Project', 1), isVisible()).andIfSo(
                    Click.on(contractDefaultLineItemSlitting.checkBox(1)),
                    clickSectionButton.using(DELETE),
                ),
                contractDefaultLineItemSlitting.searchItemInPopup('Project', 0, contractDefaultLineItems.rowsHash().Project, 'Project Name'),
                contractDefaultLineItemSlitting.searchItemInPopup('Fund', 0, contractDefaultLineItems.rowsHash().Fund, 'Fund ID'),

                contractDefaultLineItemSlitting.fillTextInputField('Percentage', 0, contractDefaultLineItems.rowsHash().Percentage),

                clickButton.using(SAVE),
                waitMessagePopupBoxInvisible(),
                Wait.for(Duration.ofSeconds(5)),
            )

    }

    changeContractStatus = (targetStatus: string) => {
        return Task.where(`#actor change contract status into ${targetStatus}`,

            contract.fillDropdownInputField('Contract Status', targetStatus),

            Check.whether(
                // 判断是否修改的目标状态为approved
                Attribute.called('title').of(contract.dropdownField('Contract Status')), equals(APPROVED)
            ).andIfSo(
                // 如果是的话，start date和end date如果为空的话，需要填值
                Check.whether(Attribute.called('value').of(contract.dateInputField('Start Date')), not(equals(''))
                ).andIfSo(
                    contract.selectDateToday('Start Date', 0)
                ),

                Check.whether(Attribute.called('value').of(contract.dateInputField('End Date')), not(equals(''))
                ).andIfSo(
                    contract.selectDateToday('End Date', 1)
                ),

            ),

            // 提交保存
            clickButton.using(SAVE),
            Wait.for(Duration.ofSeconds(5))
        )

    }

    checkContractReadOnlyContract = () =>
        Task.where(`#actor check contract read only`,
            checkButtonVisible.using(SAVE, FAILED),
            checkButtonVisible.using(DELETE, FAILED),

            contractTab.clickTab('Line Items'),
            checkButtonVisible.using(SAVE, FAILED),
            checkBulkEditSetionButtonVisible.using(INSERT, FAILED),
            checkBulkEditSetionButtonVisible.using(LOAD_FROM, FAILED),
            checkBulkEditSetionButtonVisible.using(BATCH_DELETE, FAILED),

            contractTab.clickTab('Splitting Line Items'),
            checkSectionButtonVisible.using(BATCH_DELETE, FAILED),
            checkSectionButtonVisible.using(BATCH_UPDATE, FAILED),

        )

    updateGeneralInfo = (contractInfo: DataTable, updatedContractNo: string, updatedContractName: string, parentContract: string) => {
        const timestamp = formatted_now

        return Task.where(`#actor update contract general information`,
            contract.fillTextInputField('Contract No.', updatedContractNo + timestamp),
            contract.setCookie(COOKIE_CONTRACT_NO, updatedContractNo + timestamp),
            contract.fillTextInputField('Contract Name', updatedContractName + timestamp),
            contract.setCookie(COOKIE_CONTRACT_NAME, updatedContractName + timestamp),

            contract.selectItemInlookupPopup('Prime Contractor', contractInfo.rowsHash().PrimeContractor, 'Vendor ID'),
            Wait.for(Duration.ofSeconds(5)),

            // 非必填字段
            this.fillNotRequiredFields(contractInfo, parentContract),

            // 提交
            clickButton.using(SAVE),
            checkMessagePopupBox(),
            Wait.for(Duration.ofSeconds(2)),

        )
    }

    checkGeneralInfo = (contractInfo: DataTable, parentContract: string) => {

        return Task.where(`#actor check updated contract general information`,
            contract.checkTextInputFieldValue('Contract No.', Cookie.called(COOKIE_CONTRACT_NO).value(), SUCCEEDED),
            contract.checkTextInputFieldValue('Contract Name', Cookie.called(COOKIE_CONTRACT_NAME).value(), SUCCEEDED),
            contract.checkLookupInputFieldSingleValue('Prime Contractor', contractInfo.rowsHash().PrimeContractor, SUCCEEDED),
            contract.checkDateInputFieldValue('Award Date', contractInfo.rowsHash().AwardDate, SUCCEEDED),
            contract.checkDateInputFieldValue('Signed Date', contractInfo.rowsHash().SignedDate, SUCCEEDED),
            contract.checkTextInputFieldValue('Contact Person', contractInfo.rowsHash().ContactPerson, SUCCEEDED),
            contract.checkTextInputFieldValue('Description', contractInfo.rowsHash().Description, SUCCEEDED),
            contract.checkNumberInputFieldValue('DBE Participation Goal', contractInfo.rowsHash().DBEParticipationGoal, SUCCEEDED),
            contract.checkNumberInputFieldValue('Retainage Rate', contractInfo.rowsHash().RetainageRate, SUCCEEDED),
            contract.checkNumberInputFieldValue('Maximum Retainage Percentage', contractInfo.rowsHash().MaximumRetainagePercentage, SUCCEEDED),
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
            contract.checkDateInputFieldValue('End Date', contractInfo.rowsHash().EndDate, SUCCEEDED),

        )

    }

    delete = () =>
        Task.where(`#actor delete contract`,
            clickButton.using(DELETE),
            clickMessagePopupButton.using(OK),
            Wait.for(Duration.ofSeconds(5))

        )

}

export const contractCrud = new ContractCrud()