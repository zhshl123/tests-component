import { DataTable } from '@cucumber/cucumber';
import { Ensure, isPresent } from '@serenity-js/assertions';
import { Duration, Task, Wait } from '@serenity-js/core';
import { Click } from '@serenity-js/web'

import { ADD } from '../../DefaultStaticParams';
import { clickActionButton, formatted_now } from '../common';
import { COOKIE_PROJECT_NAME } from '../common/statics';
import { project } from './components/EditProjectFields';

/**
 * 添加project
 */
export const addProject = {

    using: (projectInfo: DataTable) => {
        return Task.where(`#actor submit add project information`,
            // openPage.using(ADD_PROJECT),

            // 填入必填字段
            fillProjectRequiredFields.using(
                projectInfo.rowsHash().Project,
                projectInfo.rowsHash().Department,
                projectInfo.rowsHash().Program,
                projectInfo.rowsHash().Currency),

            // 提交
            clickActionButton.using(ADD),
            project.waitMessagePopupBoxVisible(),
            Wait.for(Duration.ofSeconds(5)),
        )
    }

}

export const fillProjectRequiredFields = {
    using: ( Project: string, Department: string, Program: string, Currency: string) => {
        // eslint-disable-next-line prefer-const
        let timestamp = formatted_now

        return Task.where(`#actor fill project with required fields`,
            // 设置ProjectName = 前缀+时间戳 ，以免出现ProjectName重复
            project.fillTextInputField('Project', Project + timestamp),
            project.setCookie(COOKIE_PROJECT_NAME, Project + timestamp),

            project.fillDropdownInputField('Program', Program),
            Wait.for(Duration.ofSeconds(5)),

            project.fillDropdownInputField('Currency', Currency),
            Wait.for(Duration.ofSeconds(5)),

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
