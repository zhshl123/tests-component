"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchFromFields = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../../DefaultStaticParams");
const CalendarPopup_1 = require("../CalendarPopup");
const ClickButton_1 = require("../ClickButton");
const ClickCheckBox_1 = require("../ClickCheckBox");
const GridList_1 = require("../GridList");
const OpenPage_1 = require("../OpenPage");
class SearchFromFields {
    constructor(entityMap) {
        /**
         * 普通文本输入框填值
         * @param fieldName 字段名称
         * @param itemName 要填的值
         * @returns
         */
        this.fillTextInputField = (fieldName, itemName) => {
            return core_1.Task.where(`#actor fill text field: ${fieldName} with ${itemName}`, web_1.Click.on(this.textInputField(fieldName)), web_1.Clear.theValueOf(this.textInputField(fieldName)), web_1.Enter.theValue(itemName).into(this.textInputField(fieldName)));
        };
        /**
        * 选择下拉框选项
        * @param fieldName 字段名称
        * @param itemName 要选择的item
        * @returns
        */
        this.selectDropdownItem = (fieldName, itemName) => {
            return core_1.Task.where(`#actor selects dropdown item: ${itemName}`, web_1.Click.on(this.dropdownField(fieldName)), 
            // 确保下拉框有值之后再点击对应选项
            assertions_1.Ensure.eventually(this.dropdownList(fieldName).first(), (0, assertions_1.isPresent)()), web_1.Click.on(this.dropdownItem(fieldName, itemName)));
        };
        /**
        * 在lookup Popup弹窗中搜索并选择目标选项（当为多选时，全选，当为单选时，默认第一个选项）
        * @param fieldName 字段名称
        * @param itemName 要搜索的关键词
        * @param popupFieldName 在弹窗中填入关键词的字段名(仅限text类型的字段)
        * @returns
        */
        this.selectItemInlookupPopup = (fieldName, itemName, popupFieldName) => {
            return core_1.Task.where(`#actor searchs item : ${itemName} in ${fieldName} lookup popup`, web_1.Click.on(this.lookupInputField(fieldName)), 
            // 确保下拉框有值之后再点击lookup图标
            assertions_1.Ensure.eventually(this.lookupDropdownList(fieldName).first(), (0, assertions_1.isPresent)()), web_1.Click.on(this.lookupIcon(fieldName)), 
            // 确保弹窗有显示再进行下一步搜索操作
            assertions_1.Ensure.eventually(this.lookupPopupPanel(fieldName), (0, web_1.isVisible)()), web_1.Switch.to(this.lookupPopupPanel(fieldName)).and(this.fillTextInputField(popupFieldName, itemName), ClickButton_1.clickButton.using(DefaultStaticParams_1.SEARCH), 
            // 等待3s加载时间，以确保列表为刷新后的数据
            core_1.Wait.for(core_1.Duration.ofSeconds(3)), this.checkSearchResult(itemName, DefaultStaticParams_1.SUCCEEDED), core_1.Check.whether(
            // 判断是单选框还是多选框
            (0, ClickCheckBox_1.singleCheckBoxInGrid)().first(), (0, web_1.isVisible)()).andIfSo(
            // 点击单选框的第一个选项
            (0, ClickCheckBox_1.clickFirstSingleCheckBox)()).otherwise(
            // 点击多选框的全选
            (0, ClickCheckBox_1.clickAllMultiCheckBox)()), ClickButton_1.clickButton.using(DefaultStaticParams_1.OK)));
        };
        /**
         * 选择lookup下拉框中的具体选项
         * @param fieldName 字段名称
         * @param itemName 选项的值
         * @returns
         */
        this.selectLookupDropdownItem = (fieldName, itemName) => {
            return core_1.Task.where(`#actor selects dropdown item '${itemName}' in lookup field '${fieldName}'`, web_1.Click.on(this.inputFieldClearIcon(fieldName)), 
            // 点击输入框
            web_1.Click.on(this.lookupInputField(fieldName)), core_1.Wait.for(core_1.Duration.ofSeconds(2)), 
            // 确保下拉框有值之后再点击lookup图标
            assertions_1.Ensure.eventually(this.lookupDropdownList(fieldName).first(), (0, assertions_1.isPresent)()), 
            // 点击下拉框的值
            web_1.Click.on(this.lookupDropdownItem(fieldName, itemName)), web_1.Click.on(this.fieldLabel(fieldName)));
        };
        /**
         * 在browse页面搜索目标值(单条件查询，仅限查询字段为text类型)
         * 多条件查询，请在子类重新定义新的方法
         * @param pageName 页面名称
         * @param fieldName 填入关键词的字段名
         * @param itemName 搜索的关键词
         * @returns
         */
        this.searchItemInBrowsePage = (pageName, fieldName, itemName) => {
            return core_1.Task.where(`#actor search item: ${itemName} with ${fieldName}`, core_1.Check.whether(web_1.Page.current().title(), (0, assertions_1.includes)(pageName)).andIfSo(core_1.Log.the('current page is ' + pageName)).otherwise(OpenPage_1.openPage.using(pageName), core_1.Wait.for(core_1.Duration.ofSeconds(2))), this.fillTextInputField(fieldName, itemName), ClickButton_1.clickButton.using(DefaultStaticParams_1.SEARCH), core_1.Wait.for(core_1.Duration.ofSeconds(3)), (0, GridList_1.checkGridList)());
        };
        /**
         *
         * @param itemName 校验的item值
         * @param expectedResult 预期结果 SUCCEEDED：匹配 FAILED 不匹配
         * @returns
         */
        this.checkSearchResult = (itemName, expectedResult) => {
            return expectedResult === DefaultStaticParams_1.SUCCEEDED ? core_1.Task.where(`#actor check search item: ${itemName} exists`, core_1.Check.whether((0, GridList_1.gridTextTdList)(itemName), (0, assertions_1.isPresent)()).andIfSo(core_1.Log.the(itemName + ' is present')).otherwise(assertions_1.Ensure.eventually((0, GridList_1.gridLinkTdList)(itemName), (0, assertions_1.isPresent)()))) : core_1.Task.where(`#actor check search item: ${itemName} not exists`, assertions_1.Ensure.eventually((0, GridList_1.emptyGrid)(), (0, assertions_1.isPresent)()));
        };
        /**
         * 在browse页面搜索目标，并点击edit跳转到edit页面
         * @param pageName
         * @param fieldName
         * @param itemName
         */
        this.searchItemAndEdit = (pageName, fieldName, itemName) => {
            return core_1.Task.where(`#actor check search item: ${itemName} and forward to edit page`, this.searchItemInBrowsePage(pageName, fieldName, itemName), this.checkSearchResult(itemName, DefaultStaticParams_1.SUCCEEDED), ClickButton_1.clickButtonInList.using(DefaultStaticParams_1.EDIT));
        };
        /**
        * 在lookup Popup弹窗中搜索并选择目标选项（当为多选时，全选，当为单选时，默认第一个选项）
        * @param fieldName 字段名称
        * @param itemName 要搜索的关键词
        * @param popupFieldName 在弹窗中填入关键词的字段名(仅限text类型的字段)
        * @returns
        */
        this.selectItemInReletionshipAttributeLookupPopup = (fieldName, itemName, popupFieldName) => {
            return core_1.Task.where(`#actor searchs item : ${itemName} in ${fieldName} lookup popup`, web_1.Click.on(this.lookupInputField(fieldName)), 
            // 确保下拉框有值之后再点击lookup图标
            assertions_1.Ensure.eventually(this.relationshipAttributeLookupDropdownList(fieldName).first(), (0, web_1.isVisible)()), web_1.Click.on(this.lookupIcon(fieldName)), 
            // 确保弹窗有显示再进行下一步搜索操作
            assertions_1.Ensure.eventually(this.relationshipAttributeLookupPopupPanel(fieldName), (0, web_1.isVisible)()), web_1.Switch.to(this.relationshipAttributeLookupPopupPanel(fieldName)).and(this.fillTextInputField(popupFieldName, itemName), ClickButton_1.clickButton.using(DefaultStaticParams_1.SEARCH), 
            // 等待3s加载时间，以确保列表为刷新后的数据
            core_1.Wait.for(core_1.Duration.ofSeconds(3)), this.checkSearchResult(itemName, DefaultStaticParams_1.SUCCEEDED), core_1.Check.whether(
            // 判断是单选框还是多选框
            (0, ClickCheckBox_1.singleCheckBoxInGrid)().first(), (0, web_1.isVisible)()).andIfSo(
            // 点击单选框的第一个选项
            (0, ClickCheckBox_1.clickFirstSingleCheckBox)()).otherwise(
            // 点击多选框的全选
            (0, ClickCheckBox_1.clickAllMultiCheckBox)()), ClickButton_1.clickButton.using(DefaultStaticParams_1.OK)));
        };
        /**
         * 填入起始日期
         * @param fieldName 字段名称
         * @param date 要填入的时间 格式：mm/dd/yyyy eg:07/01/2023
         * @returns
         */
        this.fillStartDateInputField = (fieldName, date) => {
            return core_1.Task.where(`#actor fill start date of ${fieldName}, date = ${date} `, web_1.Clear.theValueOf(this.startDateInputField(fieldName)), web_1.Click.on(this.startDateInputField(fieldName)), (0, CalendarPopup_1.fillSpecialDate)(String(date)));
        };
        /**
         * 填入截止日期
         * @param fieldName 字段名称
         * @param date 要填入的时间 格式：mm/dd/yyyy eg:07/01/2023
         * @returns
         */
        this.fillEndDateInputField = (fieldName, date) => {
            return core_1.Task.where(`#actor fill end date of ${fieldName}, date = ${date} `, web_1.Clear.theValueOf(this.endInputField(fieldName)), web_1.Click.on(this.endInputField(fieldName)), (0, CalendarPopup_1.fillSpecialDate)(String(date)));
        };
        /*************************************** html 元素组件************************************** */
        /**
         * 普通文字输入框
         * @param fieldName 字段名称
         * @returns
         */
        this.textInputField = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_A0_' + this.entityMap.get(fieldName) + '_txtText'))
            .describedAs('text input input field: ' + fieldName);
        /**
        * 下拉框的输入框
        * @param fieldName 字段名称
        * @returns
        */
        this.dropdownField = (fieldName) => {
            const mappedFieldName = this.entityMap.get(fieldName);
            return web_1.PageElement.located(web_1.By.css(`[aria-owns="ctl00_body_A0_${mappedFieldName}_ddlPicklist_listbox"]`))
                .describedAs('dropdown field: ' + fieldName);
        };
        /**
        * 下拉框面板
        * @param fieldName 字段名称
        * @returns
        */
        this.dropdownListBox = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_A0_' + this.entityMap.get(fieldName) + '_ddlPicklist-list'))
            .describedAs('dropdown list box: ' + fieldName);
        /**
        * 下拉框列表
        * @param fieldName 字段名称
        * @returns
        */
        this.dropdownList = (fieldName) => web_1.PageElements.located(web_1.By.css('li')).of(this.dropdownListBox(fieldName))
            .describedAs('dropdown list: ' + fieldName);
        /**
        * 下拉列表的值
        * @param fieldName 字段名称
        * @param itemName 具体的选项名称
        * @returns
        */
        this.dropdownItem = (fieldName, itemName) => web_1.PageElement.located(web_1.By.css(`[title="${itemName}"]`))
            .of(this.dropdownListBox(fieldName))
            .describedAs('dropdown item: ' + itemName);
        /**
        * lookup 输入框
        * @param fieldName 字段名称
        * @returns
        */
        this.lookupInputField = (fieldName) => {
            const mappedFieldName = this.entityMap.get(fieldName);
            return web_1.PageElement.located(web_1.By.css(`[aria-describedby="ctl00_body_A0_${mappedFieldName}_select_taglist"]`))
                .describedAs('lookup input field: ' + fieldName);
        };
        /**
        * lookup输入框的下拉框面板
        * @param fieldName 字段名称
        * @returns
        */
        this.lookupDropdownListBox = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_A0_' + this.entityMap.get(fieldName) + '_select-list'))
            .describedAs('lookup dropdown list box: ' + fieldName);
        /**
        * lookup输入框的下拉框列表
        * @param fieldName 字段名称
        * @returns
        */
        this.lookupDropdownList = (fieldName) => web_1.PageElements.located(web_1.By.css('span'))
            .of(this.lookupDropdownListBox(fieldName))
            .describedAs('lookup dropdown list: ' + fieldName);
        /**
        * lookup 下拉框列表的具体选项
        * @param fieldName 字段名称
        * @param itemName 选项的值
        * @returns
        */
        this.lookupDropdownItem = (fieldName, itemName) => web_1.PageElement.located(web_1.By.css(`[title="${itemName}"]`))
            .of(this.lookupDropdownListBox(fieldName))
            .describedAs(`dropdown item: ${itemName} of lookup field ${fieldName}`);
        /**
        * lookup 图标
        * @param fieldName 字段名称
        * @returns
        */
        this.lookupIcon = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_A0_' + this.entityMap.get(fieldName) + '_imgPopup'))
            .describedAs('lookup icon: ' + fieldName);
        /**
        * 点击lookup图标后出现的弹窗
        * @param fieldName 字段名称
        * @returns
        */
        this.lookupPopupPanel = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_A0_' + this.entityMap.get(fieldName) + '_ifmPopup'))
            .describedAs('lookup popup panel : ' + fieldName);
        /**
        * 关联的Attribute的lookup 输入框（在entity的Attribute列表无法搜索到的字段）
        * @param fieldName 字段名称
        * @returns
        */
        this.relationshipAttributeLookupInputField = (fieldName) => {
            const mappedFieldName = this.entityMap.get(fieldName);
            return web_1.PageElement.located(web_1.By.css(`[aria-describedby="ctl00_body_AA_${mappedFieldName}_select_taglist"]`))
                .describedAs('relationship attribute lookup input field: ' + fieldName);
        };
        /**
        * 关联的Attribute的lookup输入框的下拉框面板（在entity的Attribute列表无法搜索到的字段）
        * @param fieldName 字段名称
        * @returns
        */
        this.relationshipAttributeLookupDropdownListBox = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_AA_' + this.entityMap.get(fieldName) + '_select-list'))
            .describedAs('relationship attribute lookup dropdown list box: ' + fieldName);
        /**
        * 关联的Attribute的lookup输入框的下拉框列表（在entity的Attribute列表无法搜索到的字段）
        * @param fieldName 字段名称
        * @returns
        */
        this.relationshipAttributeLookupDropdownList = (fieldName) => web_1.PageElements.located(web_1.By.css('span'))
            .of(this.relationshipAttributeLookupDropdownListBox(fieldName))
            .describedAs('relationship attribute lookup dropdown list: ' + fieldName);
        /**
        * 关联的Attribute的lookup输入框的下拉框列表的具体选项
        * @param fieldName 字段名称
        * @param itemName 选项的值
        * @returns
        */
        this.relationshipAttributeLookupDropdownItem = (fieldName, itemName) => web_1.PageElement.located(web_1.By.css(`[title="${itemName}"]`))
            .of(this.relationshipAttributeLookupDropdownListBox(fieldName))
            .describedAs(`dropdown item: ${itemName} of lookup field ${fieldName}`);
        /**
        * 关联的Attribute的lookup 图标（在entity的Attribute列表无法搜索到的字段）
        * @param fieldName 字段名称
        * @returns
        */
        this.relationshipAttributeLookupIcon = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_AA_' + this.entityMap.get(fieldName) + '_imgPopup'))
            .describedAs('relationship attributelookup icon: ' + fieldName);
        /**
        * 点击关联的Attribute的lookup图标后出现的弹窗（在entity的Attribute列表无法搜索到的字段）
        * @param fieldName 字段名称
        * @returns
        */
        this.relationshipAttributeLookupPopupPanel = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_AA_' + this.entityMap.get(fieldName) + '_ifmPopup'))
            .describedAs('relationship attribute lookup popup panel : ' + fieldName);
        /**
        * 起始日期输入框
        * @param fieldName 字段名称
        * @returns
        */
        this.startDateInputField = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_A0_' + this.entityMap.get(fieldName) + '_layStartDate'))
            .describedAs('start date input field: ' + fieldName);
        /**
         * 起始日期的日历图标
         * @param fieldName 字段名称
         * @returns
         */
        this.startDateCalendarIcon = (fieldName) => {
            const mappedFieldName = this.entityMap.get(fieldName);
            return web_1.PageElement.located(web_1.By.css(`[aria-controls="ctl00_body_A0_${mappedFieldName}_layStartDate_dateview"]`))
                .describedAs('start date calendar icon: ' + fieldName);
        };
        /**
        * 截止日期输入框
        * @param fieldName 字段名称
        * @returns
        */
        this.endInputField = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_A0_' + this.entityMap.get(fieldName) + '_layDueDate'))
            .describedAs('end date input field: ' + fieldName);
        /**
         * 截止日期的日历图标
         * @param fieldName 字段名称
         * @returns
         */
        this.endDateCalendarIcon = (fieldName) => {
            const mappedFieldName = this.entityMap.get(fieldName);
            return web_1.PageElement.located(web_1.By.css(`[aria-controls="ctl00_body_A0_${mappedFieldName}_layDueDate_dateview"]`))
                .describedAs('end date calendar icon: ' + fieldName);
        };
        /**
         * 清除输入框内容的图标
         * @param fieldName 字段名称
         * @returns
         */
        this.inputFieldClearIcon = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_A0_' + this.entityMap.get(fieldName) + '_btnClear'))
            .describedAs('input field clear button: ' + fieldName);
        this.fieldLabel = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_A0_' + this.entityMap.get(fieldName) + '_FL'))
            .describedAs(`field ${fieldName} label`);
        this.entityMap = entityMap;
    }
}
exports.SearchFromFields = SearchFromFields;
//# sourceMappingURL=SearchFormFields.js.map