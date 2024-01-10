"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fillCORRequiredFields = exports.addCOR = void 0;
const core_1 = require("@serenity-js/core");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const EditCORFields_1 = require("./components/EditCORFields");
exports.addCOR = {
    using: (corInfo) => {
        return core_1.Task.where('#actor submit add cor imformation', common_1.openPage.using(statics_1.ADD_COR), 
        //填入必填字段
        exports.fillCORRequiredFields.using(corInfo.rowsHash().PrimaryProject, corInfo.rowsHash().PrimaryContract, corInfo.rowsHash().Subject), 
        //提交
        common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)());
    }
};
exports.fillCORRequiredFields = {
    using: (primaryProject, primaryContract, subject) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where('#actor fill cor with requiede fields', EditCORFields_1.cor.selectItemInlookupPopup('Primary Project', primaryProject, 'Project Name'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), 
        //选择PrimaryContract后会刷新页面，自动填充对应的Contractor值
        EditCORFields_1.cor.selectItemInlookupPopup('Primary Contract', primaryContract, 'Contract Name'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), EditCORFields_1.cor.fillTextInputField('Subject', subject + timestamp), EditCORFields_1.cor.setCookie(statics_1.COOkIE_CORSUBJECT, subject + timestamp));
    }
};
//# sourceMappingURL=AddCOR.js.map