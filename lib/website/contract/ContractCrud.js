"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contractCrud = exports.ContractCrud = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const StaticPageName_1 = require("../common/statics/StaticPageName");
const ContractDefaultLineItemSplittingFields_1 = require("./components/ContractDefaultLineItemSplittingFields");
const ContractTab_1 = require("./components/ContractTab");
const EditContractFields_1 = require("./components/EditContractFields");
class ContractCrud {
    constructor() {
        /**
         * 添加contract
         */
        this.addByAllFields = (contractInfo) => {
            return core_1.Task.where(`#actor submit add contract information with all fields`, common_1.openPage.using(StaticPageName_1.ADD_CONTRACT), 
            // 添加等待时间，以确保页面加载完成
            core_1.Wait.for(core_1.Duration.ofSeconds(2)), 
            // 填入必填字段
            this.addByRequiredFields(contractInfo.rowsHash().ContractType, contractInfo.rowsHash().ContractNo, contractInfo.rowsHash().ContractName, contractInfo.rowsHash().PrimeContractor), 
            // 填入非必填字段
            this.fillNotRequiredFields(contractInfo, ''), 
            // 提交
            common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)(), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
        };
        this.addByRequiredFields = (contractType, contractNo, contractName, primeContractor) => {
            const timestamp = common_1.formatted_now;
            this.contractType = contractType;
            return core_1.Task.where(`#actor fill contract with required fields and save`, 
            // 选完Contract Type，会有一个刷新页面的动作，所以需要等待刷新完成在进行后续的信息填写
            EditContractFields_1.contract.selectDropdownItem('Contract Type', contractType), core_1.Wait.for(core_1.Duration.ofSeconds(5)), 
            // 设置contractNo = 前缀+时间戳 ，以免出现contractNo重复
            EditContractFields_1.contract.fillTextInputField('Contract No.', contractNo + timestamp), 
            // 设置cookie，后续可能要用到Contract No.
            EditContractFields_1.contract.setCookie(statics_1.COOKIE_CONTRACT_NO, contractNo + timestamp), EditContractFields_1.contract.fillTextInputField('Contract Name', contractName + timestamp), EditContractFields_1.contract.setCookie(statics_1.COOKIE_CONTRACT_NAME, contractName + timestamp), 
            // 选完Prime Contractor，会有一个刷新页面的动作，所以需要等待刷新完成在进行后续的信息填写
            EditContractFields_1.contract.selectItemInlookupPopup('Prime Contractor', primeContractor, 'Vendor ID'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), 
            // 提交
            common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)(), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
        };
        this.fillNotRequiredFields = (contractInfo, parentContract) => {
            return core_1.Task.where(`#actor fill contract with not required fields`, EditContractFields_1.contract.fillDateInputField('Award Date', contractInfo.rowsHash().AwardDate), EditContractFields_1.contract.fillDateInputField('Signed Date', contractInfo.rowsHash().SignedDate), EditContractFields_1.contract.fillTextInputField('Contact Person', contractInfo.rowsHash().ContactPerson), EditContractFields_1.contract.fillTextInputField('Description', contractInfo.rowsHash().Description), EditContractFields_1.contract.fillNumberInputField('DBE Participation Goal', contractInfo.rowsHash().DBEParticipationGoal), EditContractFields_1.contract.fillNumberInputField('Retainage Rate', contractInfo.rowsHash().RetainageRate), EditContractFields_1.contract.fillNumberInputField('Maximum Retainage Percentage', contractInfo.rowsHash().MaximumRetainagePercentage), core_1.Check.whether(EditContractFields_1.contract.lookupInputField('Parent Contract'), (0, assertions_1.isPresent)()).andIfSo(EditContractFields_1.contract.selectItemInlookupPopup('Parent Contract', parentContract, 'Contract No.')), 
            //动态出现的日历
            core_1.Check.whether(EditContractFields_1.contract.dateInputField('NTP Date'), (0, web_1.isVisible)())
                .andIfSo(EditContractFields_1.contract.fillDateInputField('NTP Date', contractInfo.rowsHash().NTPDate), EditContractFields_1.contract.fillDateInputField('Substantial Completion Date', contractInfo.rowsHash().SubstantialCompletionDate), EditContractFields_1.contract.fillDateInputField('Final Completion Date', contractInfo.rowsHash().FinalCompletionDate), 
            // Contract Timeline
            EditContractFields_1.contract.fillDateInputField('Start Date', contractInfo.rowsHash().StartDate), EditContractFields_1.contract.fillDateInputField('End Date', contractInfo.rowsHash().EndDate)).otherwise(
            // Contract Timeline
            EditContractFields_1.contract.fillDateInputField('Start Date', contractInfo.rowsHash().StartDate), EditContractFields_1.contract.fillDateInputField('End Date', contractInfo.rowsHash().EndDate)));
        };
        this.addDefaultLineItemSplitting = {
            using: (contractDefaultLineItems) => core_1.Task.where(`#actor add contract default line items`, common_1.clickSectionButton.using(DefaultStaticParams_1.ADD), core_1.Check.whether(ContractDefaultLineItemSplittingFields_1.contractDefaultLineItemSlitting.lookupIcon('Project', 1), (0, web_1.isVisible)()).andIfSo(web_1.Click.on(ContractDefaultLineItemSplittingFields_1.contractDefaultLineItemSlitting.checkBox(1)), common_1.clickSectionButton.using(DefaultStaticParams_1.DELETE)), ContractDefaultLineItemSplittingFields_1.contractDefaultLineItemSlitting.searchItemInPopup('Project', 0, contractDefaultLineItems.rowsHash().Project, 'Project Name'), ContractDefaultLineItemSplittingFields_1.contractDefaultLineItemSlitting.searchItemInPopup('Fund', 0, contractDefaultLineItems.rowsHash().Fund, 'Fund ID'), ContractDefaultLineItemSplittingFields_1.contractDefaultLineItemSlitting.fillTextInputField('Percentage', 0, contractDefaultLineItems.rowsHash().Percentage), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxInvisible)(), core_1.Wait.for(core_1.Duration.ofSeconds(5)))
        };
        this.changeContractStatus = (targetStatus) => {
            return core_1.Task.where(`#actor change contract status into ${targetStatus}`, EditContractFields_1.contract.fillDropdownInputField('Contract Status', targetStatus), core_1.Check.whether(
            // 判断是否修改的目标状态为approved
            web_1.Attribute.called('title').of(EditContractFields_1.contract.dropdownField('Contract Status')), (0, assertions_1.equals)(statics_1.APPROVED)).andIfSo(
            // 如果是的话，start date和end date如果为空的话，需要填值
            core_1.Check.whether(web_1.Attribute.called('value').of(EditContractFields_1.contract.dateInputField('Start Date')), (0, assertions_1.not)((0, assertions_1.equals)(''))).andIfSo(EditContractFields_1.contract.selectDateToday('Start Date', 0)), core_1.Check.whether(web_1.Attribute.called('value').of(EditContractFields_1.contract.dateInputField('End Date')), (0, assertions_1.not)((0, assertions_1.equals)(''))).andIfSo(EditContractFields_1.contract.selectDateToday('End Date', 1))), 
            // 提交保存
            common_1.clickButton.using(DefaultStaticParams_1.SAVE), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
        };
        this.checkContractReadOnlyContract = () => core_1.Task.where(`#actor check contract read only`, common_1.checkButtonVisible.using(DefaultStaticParams_1.SAVE, DefaultStaticParams_1.FAILED), common_1.checkButtonVisible.using(DefaultStaticParams_1.DELETE, DefaultStaticParams_1.FAILED), ContractTab_1.contractTab.clickTab('Line Items'), common_1.checkButtonVisible.using(DefaultStaticParams_1.SAVE, DefaultStaticParams_1.FAILED), common_1.checkBulkEditSetionButtonVisible.using(DefaultStaticParams_1.INSERT, DefaultStaticParams_1.FAILED), common_1.checkBulkEditSetionButtonVisible.using(DefaultStaticParams_1.LOAD_FROM, DefaultStaticParams_1.FAILED), common_1.checkBulkEditSetionButtonVisible.using(DefaultStaticParams_1.BATCH_DELETE, DefaultStaticParams_1.FAILED), ContractTab_1.contractTab.clickTab('Splitting Line Items'), common_1.checkSectionButtonVisible.using(DefaultStaticParams_1.BATCH_DELETE, DefaultStaticParams_1.FAILED), common_1.checkSectionButtonVisible.using(DefaultStaticParams_1.BATCH_UPDATE, DefaultStaticParams_1.FAILED));
        this.updateGeneralInfo = (contractInfo, updatedContractNo, updatedContractName, parentContract) => {
            const timestamp = common_1.formatted_now;
            return core_1.Task.where(`#actor update contract general information`, EditContractFields_1.contract.fillTextInputField('Contract No.', updatedContractNo + timestamp), EditContractFields_1.contract.setCookie(statics_1.COOKIE_CONTRACT_NO, updatedContractNo + timestamp), EditContractFields_1.contract.fillTextInputField('Contract Name', updatedContractName + timestamp), EditContractFields_1.contract.setCookie(statics_1.COOKIE_CONTRACT_NAME, updatedContractName + timestamp), EditContractFields_1.contract.selectItemInlookupPopup('Prime Contractor', contractInfo.rowsHash().PrimeContractor, 'Vendor ID'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), 
            // 非必填字段
            this.fillNotRequiredFields(contractInfo, parentContract), 
            // 提交
            common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.checkMessagePopupBox)(), core_1.Wait.for(core_1.Duration.ofSeconds(2)));
        };
        this.checkGeneralInfo = (contractInfo, parentContract) => {
            return core_1.Task.where(`#actor check updated contract general information`, EditContractFields_1.contract.checkTextInputFieldValue('Contract No.', web_1.Cookie.called(statics_1.COOKIE_CONTRACT_NO).value(), DefaultStaticParams_1.SUCCEEDED), EditContractFields_1.contract.checkTextInputFieldValue('Contract Name', web_1.Cookie.called(statics_1.COOKIE_CONTRACT_NAME).value(), DefaultStaticParams_1.SUCCEEDED), EditContractFields_1.contract.checkLookupInputFieldSingleValue('Prime Contractor', contractInfo.rowsHash().PrimeContractor, DefaultStaticParams_1.SUCCEEDED), EditContractFields_1.contract.checkDateInputFieldValue('Award Date', contractInfo.rowsHash().AwardDate, DefaultStaticParams_1.SUCCEEDED), EditContractFields_1.contract.checkDateInputFieldValue('Signed Date', contractInfo.rowsHash().SignedDate, DefaultStaticParams_1.SUCCEEDED), EditContractFields_1.contract.checkTextInputFieldValue('Contact Person', contractInfo.rowsHash().ContactPerson, DefaultStaticParams_1.SUCCEEDED), EditContractFields_1.contract.checkTextInputFieldValue('Description', contractInfo.rowsHash().Description, DefaultStaticParams_1.SUCCEEDED), EditContractFields_1.contract.checkNumberInputFieldValue('DBE Participation Goal', contractInfo.rowsHash().DBEParticipationGoal, DefaultStaticParams_1.SUCCEEDED), EditContractFields_1.contract.checkNumberInputFieldValue('Retainage Rate', contractInfo.rowsHash().RetainageRate, DefaultStaticParams_1.SUCCEEDED), EditContractFields_1.contract.checkNumberInputFieldValue('Maximum Retainage Percentage', contractInfo.rowsHash().MaximumRetainagePercentage, DefaultStaticParams_1.SUCCEEDED), 
            // 动态出现的fields
            core_1.Check.whether(EditContractFields_1.contract.lookupInputFieldUl('Parent Contract'), (0, web_1.isVisible)())
                .andIfSo(EditContractFields_1.contract.checkLookupInputFieldSingleValue('Parent Contract', contractInfo.rowsHash().ParentContract, DefaultStaticParams_1.SUCCEEDED)), 
            //动态出现的fields
            core_1.Check.whether(EditContractFields_1.contract.dateInputField('NTP Date'), (0, web_1.isVisible)())
                .andIfSo(EditContractFields_1.contract.checkDateInputFieldValue('NTP Date', contractInfo.rowsHash().NTPDate, DefaultStaticParams_1.SUCCEEDED), EditContractFields_1.contract.checkDateInputFieldValue('Substantial Completion Date', contractInfo.rowsHash().SubstantialCompletionDate, DefaultStaticParams_1.SUCCEEDED), EditContractFields_1.contract.checkDateInputFieldValue('Final Completion Date', contractInfo.rowsHash().FinalCompletionDate, DefaultStaticParams_1.SUCCEEDED)), 
            // Contract Timeline
            EditContractFields_1.contract.checkDateInputFieldValue('Start Date', contractInfo.rowsHash().StartDate, DefaultStaticParams_1.SUCCEEDED), EditContractFields_1.contract.checkDateInputFieldValue('End Date', contractInfo.rowsHash().EndDate, DefaultStaticParams_1.SUCCEEDED));
        };
        this.delete = () => core_1.Task.where(`#actor delete contract`, common_1.clickButton.using(DefaultStaticParams_1.DELETE), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
}
exports.ContractCrud = ContractCrud;
exports.contractCrud = new ContractCrud();
//# sourceMappingURL=ContractCrud.js.map