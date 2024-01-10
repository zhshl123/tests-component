import { DataTable } from '@cucumber/cucumber'
import { Ensure, includes,isPresent } from '@serenity-js/assertions'
import { Duration, Question, Task, Wait } from '@serenity-js/core'
import { Click, Cookie, Text } from '@serenity-js/web'

import { ADD_MASTER_PROJECT, DELETE, DELETE_PARENT_ONLY,OK, SAVE } from '../../../DefaultStaticParams';
import { clickActionButton, clickButton, clickMessagePopupButton, formatted_now } from '../../common';
import { COOKIE_MASTER_PROJECT_NAME } from '../../common/statics';
import { project } from '../components/EditProjectFields';
import { projectTab } from '../components/ProjectTab';

export const addMasterProject = {
    using: (masterProjectInfo: DataTable) => {
        return Task.where(`#actor submit add master project information`,
            projectTab.clickTab('Implementation'),
            Wait.for(Duration.ofSeconds(5)),
            projectTab.clickTab('Structure'),
            Ensure.eventually(project.addMasterProjectButton(), isPresent()),
            clickButton.using(ADD_MASTER_PROJECT),
            Wait.for(Duration.ofSeconds(5)),

            // 填入必填字段
            fillMasterProjectRequiredFields.using(
                masterProjectInfo.rowsHash().Project,
                masterProjectInfo.rowsHash().Department,
                masterProjectInfo.rowsHash().Program,
                masterProjectInfo.rowsHash().Currency),

            // 提交
            clickActionButton.using(SAVE),
            project.waitMessagePopupBoxVisible(),
            Wait.for(Duration.ofSeconds(10)),

        )

    }

}

export const fillMasterProjectRequiredFields = {
    using: (Project: string, Department: string, Program: string, Currency: string) => {
        const timestamp_master = formatted_now
        return Task.where(`#actor fill project with required fields`,

            // 设置ProjectName = 前缀+时间戳 ，以免出现ProjectName重复
            project.fillTextInputField('Project', Project + timestamp_master),
            project.setCookie(COOKIE_MASTER_PROJECT_NAME, Project + timestamp_master),

            project.selectDropdownItem('Program', Program),
            Wait.for(Duration.ofSeconds(5)),

            // project.selectDropdownItem('Currency', Currency),
            // Wait.for(Duration.ofSeconds(5)),

            //Department:点击输入框
            Click.on(project.lookupInputField('Department')),
            // 确保下拉框有值之后再点击lookup图标
            Ensure.eventually(project.lookupDropdownList('Department').first(), isPresent()),
            // //点击下拉框的值
            Click.on(project.lookupDropdownItem('Department', Department)),
            Wait.for(Duration.ofSeconds(5)),

        )
    }

}

export const checkParentProjectField = {
    using: () => {
        return Task.where(`#actor check the Master Project shown in the Parent Project Field of Project1`,
            Ensure.eventually(Text.of(project.lookupInputFieldSingleValue('Parent Project')), includes(Cookie.called(COOKIE_MASTER_PROJECT_NAME).value()))

        )

    }

}

export const deleteMasterProject = {
    using: (projectName: string | Question<any>) =>
        Task.where(`#actor delete Master Project ${projectName}`,
            clickActionButton.using(DELETE),
            clickMessagePopupButton.using(OK),
            clickMessagePopupButton.using(DELETE_PARENT_ONLY),
            Wait.for(Duration.ofSeconds(5))

        )
}