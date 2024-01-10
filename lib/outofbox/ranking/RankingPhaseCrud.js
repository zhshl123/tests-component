"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCriteriaScoreDetails = exports.checkProjectRankingResult = exports.updateProjectAdjustScore = exports.checkProjectCriteriaScore = exports.selectProjectCriteriaScore = exports.checkFirstRankingPhaseCriteriaInfo = exports.updateFirstRankingPhaseCriteriaInfo = exports.checkProjectInRankingPhase = exports.checkRankingPhaseInfo = exports.updateRankingPhaseInfo = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const EditRankingPhaseFields_1 = require("./EditRankingPhaseFields");
const ProjectRankingCriteriaFields_1 = require("./ProjectRankingCriteriaFields");
const RankingTemplateCurd_1 = require("./RankingTemplateCurd");
exports.updateRankingPhaseInfo = {
    using: (rankingPhaseInfo) => {
        const startDateArray = rankingPhaseInfo.rowsHash().StartDate.split(' ');
        const startDate = startDateArray[0];
        const startTime = startDateArray[1] + ' ' + startDateArray[2];
        const endDateArray = rankingPhaseInfo.rowsHash().EndDate.split(' ');
        const endDate = endDateArray[0];
        const endTime = endDateArray[1] + ' ' + endDateArray[2];
        return core_1.Task.where(`#actor update ranking phase information`, EditRankingPhaseFields_1.rankingPhase.selectSpecialDate('Start Date', startDate, 0), EditRankingPhaseFields_1.rankingPhase.selectClock('Start Date', startTime), EditRankingPhaseFields_1.rankingPhase.selectSpecialDate('End Date', endDate, 1), EditRankingPhaseFields_1.rankingPhase.selectClock('End Date', endTime), common_1.clickButton.using(DefaultStaticParams_1.SAVE), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.checkRankingPhaseInfo = {
    using: (rankingPhaseInfo) => {
        return core_1.Task.where(`#actor check ranking phase information`, EditRankingPhaseFields_1.rankingPhase.checkDateInputFieldValue('Start Date', rankingPhaseInfo.rowsHash().StartDate, DefaultStaticParams_1.SUCCEEDED), EditRankingPhaseFields_1.rankingPhase.checkDateInputFieldValue('End Date', rankingPhaseInfo.rowsHash().EndDate, DefaultStaticParams_1.SUCCEEDED));
    }
};
exports.checkProjectInRankingPhase = {
    using: (projectName) => {
        return core_1.Task.where(`#actor check project in ranking phase projects tab`, EditRankingPhaseFields_1.rankingPhaseTab.clickTab('Projects'), core_1.Wait.for(core_1.Duration.ofSeconds(3)), EditRankingPhaseFields_1.browseRankingPhase.checkSearchResult(projectName, DefaultStaticParams_1.SUCCEEDED));
    }
};
exports.updateFirstRankingPhaseCriteriaInfo = {
    using: (criteriaInfo) => {
        return core_1.Task.where(`#actor update first ranking phase criteria information`, EditRankingPhaseFields_1.rankingPhase.fillCriteriaTextField(0, 'Ranking Evaluation Criteria', criteriaInfo.rowsHash().RankingEvaluationCriteria), EditRankingPhaseFields_1.rankingPhase.fillCriteriaTextField(0, 'Guidance for Evaluation', criteriaInfo.rowsHash().GuidanceforEvaluation), EditRankingPhaseFields_1.rankingPhase.fillCriteriaNumberField(0, 'Min Score', criteriaInfo.rowsHash().MinScore), web_1.Click.on(EditRankingPhaseFields_1.rankingPhase.criteriaTableCell(0, 'Max Score')), core_1.Check.whether((0, common_1.messagePopupBox)(), (0, web_1.isVisible)()).andIfSo(common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK)), EditRankingPhaseFields_1.rankingPhase.fillCriteriaNumberField(0, 'Max Score', criteriaInfo.rowsHash().MaxScore), EditRankingPhaseFields_1.rankingPhase.fillCriteriaNumberField(0, 'Weight', criteriaInfo.rowsHash().Weight), 
        // 修改line item 信息
        RankingTemplateCurd_1.addRankingCriteriaLineItem.using(criteriaInfo), RankingTemplateCurd_1.checkRankingLineItemAlertMessage.using('List Item Score should be in'), common_1.clickActionButton.using(DefaultStaticParams_1.SAVE), core_1.Wait.for(core_1.Duration.ofSeconds(3)));
    }
};
exports.checkFirstRankingPhaseCriteriaInfo = {
    using: (criteriaInfo) => {
        return core_1.Task.where(`#actor check first ranking phase criteria information`, EditRankingPhaseFields_1.rankingPhase.checkCriteriaFieldCell(0, 'Ranking Evaluation Criteria', criteriaInfo.rowsHash().RankingEvaluationCriteria), EditRankingPhaseFields_1.rankingPhase.checkCriteriaFieldCell(0, 'Guidance for Evaluation', criteriaInfo.rowsHash().GuidanceforEvaluation), EditRankingPhaseFields_1.rankingPhase.checkCriteriaFieldCell(0, 'Min Score', criteriaInfo.rowsHash().MinScore), EditRankingPhaseFields_1.rankingPhase.checkCriteriaFieldCell(0, 'Max Score', criteriaInfo.rowsHash().MaxScore), EditRankingPhaseFields_1.rankingPhase.checkCriteriaFieldCell(0, 'Weight', criteriaInfo.rowsHash().Weight));
    }
};
exports.selectProjectCriteriaScore = {
    using: (score, reason) => {
        return core_1.Task.where(`#actor select project criteria score`, ProjectRankingCriteriaFields_1.projectRankingCriteria.selectScore(score), web_1.Enter.theValue(reason).into(ProjectRankingCriteriaFields_1.projectRankingCriteria.justificationTextInputField()), common_1.clickActionButton.using(DefaultStaticParams_1.SAVE), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.checkProjectCriteriaScore = {
    using: (projectScoreInfo) => {
        return core_1.Task.where(`#actor check project criteria score`, ProjectRankingCriteriaFields_1.projectRankingCriteria.checkReadOnlyTextFieldValue('Weighted Score', projectScoreInfo.rowsHash().WeightedScore), ProjectRankingCriteriaFields_1.projectRankingCriteria.checkReadOnlyTextFieldValue('Overall Rank', projectScoreInfo.rowsHash().OverallRank), ProjectRankingCriteriaFields_1.projectRankingCriteria.checkNumberInputFieldValue('Adjusted Score', projectScoreInfo.rowsHash().AdjustedScore));
    }
};
exports.updateProjectAdjustScore = {
    using: (score) => {
        return core_1.Task.where(`#actor update project Adjust Score`, ProjectRankingCriteriaFields_1.projectRankingCriteria.fillNumberInputField('Adjusted Score', score), common_1.clickActionButton.using(DefaultStaticParams_1.SAVE), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
exports.checkProjectRankingResult = {
    using: (projectRankingInfo) => {
        const items = core_1.List.of(projectRankingInfo.hashes());
        return core_1.Task.where(`#actor check Project Ranking Results`, items.forEach(({ actor, item }) => actor.attemptsTo(web_1.Switch.to(EditRankingPhaseFields_1.rankingPhase.criteriaScoreDetailTable()).and(EditRankingPhaseFields_1.rankingPhase.checkProjectRankingResultCell(Number(item.row), 1, item.TotalScore), EditRankingPhaseFields_1.rankingPhase.checkProjectRankingResultCell(Number(item.row), 2, item.OverallRank)))));
    }
};
exports.checkCriteriaScoreDetails = {
    using: (criteriaScoreInfo) => {
        const items = core_1.List.of(criteriaScoreInfo.hashes());
        return core_1.Task.where(`#actor check Criteria Score Details`, items.forEach(({ actor, item }) => actor.attemptsTo(core_1.Check.whether(item.row, (0, assertions_1.equals)('2')).andIfSo(EditRankingPhaseFields_1.rankingPhase.checkCriteriaScoreDetailMaxScoreCellValue(Number(item.row), 1, item.WeightedScore), EditRankingPhaseFields_1.rankingPhase.checkCriteriaScoreDetailMaxScoreCellValue(Number(item.row), 2, item.ScoreRank)).otherwise(EditRankingPhaseFields_1.rankingPhase.checkCriteriaScoreDetailProjectCellValue(Number(item.row), 1, item.WeightedScore), EditRankingPhaseFields_1.rankingPhase.checkCriteriaScoreDetailProjectCellValue(Number(item.row), 2, item.ScoreRank), assertions_1.Ensure.eventually(web_1.Text.of(EditRankingPhaseFields_1.rankingPhase.lastCriteriaScoreDetailTableProjectRowCell(Number(item.row))), (0, assertions_1.equals)(item.TotalScoreRank))))));
    }
};
//# sourceMappingURL=RankingPhaseCrud.js.map