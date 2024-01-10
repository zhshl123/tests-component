"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteScopingArea = exports.editScopingArea = exports.checkScopingAreaInfo = exports.fillScopingAreaForm = exports.addScopingArea = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const ScopingAreaForm_1 = require("./ScopingAreaForm");
exports.addScopingArea = {
    using: (scopingArea) => {
        return core_1.Task.where(`#actor Input all fields and save `, common_1.clickSectionButton.using(DefaultStaticParams_1.ADDSCOPINGAREA), core_1.Wait.for(core_1.Duration.ofSeconds(2)), exports.fillScopingAreaForm.using(scopingArea.rowsHash().ScopingAreaDisplayName, scopingArea.rowsHash().ScopingAreaDefaultName, scopingArea.rowsHash().IsActive, scopingArea.rowsHash().DefaultStatus, scopingArea.rowsHash().Description), common_1.clickButton.using(DefaultStaticParams_1.SAVE), core_1.Wait.for(core_1.Duration.ofSeconds(4)), assertions_1.Ensure.eventually((0, common_1.messagePopupBox)(), (0, web_1.isVisible)()), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK));
    }
};
exports.fillScopingAreaForm = {
    using: (ScopingAreaDisplayName, ScopingAreaDefaultName, IsActive, DefaultStatus, Description) => {
        return core_1.Task.where(`#actor Input all fields`, ScopingAreaForm_1.ScopingAreaForm.fillTextInputField('Scoping Area Display Name', ScopingAreaDisplayName), ScopingAreaForm_1.ScopingAreaForm.fillTextInputField('Scoping Area Default Name', ScopingAreaDefaultName), ScopingAreaForm_1.ScopingAreaForm.clickSingleCheckBox('Is Active', IsActive), ScopingAreaForm_1.ScopingAreaForm.selectDropdownItem('Default Status', DefaultStatus), ScopingAreaForm_1.ScopingAreaForm.fillTextInputField('Description', Description));
    }
};
exports.checkScopingAreaInfo = {
    using: (scopingArea) => {
        return core_1.Task.where(`#actor can see the new Scoping Area `, ScopingAreaForm_1.ScopingAreaForm.checkTextInputFieldValue('Scoping Area Display Name', scopingArea.rowsHash().ScopingAreaDisplayName, DefaultStaticParams_1.FAILED), ScopingAreaForm_1.ScopingAreaForm.checkTextInputFieldValue('Scoping Area Default Name', scopingArea.rowsHash().ScopingAreaDefaultName, DefaultStaticParams_1.FAILED));
    }
};
exports.editScopingArea = {
    Using: (scopingArea) => {
        return core_1.Task.where(`#actor click Edit button and edit fields `, ScopingAreaForm_1.ScopingAreaForm.clickNewEditIcon(), core_1.Wait.for(core_1.Duration.ofSeconds(4)), ScopingAreaForm_1.ScopingAreaForm.fillTextInputField('Scoping Area Display Name', scopingArea.rowsHash().ScopingAreaDisplayName), ScopingAreaForm_1.ScopingAreaForm.clickSingleCheckBox('Is Active', scopingArea.rowsHash().IsActive), ScopingAreaForm_1.ScopingAreaForm.fillTextInputField('Description', scopingArea.rowsHash().Description), common_1.clickButton.using(DefaultStaticParams_1.SAVE), core_1.Wait.for(core_1.Duration.ofSeconds(4)));
    }
};
exports.deleteScopingArea = {
    Using: () => {
        return core_1.Task.where(`#actor click Edit button and edit fields `, ScopingAreaForm_1.ScopingAreaForm.clickNewDelteIcon(), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK), core_1.Wait.for(core_1.Duration.ofSeconds(4)));
    }
};
//# sourceMappingURL=ScopingArea.js.map