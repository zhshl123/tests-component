"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.browseScopingTemplate = exports.SearchScopingTemplateFIelds = void 0;
const web_1 = require("@serenity-js/web");
const abstract_1 = require("../common/abstract");
const ScopingTemplateAttributes_1 = require("./ScopingTemplateAttributes");
class SearchScopingTemplateFIelds extends abstract_1.SearchFromFields {
    constructor(entityMap) {
        super(entityMap);
        /**
         * 普通文字输入框
         * @param fieldName 字段名称
         * @returns
         */
        this.textInputField = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_txt' + this.entityMap.get(fieldName)))
            .describedAs('text input input field: ' + fieldName);
        /**
         * 列表首行的edit图标
         * @returns
         */
        this.editIconInGrid = () => web_1.PageElement.located(web_1.By.id('ctl00_body_dgTemplates_ctl03_lnkEdit'))
            .describedAs('edit icon in grid first row');
    }
}
exports.SearchScopingTemplateFIelds = SearchScopingTemplateFIelds;
exports.browseScopingTemplate = new SearchScopingTemplateFIelds(ScopingTemplateAttributes_1.scopingTemplateAttributesMap);
//# sourceMappingURL=SearchScopingTemplateFields.js.map