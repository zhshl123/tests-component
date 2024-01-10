"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.risk = exports.EditRisk = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const abstract_1 = require("../common/abstract");
const abstract_2 = require("../common/abstract");
const RiskAttributes_1 = require("./RiskAttributes");
class EditRisk extends abstract_1.EditFromFields {
    constructor(entityMap) {
        super(entityMap);
        this.dropdownListBox = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_ddlPicklist_listbox'))
            .describedAs('dropdown list box: ' + fieldName);
        this.lookupInputField = (fieldName) => {
            const mappedFieldName = this.entityMap.get(fieldName);
            return web_1.PageElement.located(web_1.By.css(`[aria-describedby="ctl00_body_${mappedFieldName}_taglist"]`))
                .describedAs('lookup input field: ' + fieldName);
        };
        this.lookupDropdownListBox = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_listbox'))
            .describedAs('lookup dropdown list box: ' + fieldName);
        this.selectItemInlookupPopup = (fieldName, itemName, popupFieldName) => {
            const searchForm = new abstract_2.SearchFromFields(this.entityMap);
            return core_1.Task.where(`#actor searchs single item : ${itemName} in ${fieldName} lookup popup`, 
            // 先检查输入框中是否已有值
            this.checkLooukupInputfieldIsEmpty(fieldName), web_1.Click.on(this.lookupIcon(fieldName)), 
            // 确保弹窗有显示再进行下一步搜索操作
            assertions_1.Ensure.eventually(this.lookupPopupPanel(fieldName), (0, web_1.isVisible)()), web_1.Switch.to(this.lookupPopupPanel(fieldName)).and(web_1.Enter.theValue(itemName).into(searchForm.textInputField(popupFieldName)), common_1.clickButton.using(DefaultStaticParams_1.SEARCH), 
            // 等待3s加载时间，以确保列表为刷新后的数据
            core_1.Wait.for(core_1.Duration.ofSeconds(3)), searchForm.checkSearchResult(itemName, DefaultStaticParams_1.SUCCEEDED), (0, common_1.clickAllMultiCheckBox)(), common_1.clickButton.using(DefaultStaticParams_1.OK)));
        };
        this.checkLooukupInputfieldIsEmpty = (fieldName) => core_1.Task.where(`#actor lookup input field ${fieldName} is empty`, 
        // 有值的情况
        core_1.Check.whether(this.lookupInputFieldSingleValue(fieldName), (0, assertions_1.not)((0, assertions_1.isPresent)())).andIfSo(core_1.Check.whether(this.lookupInputFieldMultiValue(fieldName), (0, assertions_1.not)((0, assertions_1.isPresent)())).andIfSo(
        // 空值情况下，点击查看下拉框
        web_1.Click.on(this.lookupInputField(fieldName)), 
        // 确保下拉框有值之后再点击lookup图标
        assertions_1.Ensure.eventually(this.lookupDropdownList(fieldName).first(), (0, web_1.isVisible)()))));
        this.NewScopingAreaEditIcon = () => web_1.PageElements.located(web_1.By.css(`[title="Edit"]`)).last()
            .describedAs('Edit Icon of Ranking');
        this.clickNewEditIcon = () => {
            return core_1.Task.where(`#actor click New Edit Icon`, web_1.Click.on(this.NewScopingAreaEditIcon()));
        };
        /**
         * check message popup is visible
         * @returns
         */
        this.waitMessagePopupBoxVisible = () => core_1.Task.where(`#actor check message popup box`, core_1.Wait.until((0, common_1.messagePopupBox)(), (0, web_1.isVisible)()), core_1.Check.whether(web_1.Text.of((0, common_1.messagePopupContent)()), (0, assertions_1.includes)('already')).andIfSo(common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK), common_1.clickActionButton.using('Back')));
    }
}
exports.EditRisk = EditRisk;
exports.risk = new EditRisk(RiskAttributes_1.riskMap);
//# sourceMappingURL=EditRisk.js.map