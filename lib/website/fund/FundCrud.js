"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFund = exports.addFundGroup = void 0;
const core_1 = require("@serenity-js/core");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const EditFund_1 = require("./EditFund");
exports.addFundGroup = {
    using: (fundGroupInfo) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor Input all fields and save `, EditFund_1.fund.fillTextInputField('Fund Group ID', fundGroupInfo.rowsHash().FundGroupID + timestamp), EditFund_1.fund.setCookie(statics_1.COOKIE_FG_ID, fundGroupInfo.rowsHash().FundGroupID + timestamp), EditFund_1.fund.fillTextInputField('Fund Group Name', fundGroupInfo.rowsHash().FundGroupName + timestamp), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)());
    }
};
exports.addFund = {
    using: (FundInfo) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor Input all fields and save `, EditFund_1.fund.fillTextInputField('Fund ID', FundInfo.rowsHash().FundID + timestamp), EditFund_1.fund.setCookie(statics_1.COOKIE_FUND_ID, FundInfo.rowsHash().FundID + timestamp), EditFund_1.fund.fillTextInputField('Fund Name', FundInfo.rowsHash().FundName + timestamp), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)());
    }
};
//# sourceMappingURL=FundCrud.js.map