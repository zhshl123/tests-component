"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.browseSolicitation = exports.BrowseSolicitationFields = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const web_2 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../../DefaultStaticParams");
const common_1 = require("../../common");
const abstract_1 = require("../../common/abstract");
const SolicitationAttributes_1 = require("../components/SolicitationAttributes");
class BrowseSolicitationFields extends abstract_1.SearchFromFields {
    constructor(entityMap) {
        super(entityMap);
        /**
         *
         * @param itemName 校验的item值
         * @param expectedResult 预期结果 SUCCEEDED：匹配 FAILED 不匹配
         * @returns
         */
        this.checkSearchResult = (itemName, expectedResult) => {
            return expectedResult === DefaultStaticParams_1.SUCCEEDED ? core_1.Task.where(`#actor check search item: ${itemName} exists`, assertions_1.Ensure.eventually((0, common_1.gridTextTdList)(itemName), (0, assertions_1.isPresent)())) : core_1.Task.where(`#actor check search item: ${itemName} not exists`, assertions_1.Ensure.eventually(this.emptyGrid(), (0, assertions_1.isPresent)()));
        };
        /**
         * 校验单元格的值
         * @param fieldName 字段名
         * @param itemName 要检验的值
         * @param expectedResult 期望结果（单元格的值与要校验的值是否一致）
         * @returns
         */
        this.checkGridResult = (fieldName, itemName, expectedResult) => {
            return expectedResult === DefaultStaticParams_1.SUCCEEDED ? core_1.Task.where(`#actor check line item ${fieldName}'s cell value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Text.of(this.gridTextTdList(fieldName)), (0, assertions_1.equals)(itemName))) : core_1.Task.where(`#actor check line item ${fieldName}'s cell value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Text.of(this.gridTextTdList(fieldName)), (0, assertions_1.not)((0, assertions_1.equals)(itemName))));
        };
        /**
     * grid List 列表
     * @returns
     */
        this.gridList = () => web_2.PageElement.located(web_2.By.css('.cstdgrid__bodyrow'))
            .describedAs('grid list');
        /**
    * 获取含有关键词的单元格
    * @param content 单元格内容
    * @returns
    */
        this.gridTextTdList = (content) => web_2.PageElement.located(web_2.By.cssContainingText('td', content))
            .describedAs('Grid Text Table data List with content:' + content);
        /**
    * 获取带链接的单元格
    * @param content 单元格内容
    * @returns
    */
        this.gridLinkTdList = (content) => web_2.PageElement.located(web_2.By.cssContainingText('a', content))
            .describedAs('Grid Link Table data List with content:' + content);
        /**
    * 列表没有数据
    *
    */
        this.emptyGrid = () => web_2.PageElement.located(web_2.By.css('.cstdgrid__emptyrow'))
            .describedAs('empty grid');
    }
}
exports.BrowseSolicitationFields = BrowseSolicitationFields;
exports.browseSolicitation = new BrowseSolicitationFields(SolicitationAttributes_1.solicitationAttributesMap);
//# sourceMappingURL=BrowseSolicitationField.js.map