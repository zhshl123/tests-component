/* eslint-disable unicorn/prefer-string-replace-all */
import { Ensure, isPresent } from '@serenity-js/assertions';
import { Check, Duration, Log, Question, Task, Wait } from '@serenity-js/core';
import { By, Click, isVisible, PageElement, PageElements } from '@serenity-js/web';

import { OK } from '../../../DefaultStaticParams';
import { clickButton } from '../ClickButton';
import { checkMessagePopupBox, clickMessagePopupButton } from '../messagePopup';

export class Workflow {
    entityMap: Map<string, string>
    constructor(entityMap) {
        this.entityMap = entityMap;
    }

    startWorkflow = () => {
        return Task.where(`#actor start the workflow`,
            Check.whether(
                this.participantsTable(), isPresent()
            ).andIfSo(
                Log.the('workflow already startd')
            ).otherwise(
                Check.whether(
                    this.reviewResultInput(), isVisible()
                ).andIfSo(
                    Log.the('workflow already in view result step')
                ).otherwise(
                    clickButton.using('Start Workflow'),
                    checkMessagePopupBox(),
                    clickMessagePopupButton.using(OK),
                    Wait.for(Duration.ofSeconds(5)),
                ),
            )
        )
    }

    terminateWorkflow = () => {
        return Task.where(`#actor terminate the workflow`,
            clickButton.using('Terminate'),
            checkMessagePopupBox(),
            clickMessagePopupButton.using(OK),
            Wait.for(Duration.ofSeconds(5)),
        )
    }

    acceptWorkflowTaskAndsubmitReviewResult = (reviewResult: string) => {
        return Task.where(`#actor accept the workflow task and submit review result:${reviewResult}`,
            Check.whether(
                this.reviewResultInput(), isPresent()
            ).andIfSo(
                Log.the('workflow already accepted')
            ).otherwise(
                clickButton.using('Accept Workflow Task'),
            ),
            Wait.until(this.reviewResultInput(), isPresent()),
            this.selectReviewResult(reviewResult),
            Wait.for(Duration.ofSeconds(5)),
            clickButton.using('Submit'),
            Wait.for(Duration.ofSeconds(5)),
        )
    }

    completeWorkflow = () => {
        return Task.where(`#actor accept & complete the workflow`,
            Check.whether(
                this.reviewResultInput(), isPresent()
            ).andIfSo(
                Log.the('workflow already accepted')
            ).otherwise(
                clickButton.using('Accept Workflow Task'),

            ),
            Wait.until(this.reviewResultInput(), isPresent()),
            this.selectReviewResult('Complete'),
            Wait.for(Duration.ofSeconds(5)),
            clickButton.using('Submit'),
            Wait.for(Duration.ofSeconds(5)),
        )
    }

    approveWorkflow = () => {
        return Task.where(`#actor accept & complete the workflow`,
            Check.whether(
                this.reviewResultInput(), isPresent()
            ).andIfSo(
                Log.the('workflow already accepted')
            ).otherwise(
                clickButton.using('Accept Workflow Task'),

            ),
            Wait.until(this.reviewResultInput(), isPresent()),
            this.selectReviewResult('Approve'),
            Wait.for(Duration.ofSeconds(5)),
            clickButton.using('Submit'),
            Wait.for(Duration.ofSeconds(5)),
        )
    }

    acknowledgeWorkflow = () => {
        return Task.where(`#actor accept & complete the workflow`,
            Check.whether(
                this.reviewResultInput(), isPresent()
            ).andIfSo(
                Log.the('workflow already accepted')
            ).otherwise(
                clickButton.using('Accept Workflow Task'),

            ),
            Wait.until(this.reviewResultInput(), isPresent()),
            this.selectReviewResult('Acknowledge'),
            Wait.for(Duration.ofSeconds(5)),
            clickButton.using('Submit'),
            Wait.for(Duration.ofSeconds(5)),
        )
    }

    /**
    * 选择view result下拉框选项
    * @param fieldName 
    * @param itemName 
    * @returns 
    */
    selectReviewResult = (itemName: string | Question<any>) => {
        return Task.where(`#actor selects view result item: ${itemName}`,
            Check.whether(
                this.processTypeReadOnlyField(), isPresent()
            ).andIfSo(
                Log.the('workflow already started'),
                this.terminateWorkflow()
            ),
            Click.on(this.reviewResultInput()),
            // 确保下拉框有值之后再点击对应选项
            Ensure.eventually(this.reviewResultDropdownList().first(), isPresent()),
            Click.on(this.reviewResultDropdownItem(itemName)),

        )
    }

    /**
    * 选择Select a workflow下拉框选项
    * @param fieldName 
    * @param itemName 
    * @returns 
    */
    selectAWorkflow = (itemName: string | Question<any>) => {
        return Task.where(`#actor selects a workflow: ${itemName}`,
            Click.on(this.selectWorkflowDropdownInputField()),
            // 确保下拉框有值之后再点击对应选项
            Ensure.eventually(this.selectWorkflowDropdownList().first(), isPresent()),
            Click.on(this.selectWorkflowDropdownItem(itemName)),

        )
    }

    /**************************************************** html 元素组件************************************************* */
    reviewResultInput = () =>
        PageElement.located(By.css(`[name="ctl00$body$ucWorkflowAll$ucWorkflowInstanceStatus$ddlReviewResult_input"]`))
            .describedAs('Review Result Input')

    reviewResultDropdownListBox = () =>
        PageElement.located(By.id('ctl00_body_ucWorkflowAll_ucWorkflowInstanceStatus_ddlReviewResult_listbox'))
            .describedAs('dropdown list box:review result')

    reviewResultDropdownList = () =>
        PageElements.located(By.css('li')).of(this.reviewResultDropdownListBox())
            .describedAs('dropdown list:review result')

    reviewResultDropdownItem = (itemName: string | Question<any>) =>
        PageElement.located(By.css(`[title="${itemName}"]`))
            .of(this.reviewResultDropdownListBox())
            .describedAs('dropdown item: ' + itemName)

    participantsTable = () =>
        PageElement.located(By.id('innerTable'))
            .describedAs('participants table')

    participantsTableCell = (username: string) =>
        PageElement.located(By.cssContainingText('td', username))
            .of(this.participantsTable())
            .describedAs('participants table cell content ' + username)

    selectWorkflowDropdownInputField = () =>
        PageElement.located(By.css(`[aria-owns="ctl00_body_ucWorkflowAll_ucStartWorkflow_ddlWorkflow_listbox"]`))
            .describedAs('select workflow dropdown input field')

    selectWorkflowDropdownListBox = () =>
        PageElement.located(By.id('ctl00_body_ucWorkflowAll_ucStartWorkflow_ddlWorkflow_listbox'))
            .describedAs('dropdown list box:review result')

    selectWorkflowDropdownList = () =>
        PageElements.located(By.css('li')).of(this.selectWorkflowDropdownListBox())
            .describedAs('dropdown list:review result')

    selectWorkflowDropdownItem = (itemName: string | Question<any>) =>
        PageElement.located(By.cssContainingText(`span`, itemName))
            .of(this.selectWorkflowDropdownListBox())
            .describedAs('dropdown item: ' + itemName)

    processTypeReadOnlyField = () =>
        PageElement.located(By.id('ctl00_body_ucWorkflowAll_ucWorkflowInstanceStatus_lblMultipleProcessTypeName'))
            .describedAs('process type read only field')

}
