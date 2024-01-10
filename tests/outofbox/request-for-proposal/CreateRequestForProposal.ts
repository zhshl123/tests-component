import { DataTable } from '@cucumber/cucumber';
import { Duration, Task, Wait } from '@serenity-js/core';
import { Attribute} from '@serenity-js/web';

import { SAVE } from '../../DefaultStaticParams';
import { clickButton, formatted_now, openPage, waitMessagePopupBoxVisible } from '../common';
import { COOKIE_RFP_SUBJECT,COOkIE_RFPID} from '../common/statics';
import { ADD_REQUESTFORPROPOSAL } from '../common/statics/StaticPageName';
import { rfp } from './components/EditRequestForProposalFields';
import { clickRFPTab } from './Edit/EditRFP';
/**
 * 添加rfp
 */
export const addRequestForProposal = {

    using: (requestforproposalInfo: DataTable) => {
        return Task.where(`#actor submit add rfp information`,
            openPage.using(ADD_REQUESTFORPROPOSAL),
            // 添加等待时间，以确保页面加载完成
            Wait.for(Duration.ofSeconds(5)),
            // 填入必填字段
            fillrequestforproposalRequiredFields.using(
                requestforproposalInfo.rowsHash().PrimaryProject,
                requestforproposalInfo.rowsHash().PrimaryContract,
                requestforproposalInfo.rowsHash().Subject,
            ),
            Wait.for(Duration.ofSeconds(4)),
            // 提交
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
            Wait.for(Duration.ofSeconds(4)),
            
            //返回到General tab页面，取RFP ID的值
            clickRFPTab.using('General'),
            Wait.for(Duration.ofSeconds(2)),
            rfp.setCookie(COOkIE_RFPID, Attribute.called('initialvalue').of(rfp.autoIdInputField('RFP ID'))),
        )
    }

}

export const fillrequestforproposalRequiredFields = {
    using: (PrimaryProject: string, PrimaryContract: string, Subject: string) => {

        const timestamp = formatted_now
        return Task.where(`#actor fill Request for Proposal with required fields`,
            // 选完Primary Project，会有一个刷新页面的动作，所以需要等待刷新完成在进行后续的信息填写
            rfp.selectItemInlookupPopup('Primary Project', PrimaryProject,'Project Name'),
            Wait.for(Duration.ofSeconds(5)),
            // 选完Primary Contract，会有一个刷新页面的动作，所以需要等待刷新完成在进行后续的信息填写npm
            rfp.selectItemInlookupPopup('Primary Contract', PrimaryContract, 'Contract Name'),
            Wait.for(Duration.ofSeconds(5)),
            // 设置Subject = 前缀+时间戳 ，以免出现Subject重复
            rfp.fillTextInputField('Subject', Subject + timestamp),
            // 设置cookie，RFP创建成功后用Subject这个查询
            rfp.setCookie( COOKIE_RFP_SUBJECT, Subject + timestamp),
        )
    }

}
