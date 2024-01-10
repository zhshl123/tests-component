"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IR = exports.EditIR = void 0;
/* eslint-disable unicorn/filename-case */
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const abstract_1 = require("../common/abstract");
const abstract_2 = require("../common/abstract");
const IRAttributes_1 = require("./IRAttributes");
class EditIR extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
        this.lookupInputField = (fieldName) => {
            const mappedFieldName = this.entityMap.get(fieldName);
            return web_1.PageElement.located(web_1.By.css(`[aria-describedby="ctl00_body_${mappedFieldName}_taglist"]`))
                .describedAs('lookup input field: ' + fieldName);
        };
        this.selectItemInlookupPopup = (fieldName, itemName, popupFieldName) => {
            const searchForm = new abstract_2.SearchFromFields(this.entityMap);
            return core_1.Task.where(`#actor searchs single item : ${itemName} in ${fieldName} lookup popup`, 
            // 先检查输入框中是否已有值
            this.checkLooukupInputfieldIsEmpty(fieldName), web_1.Click.on(this.lookupIcon(fieldName)), 
            // 确保弹窗有显示再进行下一步搜索操作
            assertions_1.Ensure.eventually(this.lookupPopupPanel(fieldName), (0, web_1.isVisible)()), web_1.Switch.to(this.lookupPopupPanel(fieldName)).and(web_1.Enter.theValue(itemName).into(searchForm.textInputField(popupFieldName)), common_1.clickButton.using(DefaultStaticParams_1.SEARCH), 
            // 等待3s加载时间，以确保列表为刷新后的数据
            core_1.Wait.for(core_1.Duration.ofSeconds(3)), searchForm.checkSearchResult(itemName, DefaultStaticParams_1.SUCCEEDED), (0, common_1.clickFirstMultiCheckBox)(), common_1.clickButton.using(DefaultStaticParams_1.OK)));
        };
        this.dropdownListBox = (fieldName) => web_1.PageElements.located(web_1.By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_ddlPicklist_listbox')).last()
            .describedAs('dropdown list box: ' + fieldName);
        this.selectDropdownItemA = (fieldName, itemName) => {
            return core_1.Task.where(`#actor selects dropdown item: ${itemName}`, core_1.Check.whether(this.dropdownField(fieldName), (0, assertions_1.isPresent)()).andIfSo(web_1.Click.on(this.dropdownField(fieldName)), 
            // 确保下拉框有值之后再点击对应选项
            assertions_1.Ensure.eventually(this.dropdownList(fieldName).first(), (0, assertions_1.isPresent)()), web_1.Click.on(this.dropdownItemA(fieldName, itemName))).otherwise(core_1.Log.the(`field: ${fieldName} not present`)));
        };
        this.dropdownItemA = (fieldName, itemName) => {
            const mappedFieldName = this.entityMap.get(itemName);
            return web_1.PageElement.located(web_1.By.css(`[data-offset-index="${mappedFieldName}"]`))
                .of(this.dropdownListBox(fieldName))
                .describedAs('dropdown item: ' + itemName);
        };
        this.textInputFieldA = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_txtAutoNumber'))
            .describedAs('text input input field: ' + fieldName);
    }
}
exports.EditIR = EditIR;
exports.IR = new EditIR(IRAttributes_1.IRMap);
//# sourceMappingURL=EditIR.js.map