import { Question, Task } from '@serenity-js/core';
import { By, Click, Enter, PageElement } from '@serenity-js/web';

import { Workflow } from '../../common/abstract';
import { issueAttributeMap } from './IssueAttributes';

export class IssueWorkflow extends Workflow {
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);
    }

    selectWorkflowInput = () =>
        PageElement.located(By.xpath('//*[@id="ctl00_body_ucWorkflowAll_ucStartWorkflow_UpdatePanel1"]/div/span/span/input'))
            .describedAs('Select a Workflow Input')

    /**
     * 在下拉框的输入框中直接填入选项值
     * @param fieldName 字段名
     * @param itemName 选项值
     * @returns 
     */
    fillDropdownInputField = (itemName: string | Question<any>) => {
        return Task.where(`#actor fill dropdown input field:  select workflow with ${itemName}`,
            Click.on(this.selectWorkflowInput()),
            Enter.theValue(itemName).into(this.selectWorkflowInput())
        );
    }
}

export const issueWorkflow = new IssueWorkflow(issueAttributeMap)