
import { Ensure, equals, includes, isPresent, not } from '@serenity-js/assertions';
import { Check, Duration, Question, Task, Wait } from '@serenity-js/core';
import { By, Click, Enter, isVisible, PageElement, Switch, Text } from '@serenity-js/web';

import { OK, SEARCH, SUCCEEDED } from '../../../DefaultStaticParams';
import { clickAllMultiCheckBox, clickButton, clickFirstSingleCheckBox, clickMessagePopupButton, messagePopupBox, messagePopupContent, singleCheckBoxInGrid } from '../../common';
import { EditFromFields, SearchFromFields } from '../../common/abstract';
import { projectAttributesMap } from './ProjectAttributes';

export class EditProjectFields extends EditFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);

    }

    addMasterProjectButton = () =>
        PageElement.located(By.css(`[value="Add Master Project"]`))
            .describedAs('Add Master Project' + 'button')

    /**
     * check message popup is visible
     * @returns 
     */
    waitMessagePopupBoxVisible = () =>
        Task.where(`#actor check message popup box`,
            Wait.until(messagePopupBox(), isVisible()),
            Check.whether(
                Text.of(messagePopupContent()), includes('Duplicate')
            ).andIfSo(
                clickMessagePopupButton.using(OK),

            )
        )

    firstExpandIconInGrid = () =>
        PageElement.located(By.id('ctl00_body_dgImplementedProjects_ctl03_imgExpand'))
            .describedAs('first expend icon in grid')

    lookupInputFieldClearIcon = (fieldName) =>
        PageElement.located(By.id('ctl00_body_' + this.entityMap.get(fieldName) + '_btnClear'))
            .describedAs(fieldName + ' lookup input field clear icon')

    selectItemInlookupPopup = (fieldName: string, itemName: string | Question<any>, popupFieldName: string) => {
        const searchForm = new SearchFromFields(this.entityMap)
        return Task.where(`#actor searchs single item : ${itemName} in ${fieldName} lookup popup`,

            Check.whether(
                this.lookupInputFieldClearIcon(fieldName), isPresent()
            ).andIfSo(
                Click.on(this.lookupInputFieldClearIcon(fieldName))
            ),

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
     * 检查文本输入框的值
     * @param fieldName 字段名
     * @param itemName 字段的期望值
     * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
     * @returns 
     */
    checkTextAreaInputFieldValue = (fieldName: string, itemName: string | Question<any>, expectedResult: string) => {
        return expectedResult === SUCCEEDED ? Task.where(`#actor check text field: ${fieldName} 's value with ${itemName} ${expectedResult}`,
            Ensure.eventually(Text.of(this.textInputField(fieldName)), equals(itemName))
        ) : Task.where(`#actor check text field: ${fieldName}'s value with ${itemName} ${expectedResult}`,
            Ensure.eventually(Text.of(this.textInputField(fieldName)), not(equals(itemName)))
        );
    }

}

export const project = new EditProjectFields(projectAttributesMap)
