import { DataTable } from '@cucumber/cucumber';
import { Ensure, isGreaterThan } from '@serenity-js/assertions';
import { Check, Duration, List, Task, Wait } from '@serenity-js/core';
import { By, Click, isVisible, PageElement } from '@serenity-js/web';

import { DELETE, SUCCEEDED } from '../../../DefaultStaticParams'
import { checkMessagePopupBox, clickActionButton, clickAllCheckBox } from '../../common';
import { questionLineItem } from '../components/QuestionsLineItemField';
import { solicitationTab } from '../components/SolicitationTab';

/**
 * 添加单条line item数据
 * @param lineItemsInfo line数据
 */
export const addQuestionLineItem = {
    using: (lineItemsInfo: DataTable) => {
        const array: Record<string, string>[] = [lineItemsInfo.rowsHash()]
        const items = List.of(array)
        return addLineAndfillFields.using(items)

    }

}

export const addMultiQuestionLineitems = {
    using: (lineItemsInfo: DataTable) => {

        const items = List.of(lineItemsInfo.hashes())
        return addLineAndfillFields.using(items)
    }
}

const addLineAndfillFields = {
    using: (items: List<any>) => {
        return Task.where(`#actor add multi line items`,
            solicitationTab.clickSolicitationTab('Questions'),
            Wait.for(Duration.ofSeconds(5)),
            Ensure.eventually(questionLineItem.editableTableBox(), isVisible()),
            // 遍历数组，循环添加数据
            items.forEach(({ actor, item }) => actor.attemptsTo(
                clickSectionButton.using('imgAdd'),
                Wait.for(Duration.ofSeconds(2)),
                Ensure.eventually(questionLineItem.editableTableBox(), isVisible()),
                Check.whether(questionLineItem.lineItemsTr().count(), isGreaterThan(items.count()))
                    .andIfSo(
                        // 点击删除按钮
                        questionLineItem.clickButtonInButtonGroup(String(Number(item.rowNumber) + 1), DELETE)
                    ),
                // 给单元格填值
                fillFields.using(item),

            )),

            // 提交保存
            clickActionButton.using('Save'),

            checkMessagePopupBox(),
            Wait.for(Duration.ofSeconds(2))
        )
    }

}

const clickSectionButton = {
    using: (buttonName: string) =>
        Task.where(`#actor click the section button ${buttonName}`,
            Click.on(PageElement.located(By.css(`[data-name="${buttonName}"]`))
                .describedAs(buttonName + 'button'))
        )
}

const fillFields = {
    using: (item: Record<string, string>) =>

        Task.where(`#actor fill line fileds`,

            questionLineItem.fillTextInputField(item.rowNumber, 'Item No.', item.ItemNo),
            questionLineItem.fillEditLineItemDetailPopup(item.rowNumber, 'Question Description', item.ItemName)
        )

}

/**
 * 检查多行line item
 */
export const checkMultiQuestionLineItems = {
    using: (lineItemsInfo: DataTable, expectedResult: string) => {
        const items = List.of(lineItemsInfo.hashes())
        return expectedResult == SUCCEEDED ? checkQuestionLineItemsTask.using(items, expectedResult) : checkEmptyLineItemsTask()
    }
}

const checkQuestionLineItemsTask = {
    using: (items: List<any>, expectedResult: string) => {
        return Task.where(`#actor check line items value`,
            Ensure.eventually(questionLineItem.editableTableBox(), isVisible()),
            // 遍历数组，循环添加数据
            items.forEach(({ actor, item }) => actor.attemptsTo(

                questionLineItem.checkCellValue(item.rowNumber, 'Item No.', item.ItemNo, expectedResult),
                questionLineItem.checkCellValue(item.rowNumber, 'Question Description', item.ItemName, expectedResult),
            ))
        )
    }
}

const checkEmptyLineItemsTask = () => {
    return Task.where(`#actor check line items value`,
        Ensure.eventually(questionLineItem.emtpyDataTable(), isVisible())
    )

}

export const deleteQuestionLineItems = {
    using: () =>
        Task.where(`#actor delete question line items`,
            solicitationTab.clickSolicitationTab('Questions'),
            Wait.for(Duration.ofSeconds(5)),
            Ensure.eventually(questionLineItem.editableTableBox(), isVisible()),
            Wait.for(Duration.ofSeconds(5)),
            clickAllCheckBox(),
            clickSectionButton.using('imgDelete'),
            // 提交保存
            clickActionButton.using('Save'),
            checkMessagePopupBox(),
            Wait.for(Duration.ofSeconds(2))
        )
};
