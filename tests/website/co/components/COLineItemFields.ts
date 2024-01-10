import { By, PageElement } from '@serenity-js/web';

import { LineItemFields } from '../../common/abstract';
import { COLineItemAttributeMap } from './COLineItemAttributes';

export class CoLineitemFields extends LineItemFields {
    entityMap: Map<string, string>

    constructor(entityMap) {
        super(entityMap);

    }

    /**
     * 没有contract Summary面板时的chang items列表面板
     * @returns 
     */
    changeItemsPanel = () =>
        PageElement.located(By.id('ctl00_body_ucCOLineItemSection173_divLineItems'))
            .describedAs('change item panel')

    /**
     * contract Summary面板
     * @returns 
     */
    contractSummaryPanel = () =>
        PageElement.located(By.id('div_ctl00_body_ctl10_gv'))
            .describedAs('contract summary panel')

    /**
     * 选择contract Summary的弹窗面板
     * @returns 
     */
    contractSummaryPopup = () =>
        PageElement.located(By.id('ctl00_body_ctl10_msContracts_ifmPopup'))
            .describedAs('contract summary popup')

    /**
     * contract Summary面板的view图标
     * @returns 
     */
    viewIconInContractSummaryPanel = () =>
        PageElement.located(By.id('ctl00_body_ctl10_gv_ctl03_btnView'))
            .describedAs('view icon in contract summary panel')

    /**
     * contract Summary面板的view图标点击出来的line item列表
     * 
     * @returns 
     */
    viewCOLineItemPanel = () =>
        PageElement.located(By.id('ctl00_body_ucCOLineItemSection163_divLineItems'))
            .describedAs('view CO Line Item panel')
}

export const COLineItem = new CoLineitemFields(COLineItemAttributeMap)