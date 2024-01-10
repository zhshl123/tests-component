
import { DataTable } from '@cucumber/cucumber'
import { Ensure, includes, isPresent, not } from '@serenity-js/assertions'
import { Duration, Question, Task, Wait } from '@serenity-js/core'
import { Click, Cookie, isVisible, Page, Switch } from '@serenity-js/web'

import { ADD_SUB_PROJECT, DELETE, FAILED, OK, SAVE, SUCCEEDED } from '../../DefaultStaticParams'
import { checkTextInGridList, clickActionButton, clickButton, clickMessagePopupButton, formatted_now } from '../common'
import { BROWSE_IMPLEMENTATION_PROJECT, COOKIE_PROJECT_NAME, COOKIE_SUB_PROJECT_NAME, MANAGE_IMPLEMENTATION_PROJECT } from '../common/statics'
import { browseProject } from './components/BrowseProjectFields'
import { project } from './components/EditProjectFields'
import { projectTab } from './components/ProjectTab'

export const addSubProject = {
    using: (subProjectInfo: DataTable) => {
        return Task.where(`#actor add sub project`,
            projectTab.clickTab('Implementation'),
            Wait.for(Duration.ofSeconds(5)),
            projectTab.clickTab('Structure'),
            Ensure.eventually(project.addMasterProjectButton(), isPresent()),
            clickButton.using(ADD_SUB_PROJECT),
            Wait.for(Duration.ofSeconds(5)),

            // 填入字段
            fillSubProjectFields.using(subProjectInfo),

            // 提交
            clickActionButton.using(SAVE),
            Wait.for(Duration.ofSeconds(5)),
        )
    }
}

export const fillSubProjectFields = {
    using: (subProjectInfo:DataTable) => {
        const timestamp_master = formatted_now
        return Task.where(`#actor fill project with required fields`,

            // 设置ProjectName = 前缀+时间戳 ，以免出现ProjectName重复

            project.fillTextInputField('Project', subProjectInfo.rowsHash().Project + timestamp_master),
            project.setCookie(COOKIE_SUB_PROJECT_NAME, subProjectInfo.rowsHash().Project + timestamp_master),

            project.selectDropdownItem('Project Phase', subProjectInfo.rowsHash().ProjectPhase)

        )
    }

}

export const checkSubProject = {
    using: (projectName: string | Question<any>) => {
        return Task.where(`#actor check sub project information`,
            browseProject.searchItemInBrowsePage(BROWSE_IMPLEMENTATION_PROJECT, 'Project', Cookie.called(COOKIE_PROJECT_NAME).value()),
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
            Wait.until(Page.whichTitle(includes(MANAGE_IMPLEMENTATION_PROJECT)), isPresent()),
            Switch.to(Page.whichTitle(includes(MANAGE_IMPLEMENTATION_PROJECT))),
            clickActionButton.using(DELETE),
            clickMessagePopupButton.using(OK),
            Wait.for(Duration.ofSeconds(5))
        )
    }
}

export const checkDeletedSubProject = {
    using: (projectName: string | Question<any>, subProjectName: string | Question<any>) => {
        return Task.where(`#actor check deleted sub project information`,
            browseProject.searchItemInBrowsePage(BROWSE_IMPLEMENTATION_PROJECT, 'Project', projectName),
            browseProject.checkSearchResult(projectName, SUCCEEDED),
            Ensure.eventually(project.firstExpandIconInGrid(), not(isVisible())),
            Click.on(browseProject.searchAtTopLavelCheckbox()),
            browseProject.searchItemInBrowsePage(BROWSE_IMPLEMENTATION_PROJECT, 'Project', subProjectName),
            browseProject.checkSearchResult(subProjectName, FAILED)
        )
    }
}