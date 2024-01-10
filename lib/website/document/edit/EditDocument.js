"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDodument = exports.checkDocumentInfo = exports.updateDocumentInfo = void 0;
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../../DefaultStaticParams");
const common_1 = require("../../common");
const statics_1 = require("../../common/statics");
const EditDocumentFields_1 = require("../components/EditDocumentFields");
exports.updateDocumentInfo = {
    using: (documentInfo) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor update document information`, EditDocumentFields_1.editDocument.fillTextInputField('Document Name', documentInfo.rowsHash().DocumentName + timestamp), EditDocumentFields_1.editDocument.setCookie(statics_1.COOKIE_DOCUMENT_NAME, documentInfo.rowsHash().DocumentName + timestamp), EditDocumentFields_1.editDocument.fillTextInputField('Version', documentInfo.rowsHash().Version), EditDocumentFields_1.editDocument.selectDropdownItem('Status', documentInfo.rowsHash().Status), EditDocumentFields_1.editDocument.fillTextInputField('Key Words', documentInfo.rowsHash().KeyWords), EditDocumentFields_1.editDocument.fillTextInputField('Description', documentInfo.rowsHash().Description), common_1.clickButton.using(DefaultStaticParams_1.SAVE), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.checkDocumentInfo = {
    using: (documentInfo, expectedResult) => {
        return core_1.Task.where(`#actor check document information ${expectedResult}`, EditDocumentFields_1.editDocument.checkTextInputFieldValue('Document Name', web_1.Cookie.called(statics_1.COOKIE_DOCUMENT_NAME).value(), expectedResult), EditDocumentFields_1.editDocument.checkTextInputFieldValue('Version', documentInfo.rowsHash().Version, expectedResult), EditDocumentFields_1.editDocument.checkDropdownInputFieldValue('Status', documentInfo.rowsHash().Status, expectedResult), EditDocumentFields_1.editDocument.checkTextInputFieldValue('Key Words', documentInfo.rowsHash().KeyWords, expectedResult), EditDocumentFields_1.editDocument.checkTextInputFieldValue('Description', documentInfo.rowsHash().Description, expectedResult));
    }
};
const deleteDodument = () => {
    return core_1.Task.where(`#actor delete document`, common_1.clickButton.using(DefaultStaticParams_1.DELETE), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
};
exports.deleteDodument = deleteDodument;
//# sourceMappingURL=EditDocument.js.map