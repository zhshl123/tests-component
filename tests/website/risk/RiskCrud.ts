import { DataTable } from '@cucumber/cucumber';
import { Duration,Task,Wait} from '@serenity-js/core';
import { Cookie } from '@serenity-js/web';

import { DELETE,OK,SAVE, SUCCEEDED} from '../../DefaultStaticParams';
import { clickButton,clickMessagePopupButton, formatted_now } from '../common';
import { COOKIE_RISK_ID } from '../common/statics';
import { risk} from './EditRisk';

export const addRisk = {
    using: (riskInfo:DataTable) => {
        const timestamp = formatted_now
        return Task.where(`#actor Input all fields and save `,
            risk.fillTextInputField('Risk ID',riskInfo.rowsHash().RiskID + timestamp),
            risk.setCookie(COOKIE_RISK_ID,riskInfo.rowsHash().RiskID + timestamp),
            risk.fillTextInputField('Risk Title',riskInfo.rowsHash().RiskTitle),
            risk.selectDropdownItem('Risk Type',riskInfo.rowsHash().RiskType),
            risk.selectDropdownItem('Risk Status',riskInfo.rowsHash().RiskStatus),
            risk.fillNumberInputField('Probability',riskInfo.rowsHash().Probability),
            risk.selectDropdownItem('Impact',riskInfo.rowsHash().Impact),
            risk.selectItemInlookupPopup('Owners',riskInfo.rowsHash().Owners,'User Login Name'),
            clickButton.using(SAVE),
            risk.waitMessagePopupBoxVisible(),
            
        )
    }
} 

export const editRisk = {
    using: (riskInfo:DataTable) => {
        const timestamp = formatted_now
        return Task.where(`#actor Input all fields and save `,
            risk.fillTextInputField('Risk ID',riskInfo.rowsHash().RiskID + timestamp),
            risk.setCookie(COOKIE_RISK_ID,riskInfo.rowsHash().RiskID + timestamp),
            risk.fillTextInputField('Risk Title',riskInfo.rowsHash().RiskTitle),
            risk.selectDropdownItem('Risk Type',riskInfo.rowsHash().RiskType),
            risk.selectDropdownItem('Risk Status',riskInfo.rowsHash().RiskStatus),
            risk.fillNumberInputField('Probability',riskInfo.rowsHash().Probability),
            risk.selectDropdownItem('Impact',riskInfo.rowsHash().Impact),
            risk.selectItemInlookupPopup('Owners1',riskInfo.rowsHash().Owners1,'User Login Name'),
            clickButton.using(SAVE),
            risk.waitMessagePopupBoxVisible(),
           
        )
    }
} 

export const checkRisk = {
    using: (riskInfo:DataTable) => {
        return Task.where(`#actor check all fields`,
            Wait.for(Duration.ofSeconds(3)),
            risk.checkTextInputFieldValue('Risk ID',Cookie.called(COOKIE_RISK_ID).value(),SUCCEEDED),
            risk.checkTextInputFieldValue('Risk Title',riskInfo.rowsHash().RiskTitle,SUCCEEDED),
            risk.checkDropdownInputFieldValue('Risk Type',riskInfo.rowsHash().RiskType,SUCCEEDED),
            risk.checkDropdownInputFieldValue('Risk Status',riskInfo.rowsHash().RiskStatus,SUCCEEDED),
            risk.checkNumberInputFieldValue('Probability',riskInfo.rowsHash().Probability,SUCCEEDED),
            risk.checkDropdownInputFieldValue('Impact',riskInfo.rowsHash().Impact,SUCCEEDED),
            // risk.checkLookupInputFieldMultiValue('Owners1',riskInfo.rowsHash().Owners1,SUCCEEDED)
        )
    }
}


export const deleteRisk = {
    using: () => {
        return Task.where(`#actor click Delete button`,
            clickButton.using(DELETE),
            clickMessagePopupButton.using(OK)
        )
    }
}