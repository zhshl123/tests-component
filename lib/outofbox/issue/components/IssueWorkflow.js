"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.issueWorkflow = exports.IssueWorkflow = void 0;
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const abstract_1 = require("../../common/abstract");
const IssueAttributes_1 = require("./IssueAttributes");
class IssueWorkflow extends abstract_1.Workflow {
    constructor(entityMap) {
        super(entityMap);
        this.selectWorkflowInput = () => web_1.PageElement.located(web_1.By.xpath('//*[@id="ctl00_body_ucWorkflowAll_ucStartWorkflow_UpdatePanel1"]/div/span/span/input'))
            .describedAs('Select a Workflow Input');
        /**
         * 在下拉框的输入框中直接填入选项值
         * @param fieldName 字段名
         * @param itemName 选项值
         * @returns
         */
        this.fillDropdownInputField = (itemName) => {
            return core_1.Task.where(`#actor fill dropdown input field:  select workflow with ${itemName}`, web_1.Click.on(this.selectWorkflowInput()), web_1.Enter.theValue(itemName).into(this.selectWorkflowInput()));
        };
    }
}
exports.IssueWorkflow = IssueWorkflow;
exports.issueWorkflow = new IssueWorkflow(IssueAttributes_1.issueAttributeMap);
//# sourceMappingURL=IssueWorkflow.js.map