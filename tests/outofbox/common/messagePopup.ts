import { Ensure, includes, isPresent, not } from '@serenity-js/assertions';
import { Check, Task, Wait } from '@serenity-js/core';
import { By, Click, isVisible, PageElement, Text } from '@serenity-js/web';

import { CANCEL, OK, SUCCEEDED } from '../../DefaultStaticParams';
import { clickActionButton } from './ClickButton';

/**
 * check message popup is show or not
 * @returns 
 */
export const checkMessagePopupBox = () =>
    Task.where(`#actor check message popup box`,
        Ensure.eventually(messagePopupBox(), isPresent()),
    )

/**
 * check message popup is visible
 * @returns 
 */
export const waitMessagePopupBoxVisible = () =>
    Task.where(`#actor check message popup box`,
        Wait.until(messagePopupBox(), isPresent()),
        Check.whether(
            Text.of(messagePopupContent()), includes('Duplicate')
        ).andIfSo(
            clickMessagePopupButton.using(OK),
            clickActionButton.using(CANCEL)
        ).otherwise(
            Check.whether(
                Text.of(messagePopupContent()), includes('already')
            ).andIfSo(
                clickMessagePopupButton.using(OK),
                clickActionButton.using(CANCEL)
            )
        )
    )
/**
 * wait message popup invisible
 * @returns 
 */
export const waitMessagePopupBoxInvisible = () =>
    Task.where(`#actor wait message popup invisible`,
        Wait.until(messagePopupBox(), not(isVisible()))
    )

/**
 * click message popup button
 * @returns 
 */
export const clickMessagePopupButton = {
    using: (buttonName: string) =>
        Task.where(`#actor click message popup button: ${buttonName}`,
            Click.on(messagePopupButton(buttonName))
        )
}

/**
 * click solicitation message popup button
 * @returns 
 */
export const clickSolicitationMessagePopupButton = {
    using: (buttonName: string) =>
        Task.where(`#actor click message popup button`,
            Click.on(solicitationMessagePopupButton(buttonName))
        )
}

/**
 * click message popup content link
 * @returns 
 */
export const clickMessagePopupContentLink = () =>
    Task.where(`#actor click message popup content link`,
        Click.on(messagePopupContentLink())
    )

/**
 * 检查信息提示框内容
 * @Param 预期的文字
 * @param 期望结果 SUCCEEDED与预期一致， FAILED 与预期不一致
 * @returns 
 */
export const checkMessagePopupContent = {
    using: (content: string, expectedResult: string) => {
        return expectedResult == SUCCEEDED ? Task.where(`#actor check message popup content`,
            Ensure.eventually(messagePopupBox(), isVisible()),
            Ensure.eventually(Text.of(messagePopupContent()), includes(content))
        ) : Task.where(`#actor check message popup content`,
            Ensure.eventually(messagePopupBox(), isVisible()),
            Ensure.eventually(Text.of(messagePopupContent()), not(includes(content)))
        )
    }
}

export const checkGridLoadingLayer = () =>
    Task.where(`#actor wait grid load complete`,
        Wait.until(gridLoadingLayer(), not(isVisible()))
    )

export const waitPageSaveLodingLayerInvisible = () =>
    Task.where(`#actor wait page save load complete`,
        Wait.until(pageSaveLodingLayer(), not(isVisible()))
    )

export const messagePopupBox = () =>
    PageElement.located(By.id('ctl00_popupForModalPopup'))
        .describedAs('message popup box')

export const solicitationMessagePopupBox = () =>
    PageElement.located(By.id('ctl00_body_cbDelete_Dialog_DialogPanel'))
        .describedAs('solicitation message popup box')

export const messagePopupContent = () =>
    PageElement.located(By.id('ctl00_dvConfirmBoxContent'))
        .of(messagePopupBox())
        .describedAs('message popup content')

export const messagePopupButton = (buttonName: string) =>
    PageElement.located(By.css(`[value="${buttonName}"]`))
        .of(messagePopupBox())
        .describedAs('message popup button:' + buttonName)

export const solicitationMessagePopupButton = (buttonName: string) =>
    PageElement.located(By.css(`[value="${buttonName}"]`))
        .of(solicitationMessagePopupBox())
        .describedAs('solicitation message popup button:' + buttonName)

export const messagePopupContentLink = () =>
    PageElement.located(By.css('a'))
        .of(messagePopupBox())
        .describedAs('message popup conternt link')

export const pageLoadingLayer = () =>
    PageElement.located(By.id('promptBox'))
        .describedAs('page loading layer')

export const gridLoadingLayer = () =>
    PageElement.located(By.css(`[data-name="divWaitingLoading"]`))
        .describedAs('grid loading layer')

export const pageSaveLodingLayer = () =>
    PageElement.located(By.id('ajaxMask'))
        .describedAs('page Save Loding Layer')

