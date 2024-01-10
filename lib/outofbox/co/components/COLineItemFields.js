"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COLineItem = exports.CoLineitemFields = void 0;
const web_1 = require("@serenity-js/web");
const abstract_1 = require("../../common/abstract");
const COLineItemAttributes_1 = require("./COLineItemAttributes");
class CoLineitemFields extends abstract_1.LineItemFields {
    constructor(entityMap) {
        super(entityMap);
        /**
         * 没有contract Summary面板时的chang items列表面板
         * @returns
         */
        this.changeItemsPanel = () => web_1.PageElement.located(web_1.By.id('ctl00_body_ucCOLineItemSection173_divLineItems'))
            .describedAs('change item panel');
        /**
         * contract Summary面板
         * @returns
         */
        this.contractSummaryPanel = () => web_1.PageElement.located(web_1.By.id('div_ctl00_body_ctl10_gv'))
            .describedAs('contract summary panel');
        /**
         * 选择contract Summary的弹窗面板
         * @returns
         */
        this.contractSummaryPopup = () => web_1.PageElement.located(web_1.By.id('ctl00_body_ctl10_msContracts_ifmPopup'))
            .describedAs('contract summary popup');
        /**
         * contract Summary面板的view图标
         * @returns
         */
        this.viewIconInContractSummaryPanel = () => web_1.PageElement.located(web_1.By.id('ctl00_body_ctl10_gv_ctl03_btnView'))
            .describedAs('view icon in contract summary panel');
        /**
         * contract Summary面板的view图标点击出来的line item列表
         *
         * @returns
         */
        this.viewCOLineItemPanel = () => web_1.PageElement.located(web_1.By.id('ctl00_body_ucCOLineItemSection163_divLineItems'))
            .describedAs('view CO Line Item panel');
    }
}
exports.CoLineitemFields = CoLineitemFields;
exports.COLineItem = new CoLineitemFields(COLineItemAttributes_1.COLineItemAttributeMap);
//# sourceMappingURL=COLineItemFields.js.map