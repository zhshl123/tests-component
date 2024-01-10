import { Duration, Task, Wait } from '@serenity-js/core';
import { By, Click, PageElement } from '@serenity-js/web';

import { DELETE, OK } from '../../../DefaultStaticParams';
import { clickButton, clickMessagePopupButton } from '../../common';

export const clickCORTab = {
    using: (tabName) =>
        Task.where(`#actor click cor tab: ${tabName}`,
            Click.on(CORGeneralInfo.corTab(tabName)),

        )
}

export const deleteCOR = () => 
    Task.where('#actor check cor general information',
        clickButton.using(DELETE),
        Wait.for(Duration.ofSeconds(5)),
        clickMessagePopupButton.using(OK),
        Wait.for(Duration.ofSeconds(5))
    )

/**
 * Edit cor 的General 组件
 */
export class CORGeneralInfo {
    static corTabPanel = () =>
        PageElement.located(By.id('ctl00_cipTabs_UcGeneralTabs_divTab'))
            .describedAs('COR tab panel')

    static corTab = (tabName: string) =>
        PageElement.located(By.cssContainingText('a', tabName))
            .of(this.corTabPanel())
            .describedAs('COR tab:' + tabName)

    static conrgeneralTab = () =>
        PageElement.located(By.css(`[tabid="1"]`))
            .of(this.corTabPanel())
            .describedAs('COR General tab')

}