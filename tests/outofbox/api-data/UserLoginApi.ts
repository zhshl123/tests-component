import { Ensure, equals, isPresent } from '@serenity-js/assertions';
import { Log, Task } from '@serenity-js/core'
import { LastResponse, PostRequest, Send } from '@serenity-js/rest';
import { Cookie } from '@serenity-js/web';

import { LOGIN } from '../../DefaultStaticParams';
import { openPage } from '../common';
import { API_LOGIN } from '../WebsiteApiUrl';

/**
 * 默认用户名为superadmin
 * @param username 用户名
 * @param password 密码
 * */
export const loginApi = (username = 'superadmin', password = '0115') => {
    const loginUser: CipUser = {
        username: username,
        password: password
    }

    return Task.where(`#actor login api`,
        Log.the(loginUser),
        Send.a(PostRequest.to(API_LOGIN).with(loginUser)),
        Ensure.eventually(LastResponse.status(),equals(200)),
        Log.the(LastResponse.body()),
    )
}

export interface CipUser {
    username: string
    password: string

}

