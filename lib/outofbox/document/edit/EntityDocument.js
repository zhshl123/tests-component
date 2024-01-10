"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEntityDodument = exports.checkEntityDocument = void 0;
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../../DefaultStaticParams");
const common_1 = require("../../common");
const components_1 = require("../components");
const EntityDocumentFields_1 = require("../components/EntityDocumentFields");
exports.checkEntityDocument = {
    using: (fileName) => {
        return core_1.Task.where(`#actor check document information`, components_1.browseDocument.fillTextInputField('Document Name', fileName), common_1.clickActionButton.using(DefaultStaticParams_1.SEARCH), core_1.Wait.for(core_1.Duration.ofSeconds(3)), components_1.browseDocument.checkSearchResult(fileName, DefaultStaticParams_1.SUCCEEDED));
    }
};
const deleteEntityDodument = () => core_1.Task.where(`#actor delete document information`, web_1.Click.on(EntityDocumentFields_1.entityDocument.selectAllCheckBox()), web_1.Click.on(EntityDocumentFields_1.entityDocument.gridButton('Batch Delete')), (0, common_1.waitMessagePopupBoxVisible)(), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
exports.deleteEntityDodument = deleteEntityDodument;
//# sourceMappingURL=EntityDocument.js.map