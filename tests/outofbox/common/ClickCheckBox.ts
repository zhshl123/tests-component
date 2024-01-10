import { Task } from '@serenity-js/core'
import { By, Click, PageElement, PageElements } from '@serenity-js/web'

/**
 * 点击列表中的多选框（全选）
 */
export const clickAllMultiCheckBox = () =>
    Task.where(`#actor click all the multi checkbox in grid`,
        Click.on(gridHeadRowCheckBox())

    )

/**
 * 点击列表中的多选框（首行）
 */
export const clickFirstMultiCheckBox = () =>
    Task.where(`#actor click first multi checkbox in grid`,
        Click.on(multiCheckBoxInGrid().nth(1)),
    )

/**
 * 点击列表中的单选框（首行）
 */
export const clickFirstSingleCheckBox = () =>
    Task.where(`#actor click first single checkbox in grid`,
        Click.on(singleCheckBoxInGrid().first()),
    )

/**
 * 点击列表中的全选框
 */
export const clickAllCheckBox = () =>
    Task.where(`#actor click all checkbox in grid`,
        Click.on(gridAllCheckBox()),
    )

/**
 * 列表中的单选框集合
 */
export const singleCheckBoxInGrid = () =>
    PageElements.located(By.css(`[type="radio"]`))
        .of(resultGridBox())
        .describedAs('single checkbox')

/**
 * 多选框按钮集合
 * @returns 
 */
export const multiCheckBoxInGrid = () =>
    PageElements.located(By.css(`[type="checkbox"]`))
        .of(resultGridBox())
        .describedAs('multi checkbox in grid')

// grid首行
export const gridHeadRow = () =>
    PageElement.located(By.css('.cstdgrid__headrow'))
        .describedAs('grid head row')

// 首行的勾选框
export const gridHeadRowCheckBox = () =>
    PageElement.located(By.css(`[type="checkbox"]`))
        .of(gridHeadRow())
        .describedAs('grid head row check box')

/**
 * 结果列表面板
 * @returns 
 */
export const resultGridBox = () =>
    PageElement.located(By.id('resultGrid'))
        .describedAs('result grid box')

/**
 * Grid全选CheckBox
 * @returns 
 */
export const gridAllCheckBox = () =>
    PageElement.located(By.id('check-all'))
    .describedAs('grid select all checkbox')
