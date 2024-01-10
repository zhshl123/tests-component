import { DataTable } from '@cucumber/cucumber';
import { Ensure, includes, isPresent } from '@serenity-js/assertions';
import { Duration, List, Question, Task, Wait } from '@serenity-js/core';
import { Click, Cookie, Page, Switch } from '@serenity-js/web';

import { CANCEL, DELETE, OK, SAVE, SEARCH } from '../../DefaultStaticParams';
import { checkLinkInGridList, checkMessagePopupBox, clickActionButton, clickButton, clickFirstMultiCheckBox, clickMessagePopupButton, clickSectionButton, formatted_now, gridList, waitMessagePopupBoxVisible } from '../common';
import { COOKIE_FILTERING_NAME, COOKIE_PROJECT_NAME, MANAGE_IMPLEMENTATION_PROJECT } from '../common/statics';
import { browseProject } from '../project/components/BrowseProjectFields';
import { project } from '../project/components/EditProjectFields';
import { projectTab } from '../project/components/ProjectTab';
import { browseFiltering, filteringPhase } from './EditFitleringFields';
import { filteringPhaseTab } from './FilteringTab';

export const addFiltering = {
    using: (filteringInfo: DataTable) => {
        const timestamp = formatted_now
        return Task.where(`#actor Input all fields and save `,
            filteringPhase.fillTextInputField('Filtering Phase Name', filteringInfo.rowsHash().FilteringPhaseName + timestamp),
            filteringPhase.setCookie(COOKIE_FILTERING_NAME, filteringInfo.rowsHash().FilteringPhaseName + timestamp),

            filteringPhase.clickSingleCheckBox('Is Working Filtering Phase', filteringInfo.rowsHash().IsWorkingFilteringPhase),
            checkMessagePopupBox(),
            clickMessagePopupButton.using(OK),
            Click.on(filteringPhase.lookupInputField('Ranking Phase')),
            Click.on(filteringPhase.lookupDropdownItem('Ranking Phase', filteringInfo.rowsHash().RankingPhase)),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
        )
    }
}

export const editFiltering = {
    using: (filteringInfo: DataTable) => {
        const timestamp = formatted_now
        return Task.where(`#actor Input all fields and save `,
            filteringPhase.fillTextInputField('Filtering Phase Name', filteringInfo.rowsHash().FilteringPhaseName + timestamp),
            filteringPhase.setCookie(COOKIE_FILTERING_NAME, filteringInfo.rowsHash().FilteringPhaseName + timestamp),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
        )
    }
}

export const checkFiltering = {
    using: (Result: string) => {
        return Task.where(`#actor checks value `,
            filteringPhase.checkTextInputFieldValue('Filtering Phase Name', Cookie.called(COOKIE_FILTERING_NAME).value(), Result)
        )
    }
}

export const deleteFiltering = {
    using: () => {
        return Task.where(`#actor delete filtering `,
            clickButton.using(DELETE),
            clickMessagePopupButton.using(OK)
        )
    }
}

export const addWorkingFilteringPhase = {
    using: (filteringInfo: DataTable) => {
        const timestamp = formatted_now
        return Task.where(`#actor add an working filtering phase`,
            filteringPhase.fillTextInputField('Filtering Phase Name', filteringInfo.rowsHash().FilteringPhaseName + timestamp),
            filteringPhase.setCookie(COOKIE_FILTERING_NAME, filteringInfo.rowsHash().FilteringPhaseName + timestamp),

            Click.on(filteringPhase.lookupInputField('Ranking Phase')),
            Click.on(filteringPhase.lookupDropdownItem('Ranking Phase', filteringInfo.rowsHash().RankingPhase)),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
        )
    }
}

export const addProjectInFilteringPhase = {
    using: (projectInfo: DataTable) => {
        return Task.where(`#actor add an working filtering phase`,
            Click.on(filteringPhase.selectAllCheckboxInGrid()),
            clickSectionButton.using('Batch Delete'),
            clickSectionButton.using('Add Row'),
            Ensure.eventually(filteringPhase.projectPopup(), isPresent()),
            Switch.to(filteringPhase.projectPopup()).and(
                browseFiltering.fillTextInputField('Project Name', projectInfo.rowsHash().Project1 + project.timestamp),
                clickButton.using(SEARCH),
                Wait.for(Duration.ofSeconds(3)),
                checkLinkInGridList.using(projectInfo.rowsHash().Project1 + project.timestamp),
                clickFirstMultiCheckBox(),
                browseFiltering.fillTextInputField('Project Name', projectInfo.rowsHash().Project2 + project.timestamp),
                clickButton.using(SEARCH),
                Wait.for(Duration.ofSeconds(3)),
                checkLinkInGridList.using(projectInfo.rowsHash().Project1 + project.timestamp),
                clickFirstMultiCheckBox(),
                clickButton.using(OK),
            ),
            clickButton.using(SAVE),
            Wait.for(Duration.ofSeconds(5)),
        )
    }
}

export const checkFilteringProjectList = {
    using: (projectName: string | Question<any>, expectedResult: string) => {
        return Task.where(`#actor check filtering project list with ${projectName} ${expectedResult}`,
            filteringPhaseTab.clickTab('Step 2: Select and Adjust Projects'),
            Wait.for(Duration.ofSeconds(5)),
            Wait.until(gridList(), isPresent()),
            browseFiltering.checkSearchResult(projectName, expectedResult)
        )
    }
}

export const checkFilteringResult = {
    using: (fundingAvailability, projectName: string | Question<any>, expectedResult: string) => {
        return Task.where(`#actor check ${fundingAvailability} filtering result with ${projectName} ${expectedResult}`,
            browseFiltering.selectDropdownItem('Funding Availability', fundingAvailability),
            clickButton.using(SEARCH),
            Wait.for(Duration.ofSeconds(3)),
            browseFiltering.checkSearchResult(projectName, expectedResult)
        )
    }
}

export const dofilterInFilteringPhase = () => {
    return Task.where(`#actor do filter in filtering phase`,
        filteringPhaseTab.clickTab('Step 2: Select and Adjust Projects'),
        Wait.for(Duration.ofSeconds(5)),
        clickButton.using('Filter'),
        Wait.for(Duration.ofSeconds(5)),

    )
}

export const syncFilteringResult = () => {
    return Task.where(`#actor synchronize filtering result in filtering phase`,
        clickButton.using('Sync'),
        Wait.for(Duration.ofSeconds(5)),
        browseProject.searchAndEditImplementationProject(Cookie.called(COOKIE_PROJECT_NAME).value()),
        Wait.until(Page.whichTitle(includes(MANAGE_IMPLEMENTATION_PROJECT)), isPresent()),
        Switch.to(Page.whichTitle(includes(MANAGE_IMPLEMENTATION_PROJECT))),
        Wait.for(Duration.ofSeconds(3)),
        projectTab.clickTab('Planning'),
        Wait.for(Duration.ofSeconds(5)),

    )
}

export const checkFilteringResultDetail = {
    using: (filteringResultInfo: DataTable) => {
        const items = List.of(filteringResultInfo.hashes())
        return Task.where(`#actor check filtering result detail`,
            browseFiltering.selectDropdownItem('Funding Availability', 'ALL'),
            clickButton.using(SEARCH),
            Wait.for(Duration.ofSeconds(3)),
            items.forEach(({ actor, item }) => actor.attemptsTo(
                filteringPhase.checkFilteringResultTableCellValue(Number(item.row), 3, item.ProjectName + project.timestamp),
                filteringPhase.checkFilteringResultTableCellValue(Number(item.row), 6, item.FundingAvailability),
                filteringPhase.checkFilteringResultTableCellValue(Number(item.row), 8, item.RequestedFundingAmount)
            ))
        )
    }
}

export const checkFilteringSnapshotDetail = {
    using: (filteringResultInfo: DataTable) => {
        const items = List.of(filteringResultInfo.hashes())
        return Task.where(`#actor check filtering snapshot detail`,
            Ensure.eventually(Page.whichTitle(includes('Edit Filtering Log')), isPresent()),
            Switch.to(Page.whichTitle(includes('Edit Filtering Log'))),
            items.forEach(({ actor, item }) => actor.attemptsTo(
                filteringPhase.checkFilteringSnapshotTableCellValue(Number(item.row), 1, item.YearTotal),
                filteringPhase.checkFilteringSnapshotTableCellValue(Number(item.row), 2, item.FY1),
                filteringPhase.checkFilteringSnapshotTableCellValue(Number(item.row), 3, item.FY2),
            )),
            clickActionButton.using(CANCEL),
            Wait.for(Duration.ofSeconds(3))

        )
    }
}

