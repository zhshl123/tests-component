"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditFromFields = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../../DefaultStaticParams");
const CalendarPopup_1 = require("../CalendarPopup");
const ClickButton_1 = require("../ClickButton");
const ClickCheckBox_1 = require("../ClickCheckBox");
const GridList_1 = require("../GridList");
const SearchFormFields_1 = require("./SearchFormFields");
class EditFromFields {
    constructor(entityMap) {
        /*************************************** interactions ***************************************** */
        /**
         * 给text类型的field填值
         * @param fieldName 字段名
         * @param itemName 要填的值
         * @returns
         */
        this.fillTextInputField = (fieldName, itemName) => {
            return core_1.Task.where(`#actor fill text input field ${fieldName} with ${itemName}`, web_1.Click.on(this.textInputField(fieldName)), web_1.Clear.theValueOf(this.textInputField(fieldName)), web_1.Enter.theValue(itemName).into(this.textInputField(fieldName)));
        };
        /**
         * 给number类型的field填值
         * @param fieldName 字段名
         * @param itemName 要填的值
         * @returns
         */
        this.fillNumberInputField = (fieldName, itemName) => {
            return core_1.Task.where(`#actor fill number input field ${fieldName} with ${itemName}`, web_1.Click.on(this.numberInputField(fieldName)), web_1.Clear.theValueOf(this.numberInputField(fieldName)), web_1.Enter.theValue(itemName).into(this.numberInputField(fieldName)));
        };
        /**
        * 选择下拉框选项
        * @param fieldName
        * @param itemName
        * @returns
        */
        this.selectDropdownItem = (fieldName, itemName) => {
            return core_1.Task.where(`#actor selects dropdown item: ${itemName}`, web_1.Click.on(this.dropdownField(fieldName)), 
            // 确保下拉框有值之后再点击对应选项
            assertions_1.Ensure.eventually(this.dropdownList(fieldName).first(), (0, assertions_1.isPresent)()), web_1.Click.on(this.dropdownItem(fieldName, itemName)));
        };
        /**
        * 下拉框输入框填值（所填的值必须与选项一致）
        * @param fieldName
        * @param itemName
        * @returns
        */
        this.fillDropdownInputField = (fieldName, itemName) => {
            return core_1.Task.where(`#actor selects dropdown item: ${itemName}`, web_1.Click.on(this.dropdownField(fieldName)), web_1.Clear.theValueOf(this.dropdownField(fieldName)), web_1.Enter.theValue(itemName).into(this.dropdownField(fieldName)), web_1.Click.on(this.attributeNameLabel(fieldName)));
        };
        /**
        * 在lookup Popup弹窗中搜索并选择目标选项（当为多选时，全选，当为单选时，默认第一个选项.不会清除原输入框中已选择的内容）
        * @param fieldName 字段名称
        * @param itemName 要搜索的关键词，多个选项逗号隔开。使用时，使用split(',')，组装成array，然后foreach遍历
        * @param popupFieldName 在弹窗中填入关键词的字段名
        * @returns
        */
        this.selectItemInlookupPopup = (fieldName, itemName, popupFieldName) => {
            const searchForm = new SearchFormFields_1.SearchFromFields(this.entityMap);
            return core_1.Task.where(`#actor searchs single item : ${itemName} in ${fieldName} lookup popup`, 
            // 先检查输入框中是否已有值
            this.checkLooukupInputfieldIsEmpty(fieldName), web_1.Click.on(this.lookupIcon(fieldName)), 
            // 确保弹窗有显示再进行下一步搜索操作
            assertions_1.Ensure.eventually(this.lookupPopupPanel(fieldName), (0, web_1.isVisible)()), web_1.Switch.to(this.lookupPopupPanel(fieldName)).and(web_1.Enter.theValue(itemName).into(searchForm.textInputField(popupFieldName)), ClickButton_1.clickButton.using(DefaultStaticParams_1.SEARCH), 
            // 等待3s加载时间，以确保列表为刷新后的数据
            core_1.Wait.for(core_1.Duration.ofSeconds(3)), searchForm.checkSearchResult(itemName, DefaultStaticParams_1.SUCCEEDED), core_1.Check.whether(
            // 判断是单选框还是多选框
            (0, ClickCheckBox_1.singleCheckBoxInGrid)(), (0, assertions_1.isPresent)()).andIfSo(
            // 点击单选框的第一个选项
            (0, ClickCheckBox_1.clickFirstSingleCheckBox)()).otherwise(
            // 点击多选框的全选
            (0, ClickCheckBox_1.clickAllMultiCheckBox)()), ClickButton_1.clickButton.using(DefaultStaticParams_1.OK)));
        };
        /**
         * 选择下拉框第一条数据
         * @param fieldName
         * @returns
         */
        this.selectFirstItemInLookup = (fieldName) => core_1.Task.where(`#actor first item in lookup dropdown list`, this.checkLooukupInputfieldIsEmpty(fieldName), web_1.Click.on(this.lookupIcon(fieldName)), 
        // 确保弹窗有显示再进行下一步搜索操作
        assertions_1.Ensure.eventually(this.lookupPopupPanel(fieldName), (0, web_1.isVisible)()), web_1.Switch.to(this.lookupPopupPanel(fieldName)).and((0, GridList_1.checkGridList)(), 
        // 点击选项
        (0, ClickCheckBox_1.clickFirstSingleCheckBox)(), ClickButton_1.clickButton.using(DefaultStaticParams_1.OK)));
        /**
         * 选择lookup下拉框中的具体选项
         * @param fieldName 字段名称
         * @param itemName 选项的值
         * @returns
         */
        this.selectLookupDropdownItem = (fieldName, itemName) => {
            return core_1.Task.where(`#actor selects dropdown item '${itemName}' in lookup field '${fieldName}'`, 
            // 点击输入框
            web_1.Click.on(this.lookupInputField(fieldName)), 
            // 确保下拉框有值之后再点击lookup图标
            assertions_1.Ensure.eventually(this.lookupDropdownList(fieldName).first(), (0, assertions_1.isPresent)()), 
            // 点击下拉框的值
            web_1.Click.on(this.lookupDropdownItem(fieldName, itemName)), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
        };
        /**
         * 检查lookup输入框的值
         * @param fieldName
         * @returns
         */
        this.checkLooukupInputfieldIsEmpty = (fieldName) => core_1.Task.where(`#actor lookup input field ${fieldName} is empty`, 
        // 有值的情况
        core_1.Check.whether(this.lookupInputFieldSingleValue(fieldName), (0, assertions_1.not)((0, assertions_1.isPresent)())).andIfSo(core_1.Check.whether(this.lookupInputFieldMultiValue(fieldName), (0, assertions_1.not)((0, assertions_1.isPresent)())).andIfSo(
        // 空值情况下，点击查看下拉框
        web_1.Click.on(this.lookupInputField(fieldName)), 
        // 确保下拉框有值之后再点击lookup图标
        assertions_1.Ensure.eventually(this.lookupDropdownList(fieldName).first(), (0, web_1.isVisible)()))));
        /**
         * 设置cookie
         * @param cookieName cookie的字段名称
         * @param cookieValue cookie的值
         * @returns
         */
        this.setCookie = (cookieName, cookieValue) => core_1.Task.where(`#actor sets cookie: name = ${cookieName} , value = ${cookieValue} `, web_1.Cookie.called(cookieName).isPresent() ? this.deleteOldCookieAndSetNewCookie(cookieName, cookieValue) : this.setNewCookie(cookieName, cookieValue), assertions_1.Ensure.eventually(web_1.Cookie.called(cookieName).value(), (0, assertions_1.equals)(cookieValue)));
        this.deleteOldCookieAndSetNewCookie = (cookieName, cookieValue) => core_1.Task.where(`#actor deletes old cookie and sets new  cookie: name = ${cookieName} , value = ${cookieValue} `, web_1.Cookie.called(cookieName).delete(), 
        // 设置cookie 用于后续查找
        web_1.Cookie.set({
            name: cookieName,
            value: cookieValue,
        }));
        this.setNewCookie = (cookieName, cookieValue) => core_1.Task.where(`#actor sets new  cookie: name = ${cookieName} , value = ${cookieValue} `, 
        // 设置cookie 用于后续查找
        web_1.Cookie.set({
            name: cookieName,
            value: cookieValue,
        }));
        /**
         * 选择当前日期
         * @param fieldName 字段名称
         * @param calendarOrderNo 从上往下数第几个日历
         * @returns
         */
        this.selectDateToday = (fieldName, calendarOrderNo) => core_1.Task.where(`#actor select date today of ${fieldName} `, web_1.Click.on(this.dateInputField(fieldName)), core_1.Wait.for(core_1.Duration.ofSeconds(1)), web_1.Click.on(this.dateCalendarIcon(fieldName)), (0, CalendarPopup_1.clickCalendarToday)(calendarOrderNo));
        /**
         * 选择指定日期
         * @param fieldName 字段名称
         * @param date 要填入的时间 格式：yyyy/mm/dd eg:2023/07/01
         * @param calendarOrderNo 从上往下数第几个日历 第一个为0，以此类推
         * @returns
         */
        this.selectSpecialDate = (fieldName, date, calendarOrderNo) => {
            return core_1.Task.where(`#actor select date of ${fieldName}, date = ${date} `, web_1.Click.on(this.dateInputField(fieldName)), web_1.Click.on(this.dateCalendarIcon(fieldName)), core_1.Wait.for(core_1.Duration.ofSeconds(2)), (0, CalendarPopup_1.clickCalendarDate)(calendarOrderNo, String(date)));
        };
        /**
         * 填入指定日期
         * @param fieldName 字段名称
         * @param date 要填入的时间 格式：mm/dd/yyyy eg:07/01/2023
         * @returns
         */
        this.fillDateInputField = (fieldName, date) => {
            return core_1.Task.where(`#actor fill date of ${fieldName}, date = ${date} `, web_1.Clear.theValueOf(this.dateInputField(fieldName)), web_1.Click.on(this.dateInputField(fieldName)), (0, CalendarPopup_1.fillSpecialDate)(String(date)));
        };
        /**
         * 检查文本输入框的值
         * @param fieldName 字段名
         * @param itemName 字段的期望值
         * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
         * @returns
         */
        this.checkTextInputFieldValue = (fieldName, itemName, expectedResult) => {
            return expectedResult === DefaultStaticParams_1.SUCCEEDED ? core_1.Task.where(`#actor check text field: ${fieldName} 's value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Attribute.called('initialvalue').of(this.textInputField(fieldName)), (0, assertions_1.equals)(itemName))) : core_1.Task.where(`#actor check text field: ${fieldName}'s value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Attribute.called('initialvalue').of(this.textInputField(fieldName)), (0, assertions_1.not)((0, assertions_1.equals)(itemName))));
        };
        /**
         * 检查数字输入框的值
         * @param fieldName 字段名
         * @param itemName 字段的期望值
         * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
         * @returns
         */
        this.checkNumberInputFieldValue = (fieldName, itemName, expectedResult) => {
            return expectedResult === DefaultStaticParams_1.SUCCEEDED ? core_1.Task.where(`#actor check number field: ${fieldName}'s value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Attribute.called('initialvalue').of(this.numberInputField(fieldName)), (0, assertions_1.equals)(itemName))) : core_1.Task.where(`#actor check number field: ${fieldName}'s value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Attribute.called('initialvalue').of(this.numberInputField(fieldName)), (0, assertions_1.not)((0, assertions_1.equals)(itemName))));
        };
        /**
         * 检查下拉框输入框的值
         * @param fieldName 字段名
         * @param itemName 字段的期望值
         * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
         * @returns
         */
        this.checkDropdownInputFieldValue = (fieldName, itemName, expectedResult) => {
            return expectedResult === DefaultStaticParams_1.SUCCEEDED ? core_1.Task.where(`#actor check dropdown field: ${fieldName}'s value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Attribute.called('initialvalue').of(this.dropdownField(fieldName)), (0, assertions_1.equals)(itemName))) : core_1.Task.where(`#actor check dropdown field: ${fieldName}'s value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Attribute.called('initialvalue').of(this.dropdownField(fieldName)), (0, assertions_1.not)((0, assertions_1.equals)(itemName))));
        };
        /**
         * 检查日期输入框的值
         * @param fieldName 字段名
         * @param itemName 字段的期望值
         * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
         * @returns
         */
        this.checkDateInputFieldValue = (fieldName, itemName, expectedResult) => {
            return expectedResult === DefaultStaticParams_1.SUCCEEDED ? core_1.Task.where(`#actor check date field: ${fieldName}'s value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Attribute.called('initialvalue').of(this.dateInputField(fieldName)), (0, assertions_1.equals)(itemName))) : core_1.Task.where(`#actor check date field: ${fieldName}'s value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Attribute.called('initialvalue').of(this.dateInputField(fieldName)), (0, assertions_1.not)((0, assertions_1.equals)(itemName))));
        };
        /**
         * 检查lookup输入框的值(单选)
         * @param fieldName 字段名
         * @param itemName 字段的期望值
         * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
         * @returns
         */
        this.checkLookupInputFieldSingleValue = (fieldName, itemName, expectedResult) => {
            return expectedResult === DefaultStaticParams_1.SUCCEEDED ? core_1.Task.where(`#actor check lookup single value field: ${fieldName}'s value with ${itemName} ${expectedResult}`, core_1.Log.the(web_1.Text.of(this.lookupInputFieldSingleValue(fieldName))), assertions_1.Ensure.eventually(web_1.Text.of(this.lookupInputFieldSingleValue(fieldName)), (0, assertions_1.equals)(itemName))) : core_1.Task.where(`#actor check lookup single value field: ${fieldName}'s  value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Text.of(this.lookupInputFieldSingleValue(fieldName)), (0, assertions_1.not)((0, assertions_1.equals)(itemName))));
        };
        /**
        * 检查lookup输入框的值(多选)
        * @param fieldName 字段名
        * @param itemName 字段的期望值, 多个值逗号隔开，注意选项之间的顺序
        * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
        * @returns
        */
        this.checkLookupInputFieldMultiValue = (fieldName, itemName, expectedResult) => {
            const array = itemName.split(',');
            return expectedResult === DefaultStaticParams_1.SUCCEEDED ? core_1.Task.where(`#actor check lookup single value field: ${fieldName}'s value with ${itemName} ${expectedResult}`, core_1.Log.the(this.lookupInputFieldMultiValue(fieldName).eachMappedTo(web_1.Text)), assertions_1.Ensure.eventually(this.lookupInputFieldMultiValue(fieldName).eachMappedTo(web_1.Text), (0, assertions_1.equals)(array))) : core_1.Task.where(`#actor check lookup single value field: ${fieldName}'s  value with ${itemName} ${expectedResult}`, core_1.Log.the(this.lookupInputFieldMultiValue(fieldName).eachMappedTo(web_1.Text)), assertions_1.Ensure.eventually(this.lookupInputFieldMultiValue(fieldName).eachMappedTo(web_1.Text), (0, assertions_1.not)((0, assertions_1.equals)(array))));
        };
        /**
         * 检查只读字段输入框的值(add时为下拉框，edit时为只读状态的字段)
         * @param fieldName 字段名
         * @param itemName 字段的期望值
         * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
         * @returns
         */
        this.checkReadOnlyLabelValue = (fieldName, itemName, expectedResult) => {
            return expectedResult === DefaultStaticParams_1.SUCCEEDED ? core_1.Task.where(`#actor check read only label field: ${fieldName}'s value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Text.of(this.readOnlyLabelField(fieldName)), (0, assertions_1.equals)(itemName))) : core_1.Task.where(`#actor check read only label field: ${fieldName}'s value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Text.of(this.readOnlyLabelField(fieldName)), (0, assertions_1.not)((0, assertions_1.equals)(itemName))));
        };
        /**
         * 检查只读lookup字段输入框的值
         * @param fieldName 字段名
         * @param itemName 字段的期望值
         * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
         * @returns
         */
        this.checkReadOnlylookupValue = (fieldName, itemName, expectedResult) => {
            return expectedResult === DefaultStaticParams_1.SUCCEEDED ? core_1.Task.where(`#actor check read only lookup field: ${fieldName}'s value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Text.of(this.readOnlyLookupFieldValue(fieldName)), (0, assertions_1.equals)(itemName))) : core_1.Task.where(`#actor check read only lookup field: ${fieldName}'s value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Text.of(this.readOnlyLookupFieldValue(fieldName)), (0, assertions_1.not)((0, assertions_1.equals)(itemName))));
        };
        /**
         * 点击单选框选项
         * @param fieldName
         * @param itemName
         */
        this.clickSingleCheckBox = (fieldName, itemName) => {
            return core_1.Task.where(`#actor click ${fieldName} single check box: ${itemName}`, web_1.Click.on(this.radioButtonLebel(fieldName, itemName)));
        };
        /**
         * 选择时间 (搭配日历一起使用，当不选择日历直接选择时间时，会默认当天日期)
         * @param fieldName 字段名
         * @param itemName 要填的值 eg: 01:30 AM
         * @returns
         */
        this.selectClock = (fieldName, itemName) => {
            return core_1.Task.where(`#actor select clock ${fieldName} with ${itemName}`, web_1.Click.on(this.clockIcon(fieldName)), assertions_1.Ensure.eventually(this.clockList(fieldName), (0, assertions_1.isPresent)()), web_1.Click.on(this.clockItem(fieldName, itemName)));
        };
        /**
        * relationship attribute的lookup Popup弹窗中搜索并选择目标选项（当为多选时，全选，当为单选时，默认第一个选项， 不会清除原输入框中已选择的内容）
        * @param fieldName 字段名称
        * @param itemName 要搜索的关键词, 多个选项逗号隔开。使用时，使用split(',')，组装成array，然后foreach循环
        * @param popupFieldName 在弹窗中填入关键词的字段名
        * @returns
        */
        this.selectItemInRelationshipAttributeInLookupPopup = (fieldName, itemName, popupFieldName) => {
            const searchForm = new SearchFormFields_1.SearchFromFields(this.entityMap);
            return core_1.Task.where(`#actor searchs single item : ${itemName} in ${fieldName} lookup popup`, web_1.Click.on(this.lookupIcon(fieldName)), 
            // 确保弹窗有显示再进行下一步搜索操作
            assertions_1.Ensure.eventually(this.lookupPopupPanel(fieldName), (0, web_1.isVisible)()), web_1.Switch.to(this.lookupPopupPanel(fieldName)).and(web_1.Enter.theValue(itemName).into(searchForm.textInputField(popupFieldName)), ClickButton_1.clickButton.using(DefaultStaticParams_1.SEARCH), 
            // 等待3s加载时间，以确保列表为刷新后的数据
            core_1.Wait.for(core_1.Duration.ofSeconds(3)), searchForm.checkSearchResult(itemName, DefaultStaticParams_1.SUCCEEDED), core_1.Check.whether(
            // 判断是单选框还是多选框
            (0, ClickCheckBox_1.multiCheckBoxInGrid)(), (0, assertions_1.isPresent)()).andIfSo(
            // 点击多选框的全选
            (0, ClickCheckBox_1.clickAllMultiCheckBox)()).otherwise(
            // 点击单选框的第一个选项   
            (0, ClickCheckBox_1.clickFirstSingleCheckBox)()), ClickButton_1.clickButton.using(DefaultStaticParams_1.OK)));
        };
        /**
         * NAICS lookup Popup弹窗中搜索树形选项并选择目标选项（树形选项, 默认选中第一条）
         * @param fieldName
         * @param itemName
         * @param popupFieldName
         * @returns
         */
        this.selectNAICSItemInlookupPopup = (fieldName, itemName, popupFieldName) => {
            return core_1.Task.where(`#actor searchs single item : ${itemName} in ${fieldName} lookup popup`, web_1.Click.on(this.lookupIcon(fieldName)), 
            // 确保弹窗有显示再进行下一步搜索操作
            assertions_1.Ensure.eventually(this.lookupPopupPanel(fieldName), (0, web_1.isVisible)()), web_1.Switch.to(this.lookupPopupPanel(fieldName)).and(web_1.Enter.theValue(itemName).into(web_1.PageElement.located(web_1.By.id('ctl00_body_txtSearchValue'))
                .describedAs('text input field: ' + fieldName)), ClickButton_1.clickButton.using(DefaultStaticParams_1.SEARCH), 
            // 等待3s加载时间，以确保列表为刷新后的数据
            core_1.Wait.for(core_1.Duration.ofSeconds(3)), assertions_1.Ensure.eventually(web_1.PageElements.located(web_1.By.cssContainingText('span', itemName)), (0, assertions_1.isPresent)()), 
            // 点击多选框的全选   
            web_1.Click.on(web_1.PageElements.located(web_1.By.css(`[type="checkbox"]`)).first()), ClickButton_1.clickButton.using(DefaultStaticParams_1.OK)));
        };
        /**
         * 选择relationship attribute的下拉框选项（不会清除原输入框的已选择的内容）
         * @param fieldName
         * @param itemName
         * @returns
         */
        this.selectrelationshipAttributeLookupDropdownItem = (fieldName, itemName) => {
            return core_1.Task.where(`#actor searchs single item : ${itemName} in ${fieldName} lookup popup`, web_1.Click.on(this.ralationshipAttributeLookupInputField(fieldName)), core_1.Wait.for(core_1.Duration.ofSeconds(2)), assertions_1.Ensure.eventually(this.ralationshipAttributeLookupDropdownItem(fieldName, itemName), (0, assertions_1.isPresent)()), 
            // 点击下拉框的值
            web_1.Click.on(this.ralationshipAttributeLookupDropdownItem(fieldName, itemName)));
        };
        /**
         * 检查Tree Lookup输入框的值(多选/树形 示例字段：NAICS)
         * @param fieldName 字段名
         * @param itemName 字段的期望值, 多个值逗号隔开，注意选项之间的顺序
         * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
         * @returns
         */
        this.checkTreeLookupInputFieldMultiValue = (fieldName, itemName, expectedResult) => {
            const array = itemName.split(',');
            return expectedResult === DefaultStaticParams_1.SUCCEEDED ? core_1.Task.where(`#actor check lookup single value field: ${fieldName}'s value with ${itemName} ${expectedResult}`, core_1.Log.the(web_1.Text.ofAll(this.treeLookupInputFieldMultiValue(fieldName))), assertions_1.Ensure.eventually(this.treeLookupInputFieldMultiValue(fieldName).eachMappedTo(web_1.Text), (0, assertions_1.equals)(array))) : core_1.Task.where(`#actor check lookup single value field: ${fieldName}'s  value with ${itemName} ${expectedResult}`, core_1.Log.the(web_1.Text.ofAll(this.treeLookupInputFieldMultiValue(fieldName))), assertions_1.Ensure.eventually(this.treeLookupInputFieldMultiValue(fieldName).eachMappedTo(web_1.Text), (0, assertions_1.not)((0, assertions_1.equals)(array))));
        };
        /**
         * 检查relationship attribute Lookup输入框的值
         * @param fieldName 字段名
         * @param itemName 字段的期望值, 多个选项逗号隔开。注意选项的顺序
         * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
         * @returns
         */
        this.checkRelationshipAttributeLookupInputFieldMultiValue = (fieldName, itemName, expectedResult) => {
            const array = itemName.split(',');
            return expectedResult === DefaultStaticParams_1.SUCCEEDED ? core_1.Task.where(`#actor check lookup multi value field: ${fieldName}'s value with ${itemName} ${expectedResult}`, core_1.Log.the(web_1.Text.ofAll(this.relationshipAttributeLookupInputFieldMultiValue(fieldName))), assertions_1.Ensure.eventually(web_1.Text.ofAll(this.relationshipAttributeLookupInputFieldMultiValue(fieldName)), (0, assertions_1.equals)(array))) : core_1.Task.where(`#actor check lookup multi value field: ${fieldName}'s  value with ${itemName} ${expectedResult}`, core_1.Log.the(web_1.Text.ofAll(this.relationshipAttributeLookupInputFieldMultiValue(fieldName))), assertions_1.Ensure.eventually(this.relationshipAttributeLookupInputFieldMultiValue(fieldName).eachMappedTo(web_1.Text), (0, assertions_1.not)((0, assertions_1.equals)(array))));
        };
        /**
         * 给Auto id的field填值
         * @param fieldName 字段名
         * @param itemName 要填的值
         * @returns
         */
        this.fillAutoIdInputField = (fieldName, itemName) => {
            return core_1.Task.where(`#actor fill text input field ${fieldName} with ${itemName}`, web_1.Click.on(this.autoIdInputField(fieldName)), web_1.Clear.theValueOf(this.autoIdInputField(fieldName)), web_1.Enter.theValue(itemName).into(this.autoIdInputField(fieldName)));
        };
        /**
         * 检查Readonly Auto id输入框的值(AutoNumber,Such As:Bidder ID)
         * @param fieldName 字段名
         * @param itemName 字段的期望值
         * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
         * @returns
         */
        this.checkAutoIdInputFieldValue = (fieldName, itemName, expectedResult) => {
            return expectedResult === DefaultStaticParams_1.SUCCEEDED ? core_1.Task.where(`#actor check text field: ${fieldName} 's value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Text.of(this.readOnlyLabelField(fieldName)), (0, assertions_1.equals)(itemName))) : core_1.Task.where(`#actor check text field: ${fieldName}'s value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Text.of(this.readOnlyLabelField(fieldName)), (0, assertions_1.equals)(itemName)));
        };
        /**
         * 检查可编辑的Auto id输入框的值(AutoNumber,Such As:Bidder ID)
         * @param fieldName 字段名
         * @param itemName 字段的期望值
         * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
         * @returns
         */
        this.checkEditAutoIdInputFieldValue = (fieldName, itemName, expectedResult) => {
            return expectedResult === DefaultStaticParams_1.SUCCEEDED ? core_1.Task.where(`#actor check text field: ${fieldName} 's value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Text.of(this.autoIdInputField(fieldName)), (0, assertions_1.equals)(itemName))) : core_1.Task.where(`#actor check text field: ${fieldName}'s value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Text.of(this.autoIdInputField(fieldName)), (0, assertions_1.equals)(itemName)));
        };
        /**
         * 给amount类型的field填值
         * @param fieldName 字段名
         * @param itemName 要填的值
         * @returns
         */
        this.fillAmountInputField = (fieldName, itemName) => {
            return core_1.Task.where(`#actor fill text input field ${fieldName} with ${itemName}`, web_1.Click.on(this.amountInputField(fieldName)), web_1.Clear.theValueOf(this.amountInputField(fieldName)), web_1.Enter.theValue(itemName).into(this.amountInputField(fieldName)));
        };
        /**
         * 检查amount类型的field的值
         * @param fieldName 字段名
         * @param itemName 预期值
         * @param expectedResult
         * @returns
         */
        this.checkAmountInputFieldValue = (fieldName, itemName, expectedResult) => {
            return expectedResult === DefaultStaticParams_1.SUCCEEDED ? core_1.Task.where(`#actor check amount field: ${fieldName} 's value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Attribute.called('initialvalue').of(this.amountInputField(fieldName)), (0, assertions_1.equals)(itemName))) : core_1.Task.where(`#actor check amount field: ${fieldName}'s value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Attribute.called('initialvalue').of(this.amountInputField(fieldName)), (0, assertions_1.not)((0, assertions_1.equals)(itemName))));
        };
        /**
         * 检查只读字段的链接文字内容
         * @param fieldName 字段名
         * @param itemName 预期值
         * @param expectedResult SUCCEEDED 与预期一致， FAILED 与预期不一致
         * @returns
         */
        this.checkReadOnlyFieldLinkValue = (fieldName, itemName, expectedResult) => {
            return expectedResult === DefaultStaticParams_1.SUCCEEDED ? core_1.Task.where(`#actor check read only link field: ${fieldName} 's value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Text.of(this.readOnlyFieldLink(fieldName)), (0, assertions_1.equals)(itemName))) : core_1.Task.where(`#actor check read only link field: ${fieldName}'s value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Text.of(this.readOnlyFieldLink(fieldName)), (0, assertions_1.not)((0, assertions_1.equals)(itemName))));
        };
        /**************************************************** html 元素组件************************************************* */
        /**
         * 普通文字输入框
         * @param fieldName 字段名称
         * @returns
         */
        this.textInputField = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_txtText'))
            .describedAs('text input input field: ' + fieldName);
        /**
         * 下拉框类型的输入框
         * @param fieldName 字段名称
         * @returns
         */
        this.dropdownField = (fieldName) => {
            const mappedFieldName = this.entityMap.get(fieldName);
            return web_1.PageElement.located(web_1.By.css(`[aria-owns="ctl00_body_${mappedFieldName}_ddlPicklist_listbox"]`))
                .describedAs('dropdown field: ' + fieldName);
        };
        /**
         * 下拉框面板
         * @param fieldName 字段名称
         * @returns
         */
        this.dropdownListBox = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_ddlPicklist-list'))
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
            return web_1.PageElement.located(web_1.By.css(`[aria-describedby="ctl00_body_${mappedFieldName}_select_taglist"]`))
                .describedAs('lookup input field: ' + fieldName);
        };
        /**
         * lookup输入框的下拉框面板
         * @param fieldName 字段名称
         * @returns
         */
        this.lookupDropdownListBox = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_select-list'))
            .describedAs('lookup dropdown list box: ' + fieldName);
        /**
         * lookup输入框的下拉框列表
         * @param fieldName 字段名称
         * @returns
         */
        this.lookupDropdownList = (fieldName) => web_1.PageElements.located(web_1.By.css('li'))
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
         * lookup输入框的值的ul元素
         * @param fieldName 字段名称
         * @returns
         */
        this.lookupInputFieldUl = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_select_taglist'))
            .describedAs('lookup field ul: ' + fieldName);
        /**
         * lookup输入框的值(单选)
         * @param fieldName 字段名称
         * @returns
         */
        this.lookupInputFieldSingleValue = (fieldName) => web_1.PageElement.located(web_1.By.css(`[data-temp-type="singleTag"]`))
            .of(this.lookupInputFieldUl(fieldName))
            .describedAs('lookup field single value: ' + fieldName);
        /**
         * lookup输入框的值(多选)
         * @param fieldName 字段名称
         * @returns
         */
        this.lookupInputFieldMultiValue = (fieldName) => web_1.PageElements.located(web_1.By.css(`[data-temp-type="mtpListTag"]`))
            .of(this.lookupInputFieldUl(fieldName))
            .describedAs('lookup field multi value: ' + fieldName);
        /**
         * lookup 图标
         * @param fieldName 字段名称
         * @returns
         */
        this.lookupIcon = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_imgPopup'))
            .describedAs('lookup icon: ' + fieldName);
        /**
         * 点击lookup图标后出现的弹窗
         * @param fieldName 字段名称
         * @returns
         */
        this.lookupPopupPanel = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_ifmPopup'))
            .describedAs('lookup popup panel : ' + fieldName);
        /**
         * 日期输入框
         * @param fieldName 字段名称
         * @returns
         */
        this.dateInputField = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_layDateTime'))
            .describedAs('date input field: ' + fieldName);
        /**
         *
         * @param fieldName 字段名称
         * @returns
         */
        this.dateCalendarIcon = (fieldName) => {
            const mappedFieldName = this.entityMap.get(fieldName);
            return web_1.PageElement.located(web_1.By.css(`[aria-controls="ctl00_body_${mappedFieldName}_layDateTime_dateview"]`))
                .describedAs('date calendar icon: ' + fieldName);
        };
        /**
         * 数字输入框
         * @param fieldName 字段名称
         * @returns
         */
        this.numberInputField = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_txtDecimal'))
            .describedAs('number input field: ' + fieldName);
        /**
         * 只读数字输入框
         * @param fieldName 字段名称
         * @returns
         */
        this.readOnlyNumberInputField = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_lit'))
            .describedAs('read only number input field: ' + fieldName);
        /**
         * 只读AutoId字段输入框
         * @param fieldName 字段名称
         * @returns
         */
        this.autoIdInputField = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_txtAutoNumber'))
            .describedAs('read only Autoid: ' + fieldName);
        /**
         * 只读字段
         * @param fieldName 字段名称
         * @returns
         */
        this.readOnlyLabelField = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_lbl'))
            .describedAs('read only lebel:' + fieldName);
        /**
         * 只读lookup字段
         * @param fieldName 字段名称(一般为lookup类型的字段)
         * @returns
         */
        this.readOnlyLookupFieldBox = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_readBox'))
            .describedAs('read only lookup field box:' + fieldName);
        /**
        * 只读lookup字段的值
        * @param fieldName 字段名称(一般为lookup类型的字段)
        * @returns
        */
        this.readOnlyLookupFieldValue = (fieldName) => web_1.PageElement.located(web_1.By.css('a'))
            .of(this.readOnlyLookupFieldBox(fieldName))
            .describedAs('read only lookup field box value:' + fieldName);
        /**
         * 单选框
         * @param fieldName 字段名称
         * @returns
         */
        this.radioButtonUl = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_rblBoolean'))
            .describedAs('radio button:' + fieldName);
        /**
         * 单选框组合
         * @param fieldName 字段名称
         * @returns
         */
        this.radioButtonGroupUl = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_rblBoolean'))
            .describedAs('radio button group:' + fieldName);
        /**
         * radio的选项
         * @param fieldName 字段名称
         * @param itemNumber 第几个选项 第一个为0
         * @returns
         */
        this.radioButtonLebel = (fieldName, itemNth) => {
            const mappedFielfName = this.entityMap.get(fieldName);
            return web_1.PageElement.located(web_1.By.css(`[for="ctl00_body_${mappedFielfName}_rblBoolean_${itemNth}"]`))
                .of(this.radioButtonGroupUl(fieldName))
                .describedAs('radio button:' + fieldName);
        };
        /**
         * radio的input标签
         * @param fieldName 字段名称
         * @param itemNumber 第几个选项 第一个为0
         * @returns
         */
        this.radioButtonInput = (fieldName, itemNth) => {
            const mappedFielfName = this.entityMap.get(fieldName);
            return web_1.PageElement.located(web_1.By.id(`ctl00_body_${mappedFielfName}_rblBoolean_${itemNth}`))
                .of(this.radioButtonGroupUl(fieldName))
                .describedAs('radio input:' + fieldName);
        };
        /**
         * 时间（钟点）图标
         * @param fieldName
         * @returns
         */
        this.clockIcon = (fieldName) => {
            const mappedFielfName = this.entityMap.get(fieldName);
            return web_1.PageElement.located(web_1.By.css(`[aria-controls="ctl00_body_${mappedFielfName}_layDateTime_timeview"]`))
                .describedAs(fieldName + 'clock icon');
        };
        /**
         * 时间列表面板
         * @param fieldName 字段名
         * @returns
         */
        this.clockListBox = (fieldName) => {
            return web_1.PageElement.located(web_1.By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_layDateTime_timeview'))
                .describedAs(fieldName + 'clock list box');
        };
        /**
         * 时间列表
         * @param fieldName 字段名
         * @returns
         */
        this.clockList = (fieldName) => {
            return web_1.PageElements.located(web_1.By.css('li'))
                .of(this.clockListBox(fieldName))
                .describedAs(fieldName + 'clock list');
        };
        /**
         * 具体时间
         * @param fieldName 字段名
         * @param itemName 时间值 eg:01:00 AM
         * @returns
         */
        this.clockItem = (fieldName, itemName) => {
            return web_1.PageElement.located(web_1.By.cssContainingText('li', itemName))
                .of(this.clockListBox(fieldName))
                .describedAs(fieldName + 'clock item:' + itemName);
        };
        /**
         * lookup/Tree输入框的值(多选/树形)
         * @param fieldName 字段名称
         * @returns
         */
        this.treeLookupInputFieldMultiValue = (fieldName) => web_1.PageElements.located(web_1.By.css(`[data-temp-type="mtpListTreeTag"]`))
            .of(this.treeLookupInputFieldUl(fieldName))
            .describedAs('lookup field multi value: ' + fieldName);
        /**
         * lookup/Tree输入框的值的ul元素
         * @param fieldName 字段名称
         * @returns
         */
        this.treeLookupInputFieldUl = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_taglist'))
            .describedAs('lookup field ul: ' + fieldName);
        /**
         * relationship Attribute lookup输入框的值(多选/树形)
         * @param fieldName 字段名称
         * @returns
         */
        this.relationshipAttributeLookupInputFieldMultiValue = (fieldName) => web_1.PageElements.located(web_1.By.css(`[data-temp-type="mtpListTag"]`))
            .of(this.relationshipAttributeLookupInputFieldUl(fieldName))
            .describedAs('lookup field multi value: ' + fieldName);
        /**
         * relationship Attribute lookup输入框的值的ul元素
         * @param fieldName 字段名称
         * @returns
         */
        this.relationshipAttributeLookupInputFieldUl = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_taglist'))
            .describedAs('lookup field ul: ' + fieldName);
        /**
         * 关联的Attribute的lookup 输入框（在entity的Attribute列表无法搜索到的字段）
         * @param fieldName
         * @returns
         */
        this.ralationshipAttributeLookupInputField = (fieldName) => {
            const mappedFieldName = this.entityMap.get(fieldName);
            return web_1.PageElement.located(web_1.By.css(`[aria-describedby="ctl00_body_${mappedFieldName}_taglist"]`))
                .describedAs('relationship attribute lookup input field: ' + fieldName);
        };
        /**
         * 关联的Attribute的lookup 下拉选项（在entity的Attribute列表无法搜索到的字段）
         * @param fieldName
         * @returns
         */
        this.ralationshipAttributeLookupDropdownItem = (fieldName, itemName) => web_1.PageElement.located(web_1.By.cssContainingText(`span`, itemName))
            .of(web_1.PageElement.located(web_1.By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_listbox')))
            .describedAs(`relationship attribute lookup dropdown item: ${itemName} of lookup field ${fieldName}`);
        /**
         * 关联的Attribute的lookup输入框清除图标（在entity的Attribute列表无法搜索到的字段）
         * @param fieldName
         * @returns
         */
        this.ralationshipAttributeLookupFieldClearIcon = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_imgRemove'))
            .describedAs(`relarionship attribute lookup field clear icon: ${fieldName}`);
        /**
         * 金额输入框
         * @param filedName
         * @returns
         */
        this.amountInputField = (filedName) => web_1.PageElement.located(web_1.By.id('ctl00_body_' + this.entityMap.get(filedName) + '_txtMoney'))
            .describedAs(filedName + ' amount input field');
        /**
         * 只读字段的链接文字
         * @param fieldName 字段名称
         * @returns
         */
        this.readOnlyFieldLink = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_hlText'))
            .describedAs(fieldName + ' read only field link');
        /**
         * 字段名称所属标签
         * @param fieldName 字段名称
         * @returns
         */
        this.attributeNameLabel = (fieldName) => web_1.PageElement.located(web_1.By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_FL'))
            .describedAs(`attribute name ${fieldName} lebal`);
        this.entityMap = entityMap;
    }
}
exports.EditFromFields = EditFromFields;
//# sourceMappingURL=EditFormFields.js.map