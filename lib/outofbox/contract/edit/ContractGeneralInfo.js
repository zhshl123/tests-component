"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractGeneralInfo = exports.deleteContract = exports.checkUpdatedContractGeneralInfo = exports.updateContractGeneralInfo = exports.checkContractReadOnlyContract = exports.changeContractStatus = exports.clickContractSplittingLineItemsTab = exports.clickContractLineItemsTab = exports.clickContractTab = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../../DefaultStaticParams");
const common_1 = require("../../common");
const statics_1 = require("../../common/statics");
const components_1 = require("../components");
const EditContractFields_1 = require("../components/EditContractFields");
const CreateContract_1 = require("../CreateContract");
/**
 * 切换tab
 * @returns
 */
exports.clickContractTab = {
    using: (tabName) => core_1.Task.where(`#actor click contract tab: ${tabName}`, web_1.Click.on(ContractGeneralInfo.contractTab(tabName)))
};
/**
 * line items tab
 * @returns
 */
const clickContractLineItemsTab = () => core_1.Task.where(`#actor click contract tab: Line items`, web_1.Click.on(ContractGeneralInfo.contractLineItemsTab()));
exports.clickContractLineItemsTab = clickContractLineItemsTab;
/**
 * splitting line items tab
 * @returns
 */
const clickContractSplittingLineItemsTab = () => core_1.Task.where(`#actor click contract tab: Spplitting Line items`, web_1.Click.on(ContractGeneralInfo.contractSplittingLineItemsTab()));
exports.clickContractSplittingLineItemsTab = clickContractSplittingLineItemsTab;
exports.changeContractStatus = {
    using: (targetStatus) => {
        return core_1.Task.where(`#actor change contract status into ${targetStatus}`, EditContractFields_1.contract.selectDropdownItem('Contract Status', targetStatus), core_1.Check.whether(
        // 判断是否修改的目标状态为approved
        web_1.Attribute.called('title').of(EditContractFields_1.contract.dropdownField('Contract Status')), (0, assertions_1.equals)(statics_1.APPROVED)).andIfSo(
        // 如果是的话，start date和end date如果为空的话，需要填值
        core_1.Check.whether(web_1.Attribute.called('value').of(EditContractFields_1.contract.dateInputField('Start Date')), (0, assertions_1.not)((0, assertions_1.equals)(''))).andIfSo(EditContractFields_1.contract.selectDateToday('Start Date', 0))), 
        // 提交保存
        common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)(), core_1.Wait.for(core_1.Duration.ofSeconds(2)));
    }
};
const checkContractReadOnlyContract = () => core_1.Task.where(`#actor check contract read only`, common_1.checkButtonVisible.using(DefaultStaticParams_1.DELETE, DefaultStaticParams_1.FAILED), components_1.contractTab.clickTab('Line Items'), core_1.Wait.for(core_1.Duration.ofSeconds(3)), common_1.checkBulkEditSetionButtonVisible.using(DefaultStaticParams_1.INSERT, DefaultStaticParams_1.FAILED), common_1.checkBulkEditSetionButtonVisible.using(DefaultStaticParams_1.LOAD_FROM, DefaultStaticParams_1.FAILED), common_1.checkBulkEditSetionButtonVisible.using(DefaultStaticParams_1.BATCH_DELETE, DefaultStaticParams_1.FAILED));
exports.checkContractReadOnlyContract = checkContractReadOnlyContract;
exports.updateContractGeneralInfo = {
    using: (contractInfo, updatedContractName) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor update contract general information`, EditContractFields_1.contract.fillTextInputField('Contract Name', updatedContractName + timestamp), EditContractFields_1.contract.setCookie(statics_1.COOKIE_CONTRACT_NAME, updatedContractName + timestamp), EditContractFields_1.contract.fillTextInputField('Contract Number', updatedContractName + timestamp), EditContractFields_1.contract.selectItemInlookupPopup('Prime Contractor', contractInfo.rowsHash().PrimeContractor, 'Vendor ID'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), 
        // 非必填字段
        CreateContract_1.fillContractNotRequiredFields.using(contractInfo), 
        // 提交
        common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.checkMessagePopupBox)(), core_1.Wait.for(core_1.Duration.ofSeconds(2)));
    }
};
exports.checkUpdatedContractGeneralInfo = {
    using: (contractInfo) => {
        return core_1.Task.where(`#actor check updated contract general information`, EditContractFields_1.contract.checkTextInputFieldValue('Contract Name', web_1.Cookie.called(statics_1.COOKIE_CONTRACT_NAME).value(), DefaultStaticParams_1.SUCCEEDED), EditContractFields_1.contract.checkTextInputFieldValue('Contract Number', web_1.Cookie.called(statics_1.COOKIE_CONTRACT_NAME).value(), DefaultStaticParams_1.SUCCEEDED), EditContractFields_1.contract.checkLookupInputFieldSingleValue('Prime Contractor', contractInfo.rowsHash().PrimeContractor, DefaultStaticParams_1.SUCCEEDED), EditContractFields_1.contract.checkDateInputFieldValue('Award Date', contractInfo.rowsHash().AwardDate, DefaultStaticParams_1.SUCCEEDED), EditContractFields_1.contract.checkDateInputFieldValue('Signed Date', contractInfo.rowsHash().SignedDate, DefaultStaticParams_1.SUCCEEDED), EditContractFields_1.contract.checkTextInputFieldValue('Contact Person', contractInfo.rowsHash().ContactPerson, DefaultStaticParams_1.SUCCEEDED), EditContractFields_1.contract.checkNumberInputFieldValue('DBE Participation Goal', contractInfo.rowsHash().DBEParticipationGoal, DefaultStaticParams_1.SUCCEEDED), EditContractFields_1.contract.checkNumberInputFieldValue('Retainage Rate', contractInfo.rowsHash().RetainageRate, DefaultStaticParams_1.SUCCEEDED), 
        // 动态出现的fields
        core_1.Check.whether(EditContractFields_1.contract.lookupInputFieldUl('Parent Contract'), (0, web_1.isVisible)())
            .andIfSo(EditContractFields_1.contract.checkLookupInputFieldSingleValue('Parent Contract', contractInfo.rowsHash().ParentContract, DefaultStaticParams_1.SUCCEEDED)), 
        //动态出现的fields
        core_1.Check.whether(EditContractFields_1.contract.dateInputField('NTP Date'), (0, web_1.isVisible)())
            .andIfSo(EditContractFields_1.contract.checkDateInputFieldValue('NTP Date', contractInfo.rowsHash().NTPDate, DefaultStaticParams_1.SUCCEEDED), EditContractFields_1.contract.checkDateInputFieldValue('Substantial Completion Date', contractInfo.rowsHash().SubstantialCompletionDate, DefaultStaticParams_1.SUCCEEDED), EditContractFields_1.contract.checkDateInputFieldValue('Final Completion Date', contractInfo.rowsHash().FinalCompletionDate, DefaultStaticParams_1.SUCCEEDED)), 
        // Contract Timeline
        EditContractFields_1.contract.checkDateInputFieldValue('Start Date', contractInfo.rowsHash().StartDate, DefaultStaticParams_1.SUCCEEDED), EditContractFields_1.contract.checkNumberInputFieldValue('Duration', contractInfo.rowsHash().Duration, DefaultStaticParams_1.SUCCEEDED), EditContractFields_1.contract.checkDateInputFieldValue('End Date', contractInfo.rowsHash().EndDate, DefaultStaticParams_1.SUCCEEDED));
    }
};
exports.deleteContract = {
    using: (contractNo) => core_1.Task.where(`#actor delete contract ${contractNo}`, common_1.clickButton.using(DefaultStaticParams_1.DELETE), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK), core_1.Wait.for(core_1.Duration.ofSeconds(5)))
};
/**
 * Edit contract 的General 组件
 */
class ContractGeneralInfo {
}
exports.ContractGeneralInfo = ContractGeneralInfo;
_a = ContractGeneralInfo;
ContractGeneralInfo.contractTabPanel = () => web_1.PageElement.located(web_1.By.id('ctl00_cipTabs_UcContractTabs_divTab'))
    .describedAs('Contract tab panel');
ContractGeneralInfo.contractTab = (tabName) => web_1.PageElement.located(web_1.By.cssContainingText('a', tabName))
    .of(_a.contractTabPanel())
    .describedAs('Contract tab:' + tabName);
ContractGeneralInfo.contractLineItemsTab = () => web_1.PageElement.located(web_1.By.css(`[tabid="2"]`))
    .of(_a.contractTabPanel())
    .describedAs('Contract line Items tab');
ContractGeneralInfo.contractSplittingLineItemsTab = () => web_1.PageElement.located(web_1.By.css(`[tabid="3"]`))
    .of(_a.contractTabPanel())
    .describedAs('Contract Splitting line Items tab');
ContractGeneralInfo.contractStatusDropdownField = () => web_1.PageElement.located(web_1.By.css(`[name="ctl00$body$ContractStatusID$ddlPicklist_input"]`))
    .describedAs('Contract Status dropdown field');
ContractGeneralInfo.contractStatusDropdownListBox = () => web_1.PageElement.located(web_1.By.id('ctl00_body_ContractStatusID_ddlPicklist-list'))
    .describedAs('Contract Status dropdown list box');
ContractGeneralInfo.contractStatus = (statusName) => web_1.PageElement.located(web_1.By.css(`[title="${statusName}"]`))
    .describedAs('Contract Status' + statusName);
ContractGeneralInfo.startDateInputField = () => web_1.PageElement.located(web_1.By.id('ctl00_body_BeginDate_layDateTime'))
    .describedAs('Contreact Time Line Start Date input field');
ContractGeneralInfo.startDateCalendarIcon = () => web_1.PageElement.located(web_1.By.css(`[aria-controls="ctl00_body_BeginDate_layDateTime_dateview"]`))
    .describedAs('Contreact Time Line Start Date calendar icon');
ContractGeneralInfo.endDateInputField = () => web_1.PageElement.located(web_1.By.id('ctl00_body_EndDate_layDateTime'))
    .describedAs('Contreact Time Line End Date input field');
ContractGeneralInfo.endDateCalendarIcon = () => web_1.PageElement.located(web_1.By.css(`[aria-controls="ctl00_body_EndDate_layDateTime_dateview"]`))
    .describedAs('Contreact Time Line End Date calendar icon');
//# sourceMappingURL=ContractGeneralInfo.js.map