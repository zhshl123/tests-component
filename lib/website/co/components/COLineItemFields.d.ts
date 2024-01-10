import { LineItemFields } from '../../common/abstract';
export declare class CoLineitemFields extends LineItemFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    /**
     * 没有contract Summary面板时的chang items列表面板
     * @returns
     */
    changeItemsPanel: () => any;
    /**
     * contract Summary面板
     * @returns
     */
    contractSummaryPanel: () => any;
    /**
     * 选择contract Summary的弹窗面板
     * @returns
     */
    contractSummaryPopup: () => any;
    /**
     * contract Summary面板的view图标
     * @returns
     */
    viewIconInContractSummaryPanel: () => any;
    /**
     * contract Summary面板的view图标点击出来的line item列表
     *
     * @returns
     */
    viewCOLineItemPanel: () => any;
}
export declare const COLineItem: CoLineitemFields;
