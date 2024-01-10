import { Ensure, not } from '@serenity-js/assertions'
import { Question, Task } from '@serenity-js/core'
import { By, Click, isEnabled, isVisible, PageElement } from '@serenity-js/web'

import { SUCCEEDED } from '../../DefaultStaticParams'
import { gridList } from './GridList'

/**
 * 点击目标按钮（主要为page顶部的按钮）
 * @param targetButtonName 目标按钮名称 具体参看文件DefaultStaticParams.ts文件中的常量
 */
export const clickButton = {
    using: (targetButtonName: string) =>
        Task.where(`#actor click the button ${targetButtonName}`,
            Click.on(targetButton(targetButtonName))
        )
}

/**
 * 点击列表中首行的的按钮
 * @param buttonName 按钮名称 具体参看文件DefaultStaticParams.ts文件中的常量
 */
export const clickButtonInList = {
    using: (buttonName: string) =>
        Task.where(`#actor click the grid button ${buttonName}`,
            Click.on(buttonInList(buttonName))
        )
}

/**
 * 点击Section的按钮（页面中只有一个bulk edit section时可用）
 * @param buttonName 按钮名称 具体参看文件DefaultStaticParams.ts文件中的常量
 */
export const clickSectionButton = {
    using: (buttonName: string) =>
        Task.where(`#actor click the section button ${buttonName}`,
            Click.on(sectionButton(buttonName))
        )
}

/**
 * 点击指定Section的按钮（页面中有多个bulk edit section时使用）
 * @param buttonName 按钮名称 具体参看文件DefaultStaticParams.ts文件中的常量
 * @param parentElement section的元素名称 
 */
export const clickSectionButtonOfTargetElement = {
    using: (buttonName: string, parentElement: Question<any>) =>
        Task.where(`#actor click the section button ${buttonName}`,
            Click.on(sectionButtonOfTargetElement(buttonName, parentElement))
        )
}

/**
 * 点击Tab页面中Grid Section顶部的按钮
 * @param tabPage 目标Tab页面
 * @param GridButton 目标按钮名称
 */
export const clickGridButton = {
    using: (tabPage:string,GridButton: string) =>
        Task.where(`#actor click the button ${GridButton}`,
            Click.on(targetGridButton(tabPage,GridButton))
        )
}

/**
 * 点击Tab页面中Grid Section全选CheckBox
 * @param tabPage 目标Tab页面
 * @param GridButton 目标按钮名称
 */
export const clickSelectAllCheckBox = {
    using: (tabPage:string,GridButton: string) =>
        Task.where(`#actor click the button ${GridButton}`,
            Click.on(selectAllCheckBox(tabPage,GridButton))
        )
}

/**
 * click action button (一般为页面顶部的操作按钮)
 * @returns 
 */
export const clickActionButton = {
    using: (buttonName: string) =>
        Task.where(`#actor click action button: ${buttonName}`,
            Click.on(actionButton(buttonName))
        )
}

/**
 * click grid内部的button (一般为Grid行内的操作按钮)
 * @returns 
 */
export const clickGridCellButton = {
    using: (buttonName: string) =>
        Task.where(`#actor click action button: ${buttonName}`,
            Click.on(gridButton(buttonName)),
        )
}

/**
 * click Popup Window的button
 * @returns 
 */
export const clickPopupButton = {
    using: (buttonName: string) =>
        Task.where(`#actor click action button: ${buttonName}`,
            Click.on(popupButton(buttonName)),
        )
}
/**
 * 检查按钮是否可见（页面顶部的按钮）
 * @param 按钮名称
 * @param 预期结果 SUCCEEDED 按钮可见 FAILED 按钮不可见
 */
export const checkButtonVisible = {
    using: (buttonName: string, expectedResult: string) => {
        return expectedResult === SUCCEEDED ? Task.where(`#actor check button: ${buttonName} visible ${expectedResult}`,
            Ensure.eventually(targetButton(buttonName), isVisible())
        ) : Task.where(`#actor check bulk edit section button: ${buttonName} visible ${expectedResult}`,
            Ensure.eventually(targetButton(buttonName), not(isVisible()))
        )
    }
}

/**
 * 检查Section 按钮是否可见（页面顶部的按钮）
 * @param 按钮名称
 * @param 预期结果 SUCCEEDED 按钮可见 FAILED 按钮不可见
 */
export const checkSectionButtonVisible = {
    using: (buttonName: string, expectedResult: string) => {
        return expectedResult === SUCCEEDED ? Task.where(`#actor check section button: ${buttonName} visible ${expectedResult}`,
            Ensure.eventually(sectionButton(buttonName), isVisible())
        ) : Task.where(`#actor check section button: ${buttonName} visible ${expectedResult}`,
            Ensure.eventually(sectionButton(buttonName), not(isVisible()))
        )
    }
}

/**
 * 检查bulk edit section 按钮是否可点击（页面顶部的按钮）
 * @param 按钮名称
 * @param 预期结果 SUCCEEDED 按钮可点击 FAILED 按钮不可点击
 */
export const checkButtonEnable = {
    using: (buttonName: string, expectedResult: string) => {
        return expectedResult === SUCCEEDED ? Task.where(`#actor check bulk edit section button: ${buttonName} visible ${expectedResult}`,
            Ensure.eventually(targetButton(buttonName), isEnabled())
        ) : Task.where(`#actor check bulk edit section button: ${buttonName} visible ${expectedResult}`,
            Ensure.eventually(targetButton(buttonName), not(isEnabled()))
        )
    }
}

/**
 * 根据按钮名称获取列表首行的按钮
 * @param buttonName 按钮名称
 * @returns 
 */
export const buttonInList = (buttonName: string) =>
    PageElement.located(By.css(`[title="${buttonName}"]`))
        .of(gridList().first())
        .describedAs(buttonName + 'button')

/**
 * 通用的按钮组件 （Advanced Search、Add、Save、Cancel、OK）
 * @param targetButton 
 * @returns 
 */
export const targetButton = (targetButtonName: string) =>
    PageElement.located(By.css(`[value="${targetButtonName}"]`))
        .describedAs(targetButtonName + 'button')

export const commonButton = (targetButtonName: string) =>
    PageElement.located(By.id('ctl00_btn' + targetButtonName))
            .describedAs(targetButtonName + 'button')

export const sectionButton = (buttonName: string) =>
    PageElement.located(By.css(`[title="${buttonName}"]`))
        .describedAs(buttonName + 'button')

export const sectionButtonOfTargetElement = (buttonName: string, parentElement: Question<any>) =>
    PageElement.located(By.css(`[title="${buttonName}"]`))
        .of(parentElement)
        .describedAs(buttonName + 'button')

export const actionButton = (buttonName: string) =>
    PageElement.located(By.id('ctl00_cipActionBar_btn' + buttonName))
        .describedAs('action button:' + buttonName)
 
/**
 * Grid通用的按钮组件 （Add、Export、Load From、Batch Delete）
 * @param targetButton 
 * @param tabName
 * @returns 
 */
export const targetGridButton = (tabName:string,targetGridButton: string) =>
    PageElement.located(By.id('ctl00_body_gv' + tabName +'_ctl01_' + targetGridButton))
    .describedAs(tabName + targetGridButton + 'button')    
    
/**
 * Grid全选CheckBox（例Solicitation Bidders Tab Grid）
 * @param targetButton 
 * @param tabName
 * @returns 
 */
export const selectAllCheckBox = (tabName:string,targetGridButton: string) =>
    PageElement.located(By.id('ctl00_body_gv' + tabName +'_ctl02_' + targetGridButton))
    .describedAs(tabName + targetGridButton + 'button')  

/**
 * Grid内button（例Edit、Delete Button）
 * @param targetButton 
 * @returns 
 */
export const gridButton = (targetGridButton: string) =>
    PageElement.located(By.css(`[alt="${targetGridButton}"]`))
    .describedAs(targetGridButton + 'button')

/**
 * Popup button（例OK、Cancel Button）
 * @param targetButton 
 * @returns 
 */
export const popupButton = (targetPopupButton: string) =>
    PageElement.located(By.id('ctl00_btn' + targetPopupButton))
    .describedAs(targetPopupButton + 'button')    