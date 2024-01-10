import { Ensure } from '@serenity-js/assertions';
import { Duration, Question, Task, Wait } from '@serenity-js/core';
import { By, Clear, Click, Enter, isVisible, PageElement, PageElements } from '@serenity-js/web';

import { DELETE, EDIT, SUCCEEDED } from '../../../DefaultStaticParams';

export class BrowseFormFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        this.entityMap = entityMap;
    }

    /**
     * 给text类型的field填值
     * @param fieldName 字段名
     * @param itemName 要填的值
     * @returns 
     */
    fillTextInputField = (nthColumn: number, itemName: string | Question<any>) => {
        return Task.where(`#actor fill text input ${nthColumn}th field with ${itemName}`,
            Click.on(this.advancedSearchInputField(nthColumn)),
            Clear.theValueOf(this.advancedSearchInputField(nthColumn)),
            Enter.theValue(itemName).into(this.advancedSearchInputField(nthColumn))
        )
    }

    /**
     * 条件查询并检查结果
     * @param nthColumn 第几列， 第一列为0， 以此类推
     * @param itemName 字段的期望值
     * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
     * @returns 
     */
    checkSearchResult = (nthColumn: number, itemName: string | Question<any>, expectedResult: string) => {
        return expectedResult === SUCCEEDED ? Task.where(`#actor check text ${nthColumn}th field's value with ${itemName} ${expectedResult}`,
            Clear.theValueOf(this.advancedSearchInputField(nthColumn)),
            Enter.theValue(itemName).into(this.advancedSearchInputField(nthColumn)),
            Wait.for(Duration.ofSeconds(2)),
            Ensure.eventually(this.textInGrid(itemName), isVisible()),
        ) : Task.where(`#actor check text ${nthColumn}th field's value with ${itemName} ${expectedResult}`,
            Clear.theValueOf(this.advancedSearchInputField(nthColumn)),
            Enter.theValue(itemName).into(this.advancedSearchInputField(nthColumn)),
            Wait.for(Duration.ofSeconds(2)),
            Ensure.eventually(this.noDataGrid(), isVisible())
        );
    }

    /**
     * 条件查询并检查结果(列表有父子层级)
     * @param nthColumn 第几列， 第一列为0， 以此类推
     * @param itemName 字段的期望值
     * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
     * @returns 
     */
    checkSearchTreeResult = (nthColumn: number, itemName: string | Question<any>, expectedResult: string) => {
        return expectedResult === SUCCEEDED ? Task.where(`#actor check text ${nthColumn}th field's value with ${itemName} ${expectedResult}`,
            Clear.theValueOf(this.advancedSearchInputField(nthColumn)),
            Enter.theValue(itemName).into(this.advancedSearchInputField(nthColumn)),
            Wait.for(Duration.ofSeconds(2)),
            Ensure.eventually(this.textInGrid(itemName), isVisible()),
        ) : Task.where(`#actor check text ${nthColumn}th field's value with ${itemName} ${expectedResult}`,
            Clear.theValueOf(this.advancedSearchInputField(nthColumn)),
            Enter.theValue(itemName).into(this.advancedSearchInputField(nthColumn)),
            Wait.for(Duration.ofSeconds(2)),
            Ensure.eventually(this.noTreeDataGrid(), isVisible())
        );
    }

    /**
     * 点击列表中的按钮（首行）
     * @param 按钮名称
     * @returns 
     */
    clickButtonInGrid = (buttonName) =>
        Task.where(`#actor click button ${buttonName}`,
            Click.on(this.buttonInGrid(buttonName)),
            Wait.for(Duration.ofSeconds(3))
        )

    /******************************* html 元素组件******************************** */

    /**
     * 条件搜索的输入框
     * @param nthColumn 第几列 第一列为0，以此类推
     * @returns 
     */
    advancedSearchInputField = (nthColumn: number) =>
        PageElements.located(By.css('.dx-texteditor-input'))
            .nth(nthColumn)
            .describedAs(`${nthColumn} advenced search input field`)

    buttonInGrid = (buttonName: string) => {
        const mappedButtonName = buttonNameMap.get(buttonName)
        return PageElements.located(By.css(`[cid="${mappedButtonName}"]`)).first()
            .describedAs('button in grid ' + buttonName)
    }

    noDataGrid = () =>
        PageElement.located(By.css('.dx-datagrid-nodata'))
            .describedAs('no data grid')

    noTreeDataGrid = () =>
        PageElement.located(By.css('.dx-treelist-nodata'))
            .describedAs('no tree data grid')

    /**
     * 列表中的指定值
     * @param itemName 
     * @returns 
     */
    textInGrid = (itemName: string | Question<any>) =>
        PageElements.located(By.cssContainingText('.c-cellcntr__text', itemName))
            .first()
            .describedAs(`text: ${itemName} in gird`)
}

const buttonNameMap = new Map()
buttonNameMap.set(EDIT, 'iconbutton4')
buttonNameMap.set(DELETE, 'iconbutton6')