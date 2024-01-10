import { Ensure, equals, isPresent, not } from '@serenity-js/assertions';
import { Check, Duration, Log, Question, Task, Wait } from '@serenity-js/core';
import { Attribute, By, Clear, Click, Cookie, Enter, Hover, isVisible, PageElement, PageElements, Switch } from '@serenity-js/web';

import { SUCCEEDED } from '../../../DefaultStaticParams';
import { clickButton } from '../ClikButton';
import { targetPopupWindow } from '../PopupWindow';

export class EditFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        this.entityMap = entityMap;
    }

    /*************************************** interactions ***************************************** */

    /**
     * 给text类型的field填值
     * @param fieldName 字段名
     * @param itemName 要填的值
     * @returns 
     */
    fillTextInputField = (fieldName: string, itemName: string | Question<any>) => {
        return Task.where(`#actor fill text input field ${fieldName} with ${itemName}`,
            Click.on(this.attributeInputField(fieldName)),
            Clear.theValueOf(this.attributeInputField(fieldName)),
            Enter.theValue(itemName).into(this.attributeInputField(fieldName))
        )
    }

    /**
     * 检查文本输入框的值
     * @param fieldName 字段名
     * @param itemName 字段的期望值
     * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
     * @returns 
     */
    checkTextInputFieldValue = (fieldName: string, itemName: string | Question<any>, expectedResult: string) => {
        return expectedResult === SUCCEEDED ? Task.where(`#actor check text field: ${fieldName} 's value with ${itemName} ${expectedResult}`,
            Ensure.eventually(Attribute.called('title').of(this.attributeInputField(fieldName)), equals(itemName))
        ) : Task.where(`#actor check text field: ${fieldName}'s value with ${itemName} ${expectedResult}`,
            Ensure.eventually(Attribute.called('title').of(this.attributeInputField(fieldName)), not(equals(itemName)))
        );
    }

    /**
     * 检查文本输入框的值
     * @param fieldName 字段名
     * @param itemName 字段的期望值
     * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
     * @returns 
     */
    checkReadOnlyFieldValue = (fieldName: string, itemName: string | Question<any>, expectedResult: string) => {
        return expectedResult === SUCCEEDED ? Task.where(`#actor check read only field: ${fieldName} 's value with ${itemName} ${expectedResult}`,
            Ensure.eventually(Attribute.called('title').of(this.readOnlyField(fieldName)), equals(itemName))
        ) : Task.where(`#actor check text field: ${fieldName}'s value with ${itemName} ${expectedResult}`,
            Ensure.eventually(Attribute.called('title').of(this.readOnlyField(fieldName)), not(equals(itemName)))
        );
    }

    /**
    * 检查数字输入框的值
    * @param fieldName 字段名
    * @param itemName 字段的期望值
    * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
    * @returns 
    */
    checkNumberInputFieldValue = (fieldName: string, itemName: string | Question<any>, expectedResult: string) => {
        return expectedResult === SUCCEEDED ? Task.where(`#actor check number field: ${fieldName} 's value with ${itemName} ${expectedResult}`,
            Ensure.eventually(Attribute.called('title').of(this.numberInputField(fieldName)), equals(itemName))
        ) : Task.where(`#actor check number field: ${fieldName}'s value with ${itemName} ${expectedResult}`,
            Ensure.eventually(Attribute.called('title').of(this.numberInputField(fieldName)), not(equals(itemName)))
        );
    }

    /**
    * 选择下拉框选项
    * @param fieldName 
    * @param itemName 
    * @returns 
    */
    selectDropdownItem = (fieldName: string, itemName: string | Question<any>) => {
        return Task.where(`#actor selects dropdown item: ${itemName}`,
            Click.on(this.dropdownInputField(fieldName)),
            // 确保下拉框有值之后再点击对应选项
            Ensure.eventually(this.dropdownList().first(), isPresent()),
            Click.on(this.dropdownItem(itemName)),

        )
    }

    /**
     * 检查下拉框已选择的值
     * @param fieldName 字段名
     * @param itemName 字段的期望值
     * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
     * @returns 
     */
    checkDropdownFieldValue = (fieldName: string, itemName: string | Question<any>, expectedResult: string) => {
        return expectedResult === SUCCEEDED ? Task.where(`#actor check dropdown field: ${fieldName}'s value with ${itemName} ${expectedResult}`,
            Ensure.eventually(Attribute.called('title').of(this.dropdownSelectedItem(fieldName)), equals(itemName))
        ) : Task.where(`#actor check dropdown field: ${fieldName}'s value with ${itemName} ${expectedResult}`,
            Ensure.eventually(Attribute.called('title').of(this.dropdownSelectedItem(fieldName)), not(equals(itemName)))
        );
    }

    /**
    * 在lookup弹窗中选择选项，勾选第一个勾选框（多选时为全选）
    * @param fieldName 字段名称
    * @param itemName 要选的值
    * @param nthWindow 第几个弹窗，按点击顺序，从最底层往上数， 第一个弹窗为0，以此类推
    * @param nthColumn 第几列， 第一列为0， 以此类推
    * @returns 
    */
    selectItemInPopup = (fieldName: string, itemName: string | Question<any>, nthWindow: number, nthColumn: number) => {
        return Task.where(`#actor selects item in lookup popup: ${itemName}`,
            Check.whether(
                this.dropdownList().first(), isVisible()
            ).andIfSo(
                Log.the('dropdown list already present')
            ).otherwise(
                Click.on(this.dropdownIcon(fieldName)),
                // 确保下拉框有值之后再点击对应选项
                Ensure.eventually(this.dropdownList().first(), isVisible()),
            ),
            Click.on(this.lookupIconInDropdownBox(fieldName)),
            this.checkPopupWindow(nthWindow),
            Switch.to(targetPopupWindow(nthWindow)).and(
                Enter.theValue(itemName).into(this.advancedSearchInputFieldInPopup(nthColumn, nthWindow)),
                Wait.for(Duration.ofSeconds(2)),
                Click.on(this.checkboxInGridInPopup(nthWindow)),
                clickButton.using('Select')

            )
        )
    }

    /**
    * 选择下拉框选项
    * @param fieldName 
    * @param itemName 
    * @returns 
    */
    fillDateInputField = (fieldName: string, itemName: string | Question<any>) => {
        return Task.where(`#actor selects dropdown item: ${itemName}`,
            Click.on(this.attributeInputField(fieldName)),
            // 确保下拉框有值之后再点击对应选项
            Clear.theValueOf(this.attributeInputField(fieldName)),
            Enter.theValue(itemName).into(this.attributeInputField(fieldName)),

        )
    }

    /**
    * 点击单选框按钮
    * @param fieldName 
    * @param itemName 
    * @returns 
    */
    clickRadioButton = (fieldName: string, itemName: string) => {
        return Task.where(`#actor click radio button: ${itemName}`,
            Check.whether(this.selectedRadioButton(fieldName, itemName), isVisible()
            ).andIfSo(
                Log.the(itemName + 'radio button already selected')
            ).otherwise(
                Click.on(this.radioButton(fieldName, itemName)),
            )
        )
    }

    /**
     * 检查单选框是否已选中
     * @param fieldName 字段名
     * @param itemName 字段的期望值
     * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
     * @returns 
     */
    checkSelectedRadioButton = (fieldName: string, itemName: string, expectedResult: string) => {
        return expectedResult === SUCCEEDED ? Task.where(`#actor check ${fieldName} radio button: ${itemName} is selected or not`,
            Ensure.eventually(this.selectedRadioButton(fieldName, itemName), isVisible())
        ) : Task.where(`#actor check text field: ${fieldName}'s value with ${itemName} ${expectedResult}`,
            Ensure.eventually(this.selectedRadioButton(fieldName, itemName), not(isVisible()))
        );
    }

    /**
     * 检查弹窗是否存在
     * @param nthWindow  第几个弹窗，按点击顺序，从最底层往上数， 第一个弹窗为0，以此类推
     */
    checkPopupWindow = (nthWindow: number) =>
        Task.where(`#actor check ${nthWindow} popup window`,
            Ensure.eventually(targetPopupWindow(nthWindow), isVisible()
            )
        )

    /**
     * 清除下拉框输入框中的已选的值
     * @param fieldName 字段名称
     * @returns 
     */
    clearDropdownSelectedItem = (fieldName: string) =>
        Task.where(`#actor clear dropdown field ${fieldName} selected item`,
            Hover.over(this.dropdownInputField(fieldName)),
            Click.on(this.clearDropdownSelectedItemIcon(fieldName)),

        )


    /**
     * 设置cookie
     * @param cookieName cookie的字段名称
     * @param cookieValue cookie的值
     * @returns 
     */
    setCookie = (cookieName: string, cookieValue) =>
        Task.where(`#actor sets cookie: name = ${cookieName} , value = ${cookieValue} `,
            Cookie.called(cookieName).isPresent() ? this.deleteOldCookieAndSetNewCookie(cookieName, cookieValue) : this.setNewCookie(cookieName, cookieValue),
            Ensure.eventually(Cookie.called(cookieName).value(), equals(cookieValue))
        )

    deleteOldCookieAndSetNewCookie = (cookieName: string, cookieValue) =>
        Task.where(`#actor deletes old cookie and sets new  cookie: name = ${cookieName} , value = ${cookieValue} `,
            Cookie.called(cookieName).delete(),
            // 设置cookie 用于后续查找
            Cookie.set({
                name: cookieName,
                value: cookieValue,
            }),

        )

    setNewCookie = (cookieName: string, cookieValue) =>
        Task.where(`#actor sets new  cookie: name = ${cookieName} , value = ${cookieValue} `,
            // 设置cookie 用于后续查找
            Cookie.set({
                name: cookieName,
                value: cookieValue,
            }),

        )


    /**
     * check valid notes
     * @returns 
     */
    checkValidNotes = () =>
        Task.where(`#actor Check valid notes`,
            Ensure.eventually(this.validNotes().first(), isVisible())
        )

    /**************************************************** html 元素组件************************************************* */

    /**
     * 字段的输入框组合（包含字段名和输入框）
     * @param fieldName 字段名称
     * @returns 
     */
    attributeFieldGroup = (fieldName: string) => {
        const mappedFieldName = this.entityMap.get(fieldName)
        return PageElement.located(By.css(`[cid="${mappedFieldName}"]`))
            .describedAs('attribute field: ' + fieldName)
    }

    /**
     * 字段的名称
     * @param fieldName 字段名称
     * @returns 
     */
    attributeNameLabel = (fieldName: string) => {
        return PageElement.located(By.cssContainingText('span', fieldName))
            .of(this.attributeFieldGroup(fieldName))
            .describedAs('attribute name label: ' + fieldName)
    }

    /**
     * 文本输入框
     * @param fieldName 字段名称
     * @returns 
     */
    attributeInputField = (fieldName: string) =>
        PageElement.located(By.css('input'))
            .of(this.attributeFieldGroup(fieldName))
            .describedAs(`attribute ${fieldName} input filed`)

    /**
     * 下啦框图标
     * @param fieldName 字段名称
     * @returns 
     */
    dropdownIcon = (fieldName: string) =>
        PageElement.located(By.css(`nz-select-arrow`))
            .of(this.attributeFieldGroup(fieldName))
            .describedAs(`attribute ${fieldName} dropdown icon`)

    // 下拉框
    dropdownPanel = () =>
        PageElement.located(By.css('nz-option-container'))
            .describedAs('dropdown panel')

    //下拉框列表
    dropdownList = () =>
        PageElements.located(By.css('nz-option-item'))
            .of(this.dropdownPanel())
            .describedAs('dropdown list')

    /**
     * 下拉框已选择的值
     * @param fieldName 字段名称
     * @returns 
     */
    dropdownSelectedItem = (fieldName: string) =>
        PageElement.located(By.css('nz-select-item'))
            .of(this.attributeFieldGroup(fieldName))
            .describedAs('dropdown selected item')

    /**
     * 下拉框的输入框
     * @param fieldName 
     * @returns 
     */
    dropdownInputField = (fieldName: string) =>
        PageElement.located(By.css('nz-select-top-control'))
            .of(this.attributeFieldGroup(fieldName))
            .describedAs('dropdown input field')

    /**
     * 清除下拉框所选项图标
     * @param fieldName 字段名称
     */
    clearDropdownSelectedItemIcon = (fieldName: string) =>
        PageElement.located(By.css('.ant-select-clear'))
            .of(this.attributeFieldGroup(fieldName))
            .describedAs('clear dropdown selected item icon')


    /**
     * 下拉框选项
     * @param itemName 选项名称
     */
    dropdownItem = (itemName: string | Question<any>) =>
        PageElements.located(By.cssContainingText('span', itemName))
            .first()
            .of(this.dropdownPanel())
            .describedAs('dorpdown list item: ' + itemName)

    // 空下拉框
    emptyDropdownPanel = () =>
        PageElement.located(By.css('nz-embed-empty')).describedAs('empty dropdown')

    /**
     * 只读字段的输入框
     * @param fieldName 字段名称
     * @returns 
     */
    readOnlyField = (fieldName: string) =>
        PageElement.located(By.css('div.c-field__readbox'))
            .of(this.attributeFieldGroup(fieldName))
            .describedAs('read only field: ' + fieldName)

    /**
     * 下拉框中的Lookup图标, 字段映射时，字段名前加前缀：lookup_ 
     * 例：attributeMap.set('lookup_AttributeName', 'lookupiconbutton1')
     * @returns 
     */
    lookupIconInDropdownBox = (fieldName: string) => {
        const mappedFieldName = this.entityMap.get('lookup_' + fieldName)
        return PageElement.located(By.css(`[cid="${mappedFieldName}"]`))
            .of(this.attributeFieldGroup(fieldName))
            .describedAs(`${fieldName} lookup icon in dorpdowm box`)
    }

    /**
     * 条件搜索的输入框
     * @param nthColumn 第几列 第一列为0，以此类推
     * @param nthWindow 第几个弹窗
     * @returns 
     */
    advancedSearchInputFieldInPopup = (nthColumn: number, nthWindow: number) =>
        PageElements.located(By.css('.dx-texteditor-input'))
            .nth(nthColumn)
            .of(targetPopupWindow(nthWindow))
            .describedAs(`${nthColumn} advenced search input field`)

    /**
     * 弹窗里的的勾选框
     * @returns 
     */
    checkboxInGridInPopup = (nthWindow: number) =>
        PageElements.located(By.css(`[type="checkbox"]`))
            .first()
            .of(targetPopupWindow(nthWindow))
            .describedAs('checkbox in grid list')


    /**
     * @returns 通用的Section 标题组件
     * @param sectionTitle section标题
     */
    targetSectionTitle = (sectionTitle: string) =>
        PageElement.located(By.cssContainingText('.c-section__title', sectionTitle))

    /**
    * 字段底部的校验提示信息
    * @returns 
    */
    validNotes = () =>
        PageElements.located(By.css('.c-field__validnote'))
            .describedAs('valid note words')

    /**
     * 数字输入框
     * @param fieldName 字段名
     * @returns 
     */
    numberInputField = (fieldName: string) =>
        PageElement.located(By.css('nz-input-number'))
            .of(this.attributeFieldGroup(fieldName))
            .describedAs(`${fieldName} number input field`)

    /**
     * 单选框组合
     * @param fieldName 字段名称
     * @returns 
     */
    radioGroup = (fieldName: string) =>
        PageElement.located(By.css('nz-radio-group'))
            .of(this.attributeFieldGroup(fieldName))
            .describedAs(`${fieldName} radio group`)

    /**
     * 单选框按钮
     * @param fieldName 字段名称
     * @param buttonName 第几个选项 第一个为0， 以此类推
     * @returns 
     */
    radioButton = (fieldName: string, buttonName: string) =>
        PageElement.located(By.cssContainingText('.ant-radio-wrapper span', buttonName))

            .of(this.radioGroup(fieldName))
            .describedAs(`radio button ${buttonName}`)


    /**
     * 已选中的单选框按钮
     * @param fieldName 字段名称
     * @param buttonName 第几个选项 第一个为0， 以此类推
     * @returns 
     */
    selectedRadioButton = (fieldName: string, buttonName: string) =>
        PageElement.located(By.cssContainingText('.ant-radio-wrapper-checked span', buttonName))
            .of(this.radioGroup(fieldName))
            .describedAs(`radio button ${buttonName}`)
}