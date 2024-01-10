
import { DataTable } from '@cucumber/cucumber'
import { Ensure, includes, isPresent, not } from '@serenity-js/assertions'
import { Duration, Question, Task, Wait } from '@serenity-js/core'
import { Click, Cookie, isVisible,Page } from '@serenity-js/web'

import { ADD_SUB_PROJECT, DELETE, FAILED, OK, SAVE } from '../../../DefaultStaticParams'
import { checkTextInGridList, clickActionButton, clickButton, clickMessagePopupButton, formatted_now } from '../../common'
import { BROWSE_IMPLEMENTATION_PROJECT, COOKIE_SUB_PROJECT_NAME, MANAGE_IMPLEMENTATION_PROJECT } from '../../common/statics'
import { browseProject } from '../components'
import { project } from '../components/EditProjectFields'
import { projectTab } from '../components/ProjectTab'

export const addSubProject = {
    using: (subProjectInfo: DataTable) => {
        return Task.where(`#actor add sub project`,
            projectTab.clickTab('Implementation'),
            Wait.for(Duration.ofSeconds(5)),
            projectTab.clickTab('Structure'),
            Ensure.eventually(project.addMasterProjectButton(), isPresent()),
            clickButton.using(ADD_SUB_PROJECT),
            Wait.for(Duration.ofSeconds(5)),

            // 填入必填字段
            fillSubProjectRequiredFields.using(
                subProjectInfo.rowsHash().Project,
                subProjectInfo.rowsHash().Department,
                subProjectInfo.rowsHash().Program,
                subProjectInfo.rowsHash().Currency),

            // 提交
            clickActionButton.using(SAVE),
            project.waitMessagePopupBoxVisible(),
            Wait.for(Duration.ofSeconds(10)),
        )
    }
}

export const fillSubProjectRequiredFields = {
    using: (Project: string, Department: string, Program: string, Currency: string) => {
        const timestamp_master = formatted_now
        return Task.where(`#actor fill project with required fields`,

            // 设置ProjectName = 前缀+时间戳 ，以免出现ProjectName重复
            project.fillTextInputField('Project', Project + timestamp_master),
            project.setCookie(COOKIE_SUB_PROJECT_NAME, Project + timestamp_master),

            project.selectDropdownItem('Program', Program),
            Wait.for(Duration.ofSeconds(5)),

            // project.selectDropdownItem('Currency', Currency),
            // Wait.for(Duration.ofSeconds(5)),

            //Department:点击输入框
            Click.on(project.lookupInputField('Department')),
            // 确保下拉框有值之后再点击lookup图标
            Ensure.eventually(project.lookupDropdownList('Department').first(), isPresent()),
            //点击下拉框的值
            Click.on(project.lookupDropdownItem('Department', Department)),
            Wait.for(Duration.ofSeconds(5)),

        )
    }

}

export const checkSubProject = {
    using: (projectName: string | Question<any>) => {
        return Task.where(`#actor check sub project information`,
            browseProject.searchItemInBrowsePage(BROWSE_IMPLEMENTATION_PROJECT, 'Project', projectName),
            Ensure.eventually(project.firstExpandIconInGrid(), isVisible()),
            Click.on(project.firstExpandIconInGrid()),
            checkTextInGridList.using(Cookie.called(COOKIE_SUB_PROJECT_NAME).value())

        )
    }
}

export const deleteSubProject = {
    using: (projectName: string | Question<any>) => {
        return Task.where(`#actor delete sub project information`,
            browseProject.clickIDLink(1),
            Wait.until(Page.current().title(), includes(MANAGE_IMPLEMENTATION_PROJECT)),
            clickActionButton.using(DELETE),
            clickMessagePopupButton.using(OK),
            Wait.for(Duration.ofSeconds(5))
        )
    }
}

export const checkDeletedSubProject = {
    using: (projectName: string | Question<any>, subProjectName:string | Question<any>) => {
        return Task.where(`#actor check deleted sub project information`,
            browseProject.searchItemInBrowsePage(BROWSE_IMPLEMENTATION_PROJECT, 'Project', projectName),
            Ensure.eventually(project.firstExpandIconInGrid(), not(isVisible())),
            browseProject.searchItemInBrowsePage(BROWSE_IMPLEMENTATION_PROJECT, 'Project', subProjectName),
            browseProject.checkSearchResult(subProjectName, FAILED)
        )
    }
}