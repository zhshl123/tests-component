"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowseCOR = exports.searchCOR = void 0;
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const common_1 = require("../common");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
exports.searchCOR = {
    using: (Subject) => core_1.Task.where('#actor search cor with:${Subject}', web_1.Enter.theValue(Subject).into(BrowseCOR.SubjectInputField()), common_1.clickButton.using(DefaultStaticParams_1.SEARCH), (0, common_1.checkGridList)())
};
class BrowseCOR {
}
exports.BrowseCOR = BrowseCOR;
BrowseCOR.SubjectInputField = () => web_1.PageElement.located(web_1.By.id('ct100_body_SubjectDesc_txtText')).describedAs('Subject Input Field');
//# sourceMappingURL=BrowseCOR.js.map