"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workflow = void 0;
/* eslint-disable unicorn/prefer-string-replace-all */
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../../DefaultStaticParams");
const ClickButton_1 = require("../ClickButton");
const messagePopup_1 = require("../messagePopup");
class Workflow {
    constructor(entityMap) {
        this.startWorkflow = () => {
            return core_1.Task.where(`#actor start the workflow`, core_1.Check.whether(this.participantsTable(), (0, assertions_1.isPresent)()).andIfSo(core_1.Log.the('workflow already startd')).otherwise(core_1.Check.whether(this.reviewResultInput(), (0, web_1.isVisible)()).andIfSo(core_1.Log.the('workflow already in view result step')).otherwise(ClickButton_1.clickButton.using('Start Workflow'), (0, messagePopup_1.checkMessagePopupBox)(), messagePopup_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK), core_1.Wait.for(core_1.Duration.ofSeconds(5)))));
        };
        this.terminateWorkflow = () => {
            return core_1.Task.where(`#actor terminate the workflow`, ClickButton_1.clickButton.using('Terminate'), (0, messagePopup_1.checkMessagePopupBox)(), messagePopup_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
        };
        this.acceptWorkflowTaskAndsubmitReviewResult = (reviewResult) => {
            return core_1.Task.where(`#actor accept the workflow task and submit review result:${reviewResult}`, core_1.Check.whether(this.reviewResultInput(), (0, assertions_1.isPresent)()).andIfSo(core_1.Log.the('workflow already accepted')).otherwise(ClickButton_1.clickButton.using('Accept Workflow Task')), core_1.Wait.until(this.reviewResultInput(), (0, assertions_1.isPresent)()), this.selectReviewResult(reviewResult), core_1.Wait.for(core_1.Duration.ofSeconds(5)), ClickButton_1.clickButton.using('Submit'), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
        };
        this.completeWorkflow = () => {
            return core_1.Task.where(`#actor accept & complete the workflow`, core_1.Check.whether(this.reviewResultInput(), (0, assertions_1.isPresent)()).andIfSo(core_1.Log.the('workflow already accepted')).otherwise(ClickButton_1.clickButton.using('Accept Workflow Task')), core_1.Wait.until(this.reviewResultInput(), (0, assertions_1.isPresent)()), this.selectReviewResult('Complete'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), ClickButton_1.clickButton.using('Submit'), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
        };
        this.approveWorkflow = () => {
            return core_1.Task.where(`#actor accept & complete the workflow`, core_1.Check.whether(this.reviewResultInput(), (0, assertions_1.isPresent)()).andIfSo(core_1.Log.the('workflow already accepted')).otherwise(ClickButton_1.clickButton.using('Accept Workflow Task')), core_1.Wait.until(this.reviewResultInput(), (0, assertions_1.isPresent)()), this.selectReviewResult('Approve'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), ClickButton_1.clickButton.using('Submit'), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
        };
        this.acknowledgeWorkflow = () => {
            return core_1.Task.where(`#actor accept & complete the workflow`, core_1.Check.whether(this.reviewResultInput(), (0, assertions_1.isPresent)()).andIfSo(core_1.Log.the('workflow already accepted')).otherwise(ClickButton_1.clickButton.using('Accept Workflow Task')), core_1.Wait.until(this.reviewResultInput(), (0, assertions_1.isPresent)()), this.selectReviewResult('Acknowledge'), core_1.Wait.for(core_1.Duration.ofSeconds(5)), ClickButton_1.clickButton.using('Submit'), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
        };
        /**
        * 选择view result下拉框选项
        * @param fieldName
        * @param itemName
        * @returns
        */
        this.selectReviewResult = (itemName) => {
            return core_1.Task.where(`#actor selects view result item: ${itemName}`, core_1.Check.whether(this.processTypeReadOnlyField(), (0, assertions_1.isPresent)()).andIfSo(core_1.Log.the('workflow already started'), this.terminateWorkflow()), web_1.Click.on(this.reviewResultInput()), 
            // 确保下拉框有值之后再点击对应选项
            assertions_1.Ensure.eventually(this.reviewResultDropdownList().first(), (0, assertions_1.isPresent)()), web_1.Click.on(this.reviewResultDropdownItem(itemName)));
        };
        /**
        * 选择Select a workflow下拉框选项
        * @param fieldName
        * @param itemName
        * @returns
        */
        this.selectAWorkflow = (itemName) => {
            return core_1.Task.where(`#actor selects a workflow: ${itemName}`, web_1.Click.on(this.selectWorkflowDropdownInputField()), 
            // 确保下拉框有值之后再点击对应选项
            assertions_1.Ensure.eventually(this.selectWorkflowDropdownList().first(), (0, assertions_1.isPresent)()), web_1.Click.on(this.selectWorkflowDropdownItem(itemName)));
        };
        /**************************************************** html 元素组件************************************************* */
        this.reviewResultInput = () => web_1.PageElement.located(web_1.By.css(`[name="ctl00$body$ucWorkflowAll$ucWorkflowInstanceStatus$ddlReviewResult_input"]`))
            .describedAs('Review Result Input');
        this.reviewResultDropdownListBox = () => web_1.PageElement.located(web_1.By.id('ctl00_body_ucWorkflowAll_ucWorkflowInstanceStatus_ddlReviewResult_listbox'))
            .describedAs('dropdown list box:review result');
        this.reviewResultDropdownList = () => web_1.PageElements.located(web_1.By.css('li')).of(this.reviewResultDropdownListBox())
            .describedAs('dropdown list:review result');
        this.reviewResultDropdownItem = (itemName) => web_1.PageElement.located(web_1.By.css(`[title="${itemName}"]`))
            .of(this.reviewResultDropdownListBox())
            .describedAs('dropdown item: ' + itemName);
        this.participantsTable = () => web_1.PageElement.located(web_1.By.id('innerTable'))
            .describedAs('participants table');
        this.participantsTableCell = (username) => web_1.PageElement.located(web_1.By.cssContainingText('td', username))
            .of(this.participantsTable())
            .describedAs('participants table cell content ' + username);
        this.selectWorkflowDropdownInputField = () => web_1.PageElement.located(web_1.By.css(`[aria-owns="ctl00_body_ucWorkflowAll_ucStartWorkflow_ddlWorkflow_listbox"]`))
            .describedAs('select workflow dropdown input field');
        this.selectWorkflowDropdownListBox = () => web_1.PageElement.located(web_1.By.id('ctl00_body_ucWorkflowAll_ucStartWorkflow_ddlWorkflow_listbox'))
            .describedAs('dropdown list box:review result');
        this.selectWorkflowDropdownList = () => web_1.PageElements.located(web_1.By.css('li')).of(this.selectWorkflowDropdownListBox())
            .describedAs('dropdown list:review result');
        this.selectWorkflowDropdownItem = (itemName) => web_1.PageElement.located(web_1.By.cssContainingText(`span`, itemName))
            .of(this.selectWorkflowDropdownListBox())
            .describedAs('dropdown item: ' + itemName);
        this.processTypeReadOnlyField = () => web_1.PageElement.located(web_1.By.id('ctl00_body_ucWorkflowAll_ucWorkflowInstanceStatus_lblMultipleProcessTypeName'))
            .describedAs('process type read only field');
        this.entityMap = entityMap;
    }
}
exports.Workflow = Workflow;
//# sourceMappingURL=Workflow.js.map