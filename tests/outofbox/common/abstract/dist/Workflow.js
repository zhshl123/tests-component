"use strict";
exports.__esModule = true;
exports.Workflow = void 0;
/* eslint-disable unicorn/prefer-string-replace-all */
var assertions_1 = require("@serenity-js/assertions");
var core_1 = require("@serenity-js/core");
var web_1 = require("@serenity-js/web");
var DefaultStaticParams_1 = require("../../../DefaultStaticParams");
var ClickButton_1 = require("../ClickButton");
var messagePopup_1 = require("../messagePopup");
var Workflow = /** @class */ (function () {
    function Workflow(entityMap) {
        var _this = this;
        this.startWorkflow = function () {
            return core_1.Task.where("#actor start the workflow", core_1.Check.whether(_this.participantsTable(), assertions_1.isPresent()).andIfSo(core_1.Log.the('workflow already startd')).otherwise(core_1.Check.whether(_this.reviewResultInput(), web_1.isVisible()).andIfSo(core_1.Log.the('workflow already in view result step')).otherwise(ClickButton_1.clickButton.using('Start Workflow'), messagePopup_1.checkMessagePopupBox(), messagePopup_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK), core_1.Wait["for"](core_1.Duration.ofSeconds(5)))));
        };
        this.terminateWorkflow = function () {
            return core_1.Task.where("#actor terminate the workflow", ClickButton_1.clickButton.using('Terminate'), messagePopup_1.checkMessagePopupBox(), messagePopup_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK), core_1.Wait["for"](core_1.Duration.ofSeconds(5)));
        };
        this.acceptWorkflowTaskAndsubmitReviewResult = function (reviewResult) {
            return core_1.Task.where("#actor accept the workflow task and submit review result:" + reviewResult, core_1.Check.whether(_this.reviewResultInput(), assertions_1.isPresent()).andIfSo(core_1.Log.the('workflow already accepted')).otherwise(ClickButton_1.clickButton.using('Accept Workflow Task')), core_1.Wait.until(_this.reviewResultInput(), assertions_1.isPresent()), _this.selectReviewResult(reviewResult), core_1.Wait["for"](core_1.Duration.ofSeconds(5)), ClickButton_1.clickButton.using('Submit'), core_1.Wait["for"](core_1.Duration.ofSeconds(5)));
        };
        this.completeWorkflow = function () {
            return core_1.Task.where("#actor accept & complete the workflow", core_1.Check.whether(_this.reviewResultInput(), assertions_1.isPresent()).andIfSo(core_1.Log.the('workflow already accepted')).otherwise(ClickButton_1.clickButton.using('Accept Workflow Task')), core_1.Wait.until(_this.reviewResultInput(), assertions_1.isPresent()), _this.selectReviewResult('Complete'), core_1.Wait["for"](core_1.Duration.ofSeconds(5)), ClickButton_1.clickButton.using('Submit'), core_1.Wait["for"](core_1.Duration.ofSeconds(5)));
        };
        this.approveWorkflow = function () {
            return core_1.Task.where("#actor accept & complete the workflow", core_1.Check.whether(_this.reviewResultInput(), assertions_1.isPresent()).andIfSo(core_1.Log.the('workflow already accepted')).otherwise(ClickButton_1.clickButton.using('Accept Workflow Task')), core_1.Wait.until(_this.reviewResultInput(), assertions_1.isPresent()), _this.selectReviewResult('Approve'), core_1.Wait["for"](core_1.Duration.ofSeconds(5)), ClickButton_1.clickButton.using('Submit'), core_1.Wait["for"](core_1.Duration.ofSeconds(5)));
        };
        this.acknowledgeWorkflow = function () {
            return core_1.Task.where("#actor accept & complete the workflow", core_1.Check.whether(_this.reviewResultInput(), assertions_1.isPresent()).andIfSo(core_1.Log.the('workflow already accepted')).otherwise(ClickButton_1.clickButton.using('Accept Workflow Task')), core_1.Wait.until(_this.reviewResultInput(), assertions_1.isPresent()), _this.selectReviewResult('Acknowledge'), core_1.Wait["for"](core_1.Duration.ofSeconds(5)), ClickButton_1.clickButton.using('Submit'), core_1.Wait["for"](core_1.Duration.ofSeconds(5)));
        };
        /**
        * 选择view result下拉框选项
        * @param fieldName
        * @param itemName
        * @returns
        */
        this.selectReviewResult = function (itemName) {
            return core_1.Task.where("#actor selects dropdown item: " + itemName, web_1.Click.on(_this.reviewResultInput()), 
            // 确保下拉框有值之后再点击对应选项
            assertions_1.Ensure.eventually(_this.reviewResultDropdownList().first(), assertions_1.isPresent()), web_1.Click.on(_this.reviewResultDropdownItem(itemName)));
        };
        /**
        * 选择Select a workflow下拉框选项
        * @param fieldName
        * @param itemName
        * @returns
        */
        this.selectAWorkflow = function (itemName) {
            return core_1.Task.where("#actor selects a workflow: " + itemName, web_1.Click.on(_this.reviewResultInput()), 
            // 确保下拉框有值之后再点击对应选项
            assertions_1.Ensure.eventually(_this.reviewResultDropdownList().first(), assertions_1.isPresent()), web_1.Click.on(_this.reviewResultDropdownItem(itemName)));
        };
        /**************************************************** html 元素组件************************************************* */
        this.reviewResultInput = function () {
            return web_1.PageElement.located(web_1.By.css("[name=\"ctl00$body$ucWorkflowAll$ucWorkflowInstanceStatus$ddlReviewResult_input\"]"))
                .describedAs('Review Result Input');
        };
        this.reviewResultDropdownListBox = function () {
            return web_1.PageElement.located(web_1.By.id('ctl00_body_ucWorkflowAll_ucWorkflowInstanceStatus_ddlReviewResult_listbox'))
                .describedAs('dropdown list box:review result');
        };
        this.reviewResultDropdownList = function () {
            return web_1.PageElements.located(web_1.By.css('li')).of(_this.reviewResultDropdownListBox())
                .describedAs('dropdown list:review result');
        };
        this.reviewResultDropdownItem = function (itemName) {
            return web_1.PageElement.located(web_1.By.css("[title=\"" + itemName + "\"]"))
                .of(_this.reviewResultDropdownListBox())
                .describedAs('dropdown item: ' + itemName);
        };
        this.participantsTable = function () {
            return web_1.PageElement.located(web_1.By.id('innerTable'))
                .describedAs('participants table');
        };
        this.participantsTableCell = function (username) {
            return web_1.PageElement.located(web_1.By.cssContainingText('td', username))
                .of(_this.participantsTable())
                .describedAs('participants table cell content ' + username);
        };
        this.selectWorkflowDropdownInputField = function () {
            return web_1.PageElement.located(web_1.By.css("[aria-owns=\"ctl00_body_ucWorkflowAll_ucStartWorkflow_ddlWorkflow_listbox\"]"))
                .describedAs('select workflow dropdown input field');
        };
        this.selectWorkflowDropdownListBox = function () {
            return web_1.PageElement.located(web_1.By.id('ctl00_body_ucWorkflowAll_ucStartWorkflow_ddlWorkflow_listbox'))
                .describedAs('dropdown list box:review result');
        };
        this.selectWorkflowDropdownList = function () {
            return web_1.PageElements.located(web_1.By.css('li')).of(_this.selectWorkflowDropdownListBox())
                .describedAs('dropdown list:review result');
        };
        this.selectWorkflowDropdownDropdownItem = function (itemName) {
            return web_1.PageElement.located(web_1.By.cssContainingText("span", itemName))
                .of(_this.selectWorkflowDropdownListBox())
                .describedAs('dropdown item: ' + itemName);
        };
        this.entityMap = entityMap;
    }
    return Workflow;
}());
exports.Workflow = Workflow;
