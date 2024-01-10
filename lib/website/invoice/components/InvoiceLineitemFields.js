"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invoiceLineitem = exports.InvoiceLineItemFields = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../../DefaultStaticParams");
const common_1 = require("../../common");
const abstract_1 = require("../../common/abstract");
const BrowseInvoiceFields_1 = require("./BrowseInvoiceFields");
const InvoiceLineItemAttributes_1 = require("./InvoiceLineItemAttributes");
class InvoiceLineItemFields extends abstract_1.LineItemFields {
    constructor(entityMap) {
        super(entityMap);
        this.lineItemsSectionPanel = () => web_1.PageElement.located(web_1.By.id('ctl00_body_ucInvoiceLineItem_bulkEditControl5_ctl02Div'))
            .describedAs('invoice line item section panel');
        /**
         * 点击load from后的弹窗
         * @returns
         */
        this.lineItemLoadFromPopupPanel = () => web_1.PageElement.located(web_1.By.id('ctl00_body_ucInvoiceLineItem_bulkEditControl5_ctl02_ucLoadFrom_ifmPopup'))
            .describedAs('Invoice Line Item Load From Popup Panel');
        /**
         * 点击edit line item detail图标后的弹窗
         * @returns
         */
        this.editLineItemDetailPopupPanel = () => web_1.PageElement.located(web_1.By.id('ctl00_body_ucInvoiceLineItem_bulkEditControl5_ctl02_pnlShowSplit'))
            .describedAs('Invoice Edit Line ItemDetail Popup Panel');
        /**
         * 勾选全部的line item
         * @returns
         */
        this.selectAllContractLineItemInPopup = () => core_1.Task.where(`#actor select all Line item in popup`, assertions_1.Ensure.eventually(this.lineItemLoadFromPopupPanel(), (0, web_1.isVisible)()), web_1.Switch.to(this.lineItemLoadFromPopupPanel()).and((0, common_1.checkGridList)(), (0, common_1.clickAllMultiCheckBox)(), common_1.clickButton.using(DefaultStaticParams_1.OK)));
        /**
         * 勾选目标的line item
         * @returns
         */
        this.selectContractLineItemInPopup = (itemName) => core_1.Task.where(`#actor select Line item in popup`, assertions_1.Ensure.eventually(this.lineItemLoadFromPopupPanel(), (0, web_1.isVisible)()), web_1.Switch.to(this.lineItemLoadFromPopupPanel()).and(web_1.Click.on(BrowseInvoiceFields_1.browseInvoice.lookupInputField('SOV Item')), assertions_1.Ensure.eventually(BrowseInvoiceFields_1.browseInvoice.lookupInputField('SOV Item'), (0, web_1.isVisible)()), web_1.Click.on(BrowseInvoiceFields_1.browseInvoice.lookupDropdownItem('SOV Item', itemName)), common_1.clickButton.using(DefaultStaticParams_1.SEARCH), common_1.checkTextInGridList.using(itemName), (0, common_1.clickAllMultiCheckBox)(), common_1.clickButton.using(DefaultStaticParams_1.OK), core_1.Wait.for(core_1.Duration.ofSeconds(3))));
        /**
         * 检查edit line item detail弹窗中的按钮是否可见
         * @param buttonName
         * @param expectedResult
         * @returns
         */
        this.checkButtonVisibleInEditLineItemDetailPopup = (targetpopupPanel, buttonName, expectedResult) => {
            return expectedResult === DefaultStaticParams_1.SUCCEEDED ? core_1.Task.where(`#actor check ${buttonName} button visible in popup ${expectedResult}`, assertions_1.Ensure.eventually(targetpopupPanel, (0, web_1.isVisible)()), web_1.Switch.to(targetpopupPanel), common_1.checkButtonVisible.using(DefaultStaticParams_1.SAVE, DefaultStaticParams_1.SUCCEEDED), common_1.clickButton.using(DefaultStaticParams_1.CANCEL)) : core_1.Task.where(`#actor check ${buttonName} button visible in popup ${expectedResult}`, assertions_1.Ensure.eventually(targetpopupPanel, (0, web_1.isVisible)()), web_1.Switch.to(targetpopupPanel), common_1.checkButtonVisible.using(DefaultStaticParams_1.SAVE, DefaultStaticParams_1.FAILED), common_1.clickButton.using(DefaultStaticParams_1.CANCEL));
        };
    }
}
exports.InvoiceLineItemFields = InvoiceLineItemFields;
exports.invoiceLineitem = new InvoiceLineItemFields(InvoiceLineItemAttributes_1.invoiceLineitemAttributeMap);
//# sourceMappingURL=InvoiceLineitemFields.js.map