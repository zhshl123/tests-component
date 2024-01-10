import { DataTable } from '@cucumber/cucumber'
import { Ensure, includes, isPresent } from '@serenity-js/assertions'
import { Duration, Question, Task, Wait } from '@serenity-js/core'
import { Click, Cookie, Text } from '@serenity-js/web'

import { ADD_MASTER_PROJECT, DELETE, DELETE_PARENT_ONLY, OK, SAVE } from '../../DefaultStaticParams';
import { clickActionButton, clickButton, clickMessagePopupButton, formatted_now } from '../common';
import { COOKIE_MASTER_PROJECT_NAME } from '../common/statics';
import { project } from './components/EditProjectFields';
import { projectTab } from './components/ProjectTab';

export const addMasterProject = {
    using: (masterProjectInfo: DataTable) => {
        return Task.where(`#actor submit add master project information`,

            projectTab.clickTab('Structure'),
            Ensure.eventually(project.addMasterProjectButton(), isPresent()),
            clickButton.using(ADD_MASTER_PROJECT),
            Wait.for(Duration.ofSeconds(5)),

            // 填入必填字段
            fillMasterProjectFields.using(masterProjectInfo),

            // 提交
            clickActionButton.using(SAVE),
            Wait.for(Duration.ofSeconds(5)),

        )

    }

}

export const fillMasterProjectFields = {
    using: (masterProjectInfo: DataTable) => {
        const timestamp_master = formatted_now
        return Task.where(`#actor fill project with required fields`,

            // 设置ProjectName = 前缀+时间戳 ，以免出现ProjectName重复
            project.fillTextInputField('Project', masterProjectInfo.rowsHash().Project + timestamp_master),
            project.setCookie(COOKIE_MASTER_PROJECT_NAME, masterProjectInfo.rowsHash().Project + timestamp_master),
            project.selectDropdownItem('Project Phase', masterProjectInfo.rowsHash().ProjectPhase)

        )
    }

}

export const checkParentProjectField = {
    using: () => {
        return Task.where(`#actor check the Master Project shown in the Parent Project Field of Project1`,
            projectTab.clickTab('Implementation'),
            Wait.for(Duration.ofSeconds(5)),
            Ensure.eventually(Text.of(project.readOnlyLookupFieldValue('Master Project')), includes(Cookie.called(COOKIE_MASTER_PROJECT_NAME).value()))

        )

    }

}

export const deleteMasterProject = {
    using: (projectName: string | Question<any>) =>
        Task.where(`#actor delete Master Project ${projectName}`,
            projectTab.clickTab('Structure'),
            Ensure.eventually(project.addMasterProjectButton(), isPresent()),
            Click.on(project.projectStructureTreeBranch(Cookie.called(COOKIE_MASTER_PROJECT_NAME).value())),
            Wait.for(Duration.ofSeconds(3)),
            projectTab.clickTab('General'),
            Wait.for(Duration.ofSeconds(3)),
            clickActionButton.using(DELETE),
            clickMessagePopupButton.using(OK),
            clickMessagePopupButton.using(DELETE_PARENT_ONLY),
            Wait.for(Duration.ofSeconds(5))

        )
}