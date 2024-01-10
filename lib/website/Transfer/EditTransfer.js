"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transfer = exports.EditTransfer = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const abstract_1 = require("../common/abstract");
const TransferAttributes_1 = require("./TransferAttributes");
class EditTransfer extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
        this.NewScopingAreaEditIcon = () => web_1.PageElements.located(web_1.By.css(`[title="Edit"]`)).last()
            .describedAs('Edit Icon of Ranking');
        this.clickNewEditIcon = () => {
            return core_1.Task.where(`#actor click New Edit Icon`, core_1.Check.whether(this.NewScopingAreaEditIcon(), (0, assertions_1.isPresent)()).andIfSo(web_1.Click.on(this.NewScopingAreaEditIcon())).otherwise(core_1.Log.the(`New Edit Icon not present`)));
        };
    }
}
exports.EditTransfer = EditTransfer;
exports.transfer = new EditTransfer(TransferAttributes_1.transferMap);
//# sourceMappingURL=EditTransfer.js.map