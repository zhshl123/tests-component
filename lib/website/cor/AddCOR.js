"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fillCORRequiredFields = exports.addCOR = void 0;
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const EditCORFields_1 = require("./components/EditCORFields");
const CORGeneralInfo_1 = require("./Edit/CORGeneralInfo");
exports.addCOR = {
    using: (corInfo) => {
        return core_1.Task.where('#actor submit add cor imformation', common_1.openPage.using(statics_1.ADD_COR), 
        //填入必填字段
        exports.fillCORRequiredFields.using(corInfo.rowsHash().PrimaryProject, corInfo.rowsHash().PrimaryContract, corInfo.rowsHash().Subject), 
        //提交
        common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)(), 
        //返回到General tab页面，取COR ID的值
        CORGeneralInfo_1.clickCORTab.using('General'), core_1.Wait.for(core_1.Duration.ofSeconds(2)), EditCORFields_1.cor.setCookie(statics_1.COOkIE_CORID, web_1.Attribute.called('initialvalue').of(EditCORFields_1.cor.autoIdInputField('COR ID'))));
    }
};
exports.fillCORRequiredFields = {
    using: (PrimaryProject, PrimaryContract, Subject) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where('#actor fill cor with requiede fields', EditCORFields_1.cor.selectItemInlookupPopup('Primary Project', PrimaryProject, 'Project Name'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), 
        //选择PrimaryContract后会刷新页面，自动填充对应的Contractor值
        EditCORFields_1.cor.selectItemInlookupPopup('Primary Contract', PrimaryContract, 'Contract No.'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), EditCORFields_1.cor.fillTextInputField('Subject', Subject + timestamp));
    }
};
//# sourceMappingURL=AddCOR.js.map