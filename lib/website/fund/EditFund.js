"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fund = exports.EditFund = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const abstract_1 = require("../common/abstract");
const FundAttributes_1 = require("./FundAttributes");
class EditFund extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
        this.EditIcon = () => web_1.PageElements.located(web_1.By.css(`[class="clinktext"]`)).last()
            .describedAs('Edit icon');
        this.ClickEditIcon = () => {
            return core_1.Task.where(`#actor click the Edit icon `, core_1.Check.whether(this.EditIcon(), (0, assertions_1.isPresent)()).andIfSo(web_1.Click.on(this.EditIcon())).otherwise(core_1.Log.the(`no data`)));
        };
    }
}
exports.EditFund = EditFund;
exports.fund = new EditFund(FundAttributes_1.fundAttributesMap);
//# sourceMappingURL=EditFund.js.map