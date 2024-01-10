"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fillContractNotRequiredFields = exports.fillContractRequiredFields = exports.addContractWithRequiredFields = void 0;
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const StaticPageName_1 = require("../common/statics/StaticPageName");
const EditContractFields_1 = require("./components/EditContractFields");
/**
 * 添加contract
 */
exports.addContractWithRequiredFields = {
    using: (contractInfo) => {
        EditContractFields_1.contract.contractType = contractInfo.rowsHash().ContractType;
        return core_1.Task.where(`#actor submit add contract information`, common_1.openPage.using(StaticPageName_1.ADD_CONTRACT), 
        // 添加等待时间，以确保页面加载完成
        core_1.Wait.for(core_1.Duration.ofSeconds(2)), 
        // 填入必填字段
        exports.fillContractRequiredFields.using(contractInfo.rowsHash().ContractType, contractInfo.rowsHash().ContractName, contractInfo.rowsHash().PrimeContractor, contractInfo.rowsHash().ParentContract), 
        // 提交
        common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)(), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.fillContractRequiredFields = {
    using: (contractType, contractName, primeContractor, parentContract) => {
        // eslint-disable-next-line prefer-const
        let timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor fill contract with required fields`, 
        // 选完Contract Type，会有一个刷新页面的动作，所以需要等待刷新完成在进行后续的信息填写
        EditContractFields_1.contract.selectDropdownItem('Contract Type', contractType), core_1.Wait.for(core_1.Duration.ofSeconds(5)), EditContractFields_1.contract.fillTextInputField('Contract Name', contractName + timestamp), EditContractFields_1.contract.setCookie(statics_1.COOKIE_CONTRACT_NAME, contractName + timestamp), EditContractFields_1.contract.fillTextInputField('Contract Number', contractName + timestamp), 
        // 选完Prime Contractor，会有一个刷新页面的动作，所以需要等待刷新完成在进行后续的信息填写
        EditContractFields_1.contract.selectItemInlookupPopup('Prime Contractor', primeContractor, 'Vendor ID'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), core_1.Check.whether(EditContractFields_1.contract.lookupInputField('Parent Contract'), (0, web_1.isVisible)()).andIfSo(EditContractFields_1.contract.selectItemInlookupPopup('Parent Contract', parentContract, 'Contract Name')));
    }
};
exports.fillContractNotRequiredFields = {
    using: (contractInfo) => {
        return core_1.Task.where(`#actor fill contract with not required fields`, EditContractFields_1.contract.fillDateInputField('Award Date', contractInfo.rowsHash().AwardDate), EditContractFields_1.contract.fillDateInputField('Signed Date', contractInfo.rowsHash().SignedDate), EditContractFields_1.contract.fillTextInputField('Contact Person', contractInfo.rowsHash().ContactPerson), EditContractFields_1.contract.fillTextInputField('Description', contractInfo.rowsHash().Description), EditContractFields_1.contract.fillNumberInputField('DBE Participation Goal', contractInfo.rowsHash().DBEParticipationGoal), EditContractFields_1.contract.fillNumberInputField('Retainage Rate', contractInfo.rowsHash().RetainageRate), 
        //动态出现的日历
        core_1.Check.whether(EditContractFields_1.contract.dateInputField('NTP Date'), (0, web_1.isVisible)())
            .andIfSo(EditContractFields_1.contract.fillDateInputField('NTP Date', contractInfo.rowsHash().NTPDate), EditContractFields_1.contract.fillDateInputField('Substantial Completion Date', contractInfo.rowsHash().SubstantialCompletionDate), EditContractFields_1.contract.fillDateInputField('Final Completion Date', contractInfo.rowsHash().FinalCompletionDate)), 
        // Contract Timeline
        EditContractFields_1.contract.fillDateInputField('Start Date', contractInfo.rowsHash().StartDate), EditContractFields_1.contract.fillNumberInputField('Duration', contractInfo.rowsHash().Duration));
    }
};
//# sourceMappingURL=CreateContract.js.map