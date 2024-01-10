import { Ensure, equals, isPresent } from '@serenity-js/assertions';
import { Check, Question, Task } from '@serenity-js/core';
import { Attribute, By, Click, PageElement } from '@serenity-js/web';

import { EditFromFields } from '../common/abstract';
import { rankingMap } from './RankingAttributes';

export class ProjectRankingCriteriaFields extends EditFromFields {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);
    }

    selectScore = (score: string) => {
        return Task.where(`#actor select first criteria score table ${score}th score checkbox`,
            Click.on(this.scoreCheckbox(score))
        )
    }

    checkReadOnlyTextFieldValue = (fieldName: string, value: string) => {
        return Task.where(`#actor check read only ${fieldName} text field value with ${value}`,
            Ensure.eventually(Attribute.called('value').of(projectRankingCriteria.readOnlyTextField(fieldName)), equals(value))
        )
    }

    /**
 * 检查数字输入框的值
 * @param fieldName 字段名
 * @param itemName 字段的期望值
 * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
 * @returns 
 */
    checkNumberInputFieldValue = (fieldName: string, itemName: string | Question<any>) => {
        return Task.where(`#actor check number field: ${fieldName}'s value with ${itemName}`,
            Check.whether(
                this.numberInputField(fieldName), isPresent()
            ).andIfSo(
                Ensure.eventually(Attribute.called('value').of(this.numberInputField(fieldName)), equals(itemName))
            )
        )
    }

    criteriaGuidanceIcon = () =>
        PageElement.located(By.id('ctl00_body_tlvRankingProject_ctl02_imgTooltip'))
            .describedAs('first criteria guidance icon')

    scoreTable = () =>
        PageElement.located(By.id('ctl00_body_tlvRankingProject_ctl02_rdlScore'))
            .describedAs('first criteria score table')

    /**
     * 
     * @param score 分数值
     * @returns 
     */
    scoreCheckbox = (score: string) =>
        PageElement.located(By.cssContainingText('td label', score))
            .of(this.scoreTable())
            .describedAs(`first criteria score table ${score} score checkbox`)

    justificationTextInputField = () =>
        PageElement.located(By.id('ctl00_body_tlvRankingProject_ctl02_txtJustification'))
            .describedAs(`first criteria justification text input field`)

    readOnlyTextField = (fieldName: string) =>
        PageElement.located(By.id('ctl00_body_txt' + this.entityMap.get(fieldName)))
            .describedAs(`read only ${fieldName} text field`)

}

export const projectRankingCriteria = new ProjectRankingCriteriaFields(rankingMap)