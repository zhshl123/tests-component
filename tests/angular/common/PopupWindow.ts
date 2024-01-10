import { Ensure } from '@serenity-js/assertions';
import { Check, Task } from '@serenity-js/core';
import { By, Click, isVisible, PageElement, PageElements } from '@serenity-js/web';

import { OK } from '../../DefaultStaticParams';
import { clickIconButton } from './ClikButton';

/**
 * 弹窗集合
 * @returns 
 */
export const allPopupWindows = () =>
    PageElements.located(By.css('.c-popup-container'))
        .describedAs('popup windows')

/**
 * 目标弹窗 
 * @param nthWindow 第几个弹窗，按点击顺序，从最底层往上数， 第一个弹窗为0，以此类推
 * @returns 
 */
export const targetPopupWindow = (nthWindow: number) =>
    allPopupWindows()
        .nth(nthWindow)
        .describedAs(nthWindow + ' popup window')

/**
 * 提示信息弹窗
 * @returns 
 */
export const alertMssageBox = () =>
    PageElement.located(By.css(`[cdkdragboundary=".drop"]`))
        .describedAs('alert message box')

/**
 * 提示信息弹窗的按钮
 * @param buttonName 
 * @returns 
 */
export const buttonInAlertMessageBox = (buttonName: string) =>
    PageElement.located(By.cssContainingText('button', buttonName))
        .of(alertMssageBox())
        .describedAs(buttonName + ' in alert message box')

/**
 * 提示信息框的标题图标
 * @returns 
 */
export const iconInAlertMessageBox = () =>
    PageElement.located(By.css('.c-popup__titleicon'))
        .of(alertMssageBox())
        .describedAs('icon in alert message box')

/**
 * 检查提示信息弹窗，并关闭
 * @returns 
 */
export const checkAndCloseAlertMessageBox = () =>
    Task.where(`#actor check alert message box and close it`,
        Check.whether(iconInAlertMessageBox(), isVisible()
        ).andIfSo(
            Ensure.eventually(alertMssageBox(), isVisible()),
            Click.on(buttonInAlertMessageBox(OK)),
        )

    )

/**
 * 检查提示信息弹窗，并关闭弹窗
 * @returns 
 */
export const checkAndClosePopupWindow = () =>
    Task.where(`#actor check alert message box and close popup`,
        Check.whether(iconInAlertMessageBox(), isVisible()
        ).andIfSo(
            Ensure.eventually(iconInAlertMessageBox(), isVisible()),
            Click.on(buttonInAlertMessageBox(OK)),
            clickIconButton.using('Close')
        )

    )
