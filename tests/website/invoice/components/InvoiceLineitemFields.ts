import { Ensure } from '@serenity-js/assertions';
import { Duration, Question, Task, Wait } from '@serenity-js/core';
import { By, Click, isVisible, PageElement, Switch } from '@serenity-js/web';

import { CANCEL, FAILED, OK, SAVE, SEARCH, SUCCEEDED } from '../../../DefaultStaticParams';
import { checkButtonVisible, checkGridList, checkTextInGridList, clickAllMultiCheckBox, clickButton } from '../../common';
import { LineItemFields } from '../../common/abstract';
import { browseInvoice } from './BrowseInvoiceFields';
import { invoiceLineitemAttributeMap } from './InvoiceLineItemAttributes';

export class InvoiceLineItemFields extends LineItemFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);

    }

    lineItemsSectionPanel = () =>
        PageElement.located(By.id('ctl00_body_ucInvoiceLineItem_bulkEditControl5_ctl02Div'))
            .describedAs('invoice line item section panel')

    /**
     * 点击load from后的弹窗
     * @returns 
     */
    lineItemLoadFromPopupPanel = () =>
        PageElement.located(By.id('ctl00_body_ucInvoiceLineItem_bulkEditControl5_ctl02_ucLoadFrom_ifmPopup'))
            .describedAs('Invoice Line Item Load From Popup Panel')

    /**
     * 点击edit line item detail图标后的弹窗
     * @returns 
     */
    editLineItemDetailPopupPanel = () =>
        PageElement.located(By.id('ctl00_body_ucInvoiceLineItem_bulkEditControl5_ctl02_pnlShowSplit'))
            .describedAs('Invoice Edit Line ItemDetail Popup Panel')

    /**
     * 勾选全部的line item
     * @returns 
     */
    selectAllContractLineItemInPopup = () =>
        Task.where(`#actor select all Line item in popup`,
            Ensure.eventually(this.lineItemLoadFromPopupPanel(), isVisible()),
            Switch.to(this.lineItemLoadFromPopupPanel()).and(
                checkGridList(),
                clickAllMultiCheckBox(),
                clickButton.using(OK),

            )
        )

    /**
     * 勾选目标的line item
     * @returns 
     */
    selectContractLineItemInPopup = (itemName: string) =>
        Task.where(`#actor select Line item in popup`,
            Ensure.eventually(this.lineItemLoadFromPopupPanel(), isVisible()),
            Switch.to(this.lineItemLoadFromPopupPanel()).and(
                Click.on(browseInvoice.lookupInputField('SOV Item')),
                Ensure.eventually(browseInvoice.lookupInputField('SOV Item'), isVisible()),
                Click.on(browseInvoice.lookupDropdownItem('SOV Item', itemName)),
                clickButton.using(SEARCH),
                checkTextInGridList.using(itemName),
                clickAllMultiCheckBox(),
                clickButton.using(OK),
                Wait.for(Duration.ofSeconds(3)),

            )
        )

    /**
     * 检查edit line item detail弹窗中的按钮是否可见
     * @param buttonName 
     * @param expectedResult 
     * @returns 
     */
    checkButtonVisibleInEditLineItemDetailPopup = (targetpopupPanel: Question<any>, buttonName: string, expectedResult: string) => {
        return expectedResult === SUCCEEDED ? Task.where(`#actor check ${buttonName} button visible in popup ${expectedResult}`,
            Ensure.eventually(targetpopupPanel, isVisible()),
            Switch.to(targetpopupPanel),
            checkButtonVisible.using(SAVE, SUCCEEDED),
            clickButton.using(CANCEL)
        ) : Task.where(`#actor check ${buttonName} button visible in popup ${expectedResult}`,
            Ensure.eventually(targetpopupPanel, isVisible()),
            Switch.to(targetpopupPanel),
            checkButtonVisible.using(SAVE, FAILED),
            clickButton.using(CANCEL)
        )

    }

}

export const invoiceLineitem = new InvoiceLineItemFields(invoiceLineitemAttributeMap)