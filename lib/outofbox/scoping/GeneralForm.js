"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkScopingPublicSafetyInfo = exports.saveScopingPublicSafetyInfo = exports.checkScopingEnviromentInfo = exports.saveScopingEnviromentInfo = exports.checkScopingGeneralInfo = exports.saveScopingGeneralInfo = void 0;
const core_1 = require("@serenity-js/core");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const ScopingGeneralTabFields_1 = require("./ScopingGeneralTabFields");
exports.saveScopingGeneralInfo = {
    using: (scopingGeneralInfo) => {
        return core_1.Task.where(`#actor save scoping general tab information`, ScopingGeneralTabFields_1.scopingGeneral.fillTextInputField('Project Scoping Scenario', scopingGeneralInfo.rowsHash().ProjectScopingScenario), ScopingGeneralTabFields_1.scopingGeneral.fillTextInputField('Notes', scopingGeneralInfo.rowsHash().Notes), ScopingGeneralTabFields_1.scopingGeneral.fillTextInputField('Project Justification', scopingGeneralInfo.rowsHash().ProjectJustification), ScopingGeneralTabFields_1.scopingGeneral.fillTextInputField('Project Description', scopingGeneralInfo.rowsHash().ProjectDescription), ScopingGeneralTabFields_1.scopingGeneral.selectDropdownItem('Scoping Status', scopingGeneralInfo.rowsHash().ScopingStatus), common_1.clickButton.using(DefaultStaticParams_1.SAVE), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.checkScopingGeneralInfo = {
    using: (scopingGeneralInfo) => {
        return core_1.Task.where(`#actor check scoping general tab  information`, ScopingGeneralTabFields_1.scopingGeneral.checkTextInputFieldValue('Project Scoping Scenario', scopingGeneralInfo.rowsHash().ProjectScopingScenario, DefaultStaticParams_1.SUCCEEDED), ScopingGeneralTabFields_1.scopingGeneral.checkTextInputFieldValue('Notes', scopingGeneralInfo.rowsHash().Notes, DefaultStaticParams_1.SUCCEEDED), ScopingGeneralTabFields_1.scopingGeneral.checkTextInputFieldValue('Project Justification', scopingGeneralInfo.rowsHash().ProjectJustification, DefaultStaticParams_1.SUCCEEDED), ScopingGeneralTabFields_1.scopingGeneral.checkTextInputFieldValue('Project Description', scopingGeneralInfo.rowsHash().ProjectDescription, DefaultStaticParams_1.SUCCEEDED), ScopingGeneralTabFields_1.scopingGeneral.checkDropdownInputFieldValue('Scoping Status', scopingGeneralInfo.rowsHash().ScopingStatus, DefaultStaticParams_1.SUCCEEDED));
    }
};
exports.saveScopingEnviromentInfo = {
    using: (scopingEviromentInfo) => {
        return core_1.Task.where(`#actor save scoping environment tab information`, ScopingGeneralTabFields_1.scopingGeneral.fillTextInputField('Environment Justifications', scopingEviromentInfo.rowsHash().EnvironmentJustifications), ScopingGeneralTabFields_1.scopingGeneral.fillTextInputField('Environment Notes', scopingEviromentInfo.rowsHash().EnvironmentNotes), ScopingGeneralTabFields_1.scopingGeneral.selectDropdownItem('Scoping Status', scopingEviromentInfo.rowsHash().ScopingStatus), common_1.clickButton.using(DefaultStaticParams_1.SAVE), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.checkScopingEnviromentInfo = {
    using: (scopingEviromentInfo) => {
        return core_1.Task.where(`#actor check scoping environment tab information`, ScopingGeneralTabFields_1.scopingGeneral.checkTextInputFieldValue('Environment Justifications', scopingEviromentInfo.rowsHash().EnvironmentJustifications, DefaultStaticParams_1.SUCCEEDED), ScopingGeneralTabFields_1.scopingGeneral.checkTextInputFieldValue('Environment Notes', scopingEviromentInfo.rowsHash().EnvironmentNotes, DefaultStaticParams_1.SUCCEEDED), ScopingGeneralTabFields_1.scopingGeneral.checkDropdownInputFieldValue('Scoping Status', scopingEviromentInfo.rowsHash().ScopingStatus, DefaultStaticParams_1.SUCCEEDED));
    }
};
exports.saveScopingPublicSafetyInfo = {
    using: (scopingEviromentInfo) => {
        return core_1.Task.where(`#actor save scoping public safety tab information`, ScopingGeneralTabFields_1.scopingGeneral.fillTextInputField('Public Safety Justification', scopingEviromentInfo.rowsHash().PublicSafetyJustification), ScopingGeneralTabFields_1.scopingGeneral.fillTextInputField('Public Safety Notes', scopingEviromentInfo.rowsHash().PublicSafetyNotes), ScopingGeneralTabFields_1.scopingGeneral.selectDropdownItem('Scoping Status', scopingEviromentInfo.rowsHash().ScopingStatus), common_1.clickButton.using(DefaultStaticParams_1.SAVE), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.checkScopingPublicSafetyInfo = {
    using: (scopingEviromentInfo) => {
        return core_1.Task.where(`#actor check scoping Public Safety tab information`, ScopingGeneralTabFields_1.scopingGeneral.checkTextInputFieldValue('Public Safety Justification', scopingEviromentInfo.rowsHash().PublicSafetyJustification, DefaultStaticParams_1.SUCCEEDED), ScopingGeneralTabFields_1.scopingGeneral.checkTextInputFieldValue('Public Safety Notes', scopingEviromentInfo.rowsHash().PublicSafetyNotes, DefaultStaticParams_1.SUCCEEDED), ScopingGeneralTabFields_1.scopingGeneral.checkDropdownInputFieldValue('Scoping Status', scopingEviromentInfo.rowsHash().ScopingStatus, DefaultStaticParams_1.SUCCEEDED));
    }
};
//# sourceMappingURL=GeneralForm.js.map