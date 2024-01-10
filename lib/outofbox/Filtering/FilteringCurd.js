"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFilteringSnapshotDetail = exports.checkFilteringResultDetail = exports.syncFilteringResult = exports.dofilterInFilteringPhase = exports.checkFilteringResult = exports.checkFilteringProjectList = exports.addProjectInFilteringPhase = exports.addWorkingFilteringPhase = exports.deleteFiltering = exports.checkFiltering = exports.editFiltering = exports.addFiltering = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const BrowseProjectFields_1 = require("../project/components/BrowseProjectFields");
const EditProjectFields_1 = require("../project/components/EditProjectFields");
const ProjectTab_1 = require("../project/components/ProjectTab");
const EditFitleringFields_1 = require("./EditFitleringFields");
const FilteringTab_1 = require("./FilteringTab");
exports.addFiltering = {
    using: (filteringInfo) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor Input all fields and save `, EditFitleringFields_1.filteringPhase.fillTextInputField('Filtering Phase Name', filteringInfo.rowsHash().FilteringPhaseName + timestamp), EditFitleringFields_1.filteringPhase.setCookie(statics_1.COOKIE_FILTERING_NAME, filteringInfo.rowsHash().FilteringPhaseName + timestamp), EditFitleringFields_1.filteringPhase.clickSingleCheckBox('Is Working Filtering Phase', filteringInfo.rowsHash().IsWorkingFilteringPhase), (0, common_1.checkMessagePopupBox)(), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK), web_1.Click.on(EditFitleringFields_1.filteringPhase.lookupInputField('Ranking Phase')), web_1.Click.on(EditFitleringFields_1.filteringPhase.lookupDropdownItem('Ranking Phase', filteringInfo.rowsHash().RankingPhase)), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)());
    }
};
exports.editFiltering = {
    using: (filteringInfo) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor Input all fields and save `, EditFitleringFields_1.filteringPhase.fillTextInputField('Filtering Phase Name', filteringInfo.rowsHash().FilteringPhaseName + timestamp), EditFitleringFields_1.filteringPhase.setCookie(statics_1.COOKIE_FILTERING_NAME, filteringInfo.rowsHash().FilteringPhaseName + timestamp), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)());
    }
};
exports.checkFiltering = {
    using: (Result) => {
        return core_1.Task.where(`#actor checks value `, EditFitleringFields_1.filteringPhase.checkTextInputFieldValue('Filtering Phase Name', web_1.Cookie.called(statics_1.COOKIE_FILTERING_NAME).value(), Result));
    }
};
exports.deleteFiltering = {
    using: () => {
        return core_1.Task.where(`#actor delete filtering `, common_1.clickButton.using(DefaultStaticParams_1.DELETE), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK));
    }
};
exports.addWorkingFilteringPhase = {
    using: (filteringInfo) => {
        const timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor add an working filtering phase`, EditFitleringFields_1.filteringPhase.fillTextInputField('Filtering Phase Name', filteringInfo.rowsHash().FilteringPhaseName + timestamp), EditFitleringFields_1.filteringPhase.setCookie(statics_1.COOKIE_FILTERING_NAME, filteringInfo.rowsHash().FilteringPhaseName + timestamp), web_1.Click.on(EditFitleringFields_1.filteringPhase.lookupInputField('Ranking Phase')), web_1.Click.on(EditFitleringFields_1.filteringPhase.lookupDropdownItem('Ranking Phase', filteringInfo.rowsHash().RankingPhase)), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)());
    }
};
exports.addProjectInFilteringPhase = {
    using: (projectInfo) => {
        return core_1.Task.where(`#actor add an working filtering phase`, web_1.Click.on(EditFitleringFields_1.filteringPhase.selectAllCheckboxInGrid()), common_1.clickSectionButton.using('Batch Delete'), common_1.clickSectionButton.using('Add Row'), assertions_1.Ensure.eventually(EditFitleringFields_1.filteringPhase.projectPopup(), (0, assertions_1.isPresent)()), web_1.Switch.to(EditFitleringFields_1.filteringPhase.projectPopup()).and(EditFitleringFields_1.browseFiltering.fillTextInputField('Project Name', projectInfo.rowsHash().Project1 + EditProjectFields_1.project.timestamp), common_1.clickButton.using(DefaultStaticParams_1.SEARCH), core_1.Wait.for(core_1.Duration.ofSeconds(3)), common_1.checkLinkInGridList.using(projectInfo.rowsHash().Project1 + EditProjectFields_1.project.timestamp), (0, common_1.clickFirstMultiCheckBox)(), EditFitleringFields_1.browseFiltering.fillTextInputField('Project Name', projectInfo.rowsHash().Project2 + EditProjectFields_1.project.timestamp), common_1.clickButton.using(DefaultStaticParams_1.SEARCH), core_1.Wait.for(core_1.Duration.ofSeconds(3)), common_1.checkLinkInGridList.using(projectInfo.rowsHash().Project1 + EditProjectFields_1.project.timestamp), (0, common_1.clickFirstMultiCheckBox)(), common_1.clickButton.using(DefaultStaticParams_1.OK)), common_1.clickButton.using(DefaultStaticParams_1.SAVE), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.checkFilteringProjectList = {
    using: (projectName, expectedResult) => {
        return core_1.Task.where(`#actor check filtering project list with ${projectName} ${expectedResult}`, FilteringTab_1.filteringPhaseTab.clickTab('Step 2: Select and Adjust Projects'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), core_1.Wait.until((0, common_1.gridList)(), (0, assertions_1.isPresent)()), EditFitleringFields_1.browseFiltering.checkSearchResult(projectName, expectedResult));
    }
};
exports.checkFilteringResult = {
    using: (fundingAvailability, projectName, expectedResult) => {
        return core_1.Task.where(`#actor check ${fundingAvailability} filtering result with ${projectName} ${expectedResult}`, EditFitleringFields_1.browseFiltering.selectDropdownItem('Funding Availability', fundingAvailability), common_1.clickButton.using(DefaultStaticParams_1.SEARCH), core_1.Wait.for(core_1.Duration.ofSeconds(3)), EditFitleringFields_1.browseFiltering.checkSearchResult(projectName, expectedResult));
    }
};
const dofilterInFilteringPhase = () => {
    return core_1.Task.where(`#actor do filter in filtering phase`, FilteringTab_1.filteringPhaseTab.clickTab('Step 2: Select and Adjust Projects'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), common_1.clickButton.using('Filter'), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
};
exports.dofilterInFilteringPhase = dofilterInFilteringPhase;
const syncFilteringResult = () => {
    return core_1.Task.where(`#actor synchronize filtering result in filtering phase`, common_1.clickButton.using('Sync'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), BrowseProjectFields_1.browseProject.searchAndEditImplementationProject(web_1.Cookie.called(statics_1.COOKIE_PROJECT_NAME).value()), core_1.Wait.until(web_1.Page.whichTitle((0, assertions_1.includes)(statics_1.MANAGE_IMPLEMENTATION_PROJECT)), (0, assertions_1.isPresent)()), web_1.Switch.to(web_1.Page.whichTitle((0, assertions_1.includes)(statics_1.MANAGE_IMPLEMENTATION_PROJECT))), core_1.Wait.for(core_1.Duration.ofSeconds(3)), ProjectTab_1.projectTab.clickTab('Planning'), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
};
exports.syncFilteringResult = syncFilteringResult;
exports.checkFilteringResultDetail = {
    using: (filteringResultInfo) => {
        const items = core_1.List.of(filteringResultInfo.hashes());
        return core_1.Task.where(`#actor check filtering result detail`, EditFitleringFields_1.browseFiltering.selectDropdownItem('Funding Availability', 'ALL'), common_1.clickButton.using(DefaultStaticParams_1.SEARCH), core_1.Wait.for(core_1.Duration.ofSeconds(3)), items.forEach(({ actor, item }) => actor.attemptsTo(EditFitleringFields_1.filteringPhase.checkFilteringResultTableCellValue(Number(item.row), 3, item.ProjectName + EditProjectFields_1.project.timestamp), EditFitleringFields_1.filteringPhase.checkFilteringResultTableCellValue(Number(item.row), 6, item.FundingAvailability), EditFitleringFields_1.filteringPhase.checkFilteringResultTableCellValue(Number(item.row), 8, item.RequestedFundingAmount))));
    }
};
exports.checkFilteringSnapshotDetail = {
    using: (filteringResultInfo) => {
        const items = core_1.List.of(filteringResultInfo.hashes());
        return core_1.Task.where(`#actor check filtering snapshot detail`, assertions_1.Ensure.eventually(web_1.Page.whichTitle((0, assertions_1.includes)('Edit Filtering Log')), (0, assertions_1.isPresent)()), web_1.Switch.to(web_1.Page.whichTitle((0, assertions_1.includes)('Edit Filtering Log'))), items.forEach(({ actor, item }) => actor.attemptsTo(EditFitleringFields_1.filteringPhase.checkFilteringSnapshotTableCellValue(Number(item.row), 1, item.YearTotal), EditFitleringFields_1.filteringPhase.checkFilteringSnapshotTableCellValue(Number(item.row), 2, item.FY1), EditFitleringFields_1.filteringPhase.checkFilteringSnapshotTableCellValue(Number(item.row), 3, item.FY2))), common_1.clickActionButton.using(DefaultStaticParams_1.CANCEL), core_1.Wait.for(core_1.Duration.ofSeconds(3)));
    }
};
//# sourceMappingURL=FilteringCurd.js.map