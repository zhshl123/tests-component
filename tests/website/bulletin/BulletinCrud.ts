import { DataTable } from '@cucumber/cucumber';
import { Duration, Task, Wait } from '@serenity-js/core';
import { Attribute } from '@serenity-js/web';

import { SAVE, SUCCEEDED } from '../../DefaultStaticParams';
import { clickButton,waitMessagePopupBoxVisible} from '../common';
import { COOKIE_BULLETIN_ID } from '../common/statics';
import { bulletin} from './EditBulletin';

export const addBulletin = {
    using: (BulletinInfo:DataTable) => {
        return Task.where(`#actor Input all fields and save `,
            bulletin.setCookie(COOKIE_BULLETIN_ID,Attribute.called('value').of(bulletin.textInputField('Bulletin No.'))),
            bulletin.selectItemInlookupPopup('Primary Project',BulletinInfo.rowsHash().PrimaryProject,'Project Name'),
            bulletin.selectItemInlookupPopup('Primary Contract',BulletinInfo.rowsHash().PrimaryContract,'Contract Name'),
            bulletin.fillTextInputField('Bulletin Title',BulletinInfo.rowsHash().BulletinTitle),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
            Wait.for(Duration.ofSeconds(2))
        )
    }
}

export const editBulletin = {
    using: (BulletinInfo:DataTable) => {
        return Task.where(`#actor edit all fields and save `,
            bulletin.selectItemInlookupPopup('Primary Project',BulletinInfo.rowsHash().PrimaryProject,'Project Name'),
            bulletin.selectItemInlookupPopup('Primary Contract',BulletinInfo.rowsHash().PrimaryContract,'Contract Name'),
            bulletin.fillTextInputField('Bulletin Title',BulletinInfo.rowsHash().BulletinTitle),
            bulletin.selectSpecialDate('Issuance Date',BulletinInfo.rowsHash().IssuanceDate,0),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
            Wait.for(Duration.ofSeconds(2))
        )
    }
}

export const checkBulletin = {
    using: (BulletinInfo:DataTable) => {
        return Task.where(`#actor check fields`,
            bulletin.checkTextInputFieldValue('Bulletin Title',BulletinInfo.rowsHash().BulletinTitle,SUCCEEDED),
            bulletin.checkDateInputFieldValue('Issuance Date',BulletinInfo.rowsHash().IssuanceDate,SUCCEEDED),
        )
    }
}