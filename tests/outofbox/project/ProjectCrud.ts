import { DataTable } from '@cucumber/cucumber';
import { Ensure, equals } from '@serenity-js/assertions';
import { Duration, Question, Task, Wait } from '@serenity-js/core';
import { Attribute, Click, Cookie } from '@serenity-js/web';

import { ADD, DELETE, OK, SAVE, SEARCH, SUCCEEDED } from '../../DefaultStaticParams';
import { checkMessagePopupBox, clickActionButton, clickButton, clickMessagePopupButton, clickSectionButton, formatted_now, openPage, waitMessagePopupBoxVisible } from '../common';
import { BROWSE_DRAFT_PLANNING_PROJECT, COOKIE_PROJECT_NAME } from '../common/statics';
import { CS } from '../cycle-scenario/EditCS';
import { saveScopingAllocation } from '../scoping/FinancialForm';
import { browseProject } from './components/BrowseProjectFields';
import { project } from './components/EditProjectFields';
import { projectTab } from './components/ProjectTab';

/**
 * 添加project
 */
export const addProject = {

    using: (projectInfo: DataTable) => {
        project.cycle = projectInfo.rowsHash().Cycle
        return Task.where(`#actor submit add implementation project information`,

            // 填入必填字段
            fillProjectFields.using(projectInfo),

            // 提交
            clickActionButton.using(ADD),
            project.waitMessagePopupBoxVisible(),
        )
    }

}

export const addPlanningProject = {
    using: (projectInfo: DataTable) => {
        project.cycle = projectInfo.rowsHash().Cycle
        return Task.where(`#actor submit planning project information`,
            project.checkReadOnlyLabelValue('Project Phase', 'Planning', SUCCEEDED),
            project.checkReadOnlyLabelValue('Project Status', 'Preapproved', SUCCEEDED),
            // 填入必填字段
            fillProjectFields.using(projectInfo),
            // 提交
            clickActionButton.using(ADD),
            project.waitMessagePopupBoxVisible(),
        )
    }
}

export const addApprovedPlanningProject = {
    using: (projectInfo: DataTable) => {
        project.cycle = projectInfo.rowsHash().Cycle
        return Task.where(`#actor submit approved project information`,
            project.checkReadOnlyLabelValue('Project Phase', 'Planning', SUCCEEDED),
            project.checkReadOnlyLabelValue('Project Status', 'Approved', SUCCEEDED),
            // 填入必填字段
            fillProjectFields.using(projectInfo),
            // 提交
            clickActionButton.using(ADD),
            project.waitMessagePopupBoxVisible(),
        )
    }
}

export const fillProjectFields = {
    using: (projectInfo: DataTable) => {
        project.timestamp = formatted_now

        return Task.where(`#actor fill project with required fields`,
            project.selectDropdownItem('Cycle', projectInfo.rowsHash().Cycle),
            Wait.for(Duration.ofSeconds(5)),
            project.selectDropdownItem('Scenario', projectInfo.rowsHash().Scenario),
            Wait.for(Duration.ofSeconds(5)),
            // 设置ProjectName = 前缀+时间戳 ，以免出现ProjectName重复
            project.fillTextInputField('Project', projectInfo.rowsHash().Project + project.timestamp),
            project.setCookie(COOKIE_PROJECT_NAME, projectInfo.rowsHash().Project + project.timestamp),

            project.selectDropdownItem('Program', projectInfo.rowsHash().Program),
            project.selectDropdownItem('Department', projectInfo.rowsHash().Department),

        )
    }

}

/**
 * 添加approved的project
 */
export const addApprovedProject = {
    using: (projectName: string) => {
        project.timestamp = formatted_now
        return Task.where(`#actor submit add project information`,

            project.fillTextInputField('Project', projectName + project.timestamp),
            project.setCookie(COOKIE_PROJECT_NAME, projectName + project.timestamp),

            // 提交
            clickActionButton.using(ADD),
            Wait.for(Duration.ofSeconds(5)),
        )
    }

}

/**
 * 添加project
 */
export const addApprovedProjectAndProjectScoping = {
    using: (projectInfo: DataTable) => {
        project.timestamp = formatted_now
        return Task.where(`#actor submit add project information`,
            project.fillTextInputField('Project', projectInfo.rowsHash().ProjectName + project.timestamp),
            project.setCookie(COOKIE_PROJECT_NAME, projectInfo.rowsHash().ProjectName + project.timestamp),

            // 提交
            clickActionButton.using(ADD),
            Wait.for(Duration.ofSeconds(5)),
            browseProject.openPlanningProjectInBrowseImplementationPage(Cookie.called(COOKIE_PROJECT_NAME).value()),
            // 保存scoping
            projectTab.clickTab('Scoping'),
            Wait.for(Duration.ofSeconds(3)),
            saveScopingAllocation.using(projectInfo)
        )
    }

}

export const addProjectWithDynamicScenario = {
    using: (projectInfo: DataTable) => {
        project.timestamp = formatted_now
        return Task.where(`#actor submit add project information`,
            // 填入必填字段
            project.selectDropdownItem('Cycle', projectInfo.rowsHash().Cycle),
            Wait.for(Duration.ofSeconds(5)),
            project.selectDropdownItem('Scenario', projectInfo.rowsHash().Scenario + CS.timestamp),
            Wait.for(Duration.ofSeconds(5)),
            // 设置ProjectName = 前缀+时间戳 ，以免出现ProjectName重复
            project.fillTextInputField('Project', projectInfo.rowsHash().Project + project.timestamp),
            project.setCookie(COOKIE_PROJECT_NAME, projectInfo.rowsHash().Project + project.timestamp),

            // 提交
            clickActionButton.using(ADD),
            project.waitMessagePopupBoxVisible(),
        )
    }

}

export const updateProjectGeneralInfo = {
    using: (projectInfo: DataTable) => {
        const timestamp = formatted_now

        return Task.where(`#actor update project general information`,
            project.fillTextInputField('Project', projectInfo.rowsHash().Project + timestamp),
            project.setCookie(COOKIE_PROJECT_NAME, projectInfo.rowsHash().Project + timestamp),

            // 提交
            clickActionButton.using(SAVE),
            checkMessagePopupBox(),
            Wait.for(Duration.ofSeconds(5)),

        )
    }

}

export const checkUpdatedProjectGeneralInfo = {
    using: (projectInfo: DataTable) => {

        return Task.where(`#actor check updated project general information`,
            project.checkTextInputFieldValue('Project', Cookie.called(COOKIE_PROJECT_NAME).value(), SUCCEEDED),

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
            Wait.for(Duration.ofSeconds(5)),
            project.selectDropdownItem('Open/Closed Status', 'Closed'),
            clickButton.using(SAVE),
            Wait.for(Duration.ofSeconds(5)),

        )
}

export const openProject = () =>
    Task.where(`#actor open Project`,
        projectTab.clickTab('Closeout'),
        Wait.for(Duration.ofSeconds(5)),
        project.selectDropdownItem('Open/Closed Status', 'Open'),
        clickButton.using(SAVE),
        Wait.for(Duration.ofSeconds(5)),
    )

export const assignPlanningProjectManager = {
    using: (username: string) => {
        return Task.where(`#actor assign planning project manager`,
            project.selectItemInlookupPopup('Project Manager', username, 'Resource Name'),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
        )
    }
}

export const checkApprovedPlanningProject = () => {
    return Task.where(`#actor check approved planning project`,
        openPage.using(BROWSE_DRAFT_PLANNING_PROJECT),
        Wait.for(Duration.ofSeconds(2)),
        browseProject.selectDropdownItem('Cycle', project.cycle),
        Wait.for(Duration.ofSeconds(5)),
        browseProject.selectScenarioLookupDropdownItem('Draft Plan'),
        browseProject.selectLookupDropdownItem('Project Phase', 'Planning'),
        browseProject.selectLookupDropdownItem('Project Status', 'Approved'),
        browseProject.fillTextInputField('Project', Cookie.called(COOKIE_PROJECT_NAME).value()),
        clickButton.using(SEARCH),
        Wait.for(Duration.ofSeconds(3)),
        browseProject.checkSearchResult(Cookie.called(COOKIE_PROJECT_NAME).value(), SUCCEEDED),
    )
}

export const selectBatchApprovalProject = {
    using: (buttonName: string) => {
        return Task.where(`#actor select the batch approval project`,

            browseProject.searchItemInBrowsePlanningProjectPage(BROWSE_DRAFT_PLANNING_PROJECT, project.cycle, 'Project', Cookie.called(COOKIE_PROJECT_NAME).value()),
            browseProject.checkSearchResult(Cookie.called(COOKIE_PROJECT_NAME).value(), SUCCEEDED),
            Click.on(browseProject.firstCheckboxInGrid()),
            clickSectionButton.using(buttonName),
            Wait.for(Duration.ofSeconds(5))

        )
    }
}

export const confirmBatchApprovalProject = () => {
    return Task.where(`#actor confirm the batch approval project`,
        project.selectCopySelectedProjectDropdownItem('Cycle1', project.cycle),
        Wait.for(Duration.ofSeconds(5)),
        Ensure.eventually(Attribute.called('title').of(project.copySelectedProjectDropdownField('Scenario1')), equals('Approved Plans')),
        project.selectCopySelectedProjectDropdownItem('Scenario1', 'Draft Plans'),
        Click.on(project.copySelectedProjectScopingCheckbox()),
        Wait.for(Duration.ofSeconds(2)),
        Click.on(project.copySelectedProjectOKButton()),

    )
}

export const changeProjectStatus = {
    using: (status: string) => {
        return Task.where(`#actor change project status:${status}`,
            projectTab.clickTab('Implementation'),
            Wait.for(Duration.ofSeconds(5)),
            project.selectDropdownItem('Project Status', 'Active'),
            clickButton.using(SAVE),
            Wait.for(Duration.ofSeconds(5))
        )
    }
}
