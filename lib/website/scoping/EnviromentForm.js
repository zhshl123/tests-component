"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEnvironmentSaveResult = exports.FillEnvironmentTabForm = exports.saveEnvironmentTabForm = void 0;
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const ConductProjectScoping_1 = require("./ConductProjectScoping");
exports.saveEnvironmentTabForm = {
    using: (EnvironmentTabForm) => {
        return core_1.Task.where(`#actor Input all fields and save `, web_1.Click.on(ConductProjectScoping_1.TabForm.scopingAreaTab('Environment')), exports.FillEnvironmentTabForm.using(EnvironmentTabForm.rowsHash().EnvironmentJustifications, EnvironmentTabForm.rowsHash().EnvironmentNotes, EnvironmentTabForm.rowsHash().ScopingStatus), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)(), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK), core_1.Wait.for(core_1.Duration.ofSeconds(2)));
    }
};
exports.FillEnvironmentTabForm = {
    using: (EnvironmentJustifications, EnvironmentNotes, ScopingStatus) => {
        return core_1.Task.where(`#actor Input all fields`, ConductProjectScoping_1.TabForm.fillTextInputField('Environment Justifications', EnvironmentJustifications), ConductProjectScoping_1.TabForm.fillTextInputField('Environment Notes', EnvironmentNotes), ConductProjectScoping_1.TabForm.selectDropdownItem('Scoping Status', ScopingStatus));
    }
};
exports.checkEnvironmentSaveResult = {
    using: (EnvironmentTabForm) => {
        return core_1.Task.where(`#actor check general information`, ConductProjectScoping_1.TabForm.checkTextInputFieldValue('Environment Justifications', EnvironmentTabForm.rowsHash().EnvironmentJustifications, DefaultStaticParams_1.SUCCEEDED), ConductProjectScoping_1.TabForm.checkTextInputFieldValue('Environment Notes', EnvironmentTabForm.rowsHash().EnvironmentNotes, DefaultStaticParams_1.SUCCEEDED), ConductProjectScoping_1.TabForm.checkDropdownInputFieldValue('Scoping Status', EnvironmentTabForm.rowsHash().ScopingStatus, DefaultStaticParams_1.SUCCEEDED));
    }
};
//# sourceMappingURL=EnviromentForm.js.map