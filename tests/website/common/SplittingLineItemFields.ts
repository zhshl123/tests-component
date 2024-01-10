import { Ensure ,not} from '@serenity-js/assertions'
import { Task } from '@serenity-js/core'
import { By, Click, isEnabled, isVisible ,PageElement, PageElements, Switch} from '@serenity-js/web'

import { CANCEL, SUCCEEDED } from '../../DefaultStaticParams'

export class SplittingLineItemFields {
    editSplittingLineItemDetailPopupButton = (buttonName: string) =>
        PageElement.located(By.id('ctl00_body_ucSplit_popDialogBox_btn' + buttonName))
            .describedAs('splitting line item edit popup button:' + buttonName)

    splittingLineitemSectionPanel = () =>
        PageElement.located(By.id('div_ctl00_body_ucSplit_gv'))
            .describedAs('splitting line item setion panel')

    editIconList = () =>
        PageElements.located(By.css('.imgEditPointer'))
            .of(this.splittingLineitemSectionPanel())
            .describedAs('buttons in splitting line item grid')

    editSplittingLineItemDetailPopupPanel = () =>
        PageElement.located(By.id('ctl00_body_ucSplit_popDialogBox_DialogPanel'))
            .describedAs('splitting line item edit popup panel')

    /**
     * 点击grid中首行的button
     * @returns 
     */
    clickEditButtonInGrid = () =>
        Task.where(`#actor click button in splitting Line item grid`,
            Click.on(this.editIconList().first())
        )

    /**
     * 检查edit splitting line item detail弹窗的按钮是否可用
     * @param buttonName 
     * @param expectedResult 
     * @returns 
     */
    checkButtonEnableInEditSplittingDetailPopup = (buttonName: string, expectedResult: string) => {
        return expectedResult === SUCCEEDED ? Task.where(`#actor check ${buttonName} button in splitting line item edit popup ${expectedResult}`,
            Ensure.eventually(this.editSplittingLineItemDetailPopupPanel(), isVisible()),
            Switch.to(this.editSplittingLineItemDetailPopupPanel()),
            Ensure.eventually(this.editSplittingLineItemDetailPopupButton(buttonName), isEnabled()),
            Click.on(this.editSplittingLineItemDetailPopupButton(CANCEL))
        ) : Task.where(`#actor check ${buttonName} button in splitting line item edit popup ${expectedResult}`,
            Ensure.eventually(this.editSplittingLineItemDetailPopupPanel(), isVisible()),
            Switch.to(this.editSplittingLineItemDetailPopupPanel()),
            Ensure.eventually(this.editSplittingLineItemDetailPopupButton(buttonName), not(isEnabled())),
            Click.on(this.editSplittingLineItemDetailPopupButton(CANCEL))
        )

    }

}

export const splittingLineitem = new SplittingLineItemFields()