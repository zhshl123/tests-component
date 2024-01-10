"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditFromFields = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../../DefaultStaticParams");
const ClikButton_1 = require("../ClikButton");
const PopupWindow_1 = require("../PopupWindow");
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
            return core_1.Task.where(`#actor fill text input field ${fieldName} with ${itemName}`, web_1.Click.on(this.attributeInputField(fieldName)), web_1.Clear.theValueOf(this.attributeInputField(fieldName)), web_1.Enter.theValue(itemName).into(this.attributeInputField(fieldName)));
        };
        /**
         * 检查文本输入框的值
         * @param fieldName 字段名
         * @param itemName 字段的期望值
         * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
         * @returns
         */
        this.checkTextInputFieldValue = (fieldName, itemName, expectedResult) => {
            return expectedResult === DefaultStaticParams_1.SUCCEEDED ? core_1.Task.where(`#actor check text field: ${fieldName} 's value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Attribute.called('title').of(this.attributeInputField(fieldName)), (0, assertions_1.equals)(itemName))) : core_1.Task.where(`#actor check text field: ${fieldName}'s value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Attribute.called('title').of(this.attributeInputField(fieldName)), (0, assertions_1.not)((0, assertions_1.equals)(itemName))));
        };
        /**
         * 检查文本输入框的值
         * @param fieldName 字段名
         * @param itemName 字段的期望值
         * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
         * @returns
         */
        this.checkReadOnlyFieldValue = (fieldName, itemName, expectedResult) => {
            return expectedResult === DefaultStaticParams_1.SUCCEEDED ? core_1.Task.where(`#actor check read only field: ${fieldName} 's value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Attribute.called('title').of(this.readOnlyField(fieldName)), (0, assertions_1.equals)(itemName))) : core_1.Task.where(`#actor check text field: ${fieldName}'s value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Attribute.called('title').of(this.readOnlyField(fieldName)), (0, assertions_1.not)((0, assertions_1.equals)(itemName))));
        };
        /**
        * 检查数字输入框的值
        * @param fieldName 字段名
        * @param itemName 字段的期望值
        * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
        * @returns
        */
        this.checkNumberInputFieldValue = (fieldName, itemName, expectedResult) => {
            return expectedResult === DefaultStaticParams_1.SUCCEEDED ? core_1.Task.where(`#actor check number field: ${fieldName} 's value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Attribute.called('title').of(this.numberInputField(fieldName)), (0, assertions_1.equals)(itemName))) : core_1.Task.where(`#actor check number field: ${fieldName}'s value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Attribute.called('title').of(this.numberInputField(fieldName)), (0, assertions_1.not)((0, assertions_1.equals)(itemName))));
        };
        /**
        * 选择下拉框选项
        * @param fieldName
        * @param itemName
        * @returns
        */
        this.selectDropdownItem = (fieldName, itemName) => {
            return core_1.Task.where(`#actor selects dropdown item: ${itemName}`, web_1.Click.on(this.dropdownInputField(fieldName)), 
            // 确保下拉框有值之后再点击对应选项
            assertions_1.Ensure.eventually(this.dropdownList().first(), (0, assertions_1.isPresent)()), web_1.Click.on(this.dropdownItem(itemName)));
        };
        /**
         * 检查下拉框已选择的值
         * @param fieldName 字段名
         * @param itemName 字段的期望值
         * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
         * @returns
         */
        this.checkDropdownFieldValue = (fieldName, itemName, expectedResult) => {
            return expectedResult === DefaultStaticParams_1.SUCCEEDED ? core_1.Task.where(`#actor check dropdown field: ${fieldName}'s value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Attribute.called('title').of(this.dropdownSelectedItem(fieldName)), (0, assertions_1.equals)(itemName))) : core_1.Task.where(`#actor check dropdown field: ${fieldName}'s value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(web_1.Attribute.called('title').of(this.dropdownSelectedItem(fieldName)), (0, assertions_1.not)((0, assertions_1.equals)(itemName))));
        };
        /**
        * 在lookup弹窗中选择选项，勾选第一个勾选框（多选时为全选）
        * @param fieldName 字段名称
        * @param itemName 要选的值
        * @param nthWindow 第几个弹窗，按点击顺序，从最底层往上数， 第一个弹窗为0，以此类推
        * @param nthColumn 第几列， 第一列为0， 以此类推
        * @returns
        */
        this.selectItemInPopup = (fieldName, itemName, nthWindow, nthColumn) => {
            return core_1.Task.where(`#actor selects item in lookup popup: ${itemName}`, core_1.Check.whether(this.dropdownList().first(), (0, web_1.isVisible)()).andIfSo(core_1.Log.the('dropdown list already present')).otherwise(web_1.Click.on(this.dropdownIcon(fieldName)), 
            // 确保下拉框有值之后再点击对应选项
            assertions_1.Ensure.eventually(this.dropdownList().first(), (0, web_1.isVisible)())), web_1.Click.on(this.lookupIconInDropdownBox(fieldName)), this.checkPopupWindow(nthWindow), web_1.Switch.to((0, PopupWindow_1.targetPopupWindow)(nthWindow)).and(web_1.Enter.theValue(itemName).into(this.advancedSearchInputFieldInPopup(nthColumn, nthWindow)), core_1.Wait.for(core_1.Duration.ofSeconds(2)), web_1.Click.on(this.checkboxInGridInPopup(nthWindow)), ClikButton_1.clickButton.using('Select')));
        };
        /**
        * 选择下拉框选项
        * @param fieldName
        * @param itemName
        * @returns
        */
        this.fillDateInputField = (fieldName, itemName) => {
            return core_1.Task.where(`#actor selects dropdown item: ${itemName}`, web_1.Click.on(this.attributeInputField(fieldName)), 
            // 确保下拉框有值之后再点击对应选项
            web_1.Clear.theValueOf(this.attributeInputField(fieldName)), web_1.Enter.theValue(itemName).into(this.attributeInputField(fieldName)));
        };
        /**
        * 点击单选框按钮
        * @param fieldName
        * @param itemName
        * @returns
        */
        this.clickRadioButton = (fieldName, itemName) => {
            return core_1.Task.where(`#actor click radio button: ${itemName}`, core_1.Check.whether(this.selectedRadioButton(fieldName, itemName), (0, web_1.isVisible)()).andIfSo(core_1.Log.the(itemName + 'radio button already selected')).otherwise(web_1.Click.on(this.radioButton(fieldName, itemName))));
        };
        /**
         * 检查单选框是否已选中
         * @param fieldName 字段名
         * @param itemName 字段的期望值
         * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
         * @returns
         */
        this.checkSelectedRadioButton = (fieldName, itemName, expectedResult) => {
            return expectedResult === DefaultStaticParams_1.SUCCEEDED ? core_1.Task.where(`#actor check ${fieldName} radio button: ${itemName} is selected or not`, assertions_1.Ensure.eventually(this.selectedRadioButton(fieldName, itemName), (0, web_1.isVisible)())) : core_1.Task.where(`#actor check text field: ${fieldName}'s value with ${itemName} ${expectedResult}`, assertions_1.Ensure.eventually(this.selectedRadioButton(fieldName, itemName), (0, assertions_1.not)((0, web_1.isVisible)())));
        };
        /**
         * 检查弹窗是否存在
         * @param nthWindow  第几个弹窗，按点击顺序，从最底层往上数， 第一个弹窗为0，以此类推
         */
        this.checkPopupWindow = (nthWindow) => core_1.Task.where(`#actor check ${nthWindow} popup window`, assertions_1.Ensure.eventually((0, PopupWindow_1.targetPopupWindow)(nthWindow), (0, web_1.isVisible)()));
        /**
         * 清除下拉框输入框中的已选的值
         * @param fieldName 字段名称
         * @returns
         */
        this.clearDropdownSelectedItem = (fieldName) => core_1.Task.where(`#actor clear dropdown field ${fieldName} selected item`, web_1.Hover.over(this.dropdownInputField(fieldName)), web_1.Click.on(this.clearDropdownSelectedItemIcon(fieldName)));
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
         * check valid notes
         * @returns
         */
        this.checkValidNotes = () => core_1.Task.where(`#actor Check valid notes`, assertions_1.Ensure.eventually(this.validNotes().first(), (0, web_1.isVisible)()));
        /**************************************************** html 元素组件************************************************* */
        /**
         * 字段的输入框组合（包含字段名和输入框）
         * @param fieldName 字段名称
         * @returns
         */
        this.attributeFieldGroup = (fieldName) => {
            const mappedFieldName = this.entityMap.get(fieldName);
            return web_1.PageElement.located(web_1.By.css(`[cid="${mappedFieldName}"]`))
                .describedAs('attribute field: ' + fieldName);
        };
        /**
         * 字段的名称
         * @param fieldName 字段名称
         * @returns
         */
        this.attributeNameLabel = (fieldName) => {
            return web_1.PageElement.located(web_1.By.cssContainingText('span', fieldName))
                .of(this.attributeFieldGroup(fieldName))
                .describedAs('attribute name label: ' + fieldName);
        };
        /**
         * 文本输入框
         * @param fieldName 字段名称
         * @returns
         */
        this.attributeInputField = (fieldName) => web_1.PageElement.located(web_1.By.css('input'))
            .of(this.attributeFieldGroup(fieldName))
            .describedAs(`attribute ${fieldName} input filed`);
        /**
         * 下啦框图标
         * @param fieldName 字段名称
         * @returns
         */
        this.dropdownIcon = (fieldName) => web_1.PageElement.located(web_1.By.css(`nz-select-arrow`))
            .of(this.attributeFieldGroup(fieldName))
            .describedAs(`attribute ${fieldName} dropdown icon`);
        // 下拉框
        this.dropdownPanel = () => web_1.PageElement.located(web_1.By.css('nz-option-container'))
            .describedAs('dropdown panel');
        //下拉框列表
        this.dropdownList = () => web_1.PageElements.located(web_1.By.css('nz-option-item'))
            .of(this.dropdownPanel())
            .describedAs('dropdown list');
        /**
         * 下拉框已选择的值
         * @param fieldName 字段名称
         * @returns
         */
        this.dropdownSelectedItem = (fieldName) => web_1.PageElement.located(web_1.By.css('nz-select-item'))
            .of(this.attributeFieldGroup(fieldName))
            .describedAs('dropdown selected item');
        /**
         * 下拉框的输入框
         * @param fieldName
         * @returns
         */
        this.dropdownInputField = (fieldName) => web_1.PageElement.located(web_1.By.css('nz-select-top-control'))
            .of(this.attributeFieldGroup(fieldName))
            .describedAs('dropdown input field');
        /**
         * 清除下拉框所选项图标
         * @param fieldName 字段名称
         */
        this.clearDropdownSelectedItemIcon = (fieldName) => web_1.PageElement.located(web_1.By.css('.ant-select-clear'))
            .of(this.attributeFieldGroup(fieldName))
            .describedAs('clear dropdown selected item icon');
        /**
         * 下拉框选项
         * @param itemName 选项名称
         */
        this.dropdownItem = (itemName) => web_1.PageElements.located(web_1.By.cssContainingText('span', itemName))
            .first()
            .of(this.dropdownPanel())
            .describedAs('dorpdown list item: ' + itemName);
        // 空下拉框
        this.emptyDropdownPanel = () => web_1.PageElement.located(web_1.By.css('nz-embed-empty')).describedAs('empty dropdown');
        /**
         * 只读字段的输入框
         * @param fieldName 字段名称
         * @returns
         */
        this.readOnlyField = (fieldName) => web_1.PageElement.located(web_1.By.css('div.c-field__readbox'))
            .of(this.attributeFieldGroup(fieldName))
            .describedAs('read only field: ' + fieldName);
        /**
         * 下拉框中的Lookup图标, 字段映射时，字段名前加前缀：lookup_
         * 例：attributeMap.set('lookup_AttributeName', 'lookupiconbutton1')
         * @returns
         */
        this.lookupIconInDropdownBox = (fieldName) => {
            const mappedFieldName = this.entityMap.get('lookup_' + fieldName);
            return web_1.PageElement.located(web_1.By.css(`[cid="${mappedFieldName}"]`))
                .of(this.attributeFieldGroup(fieldName))
                .describedAs(`${fieldName} lookup icon in dorpdowm box`);
        };
        /**
         * 条件搜索的输入框
         * @param nthColumn 第几列 第一列为0，以此类推
         * @param nthWindow 第几个弹窗
         * @returns
         */
        this.advancedSearchInputFieldInPopup = (nthColumn, nthWindow) => web_1.PageElements.located(web_1.By.css('.dx-texteditor-input'))
            .nth(nthColumn)
            .of((0, PopupWindow_1.targetPopupWindow)(nthWindow))
            .describedAs(`${nthColumn} advenced search input field`);
        /**
         * 弹窗里的的勾选框
         * @returns
         */
        this.checkboxInGridInPopup = (nthWindow) => web_1.PageElements.located(web_1.By.css(`[type="checkbox"]`))
            .first()
            .of((0, PopupWindow_1.targetPopupWindow)(nthWindow))
            .describedAs('checkbox in grid list');
        /**
         * @returns 通用的Section 标题组件
         * @param sectionTitle section标题
         */
        this.targetSectionTitle = (sectionTitle) => web_1.PageElement.located(web_1.By.cssContainingText('.c-section__title', sectionTitle));
        /**
        * 字段底部的校验提示信息
        * @returns
        */
        this.validNotes = () => web_1.PageElements.located(web_1.By.css('.c-field__validnote'))
            .describedAs('valid note words');
        /**
         * 数字输入框
         * @param fieldName 字段名
         * @returns
         */
        this.numberInputField = (fieldName) => web_1.PageElement.located(web_1.By.css('nz-input-number'))
            .of(this.attributeFieldGroup(fieldName))
            .describedAs(`${fieldName} number input field`);
        /**
         * 单选框组合
         * @param fieldName 字段名称
         * @returns
         */
        this.radioGroup = (fieldName) => web_1.PageElement.located(web_1.By.css('nz-radio-group'))
            .of(this.attributeFieldGroup(fieldName))
            .describedAs(`${fieldName} radio group`);
        /**
         * 单选框按钮
         * @param fieldName 字段名称
         * @param buttonName 第几个选项 第一个为0， 以此类推
         * @returns
         */
        this.radioButton = (fieldName, buttonName) => web_1.PageElement.located(web_1.By.cssContainingText('.ant-radio-wrapper span', buttonName))
            .of(this.radioGroup(fieldName))
            .describedAs(`radio button ${buttonName}`);
        /**
         * 已选中的单选框按钮
         * @param fieldName 字段名称
         * @param buttonName 第几个选项 第一个为0， 以此类推
         * @returns
         */
        this.selectedRadioButton = (fieldName, buttonName) => web_1.PageElement.located(web_1.By.cssContainingText('.ant-radio-wrapper-checked span', buttonName))
            .of(this.radioGroup(fieldName))
            .describedAs(`radio button ${buttonName}`);
        this.entityMap = entityMap;
    }
}
exports.EditFromFields = EditFromFields;
//# sourceMappingURL=EditFormFields.js.map