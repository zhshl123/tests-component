import { DataTable } from '@cucumber/cucumber';
import { Ensure, equals, includes, isPresent, not } from '@serenity-js/assertions';
import { Check, Duration, List, Task, Wait } from '@serenity-js/core';
import { Attribute, Click, Cookie, isVisible, Switch, Text } from '@serenity-js/web';

import { ADD, DELETE, OK, SAVE, SUCCEEDED } from '../../DefaultStaticParams';
import { checkMessagePopupBox, clickButton, clickMessagePopupButton, formatted_now, messagePopupContent, waitMessagePopupBoxVisible } from '../common';
import { COOKIE_RANKING_TEMPLATE_NAME } from '../common/statics';
import { rankingTempalte } from './EditRankingTemplateFields';
import { rankingCriteriaLineItem } from './RankingCriteriaLineItemFields';

export const addRankingTemplate = {
    using: (templateInfo: DataTable) => {
        const timestamp = formatted_now
        return Task.where(`#actor add ranking template with ${templateInfo}`,
            rankingTempalte.fillTextInputField('Template Name', templateInfo.rowsHash().TemplateName + timestamp),
            rankingTempalte.setCookie(COOKIE_RANKING_TEMPLATE_NAME, templateInfo.rowsHash().TemplateName + timestamp),
            rankingTempalte.fillTextInputField('Description', templateInfo.rowsHash().Description),
            rankingTempalte.clickSingleCheckBox('Is Default Template', templateInfo.rowsHash().IsDefaultTemplate),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible()
        );
    }

}

export const checkRankingTemplateInfo = {
    using: (templateInfo: DataTable) => {
        return Task.where(`#actor check ranking template information with ${templateInfo}`,
            rankingTempalte.checkTextInputFieldValue('Template Name', Cookie.called(COOKIE_RANKING_TEMPLATE_NAME).value(), SUCCEEDED),
            rankingTempalte.checkTextInputFieldValue('Description', templateInfo.rowsHash().Description, SUCCEEDED),
            Ensure.eventually(Attribute.called('initialvalue').of(rankingTempalte.radioButtonInput('Is Default Template', templateInfo.rowsHash().IsDefaultTemplate)), equals('true')),
        );
    }

}

export const addRankingCriteria = {
    using: (criteriaInfo: DataTable) => {
        const items = List.of(criteriaInfo.hashes())
        return Task.where(`#actor add ranking criteria with ${criteriaInfo}`,
            items.forEach(({ actor, item }) => actor.attemptsTo(
                Check.whether(
                    rankingTempalte.criteriaTableBodyRows().nth(Number(item.row)), isVisible()
                ).andIfSo(
                    Click.on(rankingTempalte.criteriaTableBodyRows().nth(Number(item.row))),
                    Click.on(rankingTempalte.iconButton(DELETE))
                ).otherwise(
                    Click.on(rankingTempalte.iconButton(ADD)),
                ),
                rankingTempalte.fillCriteriaTextField(Number(item.row) - 1, 'Ranking Evaluation Criteria', item.RankingEvaluationCriteria),
                rankingTempalte.fillCriteriaTextField(Number(item.row) - 1, 'Guidance for Evaluation', item.GuidanceforEvaluation),
                rankingTempalte.fillCriteriaNumberField(Number(item.row) - 1, 'Min Score', item.MinScore),
                rankingTempalte.fillCriteriaNumberField(Number(item.row) - 1, 'Max Score', item.MaxScore),
                rankingTempalte.fillCriteriaNumberField(Number(item.row) - 1, 'Weight', item.Weight)

            )),
            clickButton.using(SAVE),
            checkMessagePopupBox(),
            Check.whether(
                Text.of(messagePopupContent()), includes('Save failed')
            ).andIfSo(
                clickMessagePopupButton.using(OK),
            )
        );
    }
}

export const checkRankingCriteriaInfo = {
    using: (criteriaInfo: DataTable) => {
        const items = List.of(criteriaInfo.hashes())
        return Task.where(`#actor check ranking criteria with ${criteriaInfo}`,
            items.forEach(({ actor, item }) => actor.attemptsTo(
                rankingTempalte.checkCriteriaFieldCell(Number(item.row) - 1, 'Ranking Evaluation Criteria', item.RankingEvaluationCriteria),
                rankingTempalte.checkCriteriaFieldCell(Number(item.row) - 1, 'Guidance for Evaluation', item.GuidanceforEvaluation),
                rankingTempalte.checkCriteriaFieldCell(Number(item.row) - 1, 'Min Score', item.MinScore),
                rankingTempalte.checkCriteriaFieldCell(Number(item.row) - 1, 'Max Score', item.MaxScore),
                rankingTempalte.checkCriteriaFieldCell(Number(item.row) - 1, 'Weight', item.Weight)
            )),

        );
    }
}

export const addRankingCriteriaLineItem = {
    using: (criteriaInfo: DataTable) => {
        return Task.where(`#actor add ranking criteria line item with ${criteriaInfo}`,
            Click.on(rankingTempalte.criteriaTableBodyRows().nth(Number(criteriaInfo.rowsHash().row) - 1)),
            Click.on(rankingTempalte.iconButton('UpdateItem')),
            Wait.until(rankingCriteriaLineItem.popupWindow(), isPresent()),
            Switch.to(rankingCriteriaLineItem.popupWindow()).and(
                Click.on(rankingCriteriaLineItem.addBelowIcon()),
                rankingCriteriaLineItem.fillTableCell(0, 0, criteriaInfo.rowsHash().Score),
                rankingCriteriaLineItem.fillTableCell(0, 1, criteriaInfo.rowsHash().ListItem),
                Click.on(rankingCriteriaLineItem.OKButton()),
            ),

        );
    }
}

export const checkRankingLineItemAlertMessage = {
    using: (message: string) => {
        return Task.where(`#actor check ranking criteria line item alert message with ${message}`,

            checkMessagePopupBox(),
            Ensure.eventually(Text.of(messagePopupContent()), includes(message)),
            clickMessagePopupButton.using(OK),
            Switch.to(rankingCriteriaLineItem.popupWindow()).and(
                Click.on(rankingCriteriaLineItem.cancelButton()),
            ),
        );
    }
}

export const replicateRankingCriteria = {
    using: (rowNumber: string) => {
        return Task.where(`#actor replicate ranking criteria of row: ${rowNumber}`,
            Click.on(rankingTempalte.criteriaTableBodyRows().nth(Number(rowNumber) - 1)),
            Click.on(rankingTempalte.iconButton('Replicate')),
            clickButton.using(SAVE),

        );
    }
}

export const updateRankingCriteria = {
    using: (criteriaInfo: DataTable) => {
        const items = List.of(criteriaInfo.hashes())
        return Task.where(`#actor update ranking criteria information with ${criteriaInfo}`,
            items.forEach(({ actor, item }) => actor.attemptsTo(
                rankingTempalte.fillCriteriaTextField(Number(item.row) - 1, 'Ranking Evaluation Criteria', item.RankingEvaluationCriteria),
                rankingTempalte.fillCriteriaTextField(Number(item.row) - 1, 'Guidance for Evaluation', item.GuidanceforEvaluation),
                rankingTempalte.fillCriteriaNumberField(Number(item.row) - 1, 'Min Score', item.MinScore),
                rankingTempalte.fillCriteriaNumberField(Number(item.row) - 1, 'Max Score', item.MaxScore),
                rankingTempalte.fillCriteriaNumberField(Number(item.row) - 1, 'Weight', item.Weight)

            )),
            clickButton.using(SAVE),
        );
    }
}

export const moveRankingCriteria = {
    using: (rowNumber: string, buttonName: string) => {
        return Task.where(`#actor move row:${rowNumber} ranking criteria information by button ${buttonName}`,
            Click.on(rankingTempalte.criteriaTableBodyRows().nth(Number(rowNumber) - 1)),
            Click.on(rankingTempalte.iconButton(buttonName)),
            clickButton.using(SAVE),
            Wait.for(Duration.ofSeconds(3))
        );
    }
}

export const checkIndentResult = {
    using: (rowNumber1: string, rowNumber2: string) => {
        return Task.where(`#actor check indent result`,
            Ensure.eventually(Attribute.called('style').of(rankingTempalte.criteriaTableCell(Number(rowNumber1) - 1, 'Ranking Evaluation Criteria')), includes('padding-left: 2em')),
            Ensure.eventually(rankingTempalte.arrowIconRow(Number(rowNumber2) - 1, 'Ranking Evaluation Criteria'), isVisible())
        );
    }
}

export const checkOutdentResult = {
    using: (rowNumber1: string, rowNumber2: string) => {
        return Task.where(`#actor check indent result`,
            Ensure.eventually(Attribute.called('style').of(rankingTempalte.criteriaTableCell(Number(rowNumber1) - 1, 'Ranking Evaluation Criteria')), includes('padding-left: 0.6em')),
            Ensure.eventually(rankingTempalte.arrowIconRow(Number(rowNumber2) - 1, 'Ranking Evaluation Criteria'), not(isVisible()))
        );
    }
}