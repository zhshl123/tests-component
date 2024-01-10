import { Ensure, equals, isPresent, not } from '@serenity-js/assertions';
import { Check, Duration, Log, Question, Task, Wait } from '@serenity-js/core';
import { Attribute, By, Clear, Click, Cookie, Enter, isVisible, PageElement, PageElements, Switch, Text } from '@serenity-js/web'

import { OK, SEARCH, SUCCEEDED } from '../../../DefaultStaticParams';
import { clickCalendarDate, clickCalendarToday, fillSpecialDate } from '../CalendarPopup';
import { clickButton } from '../ClickButton';
import { clickAllMultiCheckBox, clickFirstSingleCheckBox, multiCheckBoxInGrid, singleCheckBoxInGrid } from '../ClickCheckBox';
import { checkGridList } from '../GridList';
import { SearchFromFields } from './SearchFormFields';

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
            Click.on(this.textInputField(fieldName)),
            Clear.theValueOf(this.textInputField(fieldName)),
            Enter.theValue(itemName).into(this.textInputField(fieldName))
        )
    }
    /**
     * 给number类型的field填值
     * @param fieldName 字段名
     * @param itemName 要填的值
     * @returns 
     */
    fillNumberInputField = (fieldName: string, itemName: string | Question<any>) => {
        return Task.where(`#actor fill number input field ${fieldName} with ${itemName}`,
            Click.on(this.numberInputField(fieldName)),
            Clear.theValueOf(this.numberInputField(fieldName)),
            Enter.theValue(itemName).into(this.numberInputField(fieldName))
        )
    }
    /**
    * 选择下拉框选项
    * @param fieldName 
    * @param itemName 
    * @returns 
    */
    selectDropdownItem = (fieldName: string, itemName: string | Question<any>) => {
        return Task.where(`#actor selects dropdown item: ${itemName}`,
            Click.on(this.dropdownField(fieldName)),
            // 确保下拉框有值之后再点击对应选项
            Ensure.eventually(this.dropdownList(fieldName).first(), isPresent()),
            Click.on(this.dropdownItem(fieldName, itemName)),
        )
    }

    /**
    * 下拉框输入框填值（所填的值必须与选项一致）
    * @param fieldName 
    * @param itemName 
    * @returns 
    */
    fillDropdownInputField = (fieldName: string, itemName: string | Question<any>) => {
        return Task.where(`#actor selects dropdown item: ${itemName}`,

            Click.on(this.dropdownField(fieldName)),
            Clear.theValueOf(this.dropdownField(fieldName)),
            Enter.theValue(itemName).into(this.dropdownField(fieldName)),
            Click.on(this.attributeNameLabel(fieldName))

        )
    }

    /**
    * 在lookup Popup弹窗中搜索并选择目标选项（当为多选时，全选，当为单选时，默认第一个选项.不会清除原输入框中已选择的内容）
    * @param fieldName 字段名称
    * @param itemName 要搜索的关键词，多个选项逗号隔开。使用时，使用split(',')，组装成array，然后foreach遍历
    * @param popupFieldName 在弹窗中填入关键词的字段名
    * @returns 
    */
    selectItemInlookupPopup = (fieldName: string, itemName: string | Question<any>, popupFieldName: string) => {
        const searchForm = new SearchFromFields(this.entityMap)
        return Task.where(`#actor searchs single item : ${itemName} in ${fieldName} lookup popup`,
            // 先检查输入框中是否已有值
            this.checkLooukupInputfieldIsEmpty(fieldName),

            Click.on(this.lookupIcon(fieldName)),
            // 确保弹窗有显示再进行下一步搜索操作
            Ensure.eventually(this.lookupPopupPanel(fieldName), isVisible()),
            Switch.to(this.lookupPopupPanel(fieldName)).and(
                Enter.theValue(itemName).into(searchForm.textInputField(popupFieldName)),
                clickButton.using(SEARCH),
                // 等待3s加载时间，以确保列表为刷新后的数据
                Wait.for(Duration.ofSeconds(3)),
                searchForm.checkSearchResult(itemName, SUCCEEDED),
                Check.whether(
                    // 判断是单选框还是多选框
                    singleCheckBoxInGrid(), isPresent()
                ).andIfSo(
                    // 点击单选框的第一个选项
                    clickFirstSingleCheckBox(),
                ).otherwise(
                    // 点击多选框的全选
                    clickAllMultiCheckBox(),
                ),
                clickButton.using(OK)
            ),
        )
    }

    /**
     * 选择下拉框第一条数据
     * @param fieldName 
     * @returns 
     */
    selectFirstItemInLookup = (fieldName: string) =>
        Task.where(`#actor first item in lookup dropdown list`,
            this.checkLooukupInputfieldIsEmpty(fieldName),
            Click.on(this.lookupIcon(fieldName)),
            // 确保弹窗有显示再进行下一步搜索操作
            Ensure.eventually(this.lookupPopupPanel(fieldName), isVisible()),
            Switch.to(this.lookupPopupPanel(fieldName)).and(
                checkGridList(),
                // 点击选项
                clickFirstSingleCheckBox(),
                clickButton.using(OK)
            ),
        )
    /**
     * 选择lookup下拉框中的具体选项
     * @param fieldName 字段名称
     * @param itemName 选项的值
     * @returns
     */
    selectLookupDropdownItem = (fieldName: string, itemName: string) => {
        return Task.where(`#actor selects dropdown item '${itemName}' in lookup field '${fieldName}'`,
            // 点击输入框
            Click.on(this.lookupInputField(fieldName)),
            // 确保下拉框有值之后再点击lookup图标
            Ensure.eventually(this.lookupDropdownList(fieldName).first(), isPresent()),
            // 点击下拉框的值
            Click.on(this.lookupDropdownItem(fieldName, itemName)),
            Wait.for(Duration.ofSeconds(5)),
        );
    }

    /**
     * 检查lookup输入框的值
     * @param fieldName 
     * @returns 
     */
    checkLooukupInputfieldIsEmpty = (fieldName: string) =>
        Task.where(`#actor lookup input field ${fieldName} is empty`,

            // 有值的情况
            Check.whether(this.lookupInputFieldSingleValue(fieldName), not(isPresent())
            ).andIfSo(
                Check.whether(
                    this.lookupInputFieldMultiValue(fieldName), not(isPresent())
                ).andIfSo(
                    // 空值情况下，点击查看下拉框
                    Click.on(this.lookupInputField(fieldName)),
                    // 确保下拉框有值之后再点击lookup图标
                    Ensure.eventually(this.lookupDropdownList(fieldName).first(), isVisible()),
                )

            )

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
     * 选择当前日期
     * @param fieldName 字段名称
     * @param calendarOrderNo 从上往下数第几个日历
     * @returns 
     */
    selectDateToday = (fieldName: string, calendarOrderNo: number) =>
        Task.where(`#actor select date today of ${fieldName} `,
            Click.on(this.dateInputField(fieldName)),
            Wait.for(Duration.ofSeconds(1)),
            Click.on(this.dateCalendarIcon(fieldName)),
            clickCalendarToday(calendarOrderNo),
        )

    /**
     * 选择指定日期
     * @param fieldName 字段名称
     * @param date 要填入的时间 格式：yyyy/mm/dd eg:2023/07/01 
     * @param calendarOrderNo 从上往下数第几个日历 第一个为0，以此类推
     * @returns 
     */
    selectSpecialDate = (fieldName: string, date: string | Question<any>, calendarOrderNo: number) => {
        return Task.where(`#actor select date of ${fieldName}, date = ${date} `,
            Click.on(this.dateInputField(fieldName)),
            Click.on(this.dateCalendarIcon(fieldName)),
            Wait.for(Duration.ofSeconds(2)),
            clickCalendarDate(calendarOrderNo, String(date)),
        );
    }

    /**
     * 填入指定日期
     * @param fieldName 字段名称
     * @param date 要填入的时间 格式：mm/dd/yyyy eg:07/01/2023 
     * @returns 
     */
    fillDateInputField = (fieldName: string, date: string | Question<any>) => {
        return Task.where(`#actor fill date of ${fieldName}, date = ${date} `,
            Clear.theValueOf(this.dateInputField(fieldName)),
            Click.on(this.dateInputField(fieldName)),
            fillSpecialDate(String(date)),
        );
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
            Ensure.eventually(Attribute.called('initialvalue').of(this.textInputField(fieldName)), equals(itemName))
        ) : Task.where(`#actor check text field: ${fieldName}'s value with ${itemName} ${expectedResult}`,
            Ensure.eventually(Attribute.called('initialvalue').of(this.textInputField(fieldName)), not(equals(itemName)))
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
        return expectedResult === SUCCEEDED ? Task.where(`#actor check number field: ${fieldName}'s value with ${itemName} ${expectedResult}`,
            Ensure.eventually(Attribute.called('initialvalue').of(this.numberInputField(fieldName)), equals(itemName))
        ) : Task.where(`#actor check number field: ${fieldName}'s value with ${itemName} ${expectedResult}`,
            Ensure.eventually(Attribute.called('initialvalue').of(this.numberInputField(fieldName)), not(equals(itemName)))
        );
    }

    /**
     * 检查下拉框输入框的值
     * @param fieldName 字段名
     * @param itemName 字段的期望值
     * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
     * @returns 
     */
    checkDropdownInputFieldValue = (fieldName: string, itemName: string | Question<any>, expectedResult: string) => {
        return expectedResult === SUCCEEDED ? Task.where(`#actor check dropdown field: ${fieldName}'s value with ${itemName} ${expectedResult}`,
            Ensure.eventually(Attribute.called('initialvalue').of(this.dropdownField(fieldName)), equals(itemName))
        ) : Task.where(`#actor check dropdown field: ${fieldName}'s value with ${itemName} ${expectedResult}`,
            Ensure.eventually(Attribute.called('initialvalue').of(this.dropdownField(fieldName)), not(equals(itemName)))
        );
    }

    /**
     * 检查日期输入框的值
     * @param fieldName 字段名
     * @param itemName 字段的期望值
     * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
     * @returns 
     */
    checkDateInputFieldValue = (fieldName: string, itemName: string | Question<any>, expectedResult: string) => {
        return expectedResult === SUCCEEDED ? Task.where(`#actor check date field: ${fieldName}'s value with ${itemName} ${expectedResult}`,
            Ensure.eventually(Attribute.called('initialvalue').of(this.dateInputField(fieldName)), equals(itemName))
        ) : Task.where(`#actor check date field: ${fieldName}'s value with ${itemName} ${expectedResult}`,
            Ensure.eventually(Attribute.called('initialvalue').of(this.dateInputField(fieldName)), not(equals(itemName)))
        );
    }
    /**
     * 检查lookup输入框的值(单选)
     * @param fieldName 字段名
     * @param itemName 字段的期望值
     * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
     * @returns 
     */
    checkLookupInputFieldSingleValue = (fieldName: string, itemName: string | Question<any>, expectedResult: string) => {
        return expectedResult === SUCCEEDED ? Task.where(`#actor check lookup single value field: ${fieldName}'s value with ${itemName} ${expectedResult}`,
            Log.the(Text.of(this.lookupInputFieldSingleValue(fieldName))),
            Ensure.eventually(Text.of(this.lookupInputFieldSingleValue(fieldName)), equals(itemName))
        ) : Task.where(`#actor check lookup single value field: ${fieldName}'s  value with ${itemName} ${expectedResult}`,
            Ensure.eventually(Text.of(this.lookupInputFieldSingleValue(fieldName)), not(equals(itemName)))
        );
    }

    /**
    * 检查lookup输入框的值(多选)
    * @param fieldName 字段名
    * @param itemName 字段的期望值, 多个值逗号隔开，注意选项之间的顺序
    * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
    * @returns 
    */
    checkLookupInputFieldMultiValue = (fieldName: string, itemName: string, expectedResult: string) => {
        const array = itemName.split(',')
        return expectedResult === SUCCEEDED ? Task.where(`#actor check lookup single value field: ${fieldName}'s value with ${itemName} ${expectedResult}`,
            Log.the(this.lookupInputFieldMultiValue(fieldName).eachMappedTo(Text)),
            Ensure.eventually(this.lookupInputFieldMultiValue(fieldName).eachMappedTo(Text), equals(array))
        ) : Task.where(`#actor check lookup single value field: ${fieldName}'s  value with ${itemName} ${expectedResult}`,
            Log.the(this.lookupInputFieldMultiValue(fieldName).eachMappedTo(Text)),
            Ensure.eventually(this.lookupInputFieldMultiValue(fieldName).eachMappedTo(Text), not(equals(array)))
        );
    }

    /**
     * 检查只读字段输入框的值(add时为下拉框，edit时为只读状态的字段)
     * @param fieldName 字段名
     * @param itemName 字段的期望值
     * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
     * @returns 
     */
    checkReadOnlyLabelValue = (fieldName: string, itemName: string | Question<any>, expectedResult: string) => {
        return expectedResult === SUCCEEDED ? Task.where(`#actor check read only label field: ${fieldName}'s value with ${itemName} ${expectedResult}`,
            Ensure.eventually(Text.of(this.readOnlyLabelField(fieldName)), equals(itemName))
        ) : Task.where(`#actor check read only label field: ${fieldName}'s value with ${itemName} ${expectedResult}`,
            Ensure.eventually(Text.of(this.readOnlyLabelField(fieldName)), not(equals(itemName)))
        );
    }

    /**
     * 检查只读lookup字段输入框的值
     * @param fieldName 字段名
     * @param itemName 字段的期望值
     * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
     * @returns 
     */
    checkReadOnlylookupValue = (fieldName: string, itemName: string | Question<any>, expectedResult: string) => {
        return expectedResult === SUCCEEDED ? Task.where(`#actor check read only lookup field: ${fieldName}'s value with ${itemName} ${expectedResult}`,
            Ensure.eventually(Text.of(this.readOnlyLookupFieldValue(fieldName)), equals(itemName))
        ) : Task.where(`#actor check read only lookup field: ${fieldName}'s value with ${itemName} ${expectedResult}`,
            Ensure.eventually(Text.of(this.readOnlyLookupFieldValue(fieldName)), not(equals(itemName)))
        );
    }

    /**
     * 点击单选框选项
     * @param fieldName 
     * @param itemName 
     */
    clickSingleCheckBox = (fieldName: string, itemName: string) => {
        return Task.where(`#actor click ${fieldName} single check box: ${itemName}`,
            Click.on(this.radioButtonLebel(fieldName, itemName))
        )
    }

    /**
     * 选择时间 (搭配日历一起使用，当不选择日历直接选择时间时，会默认当天日期)
     * @param fieldName 字段名
     * @param itemName 要填的值 eg: 01:30 AM
     * @returns 
     */
    selectClock = (fieldName: string, itemName: string | Question<any>) => {
        return Task.where(`#actor select clock ${fieldName} with ${itemName}`,
            Click.on(this.clockIcon(fieldName)),
            Ensure.eventually(this.clockList(fieldName), isPresent()),
            Click.on(this.clockItem(fieldName, itemName))
        )
    }

    /**
    * relationship attribute的lookup Popup弹窗中搜索并选择目标选项（当为多选时，全选，当为单选时，默认第一个选项， 不会清除原输入框中已选择的内容）
    * @param fieldName 字段名称
    * @param itemName 要搜索的关键词, 多个选项逗号隔开。使用时，使用split(',')，组装成array，然后foreach循环
    * @param popupFieldName 在弹窗中填入关键词的字段名
    * @returns 
    */
    selectItemInRelationshipAttributeInLookupPopup = (fieldName: string, itemName: string | Question<any>, popupFieldName: string) => {
        const searchForm = new SearchFromFields(this.entityMap)
        return Task.where(`#actor searchs single item : ${itemName} in ${fieldName} lookup popup`,
            Click.on(this.lookupIcon(fieldName)),
            // 确保弹窗有显示再进行下一步搜索操作
            Ensure.eventually(this.lookupPopupPanel(fieldName), isVisible()),
            Switch.to(this.lookupPopupPanel(fieldName)).and(
                Enter.theValue(itemName).into(searchForm.textInputField(popupFieldName)),
                clickButton.using(SEARCH),
                // 等待3s加载时间，以确保列表为刷新后的数据
                Wait.for(Duration.ofSeconds(3)),
                searchForm.checkSearchResult(itemName, SUCCEEDED),
                Check.whether(
                    // 判断是单选框还是多选框
                    multiCheckBoxInGrid(), isPresent()
                ).andIfSo(
                    // 点击多选框的全选
                    clickAllMultiCheckBox(),
                ).otherwise(
                    // 点击单选框的第一个选项   
                    clickFirstSingleCheckBox(),
                ),
                clickButton.using(OK)
            ),
        )
    }

    /**
     * NAICS lookup Popup弹窗中搜索树形选项并选择目标选项（树形选项, 默认选中第一条）
     * @param fieldName 
     * @param itemName 
     * @param popupFieldName 
     * @returns 
     */
    selectNAICSItemInlookupPopup = (fieldName: string, itemName: string | Question<any>, popupFieldName: string) => {
        return Task.where(`#actor searchs single item : ${itemName} in ${fieldName} lookup popup`,

            Click.on(this.lookupIcon(fieldName)),
            // 确保弹窗有显示再进行下一步搜索操作
            Ensure.eventually(this.lookupPopupPanel(fieldName), isVisible()),
            Switch.to(this.lookupPopupPanel(fieldName)).and(
                Enter.theValue(itemName).into(
                    PageElement.located(By.id('ctl00_body_txtSearchValue'))
                        .describedAs('text input field: ' + fieldName)),
                clickButton.using(SEARCH),
                // 等待3s加载时间，以确保列表为刷新后的数据
                Wait.for(Duration.ofSeconds(3)),
                Ensure.eventually(PageElements.located(By.cssContainingText('span', itemName)), isPresent()),
                // 点击多选框的全选   
                Click.on(PageElements.located(By.css(`[type="checkbox"]`)).first()),
                clickButton.using(OK)
            ),
        )
    }

    /**
     * 选择relationship attribute的下拉框选项（不会清除原输入框的已选择的内容）
     * @param fieldName 
     * @param itemName 
     * @returns 
     */
    selectrelationshipAttributeLookupDropdownItem = (fieldName: string, itemName: string) => {
        return Task.where(`#actor searchs single item : ${itemName} in ${fieldName} lookup popup`,
            Click.on(this.ralationshipAttributeLookupInputField(fieldName)),
            Wait.for(Duration.ofSeconds(2)),
            Ensure.eventually(this.ralationshipAttributeLookupDropdownItem(fieldName, itemName), isPresent()),
            // 点击下拉框的值
            Click.on(this.ralationshipAttributeLookupDropdownItem(fieldName, itemName)),
        )
    }

    /**
     * 检查Tree Lookup输入框的值(多选/树形 示例字段：NAICS)
     * @param fieldName 字段名
     * @param itemName 字段的期望值, 多个值逗号隔开，注意选项之间的顺序
     * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
     * @returns 
     */
    checkTreeLookupInputFieldMultiValue = (fieldName: string, itemName: string, expectedResult: string) => {
        const array = itemName.split(',')
        return expectedResult === SUCCEEDED ? Task.where(`#actor check lookup single value field: ${fieldName}'s value with ${itemName} ${expectedResult}`,
            Log.the(Text.ofAll(this.treeLookupInputFieldMultiValue(fieldName))),
            Ensure.eventually(this.treeLookupInputFieldMultiValue(fieldName).eachMappedTo(Text), equals(array))
        ) : Task.where(`#actor check lookup single value field: ${fieldName}'s  value with ${itemName} ${expectedResult}`,
            Log.the(Text.ofAll(this.treeLookupInputFieldMultiValue(fieldName))),
            Ensure.eventually(this.treeLookupInputFieldMultiValue(fieldName).eachMappedTo(Text), not(equals(array)))
        );
    }

    /**
     * 检查relationship attribute Lookup输入框的值
     * @param fieldName 字段名
     * @param itemName 字段的期望值, 多个选项逗号隔开。注意选项的顺序
     * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
     * @returns 
     */
    checkRelationshipAttributeLookupInputFieldMultiValue = (fieldName: string, itemName: string, expectedResult: string) => {
        const array = itemName.split(',')
        return expectedResult === SUCCEEDED ? Task.where(`#actor check lookup multi value field: ${fieldName}'s value with ${itemName} ${expectedResult}`,
            Log.the(Text.ofAll(this.relationshipAttributeLookupInputFieldMultiValue(fieldName))),
            Ensure.eventually(Text.ofAll(this.relationshipAttributeLookupInputFieldMultiValue(fieldName)), equals(array))
        ) : Task.where(`#actor check lookup multi value field: ${fieldName}'s  value with ${itemName} ${expectedResult}`,
            Log.the(Text.ofAll(this.relationshipAttributeLookupInputFieldMultiValue(fieldName))),
            Ensure.eventually(this.relationshipAttributeLookupInputFieldMultiValue(fieldName).eachMappedTo(Text), not(equals(array)))
        );
    }

    /**
     * 给Auto id的field填值
     * @param fieldName 字段名
     * @param itemName 要填的值
     * @returns 
     */
    fillAutoIdInputField = (fieldName: string, itemName: string | Question<any>) => {

        return Task.where(`#actor fill text input field ${fieldName} with ${itemName}`,
            Click.on(this.autoIdInputField(fieldName)),
            Clear.theValueOf(this.autoIdInputField(fieldName)),
            Enter.theValue(itemName).into(this.autoIdInputField(fieldName))
        )
    }
    /**
     * 检查Readonly Auto id输入框的值(AutoNumber,Such As:Bidder ID)
     * @param fieldName 字段名
     * @param itemName 字段的期望值
     * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
     * @returns 
     */
    checkAutoIdInputFieldValue = (fieldName: string, itemName: string | Question<any>, expectedResult: string) => {
        return expectedResult === SUCCEEDED ? Task.where(`#actor check text field: ${fieldName} 's value with ${itemName} ${expectedResult}`,
            Ensure.eventually(Text.of(this.readOnlyLabelField(fieldName)), equals(itemName))
        ) : Task.where(`#actor check text field: ${fieldName}'s value with ${itemName} ${expectedResult}`,
            Ensure.eventually(Text.of(this.readOnlyLabelField(fieldName)), equals(itemName))
        );
    }

    /**
     * 检查可编辑的Auto id输入框的值(AutoNumber,Such As:Bidder ID)
     * @param fieldName 字段名
     * @param itemName 字段的期望值
     * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
     * @returns 
     */
    checkEditAutoIdInputFieldValue = (fieldName: string, itemName: string | Question<any>, expectedResult: string) => {
        return expectedResult === SUCCEEDED ? Task.where(`#actor check text field: ${fieldName} 's value with ${itemName} ${expectedResult}`,
            Ensure.eventually(Text.of(this.autoIdInputField(fieldName)), equals(itemName))
        ) : Task.where(`#actor check text field: ${fieldName}'s value with ${itemName} ${expectedResult}`,
            Ensure.eventually(Text.of(this.autoIdInputField(fieldName)), equals(itemName))
        );
    }

    /**
     * 给amount类型的field填值
     * @param fieldName 字段名
     * @param itemName 要填的值
     * @returns 
     */
    fillAmountInputField = (fieldName: string, itemName: string | Question<any>) => {
        return Task.where(`#actor fill text input field ${fieldName} with ${itemName}`,
            Click.on(this.amountInputField(fieldName)),
            Clear.theValueOf(this.amountInputField(fieldName)),
            Enter.theValue(itemName).into(this.amountInputField(fieldName))

        )
    }

    /**
     * 检查amount类型的field的值
     * @param fieldName 字段名
     * @param itemName 预期值
     * @param expectedResult 
     * @returns 
     */
    checkAmountInputFieldValue = (fieldName: string, itemName: string | Question<any>, expectedResult: string) => {
        return expectedResult === SUCCEEDED ? Task.where(`#actor check amount field: ${fieldName} 's value with ${itemName} ${expectedResult}`,
            Ensure.eventually(Attribute.called('initialvalue').of(this.amountInputField(fieldName)), equals(itemName))
        ) : Task.where(`#actor check amount field: ${fieldName}'s value with ${itemName} ${expectedResult}`,
            Ensure.eventually(Attribute.called('initialvalue').of(this.amountInputField(fieldName)), not(equals(itemName)))
        );
    }

    /**
     * 检查只读字段的链接文字内容
     * @param fieldName 字段名
     * @param itemName 预期值
     * @param expectedResult SUCCEEDED 与预期一致， FAILED 与预期不一致
     * @returns 
     */
    checkReadOnlyFieldLinkValue = (fieldName: string, itemName: string | Question<any>, expectedResult: string) => {
        return expectedResult === SUCCEEDED ? Task.where(`#actor check read only link field: ${fieldName} 's value with ${itemName} ${expectedResult}`,
            Ensure.eventually(Text.of(this.readOnlyFieldLink(fieldName)), equals(itemName))
        ) : Task.where(`#actor check read only link field: ${fieldName}'s value with ${itemName} ${expectedResult}`,
            Ensure.eventually(Text.of(this.readOnlyFieldLink(fieldName)), not(equals(itemName)))
        );
    }

    /**************************************************** html 元素组件************************************************* */

    /**
     * 普通文字输入框
     * @param fieldName 字段名称
     * @returns 
     */
    textInputField = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_txtText'))
            .describedAs('text input input field: ' + fieldName)

    /**
     * 下拉框类型的输入框
     * @param fieldName 字段名称
     * @returns 
     */
    dropdownField = (fieldName: string) => {
        const mappedFieldName = this.entityMap.get(fieldName)
        return PageElement.located(By.css(`[aria-owns="ctl00_body_${mappedFieldName}_ddlPicklist_listbox"]`))
            .describedAs('dropdown field: ' + fieldName)
    }

    /**
     * 下拉框面板
     * @param fieldName 字段名称
     * @returns 
     */
    dropdownListBox = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_ddlPicklist-list'))
            .describedAs('dropdown list box: ' + fieldName)

    /**
     * 下拉框列表
     * @param fieldName 字段名称
     * @returns 
     */
    dropdownList = (fieldName: string) =>
        PageElements.located(By.css('li')).of(this.dropdownListBox(fieldName))
            .describedAs('dropdown list: ' + fieldName)

    /**
     * 下拉列表的值
     * @param fieldName 字段名称
     * @param itemName 具体的选项名称
     * @returns 
     */
    dropdownItem = (fieldName, itemName: string | Question<any>) =>
        PageElement.located(By.css(`[title="${itemName}"]`))
            .of(this.dropdownListBox(fieldName))
            .describedAs('dropdown item: ' + itemName)

    /**
     * lookup 输入框
     * @param fieldName 字段名称
     * @returns 
     */
    lookupInputField = (fieldName: string) => {
        const mappedFieldName = this.entityMap.get(fieldName)
        return PageElement.located(By.css(`[aria-describedby="ctl00_body_${mappedFieldName}_select_taglist"]`))
            .describedAs('lookup input field: ' + fieldName)
    }

    /**
     * lookup输入框的下拉框面板
     * @param fieldName 字段名称
     * @returns 
     */
    lookupDropdownListBox = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_select-list'))
            .describedAs('lookup dropdown list box: ' + fieldName)

    /**
     * lookup输入框的下拉框列表
     * @param fieldName 字段名称
     * @returns 
     */
    lookupDropdownList = (fieldName: string) =>
        PageElements.located(By.css('li'))
            .of(this.lookupDropdownListBox(fieldName))
            .describedAs('lookup dropdown list: ' + fieldName)

    /**

    * lookup 下拉框列表的具体选项
    * @param fieldName 字段名称
    * @param itemName 选项的值
    * @returns
    */

    lookupDropdownItem = (fieldName: string, itemName: string) =>
        PageElement.located(By.css(`[title="${itemName}"]`,))
            .of(this.lookupDropdownListBox(fieldName))
            .describedAs(`dropdown item: ${itemName} of lookup field ${fieldName}`)

    /**
     * lookup输入框的值的ul元素
     * @param fieldName 字段名称
     * @returns 
     */
    lookupInputFieldUl = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_select_taglist'))
            .describedAs('lookup field ul: ' + fieldName)

    /**
     * lookup输入框的值(单选)
     * @param fieldName 字段名称
     * @returns 
     */
    lookupInputFieldSingleValue = (fieldName: string) =>
        PageElement.located(By.css(`[data-temp-type="singleTag"]`))
            .of(this.lookupInputFieldUl(fieldName))
            .describedAs('lookup field single value: ' + fieldName)

    /**
     * lookup输入框的值(多选)
     * @param fieldName 字段名称
     * @returns 
     */
    lookupInputFieldMultiValue = (fieldName: string) =>
        PageElements.located(By.css(`[data-temp-type="mtpListTag"]`))
            .of(this.lookupInputFieldUl(fieldName))
            .describedAs('lookup field multi value: ' + fieldName)

    /**
     * lookup 图标
     * @param fieldName 字段名称
     * @returns 
     */
    lookupIcon = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_imgPopup'))
            .describedAs('lookup icon: ' + fieldName)

    /**
     * 点击lookup图标后出现的弹窗
     * @param fieldName 字段名称
     * @returns 
     */
    lookupPopupPanel = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_ifmPopup'))
            .describedAs('lookup popup panel : ' + fieldName)

    /**
     * 日期输入框
     * @param fieldName 字段名称
     * @returns 
     */
    dateInputField = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_layDateTime'))
            .describedAs('date input field: ' + fieldName)

    /**
     * 
     * @param fieldName 字段名称
     * @returns 
     */
    dateCalendarIcon = (fieldName: string) => {
        const mappedFieldName = this.entityMap.get(fieldName)
        return PageElement.located(By.css(`[aria-controls="ctl00_body_${mappedFieldName}_layDateTime_dateview"]`))
            .describedAs('date calendar icon: ' + fieldName)
    }

    /**
     * 数字输入框
     * @param fieldName 字段名称
     * @returns 
     */
    numberInputField = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_txtDecimal'))
            .describedAs('number input field: ' + fieldName)

    /**
     * 只读数字输入框
     * @param fieldName 字段名称
     * @returns 
     */
    readOnlyNumberInputField = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_lit'))
            .describedAs('read only number input field: ' + fieldName)

    /**
     * 只读AutoId字段输入框
     * @param fieldName 字段名称
     * @returns 
     */
    autoIdInputField = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_txtAutoNumber'))
            .describedAs('read only Autoid: ' + fieldName)

    /**
     * 只读字段
     * @param fieldName 字段名称
     * @returns 
     */
    readOnlyLabelField = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_lbl'))
            .describedAs('read only lebel:' + fieldName)

    /**
     * 只读lookup字段
     * @param fieldName 字段名称(一般为lookup类型的字段)
     * @returns 
     */
    readOnlyLookupFieldBox = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_readBox'))
            .describedAs('read only lookup field box:' + fieldName)

    /**
    * 只读lookup字段的值
    * @param fieldName 字段名称(一般为lookup类型的字段)
    * @returns 
    */
    readOnlyLookupFieldValue = (fieldName: string) =>
        PageElement.located(By.css('a'))
            .of(this.readOnlyLookupFieldBox(fieldName))
            .describedAs('read only lookup field box value:' + fieldName)

    /**
     * 单选框
     * @param fieldName 字段名称
     * @returns 
     */
    radioButtonUl = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_rblBoolean'))
            .describedAs('radio button:' + fieldName)

    /**
     * 单选框组合
     * @param fieldName 字段名称
     * @returns 
     */
    radioButtonGroupUl = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_rblBoolean'))
            .describedAs('radio button group:' + fieldName)

    /**
     * radio的选项
     * @param fieldName 字段名称
     * @param itemNumber 第几个选项 第一个为0
     * @returns 
     */
    radioButtonLebel = (fieldName: string, itemNth: string) => {
        const mappedFielfName = this.entityMap.get(fieldName)
        return PageElement.located(By.css(`[for="ctl00_body_${mappedFielfName}_rblBoolean_${itemNth}"]`))
            .of(this.radioButtonGroupUl(fieldName))
            .describedAs('radio button:' + fieldName)
    }

    /**
     * radio的input标签
     * @param fieldName 字段名称
     * @param itemNumber 第几个选项 第一个为0
     * @returns 
     */
    radioButtonInput = (fieldName: string, itemNth: string) => {
        const mappedFielfName = this.entityMap.get(fieldName)
        return PageElement.located(By.id(`ctl00_body_${mappedFielfName}_rblBoolean_${itemNth}`))
            .of(this.radioButtonGroupUl(fieldName))
            .describedAs('radio input:' + fieldName)
    }

    /**
     * 时间（钟点）图标
     * @param fieldName 
     * @returns 
     */
    clockIcon = (fieldName: string) => {
        const mappedFielfName = this.entityMap.get(fieldName)
        return PageElement.located(By.css(`[aria-controls="ctl00_body_${mappedFielfName}_layDateTime_timeview"]`))
            .describedAs(fieldName + 'clock icon')
    }

    /**
     * 时间列表面板
     * @param fieldName 字段名
     * @returns 
     */
    clockListBox = (fieldName: string) => {
        return PageElement.located(By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_layDateTime_timeview'))
            .describedAs(fieldName + 'clock list box')
    }

    /**
     * 时间列表
     * @param fieldName 字段名
     * @returns 
     */
    clockList = (fieldName: string) => {
        return PageElements.located(By.css('li'))
            .of(this.clockListBox(fieldName))
            .describedAs(fieldName + 'clock list')
    }

    /**
     * 具体时间
     * @param fieldName 字段名
     * @param itemName 时间值 eg:01:00 AM
     * @returns 
     */
    clockItem = (fieldName: string, itemName: string | Question<any>) => {
        return PageElement.located(By.cssContainingText('li', itemName))
            .of(this.clockListBox(fieldName))
            .describedAs(fieldName + 'clock item:' + itemName)
    }

    /**
     * lookup/Tree输入框的值(多选/树形)
     * @param fieldName 字段名称
     * @returns 
     */
    treeLookupInputFieldMultiValue = (fieldName: string) =>
        PageElements.located(By.css(`[data-temp-type="mtpListTreeTag"]`))
            .of(this.treeLookupInputFieldUl(fieldName))
            .describedAs('lookup field multi value: ' + fieldName)

    /**
     * lookup/Tree输入框的值的ul元素
     * @param fieldName 字段名称
     * @returns 
     */
    treeLookupInputFieldUl = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_taglist'))
            .describedAs('lookup field ul: ' + fieldName)

    /**
     * relationship Attribute lookup输入框的值(多选/树形)
     * @param fieldName 字段名称
     * @returns 
     */
    relationshipAttributeLookupInputFieldMultiValue = (fieldName: string) =>
        PageElements.located(By.css(`[data-temp-type="mtpListTag"]`))
            .of(this.relationshipAttributeLookupInputFieldUl(fieldName))
            .describedAs('lookup field multi value: ' + fieldName)

    /**
     * relationship Attribute lookup输入框的值的ul元素
     * @param fieldName 字段名称
     * @returns 
     */
    relationshipAttributeLookupInputFieldUl = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_taglist'))
            .describedAs('lookup field ul: ' + fieldName)

    /**
     * 关联的Attribute的lookup 输入框（在entity的Attribute列表无法搜索到的字段）
     * @param fieldName 
     * @returns 
     */
    ralationshipAttributeLookupInputField = (fieldName: string) => {
        const mappedFieldName = this.entityMap.get(fieldName);
        return PageElement.located(By.css(`[aria-describedby="ctl00_body_${mappedFieldName}_taglist"]`))
            .describedAs('relationship attribute lookup input field: ' + fieldName);
    };

    /**
     * 关联的Attribute的lookup 下拉选项（在entity的Attribute列表无法搜索到的字段）
     * @param fieldName 
     * @returns 
     */
    ralationshipAttributeLookupDropdownItem = (fieldName: string, itemName: string) =>
        PageElement.located(By.cssContainingText(`span`, itemName))
            .of(PageElement.located(By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_listbox')))
            .describedAs(`relationship attribute lookup dropdown item: ${itemName} of lookup field ${fieldName}`);

    /**
     * 关联的Attribute的lookup输入框清除图标（在entity的Attribute列表无法搜索到的字段）
     * @param fieldName 
     * @returns 
     */
    ralationshipAttributeLookupFieldClearIcon = (fieldName: string,) =>
        PageElement.located(By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_imgRemove'))
            .describedAs(`relarionship attribute lookup field clear icon: ${fieldName}`)

    /**
     * 金额输入框
     * @param filedName 
     * @returns 
     */
    amountInputField = (filedName: string) =>
        PageElement.located(By.id('ctl00_body_' + this.entityMap.get(filedName) + '_txtMoney'))
            .describedAs(filedName + ' amount input field')

    /**
     * 只读字段的链接文字
     * @param fieldName 字段名称
     * @returns 
     */
    readOnlyFieldLink = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_hlText'))
            .describedAs(fieldName + ' read only field link')

    /**
     * 字段名称所属标签
     * @param fieldName 字段名称
     * @returns 
     */
    attributeNameLabel = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_FL'))
            .describedAs(`attribute name ${fieldName} lebal`)
}

