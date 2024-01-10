"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fillrequestforproposalRequiredFields = exports.addRequestForProposal = void 0;
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const StaticPageName_1 = require("../common/statics/StaticPageName");
const EditRequestForProposalFields_1 = require("./components/EditRequestForProposalFields");
const EditRFP_1 = require("./Edit/EditRFP");
/**
 * 添加rfp
 */
exports.addRequestForProposal = {
    using: (requestforproposalInfo) => {
        return core_1.Task.where(`#actor submit add rfp information`, common_1.openPage.using(StaticPageName_1.ADD_REQUESTFORPROPOSAL), 
        // 添加等待时间，以确保页面加载完成
        core_1.Wait.for(core_1.Duration.ofSeconds(5)), 
        // 填入必填字段
        exports.fillrequestforproposalRequiredFields.using(requestforproposalInfo.rowsHash().PrimaryProject, requestforproposalInfo.rowsHash().PrimaryContract, requestforproposalInfo.rowsHash().Subject), core_1.Wait.for(core_1.Duration.ofSeconds(4)), 
        // 提交
        common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)(), core_1.Wait.for(core_1.Duration.ofSeconds(4)), 
        //返回到General tab页面，取RFP ID的值
        EditRFP_1.clickRFPTab.using('General'), core_1.Wait.for(core_1.Duration.ofSeconds(2)), EditRequestForProposalFields_1.rfp.setCookie(statics_1.COOkIE_RFPID, web_1.Attribute.called('initialvalue').of(EditRequestForProposalFields_1.rfp.autoIdInputField('RFP ID'))));
    }
};
exports.fillrequestforproposalRequiredFields = {
    using: (PrimaryProject, PrimaryContract, Subject) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor fill Request for Proposal with required fields`, 
        // 选完Primary Project，会有一个刷新页面的动作，所以需要等待刷新完成在进行后续的信息填写
        EditRequestForProposalFields_1.rfp.selectItemInlookupPopup('Primary Project', PrimaryProject, 'Project Name'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), 
        // 选完Primary Contract，会有一个刷新页面的动作，所以需要等待刷新完成在进行后续的信息填写npm
        EditRequestForProposalFields_1.rfp.selectItemInlookupPopup('Primary Contract', PrimaryContract, 'Contract Name'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), 
        // 设置Subject = 前缀+时间戳 ，以免出现Subject重复
        EditRequestForProposalFields_1.rfp.fillTextInputField('Subject', Subject + timestamp), 
        // 设置cookie，RFP创建成功后用Subject这个查询
        EditRequestForProposalFields_1.rfp.setCookie(statics_1.COOKIE_RFP_SUBJECT, Subject + timestamp));
    }
};
//# sourceMappingURL=CreateRequestForProposal.js.map