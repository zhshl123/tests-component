import { Ensure, isPresent } from '@serenity-js/assertions';
import { Task } from '@serenity-js/core';
import { By, Click,PageElements } from '@serenity-js/web';

/**
 * 点击目标按钮
 * @param targetButtonName 按钮名称
 * @param nthButton 第几个按钮 默认0
 */
export const clickButton = {
    using: (targetButtonName: string, nthButton = 0) =>
        Task.where(`#actor click the button ${targetButtonName}`,
            Ensure.eventually(targetButton.getButton(targetButtonName, nthButton), isPresent()),
            Click.on(targetButton.getButton(targetButtonName, nthButton))
        )
}

/**
 * 点击目标按钮
 */
export const clickIconButton = {
    using: (targetButtonName: string, nthButton = 0) =>
        Task.where(`#actor click the icon button ${targetButtonName}`,
            Click.on(iconButton(targetButtonName, nthButton))
        )
}

/**
 * 通用的按钮组件 （Advanced Search、Add、Save、Cancel、）
 * @param targetButton 
 * @returns 
 */
export const targetButton = {
    getButton: (targetButtonName: string, nthButton = 0) =>
        PageElements.located(By.cssContainingText('.c-icontext__text', targetButtonName))
            .nth(nthButton)
            .describedAs('button: ' + targetButtonName)
}

/**
 * 通用图形的按钮组件,主要为页面顶部的图形按钮，例如open in a tab，弹窗的关闭按钮等
 * @param buttonName 
 * @returns 
 */
export const iconButton = (buttonName: string, nthButton = 0) =>
    PageElements.located(By.css(`[title="${buttonName}"]`))
        .nth(nthButton)
        .describedAs('icon button ' + buttonName)
