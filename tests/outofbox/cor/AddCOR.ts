
import { DataTable } from '@cucumber/cucumber';
import { Duration, Task, Wait } from '@serenity-js/core';

import { SAVE } from '../../DefaultStaticParams';
import { clickButton, formatted_now, openPage, waitMessagePopupBoxVisible } from '../common'
import { ADD_COR, COOkIE_CORSUBJECT, } from '../common/statics'
import { cor } from './components/EditCORFields';

export const addCOR = {
    using: (corInfo: DataTable) => {
        return Task.where('#actor submit add cor imformation',
            openPage.using(ADD_COR),

            //填入必填字段
            fillCORRequiredFields.using(
                corInfo.rowsHash().PrimaryProject,
                corInfo.rowsHash().PrimaryContract,
                corInfo.rowsHash().Subject),

            //提交
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
            
        )
    }
};

export const fillCORRequiredFields = {
    using: (primaryProject: string, primaryContract: string, subject: string) => {
        const timestamp = formatted_now
        return Task.where('#actor fill cor with requiede fields',
            cor.selectItemInlookupPopup('Primary Project', primaryProject, 'Project Name'),
            Wait.for(Duration.ofSeconds(5)),
            //选择PrimaryContract后会刷新页面，自动填充对应的Contractor值
            cor.selectItemInlookupPopup('Primary Contract', primaryContract, 'Contract Name'),
            Wait.for(Duration.ofSeconds(5)),
            cor.fillTextInputField('Subject', subject + timestamp),
            cor.setCookie(COOkIE_CORSUBJECT, subject + timestamp),
        )       
    }
}