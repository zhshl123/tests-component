"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAdditionalFundNeededInfo = exports.checkBatchProjectFundAllocationInfo = exports.saveBatchProjectFundAllocation = exports.selectFundToBatchAllocation = exports.checkProjectFundAllocationInfo = exports.assignProjectToFund = exports.checkFundAllocationInfo = exports.saveFundAllocation = exports.checkFundEndingBalanceInfo = exports.checkSelectedFund = exports.assignProjectFund = exports.addFundAndFundBalance = exports.addFund = exports.addFundGroup = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const ProjectTab_1 = require("../project/components/ProjectTab");
const EditFund_1 = require("./EditFund");
const FundAllocationByFundFields_1 = require("./FundAllocationByFundFields");
const ProjectAllocationFields_1 = require("./ProjectAllocationFields");
const ProjectFundFields_1 = require("./ProjectFundFields");
const SelectProjectsForFundFields_1 = require("./SelectProjectsForFundFields");
exports.addFundGroup = {
    using: (FundGroupInfo) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor Input all fields and save `, EditFund_1.fund.fillTextInputField('Fund Group ID', FundGroupInfo.rowsHash().FundGroupID + timestamp), EditFund_1.fund.setCookie(statics_1.COOKIE_FG_ID, FundGroupInfo.rowsHash().FundGroupID + timestamp), EditFund_1.fund.fillTextInputField('Fund Group Name', FundGroupInfo.rowsHash().FundGroupName + timestamp), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)());
    }
};
exports.addFund = {
    using: (fundInfo) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor Input all fields and save `, core_1.Wait.for(core_1.Duration.ofSeconds(3)), EditFund_1.fund.fillTextInputField('Fund ID', fundInfo.rowsHash().FundID + timestamp), EditFund_1.fund.setCookie(statics_1.COOKIE_FUND_ID, fundInfo.rowsHash().FundID + timestamp), EditFund_1.fund.fillTextInputField('Fund Name', fundInfo.rowsHash().FundName + timestamp), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)());
    }
};
exports.addFundAndFundBalance = {
    using: (fundInfo) => {
        const timestamp = common_1.formatted_now;
        EditFund_1.fund.fundId = fundInfo.rowsHash().FundID + timestamp;
        return core_1.Task.where(`#actor adds a fund with balance detail`, core_1.Check.whether(web_1.Page.current().title(), (0, assertions_1.includes)(statics_1.ADD_FUND)).andIfSo(core_1.Log.the('current page is Add Fund')).otherwise(common_1.openPage.using(statics_1.ADD_FUND)), core_1.Wait.for(core_1.Duration.ofSeconds(5)), EditFund_1.fund.fillTextInputField('Fund ID', fundInfo.rowsHash().FundID + timestamp), EditFund_1.fund.setCookie(statics_1.COOKIE_FUND_ID, fundInfo.rowsHash().FundID + timestamp), EditFund_1.fund.fillTextInputField('Fund Name', fundInfo.rowsHash().FundName + timestamp), 
        // fund balance
        EditFund_1.fund.fillFundBalanceTableCell(1, 2, fundInfo.rowsHash().BeginningBalance), common_1.clickButton.using(DefaultStaticParams_1.SAVE), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.assignProjectFund = {
    using: (fundName) => {
        return core_1.Task.where(`#actor assign fund: ${fundName} to a projrct`, ProjectTab_1.projectTab.clickTab('Fund Sources'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), ProjectFundFields_1.projectFund.searchFund(fundName), ProjectFundFields_1.projectFund.addFundToSelectedList(fundName));
    }
};
exports.checkSelectedFund = {
    using: (fundName, expectedResult) => {
        return expectedResult === DefaultStaticParams_1.SUCCEEDED ? core_1.Task.where(`#actor check selected fund list with ${fundName} ${expectedResult}`, core_1.Check.whether(ProjectFundFields_1.projectFund.searchFundInputField(), (0, web_1.isVisible)()).andIfSo(core_1.Log.the('page now is in fund resources')).otherwise(ProjectTab_1.projectTab.clickTab('Fund Sources'), core_1.Wait.for(core_1.Duration.ofSeconds(3))), assertions_1.Ensure.eventually(ProjectFundFields_1.projectFund.selectedFundList(fundName).first(), (0, web_1.isVisible)())) : core_1.Task.where(`#actor check selected fund list with ${fundName} ${expectedResult}`, core_1.Check.whether(ProjectFundFields_1.projectFund.searchFundInputField(), (0, web_1.isVisible)()).andIfSo(core_1.Log.the('page now is in fund resources')).otherwise(ProjectTab_1.projectTab.clickTab('Fund Sources'), core_1.Wait.for(core_1.Duration.ofSeconds(3))), assertions_1.Ensure.eventually(ProjectFundFields_1.projectFund.selectedFundList(fundName).first(), (0, assertions_1.not)((0, web_1.isVisible)())));
    }
};
exports.checkFundEndingBalanceInfo = {
    using: (color, fundBalanceInfo) => {
        return core_1.Task.where(`#actor fund ending`, ProjectAllocationFields_1.projectAllocation.checkFundEndingBalanceCellValue(0, fundBalanceInfo.rowsHash().FY1), ProjectAllocationFields_1.projectAllocation.checkFundEndingBalanceCellValue(1, fundBalanceInfo.rowsHash().FY2), ProjectAllocationFields_1.projectAllocation.checkFundEndingBalanceCellValue(2, fundBalanceInfo.rowsHash().FY3), web_1.Hover.over(ProjectAllocationFields_1.projectAllocation.fundAllocationDetailTableCell(0, 0)));
    }
};
exports.saveFundAllocation = {
    using: (fundAllocationInfo) => {
        return core_1.Task.where(`#actor fill fund allocation table cell value`, ProjectAllocationFields_1.projectAllocation.fillFundAllocationTableCellValue(1, 2, fundAllocationInfo.rowsHash().FY1), ProjectAllocationFields_1.projectAllocation.fillFundAllocationTableCellValue(1, 3, fundAllocationInfo.rowsHash().FY2), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)(), core_1.Wait.for(core_1.Duration.ofSeconds(3)));
    }
};
exports.checkFundAllocationInfo = {
    using: (color, fundAllocationInfo) => {
        const items = core_1.List.of(fundAllocationInfo.hashes());
        return core_1.Task.where(`#actor check fund allocation table cell value`, core_1.Check.whether(ProjectAllocationFields_1.projectAllocation.fundAllocationDetailTable(), (0, assertions_1.not)((0, web_1.isVisible)())).andIfSo(ProjectTab_1.projectTab.clickTab('Allocation'), core_1.Wait.for(core_1.Duration.ofSeconds(3))), items.forEach(({ actor, item }) => actor.attemptsTo(ProjectAllocationFields_1.projectAllocation.checkFundAllocationDetailTableCellValue(Number(item.row), 0, item.Total), ProjectAllocationFields_1.projectAllocation.checkFundAllocationDetailTableCellValue(Number(item.row), 1, item.Previous), ProjectAllocationFields_1.projectAllocation.checkFundAllocationDetailTableCellValue(Number(item.row), 2, item.FY1), ProjectAllocationFields_1.projectAllocation.checkFundAllocationDetailTableCellValue(Number(item.row), 3, item.FY2))));
    }
};
exports.assignProjectToFund = {
    using: (projectName) => {
        return core_1.Task.where(`#actor assign project ${projectName} to fund`, common_1.openPage.using(statics_1.SELECT_PROJECTS_FOR_FUND), SelectProjectsForFundFields_1.selectProjectForFund.selectItemInlookupPopup('Fund Name1', web_1.Cookie.called(statics_1.COOKIE_FUND_ID).value(), 'Fund Name'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), core_1.Wait.until(SelectProjectsForFundFields_1.selectProjectForFund.searchProjectInputfield(), (0, web_1.isVisible)()), SelectProjectsForFundFields_1.selectProjectForFund.searchProject(projectName), SelectProjectsForFundFields_1.selectProjectForFund.addProjectToSelectedList(projectName));
    }
};
exports.checkProjectFundAllocationInfo = {
    using: (fundAllocation) => {
        const items = core_1.List.of(fundAllocation.hashes());
        return core_1.Task.where(`#actor check project fund allocation detail`, core_1.Wait.until(SelectProjectsForFundFields_1.selectProjectForFund.projectFundAllocationTable(), (0, assertions_1.isPresent)()), items.forEach(({ actor, item }) => actor.attemptsTo(SelectProjectsForFundFields_1.selectProjectForFund.checkProjectFundAllocationTableCellValue(Number(item.row), 0, item.Total), SelectProjectsForFundFields_1.selectProjectForFund.checkProjectFundAllocationTableCellValue(Number(item.row), 1, item.Previous), SelectProjectsForFundFields_1.selectProjectForFund.checkProjectFundAllocationTableCellValue(Number(item.row), 2, item.FY1), SelectProjectsForFundFields_1.selectProjectForFund.checkProjectFundAllocationTableCellValue(Number(item.row), 3, item.FY2))));
    }
};
exports.selectFundToBatchAllocation = {
    using: (fundName) => {
        return core_1.Task.where(`#select fund ${fundName} to batch fund allocation`, common_1.openPage.using(statics_1.FUND_ALLOCATION_BY_FUND), FundAllocationByFundFields_1.fundAllocationByFund.selectItemInlookupPopup('Select Fund', web_1.Cookie.called(statics_1.COOKIE_FUND_ID).value(), 'Fund Name'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), assertions_1.Ensure.eventually(FundAllocationByFundFields_1.fundAllocationByFund.projectFundAllocationTable(), (0, web_1.isVisible)()));
    }
};
exports.saveBatchProjectFundAllocation = {
    using: (fundAllocation) => {
        return core_1.Task.where(`#select fill project allocation table cell value`, FundAllocationByFundFields_1.fundAllocationByFund.fillProjectFundAllocationTableCell(1, 2, fundAllocation.rowsHash().FY1), FundAllocationByFundFields_1.fundAllocationByFund.fillProjectFundAllocationTableCell(1, 3, fundAllocation.rowsHash().FY2), web_1.Click.on(FundAllocationByFundFields_1.fundAllocationByFund.saveButton()), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.checkBatchProjectFundAllocationInfo = {
    using: (color, fundAllocation) => {
        const items = core_1.List.of(fundAllocation.hashes());
        return core_1.Task.where(`#actor check project fund allocation detail`, assertions_1.Ensure.eventually(FundAllocationByFundFields_1.fundAllocationByFund.projectFundAllocationTable(), (0, web_1.isVisible)()), items.forEach(({ actor, item }) => actor.attemptsTo(FundAllocationByFundFields_1.fundAllocationByFund.checkProjectFundAllocationTableCellValue(Number(item.row), 0, item.Total), FundAllocationByFundFields_1.fundAllocationByFund.checkProjectFundAllocationTableCellValue(Number(item.row), 1, item.Previous), FundAllocationByFundFields_1.fundAllocationByFund.checkProjectFundAllocationTableCellValue(Number(item.row), 2, item.FY1), FundAllocationByFundFields_1.fundAllocationByFund.checkProjectFundAllocationTableCellValue(Number(item.row), 3, item.FY2), FundAllocationByFundFields_1.fundAllocationByFund.checkProjectFundAllocationTableCellValue(Number(item.row), 4, item.FY3))));
    }
};
exports.checkAdditionalFundNeededInfo = {
    using: (fundNeeded) => {
        return core_1.Task.where(`#actor check additional fund needed detail`, assertions_1.Ensure.eventually(FundAllocationByFundFields_1.fundAllocationByFund.additionalFundNeededTable(), (0, assertions_1.isPresent)()), FundAllocationByFundFields_1.fundAllocationByFund.checkAdditionalFundNeededTableCellValue(0, fundNeeded.rowsHash().FY1), FundAllocationByFundFields_1.fundAllocationByFund.checkAdditionalFundNeededTableCellValue(1, fundNeeded.rowsHash().FY2));
    }
};
//# sourceMappingURL=FundCrud.js.map