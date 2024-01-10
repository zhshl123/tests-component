"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractDefaultLineItemSplitting = exports.addContractDefaultLineItemSplitting = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../../DefaultStaticParams");
const common_1 = require("../../common");
const components_1 = require("../components");
const ContractDefaultLineItemSplittingAttributes_1 = require("../components/ContractDefaultLineItemSplittingAttributes");
exports.addContractDefaultLineItemSplitting = {
    using: (contractDefaultLineItems) => core_1.Task.where(`#actor add contract default line items`, common_1.clickSectionButton.using(DefaultStaticParams_1.ADD), core_1.Check.whether(contractDefaultLineItemSlitting.lookupIcon('Project', 1), (0, web_1.isVisible)()).andIfSo(web_1.Click.on(contractDefaultLineItemSlitting.checkBox(1)), common_1.clickSectionButton.using(DefaultStaticParams_1.DELETE)), contractDefaultLineItemSlitting.searchItemInPopup('Project', 0, contractDefaultLineItems.rowsHash().Project, 'Project Name'), contractDefaultLineItemSlitting.searchItemInPopup('Fund', 0, contractDefaultLineItems.rowsHash().Fund, 'Fund ID'), contractDefaultLineItemSlitting.fillTextInputField('Percentage', 0, contractDefaultLineItems.rowsHash().Percentage), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.checkMessagePopupBox)(), (0, common_1.waitMessagePopupBoxInvisible)(), core_1.Wait.for(core_1.Duration.ofSeconds(5)))
};
class ContractDefaultLineItemSplitting {
    constructor() {
        this.sectionPanel = () => web_1.PageElement.located(web_1.By.id('ctl00_body_ucLineItemSplit_divAll'))
            .describedAs('Default Line Item Splitting section panel');
        this.tableCell = (fieldName, rowNumber = 0) => web_1.PageElement.located(web_1.By.id('ctl00_body_ucLineItemSplit_' + ContractDefaultLineItemSplittingAttributes_1.contractDefaultLineItemSplittingAttributesMap.get(fieldName) + rowNumber))
            .describedAs(`Default Line ItemSplitting table cell:${fieldName}, item No.: ${rowNumber}`);
        this.inputField = (fieldName, rowNumber = 0) => web_1.PageElement.located(web_1.By.css('input'))
            .of(this.tableCell(fieldName, rowNumber))
            .describedAs(`Default Line ItemSplitting table cell:${fieldName}, item No.: ${rowNumber} lookup input field`);
        this.lookupIcon = (fieldName, rowNumber = 0) => web_1.PageElement.located(web_1.By.css(`[title="Lookup"]`))
            .of(this.tableCell(fieldName, rowNumber))
            .describedAs(`Default Line ItemSplitting table cell:${fieldName}, item No.: ${rowNumber} lookup icon`);
        this.popupPanel = () => web_1.PageElement.located(web_1.By.id('ctl00_body_ucLineItemSplit_ifmPopup'))
            .describedAs('Default Line ItemSplitting Popup panel');
        this.checkBox = (rowNumber = 0) => web_1.PageElement.located(web_1.By.id('ctl00_body_ucLineItemSplit_chkbox' + rowNumber))
            .describedAs(`Default Line ItemSplitting row: ${rowNumber} checkbox`);
        /**
        * 在弹窗中搜索
        * @param fieldName 字段名称
        * @param rowNumber 行号 第一行为0， 以此类推
        * @param itemName 字段值
        * @param popupFieldName 弹窗中的字段
        */
        this.searchItemInPopup = (fieldName, rowNumber, itemName, popupFieldName) => core_1.Task.where(`#actor search row: ${rowNumber}, field: ${fieldName} with ${itemName} in popup field:${popupFieldName}`, web_1.Click.on(this.lookupIcon(fieldName, rowNumber)), assertions_1.Ensure.eventually(this.popupPanel(), (0, web_1.isVisible)()), web_1.Switch.to(this.popupPanel()).and(components_1.browseContract.fillTextInputField(popupFieldName, itemName), common_1.clickButton.using(DefaultStaticParams_1.SEARCH), core_1.Wait.for(core_1.Duration.ofSeconds(2)), components_1.browseContract.checkSearchResult(itemName, DefaultStaticParams_1.SUCCEEDED), (0, common_1.clickFirstSingleCheckBox)(), common_1.clickButton.using(DefaultStaticParams_1.OK)));
        /**
        * 在输入框中填值
        */
        this.fillTextInputField = (fieldName, rowNumber, itemName) => core_1.Task.where(`#actor fill field ${fieldName} with ${itemName}`, web_1.Click.on(this.inputField(fieldName, rowNumber)), web_1.Enter.theValue(itemName).into(this.inputField(fieldName, rowNumber)));
    }
}
exports.ContractDefaultLineItemSplitting = ContractDefaultLineItemSplitting;
const contractDefaultLineItemSlitting = new ContractDefaultLineItemSplitting();
//# sourceMappingURL=ContractDefaultLineItemSplitting.js.map