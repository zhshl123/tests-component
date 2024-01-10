"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPublicSafetySaveResult = exports.FillPulicSafetyTabForm = exports.savePublicSafetyTabForm = void 0;
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const ConductProjectScoping_1 = require("./ConductProjectScoping");
exports.savePublicSafetyTabForm = {
    using: (publicSafetyTabForm) => {
        return core_1.Task.where(`#actor Input all fields and save `, web_1.Click.on(ConductProjectScoping_1.TabForm.scopingAreaTab('Public Safety')), exports.FillPulicSafetyTabForm.using(publicSafetyTabForm.rowsHash().PublicSafetyJustification, publicSafetyTabForm.rowsHash().PublicSafetyNotes, publicSafetyTabForm.rowsHash().ScopingStatus), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)(), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK), core_1.Wait.for(core_1.Duration.ofSeconds(2)));
    }
};
exports.FillPulicSafetyTabForm = {
    using: (publicSafetyJustification, publicSafetyNotes, scopingStatus) => {
        return core_1.Task.where(`#actor Input all fields`, ConductProjectScoping_1.TabForm.fillTextInputField('Public Safety Justification', publicSafetyJustification), ConductProjectScoping_1.TabForm.fillTextInputField('Public Safety Notes', publicSafetyNotes), ConductProjectScoping_1.TabForm.selectDropdownItem('Scoping Status', scopingStatus));
    }
};
exports.checkPublicSafetySaveResult = {
    using: (publicSafetyTabForm) => {
        return core_1.Task.where(`#actor check general information`, ConductProjectScoping_1.TabForm.checkTextInputFieldValue('Public Safety Justification', publicSafetyTabForm.rowsHash().PublicSafetyJustification, DefaultStaticParams_1.SUCCEEDED), ConductProjectScoping_1.TabForm.checkTextInputFieldValue('Public Safety Notes', publicSafetyTabForm.rowsHash().PublicSafetyNotes, DefaultStaticParams_1.SUCCEEDED), ConductProjectScoping_1.TabForm.checkDropdownInputFieldValue('Scoping Status', publicSafetyTabForm.rowsHash().ScopingStatus, DefaultStaticParams_1.SUCCEEDED));
    }
};
//# sourceMappingURL=PublicSafetyForm.js.map