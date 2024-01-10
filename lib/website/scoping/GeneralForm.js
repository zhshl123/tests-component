"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkGeneralSaveResult = exports.FillGeneralTabForm = exports.saveGeneralTabForm = void 0;
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const ConductProjectScoping_1 = require("./ConductProjectScoping");
exports.saveGeneralTabForm = {
    using: (generalTabForm) => {
        return core_1.Task.where(`#actor Input all fields and save `, web_1.Click.on(ConductProjectScoping_1.TabForm.scopingAreaTab('General')), exports.FillGeneralTabForm.using(generalTabForm.rowsHash().ProjectScopingScenario, generalTabForm.rowsHash().Notes, generalTabForm.rowsHash().ProjectJustification, generalTabForm.rowsHash().ProjectDescription, generalTabForm.rowsHash().ScopingStatus), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)(), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.FillGeneralTabForm = {
    using: (projectScopingScenario, Notes, projectJustification, projectDescription, scopingStatus) => {
        return core_1.Task.where(`#actor Input all fields`, ConductProjectScoping_1.TabForm.fillTextInputField('Project Scoping Scenario', projectScopingScenario), ConductProjectScoping_1.TabForm.fillTextInputField('Notes', Notes), ConductProjectScoping_1.TabForm.fillTextInputField('Project Justification', projectJustification), ConductProjectScoping_1.TabForm.fillTextInputField('Project Description', projectDescription), ConductProjectScoping_1.TabForm.selectDropdownItem('Scoping Status', scopingStatus));
    }
};
exports.checkGeneralSaveResult = {
    using: (generalTabForm) => {
        return core_1.Task.where(`#actor check general information`, ConductProjectScoping_1.TabForm.checkTextInputFieldValue('Project Scoping Scenario', generalTabForm.rowsHash().ProjectScopingScenario, DefaultStaticParams_1.SUCCEEDED), ConductProjectScoping_1.TabForm.checkTextInputFieldValue('Notes', generalTabForm.rowsHash().Notes, DefaultStaticParams_1.SUCCEEDED), ConductProjectScoping_1.TabForm.checkTextInputFieldValue('Project Justification', generalTabForm.rowsHash().ProjectJustification, DefaultStaticParams_1.SUCCEEDED), ConductProjectScoping_1.TabForm.checkTextInputFieldValue('Project Description', generalTabForm.rowsHash().ProjectDescription, DefaultStaticParams_1.SUCCEEDED), ConductProjectScoping_1.TabForm.checkDropdownInputFieldValue('Scoping Status', generalTabForm.rowsHash().ScopingStatus, DefaultStaticParams_1.SUCCEEDED));
    }
};
//# sourceMappingURL=GeneralForm.js.map