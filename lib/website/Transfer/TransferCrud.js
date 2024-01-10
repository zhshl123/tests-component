"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTransfer = exports.deleteTransfer = exports.editTransfer = exports.addTransfer = void 0;
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const EditTransfer_1 = require("./EditTransfer");
exports.addTransfer = {
    using: (transferInfo) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor Input all fields and save `, EditTransfer_1.transfer.fillTextInputField('Transfer Number', transferInfo.rowsHash().TransferNumber + timestamp), EditTransfer_1.transfer.setCookie(statics_1.COOKIE_TRANSFER_NUMBER, transferInfo.rowsHash().TransferNumber + timestamp), EditTransfer_1.transfer.fillTextInputField('Subject', transferInfo.rowsHash().Subject), EditTransfer_1.transfer.fillTextInputField('Reason of Change', transferInfo.rowsHash().ReasonofChange), EditTransfer_1.transfer.fillTextInputField('Description Of Change', transferInfo.rowsHash().DescriptionofChange), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)());
    }
};
exports.editTransfer = {
    using: (transferInfo) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor Input all fields and save `, EditTransfer_1.transfer.fillTextInputField('Transfer Number', transferInfo.rowsHash().TransferNumber + timestamp), EditTransfer_1.transfer.setCookie(statics_1.COOKIE_TRANSFER_NUMBER, transferInfo.rowsHash().TransferNumber + timestamp), EditTransfer_1.transfer.selectDropdownItem('Status', transferInfo.rowsHash().Status), EditTransfer_1.transfer.fillTextInputField('Subject', transferInfo.rowsHash().Subject), EditTransfer_1.transfer.fillTextInputField('Reason of Change', transferInfo.rowsHash().ReasonofChange), EditTransfer_1.transfer.fillTextInputField('Description Of Change', transferInfo.rowsHash().DescriptionofChange), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)());
    }
};
exports.deleteTransfer = {
    using: () => {
        return core_1.Task.where(`#actor click Delete button`, common_1.clickButton.using(DefaultStaticParams_1.DELETE), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK));
    }
};
exports.checkTransfer = {
    using: (transferInfo) => {
        return core_1.Task.where(`#actor check fields`, EditTransfer_1.transfer.checkTextInputFieldValue('Transfer Number', web_1.Cookie.called(statics_1.COOKIE_TRANSFER_NUMBER).value(), DefaultStaticParams_1.SUCCEEDED), EditTransfer_1.transfer.checkDropdownInputFieldValue('Status', transferInfo.rowsHash().Status, DefaultStaticParams_1.SUCCEEDED), EditTransfer_1.transfer.checkTextInputFieldValue('Subject', transferInfo.rowsHash().Subject, DefaultStaticParams_1.SUCCEEDED), EditTransfer_1.transfer.checkTextInputFieldValue('Reason of Change', transferInfo.rowsHash().ReasonofChange, DefaultStaticParams_1.SUCCEEDED), EditTransfer_1.transfer.checkTextInputFieldValue('Description Of Change', transferInfo.rowsHash().DescriptionofChange, DefaultStaticParams_1.SUCCEEDED));
    }
};
//# sourceMappingURL=TransferCrud.js.map