/* eslint-disable unicorn/filename-case */
import { Duration, Task, Wait } from '@serenity-js/core';
import { By, Click, PageElement } from '@serenity-js/web';

import { DELETE, OK } from '../../../DefaultStaticParams';
import { clickButton, clickMessagePopupButton } from '../../common';

export const clickRFPTab = {
    using: (tabName) =>
        Task.where(`#actor click rfp tab: ${tabName}`,
            Click.on(RFPGeneralInfo.rfpTab(tabName)),

        )
}

export const deleteRFP = () => 
    Task.where('#actor check RFP general information',
        clickButton.using(DELETE),
        Wait.for(Duration.ofSeconds(5)),
        clickMessagePopupButton.using(OK),
        Wait.for(Duration.ofSeconds(5))
    )

/**
 * Edit RFP 的General 组件
 */
export class RFPGeneralInfo {
    static rfpTabPanel = () =>
        PageElement.located(By.id('ctl00_cipTabs_UcGeneralTabs_divTab'))
            .describedAs('RFP tab panel')

    static rfpTab = (tabName: string) =>
        PageElement.located(By.cssContainingText('a', tabName))
            .of(this.rfpTabPanel())
            .describedAs('RFP tab:' + tabName)

    static rfpgeneralTab = () =>
        PageElement.located(By.css(`[tabid="1"]`))
            .of(this.rfpTabPanel())
            .describedAs('RFP General tab')

}