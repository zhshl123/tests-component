import { DataTable } from '@cucumber/cucumber';
import { Ensure, equals } from '@serenity-js/assertions';
import { Check, Duration, List, Question, Task, Wait } from '@serenity-js/core';
import { Click, Enter, isVisible, Switch, Text } from '@serenity-js/web';

import { OK, SAVE, SUCCEEDED } from '../../DefaultStaticParams';
import { clickActionButton, clickButton, clickMessagePopupButton, messagePopupBox } from '../common';
import { browseRankingPhase, rankingPhase, rankingPhaseTab } from './EditRankingPhaseFields';
import { projectRankingCriteria } from './ProjectRankingCriteriaFields';
import { addRankingCriteriaLineItem, checkRankingLineItemAlertMessage } from './RankingTemplateCurd';

export const updateRankingPhaseInfo = {
    using: (rankingPhaseInfo: DataTable) => {
        const startDateArray: string[] = rankingPhaseInfo.rowsHash().StartDate.split(' ')
        const startDate = startDateArray[0]
        const startTime = startDateArray[1] + ' ' + startDateArray[2]
        const endDateArray: string[] = rankingPhaseInfo.rowsHash().EndDate.split(' ')
        const endDate = endDateArray[0]
        const endTime = endDateArray[1] + ' ' + endDateArray[2]
        return Task.where(`#actor update ranking phase information`,
            rankingPhase.selectSpecialDate('Start Date', startDate, 0),
            rankingPhase.selectClock('Start Date', startTime),
            rankingPhase.selectSpecialDate('End Date', endDate, 1),
            rankingPhase.selectClock('End Date', endTime),
            clickButton.using(SAVE),
            Wait.for(Duration.ofSeconds(5))
        );
    }
}

export const checkRankingPhaseInfo = {
    using: (rankingPhaseInfo: DataTable) => {
        return Task.where(`#actor check ranking phase information`,
            rankingPhase.checkDateInputFieldValue('Start Date', rankingPhaseInfo.rowsHash().StartDate, SUCCEEDED),
            rankingPhase.checkDateInputFieldValue('End Date', rankingPhaseInfo.rowsHash().EndDate, SUCCEEDED),
        );
    }
}

export const checkProjectInRankingPhase = {
    using: (projectName: string | Question<any>) => {
        return Task.where(`#actor check project in ranking phase projects tab`,
            rankingPhaseTab.clickTab('Projects'),
            Wait.for(Duration.ofSeconds(3)),
            browseRankingPhase.checkSearchResult(projectName, SUCCEEDED)

        );
    }
}

export const updateFirstRankingPhaseCriteriaInfo = {
    using: (criteriaInfo: DataTable) => {
        return Task.where(`#actor update first ranking phase criteria information`,
            rankingPhase.fillCriteriaTextField(0, 'Ranking Evaluation Criteria', criteriaInfo.rowsHash().RankingEvaluationCriteria),
            rankingPhase.fillCriteriaTextField(0, 'Guidance for Evaluation', criteriaInfo.rowsHash().GuidanceforEvaluation),
            rankingPhase.fillCriteriaNumberField(0, 'Min Score', criteriaInfo.rowsHash().MinScore),
            Click.on(rankingPhase.criteriaTableCell(0, 'Max Score')),
            Check.whether(
                messagePopupBox(), isVisible()
            ).andIfSo(
                clickMessagePopupButton.using(OK)
            ),
            rankingPhase.fillCriteriaNumberField(0, 'Max Score', criteriaInfo.rowsHash().MaxScore),
            rankingPhase.fillCriteriaNumberField(0, 'Weight', criteriaInfo.rowsHash().Weight),
            // 修改line item 信息
            addRankingCriteriaLineItem.using(criteriaInfo),
            checkRankingLineItemAlertMessage.using('List Item Score should be in'),

            clickActionButton.using(SAVE),
            Wait.for(Duration.ofSeconds(3))

        );
    }
}

export const checkFirstRankingPhaseCriteriaInfo = {
    using: (criteriaInfo: DataTable) => {
        return Task.where(`#actor check first ranking phase criteria information`,
            rankingPhase.checkCriteriaFieldCell(0, 'Ranking Evaluation Criteria', criteriaInfo.rowsHash().RankingEvaluationCriteria),
            rankingPhase.checkCriteriaFieldCell(0, 'Guidance for Evaluation', criteriaInfo.rowsHash().GuidanceforEvaluation),
            rankingPhase.checkCriteriaFieldCell(0, 'Min Score', criteriaInfo.rowsHash().MinScore),
            rankingPhase.checkCriteriaFieldCell(0, 'Max Score', criteriaInfo.rowsHash().MaxScore),
            rankingPhase.checkCriteriaFieldCell(0, 'Weight', criteriaInfo.rowsHash().Weight),

        );
    }
}

export const selectProjectCriteriaScore = {
    using: (score: string, reason: string) => {
        return Task.where(`#actor select project criteria score`,
            projectRankingCriteria.selectScore(score),
            Enter.theValue(reason).into(projectRankingCriteria.justificationTextInputField()),
            clickActionButton.using(SAVE),
            Wait.for(Duration.ofSeconds(5))

        )
    }
}

export const checkProjectCriteriaScore = {
    using: (projectScoreInfo: DataTable) => {
        return Task.where(`#actor check project criteria score`,
            projectRankingCriteria.checkReadOnlyTextFieldValue('Weighted Score', projectScoreInfo.rowsHash().WeightedScore),
            projectRankingCriteria.checkReadOnlyTextFieldValue('Overall Rank', projectScoreInfo.rowsHash().OverallRank),
            projectRankingCriteria.checkNumberInputFieldValue('Adjusted Score', projectScoreInfo.rowsHash().AdjustedScore),

        )
    }
}

export const updateProjectAdjustScore = {
    using: (score: string) => {
        return Task.where(`#actor update project Adjust Score`,
            projectRankingCriteria.fillNumberInputField('Adjusted Score', score),
            clickActionButton.using(SAVE),
            Wait.for(Duration.ofSeconds(5))

        )
    }
}

export const checkProjectRankingResult = {
    using: (projectRankingInfo: DataTable) => {
        const items = List.of(projectRankingInfo.hashes())
        return Task.where(`#actor check Project Ranking Results`,
            items.forEach(({ actor, item }) => actor.attemptsTo(
                Switch.to(rankingPhase.criteriaScoreDetailTable()).and(
                    rankingPhase.checkProjectRankingResultCell(Number(item.row), 1, item.TotalScore),
                    rankingPhase.checkProjectRankingResultCell(Number(item.row), 2, item.OverallRank)
                )
            ))
        )
    }
}

export const checkCriteriaScoreDetails = {
    using: (criteriaScoreInfo: DataTable) => {
        const items = List.of(criteriaScoreInfo.hashes())
        return Task.where(`#actor check Criteria Score Details`,
            items.forEach(({ actor, item }) => actor.attemptsTo(
                Check.whether(
                    item.row, equals('2')
                ).andIfSo(
                    rankingPhase.checkCriteriaScoreDetailMaxScoreCellValue(Number(item.row), 1, item.WeightedScore),
                    rankingPhase.checkCriteriaScoreDetailMaxScoreCellValue(Number(item.row), 2, item.ScoreRank),
                ).otherwise(
                    rankingPhase.checkCriteriaScoreDetailProjectCellValue(Number(item.row), 1, item.WeightedScore),
                    rankingPhase.checkCriteriaScoreDetailProjectCellValue(Number(item.row), 2, item.ScoreRank),
                    Ensure.eventually(Text.of(rankingPhase.lastCriteriaScoreDetailTableProjectRowCell(Number(item.row))), equals(item.TotalScoreRank))
                ),
            ))
        )
    }
}