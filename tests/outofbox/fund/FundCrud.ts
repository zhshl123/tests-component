import { DataTable } from '@cucumber/cucumber';
import { Ensure, includes, isPresent, not } from '@serenity-js/assertions';
import { Check, Duration, List, Log, Question, Task, Wait } from '@serenity-js/core';
import { Click, Cookie, Hover, isVisible,Page } from '@serenity-js/web';

import { SAVE, SUCCEEDED } from '../../DefaultStaticParams';
import { clickButton, formatted_now, openPage, waitMessagePopupBoxVisible } from '../common';
import { ADD_FUND, COOKIE_FG_ID, COOKIE_FUND_ID, FUND_ALLOCATION_BY_FUND, SELECT_PROJECTS_FOR_FUND } from '../common/statics';
import { projectTab } from '../project/components/ProjectTab';
import { fund } from './EditFund';
import { fundAllocationByFund } from './FundAllocationByFundFields';
import { projectAllocation } from './ProjectAllocationFields';
import { projectFund } from './ProjectFundFields';
import { selectProjectForFund } from './SelectProjectsForFundFields';

export const addFundGroup = {

    using: (FundGroupInfo: DataTable) => {
        const timestamp = formatted_now
        return Task.where(`#actor Input all fields and save `,
            fund.fillTextInputField('Fund Group ID', FundGroupInfo.rowsHash().FundGroupID + timestamp),
            fund.setCookie(COOKIE_FG_ID, FundGroupInfo.rowsHash().FundGroupID + timestamp),
            fund.fillTextInputField('Fund Group Name', FundGroupInfo.rowsHash().FundGroupName + timestamp),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
        )
    }
}

export const addFund = {
    using: (fundInfo: DataTable) => {
        const timestamp = formatted_now
        return Task.where(`#actor Input all fields and save `,
            Wait.for(Duration.ofSeconds(3)),
            fund.fillTextInputField('Fund ID', fundInfo.rowsHash().FundID + timestamp),
            fund.setCookie(COOKIE_FUND_ID, fundInfo.rowsHash().FundID + timestamp),
            fund.fillTextInputField('Fund Name', fundInfo.rowsHash().FundName + timestamp),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
        )
    }
}

export const addFundAndFundBalance = {
    using: (fundInfo: DataTable) => {
        const timestamp = formatted_now
        fund.fundId = fundInfo.rowsHash().FundID + timestamp
        return Task.where(`#actor adds a fund with balance detail`,
            Check.whether(
                Page.current().title(), includes(ADD_FUND)
            ).andIfSo(
                Log.the('current page is Add Fund')
            ).otherwise(
                openPage.using(ADD_FUND),
            ),
            Wait.for(Duration.ofSeconds(5)),
            fund.fillTextInputField('Fund ID', fundInfo.rowsHash().FundID + timestamp),
            fund.setCookie(COOKIE_FUND_ID, fundInfo.rowsHash().FundID + timestamp),
            fund.fillTextInputField('Fund Name', fundInfo.rowsHash().FundName + timestamp),

            // fund balance
            fund.fillFundBalanceTableCell(1, 2, fundInfo.rowsHash().BeginningBalance),
            clickButton.using(SAVE),
            Wait.for(Duration.ofSeconds(5)),
        )
    }
}

export const assignProjectFund = {
    using: (fundName: string | Question<any>) => {

        return Task.where(`#actor assign fund: ${fundName} to a projrct`,
            projectTab.clickTab('Fund Sources'),
            Wait.for(Duration.ofSeconds(5)),
            projectFund.searchFund(fundName),
            projectFund.addFundToSelectedList(fundName)

        )
    }
}

export const checkSelectedFund = {
    using: (fundName: string | Question<any>, expectedResult: string) => {
        return expectedResult === SUCCEEDED ? Task.where(`#actor check selected fund list with ${fundName} ${expectedResult}`,
            Check.whether(
                projectFund.searchFundInputField(), isVisible()
            ).andIfSo(
                Log.the('page now is in fund resources')
            ).otherwise(
                projectTab.clickTab('Fund Sources'),
                Wait.for(Duration.ofSeconds(3))
            ),
            Ensure.eventually(projectFund.selectedFundList(fundName).first(), isVisible())
        ) : Task.where(`#actor check selected fund list with ${fundName} ${expectedResult}`,
            Check.whether(
                projectFund.searchFundInputField(), isVisible()
            ).andIfSo(
                Log.the('page now is in fund resources')
            ).otherwise(
                projectTab.clickTab('Fund Sources'),
                Wait.for(Duration.ofSeconds(3))
            ),
            Ensure.eventually(projectFund.selectedFundList(fundName).first(), not(isVisible()))
        );

    }
}

export const checkFundEndingBalanceInfo = {
    using: (color: string, fundBalanceInfo: DataTable) => {
        return Task.where(`#actor fund ending`,
            projectAllocation.checkFundEndingBalanceCellValue(0, fundBalanceInfo.rowsHash().FY1),
            projectAllocation.checkFundEndingBalanceCellValue(1, fundBalanceInfo.rowsHash().FY2),
            projectAllocation.checkFundEndingBalanceCellValue(2, fundBalanceInfo.rowsHash().FY3),
            Hover.over(projectAllocation.fundAllocationDetailTableCell(0, 0),)
        )

    }
}

export const saveFundAllocation = {
    using: (fundAllocationInfo: DataTable) => {
        return Task.where(`#actor fill fund allocation table cell value`,
            projectAllocation.fillFundAllocationTableCellValue(1, 2, fundAllocationInfo.rowsHash().FY1),
            projectAllocation.fillFundAllocationTableCellValue(1, 3, fundAllocationInfo.rowsHash().FY2),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
            Wait.for(Duration.ofSeconds(3)),
        )
    }
}

export const checkFundAllocationInfo = {
    using: (color: string, fundAllocationInfo: DataTable) => {
        const items = List.of(fundAllocationInfo.hashes())
        return Task.where(`#actor check fund allocation table cell value`,
            Check.whether(
                projectAllocation.fundAllocationDetailTable(), not(isVisible())
            ).andIfSo(
                projectTab.clickTab('Allocation'),
                Wait.for(Duration.ofSeconds(3)),
            ),

            items.forEach(({ actor, item }) => actor.attemptsTo(
                projectAllocation.checkFundAllocationDetailTableCellValue(Number(item.row), 0, item.Total),
                projectAllocation.checkFundAllocationDetailTableCellValue(Number(item.row), 1, item.Previous),
                projectAllocation.checkFundAllocationDetailTableCellValue(Number(item.row), 2, item.FY1),
                projectAllocation.checkFundAllocationDetailTableCellValue(Number(item.row), 3, item.FY2),

            ))

        )
    }
}

export const assignProjectToFund = {
    using: (projectName: string | Question<any>) => {
        return Task.where(`#actor assign project ${projectName} to fund`,
            openPage.using(SELECT_PROJECTS_FOR_FUND),
            selectProjectForFund.selectItemInlookupPopup('Fund Name1', Cookie.called(COOKIE_FUND_ID).value(), 'Fund Name'),
            Wait.for(Duration.ofSeconds(5)),
            Wait.until(selectProjectForFund.searchProjectInputfield(), isVisible()),
            selectProjectForFund.searchProject(projectName),
            selectProjectForFund.addProjectToSelectedList(projectName)
        )

    }
}

export const checkProjectFundAllocationInfo = {
    using: (fundAllocation: DataTable) => {
        const items = List.of(fundAllocation.hashes())
        return Task.where(`#actor check project fund allocation detail`,
            Wait.until(selectProjectForFund.projectFundAllocationTable(), isPresent()),
            items.forEach(({ actor, item }) => actor.attemptsTo(
                selectProjectForFund.checkProjectFundAllocationTableCellValue(Number(item.row), 0, item.Total),
                selectProjectForFund.checkProjectFundAllocationTableCellValue(Number(item.row), 1, item.Previous),
                selectProjectForFund.checkProjectFundAllocationTableCellValue(Number(item.row), 2, item.FY1),
                selectProjectForFund.checkProjectFundAllocationTableCellValue(Number(item.row), 3, item.FY2),

            ))
        )
    }
}

export const selectFundToBatchAllocation = {
    using: (fundName: string | Question<any>) => {

        return Task.where(`#select fund ${fundName} to batch fund allocation`,
            openPage.using(FUND_ALLOCATION_BY_FUND),
            fundAllocationByFund.selectItemInlookupPopup('Select Fund', Cookie.called(COOKIE_FUND_ID).value(), 'Fund Name'),
            Wait.for(Duration.ofSeconds(5)),
            Ensure.eventually(fundAllocationByFund.projectFundAllocationTable(), isVisible()),
        )
    }
}

export const saveBatchProjectFundAllocation = {
    using: (fundAllocation: DataTable) => {

        return Task.where(`#select fill project allocation table cell value`,
            fundAllocationByFund.fillProjectFundAllocationTableCell(1, 2, fundAllocation.rowsHash().FY1),
            fundAllocationByFund.fillProjectFundAllocationTableCell(1, 3, fundAllocation.rowsHash().FY2),
            Click.on(fundAllocationByFund.saveButton()),
            Wait.for(Duration.ofSeconds(5)),
        )
    }
}

export const checkBatchProjectFundAllocationInfo = {
    using: (color: string, fundAllocation: DataTable) => {

        const items = List.of(fundAllocation.hashes())
        return Task.where(`#actor check project fund allocation detail`,
            Ensure.eventually(fundAllocationByFund.projectFundAllocationTable(), isVisible()),
            items.forEach(({ actor, item }) => actor.attemptsTo(
                fundAllocationByFund.checkProjectFundAllocationTableCellValue(Number(item.row), 0, item.Total),
                fundAllocationByFund.checkProjectFundAllocationTableCellValue(Number(item.row), 1, item.Previous),
                fundAllocationByFund.checkProjectFundAllocationTableCellValue(Number(item.row), 2, item.FY1),
                fundAllocationByFund.checkProjectFundAllocationTableCellValue(Number(item.row), 3, item.FY2),
                fundAllocationByFund.checkProjectFundAllocationTableCellValue(Number(item.row), 4, item.FY3),

            ))
        )
    }
}

export const checkAdditionalFundNeededInfo = {
    using: (fundNeeded: DataTable) => {

        return Task.where(`#actor check additional fund needed detail`,
            Ensure.eventually(fundAllocationByFund.additionalFundNeededTable(), isPresent()),
            fundAllocationByFund.checkAdditionalFundNeededTableCellValue(0, fundNeeded.rowsHash().FY1),
            fundAllocationByFund.checkAdditionalFundNeededTableCellValue(1, fundNeeded.rowsHash().FY2),

        )
    }
}