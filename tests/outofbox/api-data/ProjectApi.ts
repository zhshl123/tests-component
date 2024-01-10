import { DataTable } from '@cucumber/cucumber'
import { Ensure, equals } from '@serenity-js/assertions'
import { Log, Task } from '@serenity-js/core'
import { LastResponse, PostRequest, Send } from '@serenity-js/rest'
import { Cookie } from '@serenity-js/web'

import { formatted_now } from '../common'
import { API_GETVIEW_RESULT, API_SAVE } from '../WebsiteApiUrl'
import { implementedProjectEntity } from './entities/ProjectEntity'
import { loginApi } from './UserLoginApi'

export class ProjectApi {
    projetcName:string
    projectId:string

    apiGetProjectBySearch = (projectName: string) => {
        return Task.where(`#actor login api`,
            // 先登录获取用户token
            loginApi(),
            // 发送请求，查询
            Send.a(PostRequest.to(API_GETVIEW_RESULT + '/projects').with(
                {
                    '_B_ProjectName': projectName
                }
            ).using({
                headers: {
                    'x-token': Cookie.called('x-token').value(),
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })),
            Ensure.eventually(
                LastResponse.status(), equals(200)
            ),
            Log.the(LastResponse.body()),

        )

    }

    apiSaveImplementedProject = {
        using: (projectInfo: DataTable) => {
            const timestamp = formatted_now
            implementedProjectEntity.Attributes.ProjectName = projectInfo.rowsHash().Project + timestamp
            implementedProjectEntity.Attributes.ProjectID = projectInfo.rowsHash().Project + timestamp
            projectApiInfo.projetcName = projectInfo.rowsHash().Project + timestamp
            return Task.where(`#actor login api`,
                // 先登录获取用户token
                loginApi(),
                Log.the(implementedProjectEntity),
                Send.a(PostRequest.to(API_SAVE).with(implementedProjectEntity
                ).using({
                    headers: {
                        'x-token': LastResponse.body().as(String),
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                })),
                Ensure.eventually(
                    LastResponse.status(), equals(200)
                ),
                Log.the(LastResponse.body()),
             
            )

        }
    }
}

export const projectApiInfo = new ProjectApi()
