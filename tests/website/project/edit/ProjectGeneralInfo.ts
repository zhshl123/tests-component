
import { DataTable } from '@cucumber/cucumber';
import { Duration, Question, Task, Wait } from '@serenity-js/core'
import { Click, Cookie } from '@serenity-js/web'

import { DELETE, OK, SAVE, SUCCEEDED } from '../../../DefaultStaticParams';
import { clickActionButton, clickButton, clickMessagePopupButton, formatted_now, waitMessagePopupBoxVisible } from '../../common';
import { COOKIE_PROJECT_NAME } from '../../common/statics';
import { project } from '../components/EditProjectFields';
import { projectTab } from '../components/ProjectTab';

export const updateProjectGeneralInfo = {
    using: (projectInfo: DataTable) => {
        const timestamp = formatted_now

        return Task.where(`#actor update project general information`,
            project.fillTextInputField('Project', projectInfo.rowsHash().Project + timestamp),
            project.setCookie(COOKIE_PROJECT_NAME, projectInfo.rowsHash().Project + timestamp),

            // 非必填字段
            Wait.for(Duration.ofSeconds(5)),
            project.fillTextInputField('Account Number', projectInfo.rowsHash().AccountNumber),
            project.clickSingleCheckBox('Is Annual Project', projectInfo.rowsHash().IsAnnualProject),
            project.selectItemInlookupPopup('Primary Fund Group', projectInfo.rowsHash().PrimaryFundGroup, 'Fund Group ID'),
            Wait.for(Duration.ofSeconds(5)),

            project.fillDropdownInputField('Service Department', projectInfo.rowsHash().ServiceDepartment),
            Wait.for(Duration.ofSeconds(5)),

            project.fillDropdownInputField('Department Priority Ranking', projectInfo.rowsHash().DepartmentPriorityRanking),
            Wait.for(Duration.ofSeconds(5)),

            project.fillDropdownInputField('Project Intent', projectInfo.rowsHash().ProjectIntent),
            Wait.for(Duration.ofSeconds(5)),

            project.fillDropdownInputField('Subprogram', projectInfo.rowsHash().Subprogram),
            project.fillDropdownInputField('District', projectInfo.rowsHash().District),
            project.fillTextInputField('Contact Person', projectInfo.rowsHash().ContactPerson),
            project.fillTextInputField('Page Number', projectInfo.rowsHash().PageNumber),
            project.fillTextInputField('Phone Number', projectInfo.rowsHash().PhoneNumber),
            project.fillDropdownInputField('Project Type', projectInfo.rowsHash().ProjectType),

            project.fillTextInputField('Project Location', projectInfo.rowsHash().ProjectLocation),
            project.fillTextInputField('Location Description', projectInfo.rowsHash().LocationDescription),
            project.fillTextInputField('Address', projectInfo.rowsHash().Address),
            project.fillTextInputField('Zip Code', projectInfo.rowsHash().ZipCode),
            project.fillTextInputField('Project Description', projectInfo.rowsHash().ProjectDescription),
            project.fillTextInputField('Project Justification', projectInfo.rowsHash().ProjectJustification),
            project.fillTextInputField('Proposed Project Funding', projectInfo.rowsHash().ProposedProjectFunding),
            project.fillTextInputField('Operation Impact', projectInfo.rowsHash().OperationImpact),
            project.fillTextInputField('Other Information', projectInfo.rowsHash().OtherInformation),
            Click.on(project.ralationshipAttributeLookupFieldClearIcon('Project Manager')),
            project.selectItemInRelationshipAttributeInLookupPopup('Project Manager', projectInfo.rowsHash().ProjectManager, 'Resource Name'),

            // 提交
            clickActionButton.using(SAVE),
            project.waitMessagePopupBoxVisible(),
            Wait.for(Duration.ofSeconds(5)),

        )
    }

}

export const checkUpdatedProjectGeneralInfo = {
    using: (projectInfo: DataTable) => {

        return Task.where(`#actor check updated project general information`,
            project.checkTextInputFieldValue('Project', Cookie.called(COOKIE_PROJECT_NAME).value(), SUCCEEDED),
            // project.checkLookupInputFieldSingleValue('Parent Project', projectInfo.rowsHash().ParentProject, SUCCEEDED),
            project.checkTextInputFieldValue('Account Number', projectInfo.rowsHash().AccountNumber, SUCCEEDED),
            project.checkLookupInputFieldSingleValue('Primary Fund Group', projectInfo.rowsHash().PrimaryFundGroup, SUCCEEDED),
            project.checkDropdownInputFieldValue('Service Department', projectInfo.rowsHash().ServiceDepartment, SUCCEEDED),
            project.checkDropdownInputFieldValue('Department Priority Ranking', projectInfo.rowsHash().DepartmentPriorityRanking, SUCCEEDED),

            project.checkDropdownInputFieldValue('Project Intent', projectInfo.rowsHash().ProjectIntent, SUCCEEDED),
            project.checkDropdownInputFieldValue('Subprogram', projectInfo.rowsHash().Subprogram, SUCCEEDED),
            project.checkDropdownInputFieldValue('District', projectInfo.rowsHash().District, SUCCEEDED),

            project.checkTextInputFieldValue('Contact Person', projectInfo.rowsHash().ContactPerson, SUCCEEDED),
            project.checkTextInputFieldValue('Page Number', projectInfo.rowsHash().PageNumber, SUCCEEDED),
            project.checkTextInputFieldValue('Phone Number', projectInfo.rowsHash().PhoneNumber, SUCCEEDED),
            project.checkDropdownInputFieldValue('Project Type', projectInfo.rowsHash().ProjectType, SUCCEEDED),

            project.checkTextInputFieldValue('Project Location', projectInfo.rowsHash().ProjectLocation, SUCCEEDED),
            project.checkTextInputFieldValue('Location Description', projectInfo.rowsHash().LocationDescription, SUCCEEDED),
            project.checkTextInputFieldValue('Address', projectInfo.rowsHash().Address, SUCCEEDED),
            project.checkTextInputFieldValue('Zip Code', projectInfo.rowsHash().ZipCode, SUCCEEDED),
            project.checkTextInputFieldValue('Project Description', projectInfo.rowsHash().ProjectDescription, SUCCEEDED),
            project.checkTextInputFieldValue('Project Justification', projectInfo.rowsHash().ProjectJustification, SUCCEEDED),
            project.checkTextInputFieldValue('Proposed Project Funding', projectInfo.rowsHash().ProposedProjectFunding, SUCCEEDED),
            project.checkTextInputFieldValue('Operation Impact', projectInfo.rowsHash().OperationImpact, SUCCEEDED),
            project.checkTextInputFieldValue('Other Information', projectInfo.rowsHash().OtherInformation, SUCCEEDED),
            project.checkRelationshipAttributeLookupInputFieldMultiValue('Project Manager', projectInfo.rowsHash().ProjectManager, SUCCEEDED)

        )

    }

}

export const deleteProject = {
    using: (projectName: string | Question<any>) =>
        Task.where(`#actor delete Project ${projectName}`,
            clickButton.using(DELETE),
            clickMessagePopupButton.using(OK),
            Wait.for(Duration.ofSeconds(5))

        )
}

export const closeoutProject = {
    using: (projectName: string | Question<any>) =>
        Task.where(`#actor closeout Project ${projectName}`,
            projectTab.clickTab('Closeout'),
            project.fillDropdownInputField('Open/Closed Status', 'Closed'),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
            Wait.for(Duration.ofSeconds(5)),

        )
}

export const openProject = () =>
    Task.where(`#actor open Project`,
        projectTab.clickTab('Closeout'),
        project.fillDropdownInputField('Open/Closed Status', 'Open'),
        clickButton.using(SAVE),
        waitMessagePopupBoxVisible(),
        Wait.for(Duration.ofSeconds(5)),
    )

