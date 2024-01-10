"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBulletin = exports.editBulletin = exports.addBulletin = void 0;
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const EditBulletin_1 = require("./EditBulletin");
exports.addBulletin = {
    using: (BulletinInfo) => {
        return core_1.Task.where(`#actor Input all fields and save `, EditBulletin_1.bulletin.setCookie(statics_1.COOKIE_BULLETIN_ID, web_1.Attribute.called('value').of(EditBulletin_1.bulletin.textInputField('Bulletin No.'))), EditBulletin_1.bulletin.selectItemInlookupPopup('Primary Project', BulletinInfo.rowsHash().PrimaryProject, 'Project Name'), EditBulletin_1.bulletin.selectItemInlookupPopup('Primary Contract', BulletinInfo.rowsHash().PrimaryContract, 'Contract Name'), EditBulletin_1.bulletin.fillTextInputField('Bulletin Title', BulletinInfo.rowsHash().BulletinTitle), common_1.clickButton.using(DefaultStaticParams_1.SAVE), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.editBulletin = {
    using: (BulletinInfo) => {
        return core_1.Task.where(`#actor edit all fields and save `, EditBulletin_1.bulletin.selectItemInlookupPopup('Primary Project', BulletinInfo.rowsHash().PrimaryProject, 'Project Name'), EditBulletin_1.bulletin.selectItemInlookupPopup('Primary Contract', BulletinInfo.rowsHash().PrimaryContract, 'Contract Name'), EditBulletin_1.bulletin.fillTextInputField('Bulletin Title', BulletinInfo.rowsHash().BulletinTitle), EditBulletin_1.bulletin.selectSpecialDate('Issuance Date', BulletinInfo.rowsHash().IssuanceDate, 0), common_1.clickButton.using(DefaultStaticParams_1.SAVE), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.checkBulletin = {
    using: (BulletinInfo) => {
        return core_1.Task.where(`#actor check fields`, EditBulletin_1.bulletin.checkTextInputFieldValue('Bulletin Title', BulletinInfo.rowsHash().BulletinTitle, DefaultStaticParams_1.SUCCEEDED), EditBulletin_1.bulletin.checkDateInputFieldValue('Issuance Date', BulletinInfo.rowsHash().IssuanceDate, DefaultStaticParams_1.SUCCEEDED));
    }
};
//# sourceMappingURL=BulletinCrud.js.map