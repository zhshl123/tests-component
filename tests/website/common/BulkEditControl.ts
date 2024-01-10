import { Ensure, isPresent, not } from '@serenity-js/assertions'
import { Question, Task } from '@serenity-js/core';
import { By, Click, isVisible, PageElement, PageElements } from '@serenity-js/web';

import { BATCH_DELETE, DATA_EXPORT, GENERIC_EXPORT, INSERT, LOAD_FROM, RESET, SUCCEEDED } from '../../DefaultStaticParams';

/**
 * 检查bulk edit按钮点出的弹窗页面
 * @returns 
 */
export const checkBulkEditControlPanel = () =>
    Task.where(`#actor check bulk edit control popup panel`,
        Ensure.eventually(bulkEditControlPopupPanel(), isVisible())
    )

/**
 * 点击BUlk Edit 表格里的下拉框的按钮
 * @param 父级html元素
 * @returns 
 */
export const clickBulkEditDropdownIcon = {
    using: (parentElement: Question<any>) =>
        Task.where(`#actor click bulk edit field drop button`,
            Click.on(bulkEditDropdownIcon(parentElement)),
            Ensure.eventually(bulkEditDropdownList(), isPresent())
        )

}

/**
 * 点击下拉框的某个值
 * @param 要选择的值
 * @returns 
 */
export const clickBulkEditDropdownItem = {
    using: (itemName: string) =>
        Task.where(`#actor click bulk edit dropdown item: ${itemName}`,
            Click.on(bulkEditDropdownItem(itemName))
        )
}

/**
 * 点击Bulik edit Section顶部的按钮
 * @param 按钮名称
 */
export const clickBulkEditSetionButton = {
    using: (buttonName: string) =>
        Task.where(`#actor click bulk edit section button: ${buttonName}`,
            Click.on(bulkEditSectionButton(buttonName))
        )
}

/**
 * 检查Bulik edit Section顶部的按钮是否可见
 * @param 按钮名称
 * @param 预期结果 SUCCEEDED 按钮可见 FAILED 按钮不可见
 */
export const checkBulkEditSetionButtonVisible = {
    using: (buttonName: string, expectedResult: string) => {
        return expectedResult === SUCCEEDED ? Task.where(`#actor check bulk edit section button: ${buttonName} visible ${expectedResult}`,
            Ensure.eventually(bulkEditSectionButton(buttonName), isVisible())
        ) : Task.where(`#actor check bulk edit section button: ${buttonName} visible ${expectedResult}`,
            Ensure.eventually(bulkEditSectionButton(buttonName), not(isVisible()))
        )
    }

}

// BUlk edit 点击lokkup后的 popup
export const bulkEditControlPopupPanel = () =>
    PageElement.located(By.id('ctl00_body_bulkEditControl1_ctl02_gridifmPopup'))
        .describedAs('bulk edit control popup panel')

// 下拉框
export const bulkEditDropdownContainer = () =>
    PageElement.located(By.css('.k-animation-container'))
        .describedAs('bulk edit control dropdown list')

// 下拉框图标
export const bulkEditDropdownIcon = (parentElement: Question<any>) =>
    PageElement.located(By.css('.k-select'))
        .of(parentElement)
        .describedAs('bulk edit control dropdown icon')

export const bulkEditDropdownListBox = () =>
    PageElement.located(By.css('.k-animation-container'))
        .describedAs('bulk edit control dropdown list box')

export const bulkEditDropdownList = () =>
    PageElements.located(By.css('li'))
        .of(bulkEditDropdownListBox())
        .describedAs('bulk edit control dropdown list')

// 具体下拉框的值
export const bulkEditDropdownItem = (itemName: string) =>
    PageElements.located(By.cssContainingText('li', itemName))
        .of(bulkEditDropdownListBox())
        .first()
        .describedAs('bulk edit control dropdown item:' + itemName)

export const bulkEditSectionButton = (buttonName: string) => {
    buttonName = bulkEditButtonNameMap.get(buttonName)
    return PageElement.located(By.css(`[data-name="n_${buttonName}"]`))
        .describedAs('Bulk edit control section button:' + buttonName)
}

const bulkEditButtonNameMap = new Map()
bulkEditButtonNameMap.set(INSERT, 'addRow');
bulkEditButtonNameMap.set(LOAD_FROM, 'showLoadLineItem');
bulkEditButtonNameMap.set(BATCH_DELETE, 'batchDelete');
bulkEditButtonNameMap.set(DATA_EXPORT, 'dataExport');
bulkEditButtonNameMap.set(GENERIC_EXPORT, 'dataGenericExport');
bulkEditButtonNameMap.set(RESET, 'Refresh');
