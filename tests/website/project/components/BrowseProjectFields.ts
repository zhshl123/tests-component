import { Duration, Question, Task, Wait } from '@serenity-js/core';
import { By, Click, PageElement } from '@serenity-js/web';

import { EDIT, SUCCEEDED } from '../../../DefaultStaticParams';
import { clickButtonInList } from '../../common';
import { SearchFromFields } from '../../common/abstract';
import { BROWSE_IMPLEMENTATION_PROJECT, BROWSE_PROJECTS } from '../../common/statics';
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
     * 列表首行ID Link
     * @param rowNumber 第几行数据（第一行为0，以此类推）
     */
    IDExpandIcon = (rowNumber: number) => {
        const initRowNumber = 3 + rowNumber
        return PageElement.located(By.id('ctl00_body_dgImplementedProjects_ctl0' + initRowNumber + '_imgExpand'))
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
            Wait.for(Duration.ofSeconds(2)),
            browseProject.checkSearchResult(projectName, SUCCEEDED),
            browseProject.clickIDLink(0),
            Wait.for(Duration.ofSeconds(5)),
        )

    }

    openPlanningProjectInBrowseImplementationProject = (projectName: string | Question<any>) => {
        return Task.where(`#actor search and go to edit project page`,
            browseProject.searchItemInBrowsePage(BROWSE_IMPLEMENTATION_PROJECT, 'Project', projectName),
            Wait.for(Duration.ofSeconds(2)),
            browseProject.checkSearchResult(projectName, SUCCEEDED),
            browseProject.clickIDLink(0),
            Wait.for(Duration.ofSeconds(5)),
            projectTab.clickTab('Planning'),
            Wait.for(Duration.ofSeconds(5)),
        )

    }

    searchAndEditPlanningProject = (projectName: string | Question<any>) => {
        return Task.where(`#actor search and go to edit project page`,
            browseProject.searchItemInBrowsePage(BROWSE_PROJECTS, 'Project', projectName),
            Wait.for(Duration.ofSeconds(2)),
            browseProject.checkSearchResult(projectName, SUCCEEDED),
            clickButtonInList.using(EDIT),
            Wait.for(Duration.ofSeconds(5)),
        )

    }

}

export const browseProject = new BrowseProjectFields(projectAttributesMap)
