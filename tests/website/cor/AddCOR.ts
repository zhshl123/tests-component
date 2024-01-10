
import { DataTable } from '@cucumber/cucumber';
import { Duration, Task, Wait } from '@serenity-js/core';
import { Attribute} from '@serenity-js/web';

import { SAVE } from '../../DefaultStaticParams';
import { clickButton, formatted_now, openPage, waitMessagePopupBoxVisible } from '../common'
import { ADD_COR, COOkIE_CORID, } from '../common/statics'
import { cor } from './components/EditCORFields';
import { clickCORTab } from './Edit/CORGeneralInfo';

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

            //返回到General tab页面，取COR ID的值
            clickCORTab.using('General'),
            Wait.for(Duration.ofSeconds(2)),
            cor.setCookie(COOkIE_CORID, Attribute.called('initialvalue').of(cor.autoIdInputField('COR ID'))),
        )    
    }
};
    
export const fillCORRequiredFields= {
    using: (PrimaryProject: string, PrimaryContract: string,Subject: string) =>{ 
        const timestamp=formatted_now
        return Task.where('#actor fill cor with requiede fields',
            cor.selectItemInlookupPopup('Primary Project',PrimaryProject,'Project Name'),
            Wait.for(Duration.ofSeconds(5)),
            //选择PrimaryContract后会刷新页面，自动填充对应的Contractor值
            cor.selectItemInlookupPopup('Primary Contract', PrimaryContract,'Contract No.'),
            Wait.for(Duration.ofSeconds(5)),
            cor.fillTextInputField('Subject', Subject + timestamp),
        )       
    }
}