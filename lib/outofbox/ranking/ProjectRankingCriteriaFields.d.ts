import { Question } from '@serenity-js/core';
import { EditFromFields } from '../common/abstract';
export declare class ProjectRankingCriteriaFields extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    selectScore: (score: string) => any;
    checkReadOnlyTextFieldValue: (fieldName: string, value: string) => any;
    /**
 * 检查数字输入框的值
 * @param fieldName 字段名
 * @param itemName 字段的期望值
 * @param expectedResult 检查结果 SUCCEEDED：输入框的值与预期值一致/FAILED：不一致
 * @returns
 */
    checkNumberInputFieldValue: (fieldName: string, itemName: string | Question<any>) => any;
    criteriaGuidanceIcon: () => any;
    scoreTable: () => any;
    /**
     *
     * @param score 分数值
     * @returns
     */
    scoreCheckbox: (score: string) => any;
    justificationTextInputField: () => any;
    readOnlyTextField: (fieldName: string) => any;
}
export declare const projectRankingCriteria: ProjectRankingCriteriaFields;
