"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Assignment = exports.EditAssignment = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const common_2 = require("../common");
const abstract_1 = require("../common/abstract");
const abstract_2 = require("../common/abstract");
const AssignmentAttributes_1 = require("./AssignmentAttributes");
class EditAssignment extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
        this.lookupInputField = (fieldName) => {
            const mappedFieldName = this.entityMap.get(fieldName);
            return web_1.PageElement.located(web_1.By.css(`[aria-describedby="ctl00_body_${mappedFieldName}_taglist"]`))
                .describedAs('lookup input field: ' + fieldName);
        };
        this.dropdownItemLast = (fieldName, itemName) => web_1.PageElements.located(web_1.By.css(`[title="${itemName}"]`))
            .of(this.dropdownListBox(fieldName))
            .describedAs('dropdown item: ' + itemName);
        this.selectDropdownItemLast = (fieldName, itemName) => {
            return core_1.Task.where(`#actor selects dropdown item: ${itemName}`, core_1.Wait.for(core_1.Duration.ofSeconds(3)), web_1.Click.on(this.dropdownField(fieldName)), 
            // 确保下拉框有值之后再点击对应选项
            assertions_1.Ensure.eventually(this.dropdownList(fieldName).first(), (0, assertions_1.isPresent)()), core_1.Wait.for(core_1.Duration.ofSeconds(3)), web_1.Click.on(this.dropdownItemLast(fieldName, itemName).last()));
        };
        this.selectItemInlookupPopup = (fieldName, itemName, popupFieldName) => {
            const searchForm = new abstract_2.SearchFromFields(this.entityMap);
            return core_1.Task.where(`#actor searchs single item : ${itemName} in ${fieldName} lookup popup`, 
            // 先检查输入框中是否已有值
            this.checkLooukupInputfieldIsEmpty(fieldName), core_1.Wait.for(core_1.Duration.ofSeconds(3)), web_1.Click.on(this.lookupIcon(fieldName)), core_1.Wait.for(core_1.Duration.ofSeconds(3)), 
            // 确保弹窗有显示再进行下一步搜索操作
            assertions_1.Ensure.eventually(this.lookupPopupPanel(fieldName), (0, web_1.isVisible)()), web_1.Switch.to(this.lookupPopupPanel(fieldName)).and(web_1.Enter.theValue(itemName).into(searchForm.textInputField(popupFieldName)), common_1.clickButton.using(DefaultStaticParams_1.SEARCH), 
            // 等待3s加载时间，以确保列表为刷新后的数据
            core_1.Wait.for(core_1.Duration.ofSeconds(3)), searchForm.checkSearchResult(itemName, DefaultStaticParams_1.SUCCEEDED), 
            // 点击单选框的第一个选项
            (0, common_2.clickAllMultiCheckBox)(), common_1.clickButton.using(DefaultStaticParams_1.OK)));
        };
        this.GeneralTab = () => {
            return web_1.PageElement.located(web_1.By.css(`[Tabid="1"]`))
                .describedAs('General Tab');
        };
        this.clickGeneralTab = () => {
            return core_1.Task.where(`#actor click General Tab`, web_1.Click.on(this.GeneralTab()));
        };
        this.textInputFieldA = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_txtAutoNumber'))
            .describedAs('text input input field: ' + fieldName);
    }
}
exports.EditAssignment = EditAssignment;
exports.Assignment = new EditAssignment(AssignmentAttributes_1.AssignmentMap);
//# sourceMappingURL=EditAssignment.js.map