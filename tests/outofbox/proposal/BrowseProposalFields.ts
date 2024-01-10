import { Ensure, includes, isPresent } from '@serenity-js/assertions';
import { Check, Duration, Log, Question, Task, Wait } from '@serenity-js/core';
import { By, Click, Page, PageElement, PageElements } from '@serenity-js/web';

import { SEARCH } from '../../DefaultStaticParams';
import { clickButton, openPage } from '../common';
import { SearchFromFields } from '../common/abstract';
import { proposal } from './EditProposalFields';
import { proposalAttributeMap } from './ProposalAttributes';

export class BrowseProposalFields extends SearchFromFields {
    entityMap: Map<string, string>
    proposalName: string
    constructor(entityMap) {
        super(entityMap);

    }

    /**
    * 在browse页面搜索目标值(单条件查询，仅限查询字段为text类型)
    * 多条件查询，请在子类重新定义新的方法
    * @param pageName 页面名称
    * @param fieldName 填入关键词的字段名
    * @param itemName 搜索的关键词
    * @returns 
    */
    searchItemInBrowsePage = (pageName: string, fieldName: string, itemName: string | Question<any>) => {
        return Task.where(`#actor search item: ${itemName} with ${fieldName}`,
            Check.whether(Page.current().title(), includes(pageName)
            ).andIfSo(
                Log.the('current page is ' + pageName)
            ).otherwise(
                openPage.using(pageName),
                Wait.for(Duration.ofSeconds(2)),
            ),
            this.selectDropdownItem('Cycle', proposal.cycle),
            Wait.for(Duration.ofSeconds(5)),
            this.selectScenarioLookupDropdownItem(proposal.scenario),
            this.fillTextInputField(fieldName, itemName),
            clickButton.using(SEARCH),
            Wait.for(Duration.ofSeconds(3)),
        )
    }


    /**
     * 选择scenario lookup下拉框中的具体选项
     * @param itemName 选项的值
     * @returns
     */
    selectScenarioLookupDropdownItem = (itemName: string) => {
        return Task.where(`#actor selects scenario dropdown item '${itemName}'`,
            Click.on(this.scenarioInputFieldClearIcon()),
            // 点击输入框
            Click.on(this.scenarioLookupDropdownInputField()),
            Wait.for(Duration.ofSeconds(3)),
            // 确保下拉框有值之后再点击lookup图标
            Ensure.eventually(this.scenarioLookupDropdownList().first(), isPresent()),
            // 点击下拉框的值
            Click.on(this.scenarioLookupDropdownItem(itemName)),
            Click.on(this.scenarioFieldLabel())

        );
    }


    scenarioInputFieldClearIcon = () =>
        PageElement.located(By.id('ctl00_body_AB_cstm_Stage_btnClear'))
            .describedAs('Scenario input field clear icon')

    scenarioLookupDropdownItem = (itemName: string) =>
        PageElement.located(By.css(`[title="${itemName}"]`))
            .of(this.scenarioLookupDropdownListBox())
            .describedAs(`scenario dropdown item: ${itemName}`)

    scenarioLookupDropdownInputField = () => {
        return PageElement.located(By.css(`[aria-describedby="ctl00_body_AB_cstm_Stage_select_taglist"]`))
            .describedAs('scenario lookup input field')
    }

    scenarioLookupDropdownList = () =>
        PageElements.located(By.css('li'))
            .of(this.scenarioLookupDropdownListBox())
            .describedAs('scenario lookup dropdown list')

    scenarioLookupDropdownListBox = () =>
        PageElement.located(By.id('ctl00_body_AB_cstm_Stage_select_listbox'))
            .describedAs('scenario lookup dropdown list box')

    scenarioFieldLabel = () =>
        PageElement.located(By.id('ctl00_body_AB_cstm_Stage_FL'))
            .describedAs(`scenario field label`)

    firstCheckboxInGrid = () =>
        PageElement.located(By.id('ctl00_body_dgProjects_row1_GridView_ItemCheckBox'))
            .describedAs('first check box in grid')


}

export const browseProposal = new BrowseProposalFields(proposalAttributeMap)