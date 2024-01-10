import { Ensure, includes, isPresent } from '@serenity-js/assertions';
import { Check, Duration, Log, Question, Task, Wait } from '@serenity-js/core';
import { By, Clear, Click, Enter, isVisible, Page, PageElement, PageElements, Switch } from '@serenity-js/web';

import { EDIT, OK, SEARCH, SUCCEEDED } from '../../../DefaultStaticParams';
import { fillSpecialDate } from '../CalendarPopup';
import { clickButton, clickButtonInList } from '../ClickButton';
import { clickAllMultiCheckBox, clickFirstSingleCheckBox, singleCheckBoxInGrid } from '../ClickCheckBox';
import { checkGridList, emptyGrid, gridLinkTdList, gridTextTdList } from '../GridList';
import { openPage } from '../OpenPage';

export class SearchFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        this.entityMap = entityMap;
    }

    /**
     * 普通文本输入框填值
     * @param fieldName 字段名称
     * @param itemName 要填的值
     * @returns 
     */
    fillTextInputField = (fieldName: string, itemName) => {
        return Task.where(`#actor fill text field: ${fieldName} with ${itemName}`,
            Click.on(this.textInputField(fieldName)),
            Clear.theValueOf(this.textInputField(fieldName)),
            Enter.theValue(itemName).into(this.textInputField(fieldName))

        );
    }

    /**
    * 选择下拉框选项
    * @param fieldName 字段名称
    * @param itemName 要选择的item
    * @returns 
    */
    selectDropdownItem = (fieldName: string, itemName: string) => {
        return Task.where(`#actor selects dropdown item: ${itemName}`,
            Click.on(this.dropdownField(fieldName)),
            // 确保下拉框有值之后再点击对应选项
            Ensure.eventually(this.dropdownList(fieldName).first(), isPresent()),
            Click.on(this.dropdownItem(fieldName, itemName)),
        )

    }

    /**
    * 在lookup Popup弹窗中搜索并选择目标选项（当为多选时，全选，当为单选时，默认第一个选项）
    * @param fieldName 字段名称
    * @param itemName 要搜索的关键词
    * @param popupFieldName 在弹窗中填入关键词的字段名(仅限text类型的字段)
    * @returns 
    */
    selectItemInlookupPopup = (fieldName: string, itemName: string, popupFieldName: string) => {

        return Task.where(`#actor searchs item : ${itemName} in ${fieldName} lookup popup`,
            Click.on(this.lookupInputField(fieldName)),
            // 确保下拉框有值之后再点击lookup图标
            Ensure.eventually(this.lookupDropdownList(fieldName).first(), isPresent()),
            Click.on(this.lookupIcon(fieldName)),
            // 确保弹窗有显示再进行下一步搜索操作
            Ensure.eventually(this.lookupPopupPanel(fieldName), isVisible()),
            Switch.to(this.lookupPopupPanel(fieldName)).and(
                this.fillTextInputField(popupFieldName, itemName),
                clickButton.using(SEARCH),
                // 等待3s加载时间，以确保列表为刷新后的数据
                Wait.for(Duration.ofSeconds(3)),
                this.checkSearchResult(itemName, SUCCEEDED),
                Check.whether(
                    // 判断是单选框还是多选框
                    singleCheckBoxInGrid().first(), isVisible()
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
     * 在browse页面搜索目标值(单条件查询，仅限查询字段为text类型)
     * 多条件查询，请在子类重新定义新的方法
     * @param pageName 页面名称
     * @param fieldName 填入关键词的字段名
     * @param itemName 搜索的关键词
     * @returns 
     */
    searchItemInBrowsePage = (pageName: string, fieldName: string, itemName: string | Question<any>) => {
        return Task.where(`#actor search item: ${itemName} with ${fieldName}`,
            Check.whether(Page.current().title(), includes(pageName)
            ).andIfSo(
                Log.the('current page is ' + pageName)
            ).otherwise(
                openPage.using(pageName),
                Wait.for(Duration.ofSeconds(2)),
            ),
            this.fillTextInputField(fieldName, itemName),
            clickButton.using(SEARCH),
            Wait.for(Duration.ofSeconds(3)),
            checkGridList(),
        )
    }
    /**
     * 
     * @param itemName 校验的item值
     * @param expectedResult 预期结果 SUCCEEDED：匹配 FAILED 不匹配
     * @returns 
     */
    checkSearchResult = (itemName: string | Question<any>, expectedResult: string | Question<any>) => {
        return expectedResult === SUCCEEDED ? Task.where(`#actor check search item: ${itemName} exists`,
            Check.whether(
                gridTextTdList(itemName), isPresent()
            ).andIfSo(
                Log.the(itemName + ' is present')
            ).otherwise(
                Ensure.eventually(gridLinkTdList(itemName), isPresent())
            )

        ) : Task.where(`#actor check search item: ${itemName} not exists`,
            Ensure.eventually(emptyGrid(), isPresent())
        );
    }

    /**
     * 在browse页面搜索目标，并点击edit跳转到edit页面
     * @param pageName 
     * @param fieldName 
     * @param itemName 
     */
    searchItemAndEdit = (pageName: string, fieldName: string, itemName: string | Question<any>) =>
        Task.where(`#actor check search item: ${itemName} and forward to edit page`,
            this.searchItemInBrowsePage(pageName, fieldName, itemName),
            this.checkSearchResult(itemName, SUCCEEDED),
            clickButtonInList.using(EDIT)
        )

    /**
    * 在lookup Popup弹窗中搜索并选择目标选项（当为多选时，全选，当为单选时，默认第一个选项）
    * @param fieldName 字段名称
    * @param itemName 要搜索的关键词
    * @param popupFieldName 在弹窗中填入关键词的字段名(仅限text类型的字段)
    * @returns 
    */
    selectItemInReletionshipAttributeLookupPopup = (fieldName: string, itemName: string, popupFieldName: string) => {

        return Task.where(`#actor searchs item : ${itemName} in ${fieldName} lookup popup`,
            Click.on(this.lookupInputField(fieldName)),
            // 确保下拉框有值之后再点击lookup图标
            Ensure.eventually(this.relationshipAttributeLookupDropdownList(fieldName).first(), isVisible()),
            Click.on(this.lookupIcon(fieldName)),
            // 确保弹窗有显示再进行下一步搜索操作
            Ensure.eventually(this.relationshipAttributeLookupPopupPanel(fieldName), isVisible()),
            Switch.to(this.relationshipAttributeLookupPopupPanel(fieldName)).and(
                this.fillTextInputField(popupFieldName, itemName),
                clickButton.using(SEARCH),
                // 等待3s加载时间，以确保列表为刷新后的数据
                Wait.for(Duration.ofSeconds(3)),
                this.checkSearchResult(itemName, SUCCEEDED),
                Check.whether(
                    // 判断是单选框还是多选框
                    singleCheckBoxInGrid().first(), isVisible()
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
     * 填入起始日期
     * @param fieldName 字段名称
     * @param date 要填入的时间 格式：mm/dd/yyyy eg:07/01/2023 
     * @returns 
     */
    fillStartDateInputField = (fieldName: string, date: string | Question<any>) => {
        return Task.where(`#actor fill start date of ${fieldName}, date = ${date} `,
            Clear.theValueOf(this.startDateInputField(fieldName)),
            Click.on(this.startDateInputField(fieldName)),
            fillSpecialDate(String(date)),
        );
    }

    /**
     * 填入截止日期
     * @param fieldName 字段名称
     * @param date 要填入的时间 格式：mm/dd/yyyy eg:07/01/2023 
     * @returns 
     */
    fillEndDateInputField = (fieldName: string, date: string | Question<any>) => {
        return Task.where(`#actor fill end date of ${fieldName}, date = ${date} `,
            Clear.theValueOf(this.endInputField(fieldName)),
            Click.on(this.endInputField(fieldName)),
            fillSpecialDate(String(date)),
        );
    }

    /*************************************** html 元素组件************************************** */
    /**
     * 普通文字输入框
     * @param fieldName 字段名称
     * @returns 
     */
    textInputField = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_A0_' + this.entityMap.get(fieldName) + '_txtText'))
            .describedAs('text input input field: ' + fieldName)

    /**
    * 下拉框的输入框
    * @param fieldName 字段名称
    * @returns 
    */
    dropdownField = (fieldName: string) => {
        const mappedFieldName = this.entityMap.get(fieldName)
        return PageElement.located(By.css(`[aria-owns="ctl00_body_A0_${mappedFieldName}_ddlPicklist_listbox"]`))
            .describedAs('dropdown field: ' + fieldName)
    }

    /**
    * 下拉框面板
    * @param fieldName 字段名称
    * @returns 
    */
    dropdownListBox = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_A0_' + this.entityMap.get(fieldName) + '_ddlPicklist-list'))
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
    dropdownItem = (fieldName, itemName: string) =>
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
        return PageElement.located(By.css(`[aria-describedby="ctl00_body_A0_${mappedFieldName}_select_taglist"]`))
            .describedAs('lookup input field: ' + fieldName)
    }

    /**
    * lookup输入框的下拉框面板
    * @param fieldName 字段名称
    * @returns 
    */
    lookupDropdownListBox = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_A0_' + this.entityMap.get(fieldName) + '_select-list'))
            .describedAs('lookup dropdown list box: ' + fieldName)

    /**
    * lookup输入框的下拉框列表
    * @param fieldName 字段名称
    * @returns 
    */
    lookupDropdownList = (fieldName: string) =>
        PageElements.located(By.css('span'))
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
    * lookup 图标
    * @param fieldName 字段名称
    * @returns 
    */
    lookupIcon = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_A0_' + this.entityMap.get(fieldName) + '_imgPopup'))
            .describedAs('lookup icon: ' + fieldName)

    /**
    * 点击lookup图标后出现的弹窗
    * @param fieldName 字段名称
    * @returns 
    */
    lookupPopupPanel = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_A0_' + this.entityMap.get(fieldName) + '_ifmPopup'))
            .describedAs('lookup popup panel : ' + fieldName)

    /**
    * 关联的Attribute的lookup 输入框（在entity的Attribute列表无法搜索到的字段）
    * @param fieldName 字段名称
    * @returns 
    */
    relationshipAttributeLookupInputField = (fieldName: string) => {
        const mappedFieldName = this.entityMap.get(fieldName)
        return PageElement.located(By.css(`[aria-describedby="ctl00_body_AA_${mappedFieldName}_select_taglist"]`))
            .describedAs('relationship attribute lookup input field: ' + fieldName)
    }

    /**
    * 关联的Attribute的lookup输入框的下拉框面板（在entity的Attribute列表无法搜索到的字段）
    * @param fieldName 字段名称
    * @returns 
    */
    relationshipAttributeLookupDropdownListBox = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_AA_' + this.entityMap.get(fieldName) + '_select-list'))
            .describedAs('relationship attribute lookup dropdown list box: ' + fieldName)

    /**
    * 关联的Attribute的lookup输入框的下拉框列表（在entity的Attribute列表无法搜索到的字段）
    * @param fieldName 字段名称
    * @returns 
    */
    relationshipAttributeLookupDropdownList = (fieldName: string) =>
        PageElements.located(By.css('span'))
            .of(this.relationshipAttributeLookupDropdownListBox(fieldName))
            .describedAs('relationship attribute lookup dropdown list: ' + fieldName)

    /**
    * 关联的Attribute的lookup输入框的下拉框列表的具体选项
    * @param fieldName 字段名称
    * @param itemName 选项的值
    * @returns 
    */
    relationshipAttributeLookupDropdownItem = (fieldName: string, itemName: string) =>
        PageElement.located(By.css(`[title="${itemName}"]`))
            .of(this.relationshipAttributeLookupDropdownListBox(fieldName))
            .describedAs(`dropdown item: ${itemName} of lookup field ${fieldName}`)

    /**
    * 关联的Attribute的lookup 图标（在entity的Attribute列表无法搜索到的字段）
    * @param fieldName 字段名称
    * @returns 
    */
    relationshipAttributeLookupIcon = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_AA_' + this.entityMap.get(fieldName) + '_imgPopup'))
            .describedAs('relationship attributelookup icon: ' + fieldName)

    /**
    * 点击关联的Attribute的lookup图标后出现的弹窗（在entity的Attribute列表无法搜索到的字段）
    * @param fieldName 字段名称
    * @returns 
    */
    relationshipAttributeLookupPopupPanel = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_AA_' + this.entityMap.get(fieldName) + '_ifmPopup'))
            .describedAs('relationship attribute lookup popup panel : ' + fieldName)

    /**
    * 起始日期输入框
    * @param fieldName 字段名称
    * @returns 
    */
    startDateInputField = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_A0_' + this.entityMap.get(fieldName) + '_layStartDate'))
            .describedAs('start date input field: ' + fieldName)

    /**
     * 起始日期的日历图标
     * @param fieldName 字段名称
     * @returns 
     */
    startDateCalendarIcon = (fieldName: string) => {
        const mappedFieldName = this.entityMap.get(fieldName)
        return PageElement.located(By.css(`[aria-controls="ctl00_body_A0_${mappedFieldName}_layStartDate_dateview"]`))
            .describedAs('start date calendar icon: ' + fieldName)
    }

    /**
    * 截止日期输入框
    * @param fieldName 字段名称
    * @returns 
    */
    endInputField = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_A0_' + this.entityMap.get(fieldName) + '_layDueDate'))
            .describedAs('end date input field: ' + fieldName)

    /**
     * 截止日期的日历图标
     * @param fieldName 字段名称
     * @returns
     */
    endDateCalendarIcon = (fieldName: string) => {
        const mappedFieldName = this.entityMap.get(fieldName)
        return PageElement.located(By.css(`[aria-controls="ctl00_body_A0_${mappedFieldName}_layDueDate_dateview"]`))
            .describedAs('end date calendar icon: ' + fieldName)
    }

    /**
     * 清除输入框内容的图标
     * @param fieldName 字段名称
     * @returns 
     */
    inputFieldClearIcon = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_A0_' + this.entityMap.get(fieldName) + '_btnClear'))
            .describedAs('input field clear button: ' + fieldName)

}

