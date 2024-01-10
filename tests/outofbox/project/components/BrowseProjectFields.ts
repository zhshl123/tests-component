import { Ensure, includes, isPresent } from '@serenity-js/assertions';
import { Check, Duration, Log, Question, Task, Wait } from '@serenity-js/core';
import { By, Click, Page, PageElement, PageElements, Switch } from '@serenity-js/web';

import { SEARCH, SUCCEEDED } from '../../../DefaultStaticParams';
import { clickButton, openPage } from '../../common';
import { SearchFromFields } from '../../common/abstract';
import { BROWSE_IMPLEMENTATION_PROJECT, MANAGE_IMPLEMENTATION_PROJECT } from '../../common/statics';
import { projectAttributesMap } from './ProjectAttributes';
import { projectTab } from './ProjectTab';

export class BrowseProjectFields extends SearchFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);

    }

    /**
     * 列表首行ID Link
     * @param rowNumber 第几行数据（第一行为0，以此类推）
     */
    IDLink = (rowNumber: number) => {
        const initRowNumber = 3 + rowNumber
        return PageElement.located(By.id('ctl00_body_dgImplementedProjects_ctl0' + initRowNumber + '_chkLinkById'))
            .describedAs(`row:${rowNumber} ID link: ' + 'ImplementedProjects`)
    }

    /**
     * 点击列表首行ID Link
     */
    clickIDLink = (rowNumber: number) => {
        return Task.where(`#actor click the row: ${rowNumber} ID Link`,
            Click.on(this.IDLink(rowNumber))
        )
    }

    searchAndEditImplementationProject = (projectName: string | Question<any>) => {
        return Task.where(`#actor search and go to edit project page`,
            browseProject.searchItemInBrowsePage(BROWSE_IMPLEMENTATION_PROJECT, 'Project', projectName),
            Wait.for(Duration.ofSeconds(3)),
            browseProject.checkSearchResult(projectName, SUCCEEDED),
            browseProject.clickIDLink(0),
            Wait.until(Page.whichTitle(includes(MANAGE_IMPLEMENTATION_PROJECT)), isPresent()),
            Switch.to(Page.whichTitle(includes(MANAGE_IMPLEMENTATION_PROJECT)))
        )

    }

    /**
     * 在browse draft planning页面搜索目标值(单条件查询，仅限查询字段为text类型)
     * @param pageName 页面名称
     * @param cycleName cycle名
     * @param fieldName 填入关键词的字段名
     * @param itemName 搜索的关键词
     * @returns 
     */
    searchItemInBrowsePlanningProjectPage = (pageName: string, cycleName: string, fieldName: string, itemName: string | Question<any>) => {
        return Task.where(`#actor search item: ${itemName} with ${fieldName}`,
            Check.whether(Page.current().title(), includes(pageName)
            ).andIfSo(
                Log.the('current page is ' + pageName)
            ).otherwise(
                openPage.using(pageName),
                Wait.for(Duration.ofSeconds(2)),
            ),
            this.selectDropdownItem('Cycle', cycleName),
            Wait.for(Duration.ofSeconds(5)),
            this.fillTextInputField(fieldName, itemName),
            clickButton.using(SEARCH),
            Wait.for(Duration.ofSeconds(3)),

        )
    }

    searchAtTopLavelCheckbox = () =>
        PageElement.located(By.id('ctl00_body_chkSearchTopOnly'))
            .describedAs('search at top level checkbox')

    openPlanningProjectInBrowseImplementationPage = (projectName: string | Question<any>) => {
        return Task.where(`#actor open Planning Project in BrowseImplementation Project Page`,
            browseProject.searchAndEditImplementationProject(projectName),
            Wait.until(Page.whichTitle(includes(MANAGE_IMPLEMENTATION_PROJECT)), isPresent()),
            Switch.to(Page.whichTitle(includes(MANAGE_IMPLEMENTATION_PROJECT))),
            Wait.for(Duration.ofSeconds(3)),
            projectTab.clickTab('Planning'),
            Wait.for(Duration.ofSeconds(5)),
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

    /**
    * lookup输入框的下拉框列表
    * @param fieldName 字段名称
    * @returns 
    */
    lookupDropdownList = (fieldName: string) =>
        PageElements.located(By.css('li'))
            .of(this.lookupDropdownListBox(fieldName))
            .describedAs('lookup dropdown list: ' + fieldName)

}

export const browseProject = new BrowseProjectFields(projectAttributesMap)
