import { DataTable } from '@cucumber/cucumber';
import { Ensure, isPresent } from '@serenity-js/assertions';
import { Check, Duration, Log, Task, Wait } from '@serenity-js/core';
import { Click, Cookie, Enter, Switch } from '@serenity-js/web';

import { DELETE, OK, SAVE, SUCCEEDED } from '../../DefaultStaticParams';
import { clickButton, clickMessagePopupButton, formatted_now, targetButton } from '../common';
import { COOKIE_RISK_ID } from '../common/statics';
import { browseProject } from '../project/components/BrowseProjectFields';
import { projectTab } from '../project/components/ProjectTab';
import { browseRiskInfo } from './BrowseRisk';
import { risk, riskWorkflow } from './EditRisk';

export const addRisk = {
    using: (riskInfo: DataTable) => {
        const timestamp = formatted_now
        risk.riskId = riskInfo.rowsHash().RiskID + timestamp
        return Task.where(`#actor Input all fields and save `,
            risk.fillTextInputField('Risk ID', riskInfo.rowsHash().RiskID + timestamp),
            risk.setCookie(COOKIE_RISK_ID, riskInfo.rowsHash().RiskID + timestamp),
            risk.fillTextInputField('Risk Title', riskInfo.rowsHash().RiskTitle),
            risk.selectDropdownItem('Risk Type', riskInfo.rowsHash().RiskType),
            risk.selectDropdownItem('Risk Status', riskInfo.rowsHash().RiskStatus),
            risk.fillNumberInputField('Probability', riskInfo.rowsHash().Probability),
            risk.selectDropdownItem('Impact', riskInfo.rowsHash().Impact),
            risk.selectItemInlookupPopup('Owners', riskInfo.rowsHash().Owners, 'User Login Name'),
            clickButton.using(SAVE),
            risk.waitMessagePopupBoxVisible(),

        )
    }
}

export const editRisk = {
    using: (riskInfo: DataTable) => {
        const timestamp = formatted_now
        return Task.where(`#actor Input all fields and save `,
            risk.fillTextInputField('Risk ID', riskInfo.rowsHash().RiskID + timestamp),
            risk.setCookie(COOKIE_RISK_ID, riskInfo.rowsHash().RiskID + timestamp),
            risk.fillTextInputField('Risk Title', riskInfo.rowsHash().RiskTitle),
            risk.selectDropdownItem('Risk Type', riskInfo.rowsHash().RiskType),
            risk.selectDropdownItem('Risk Status', riskInfo.rowsHash().RiskStatus),
            risk.fillNumberInputField('Probability', riskInfo.rowsHash().Probability),
            risk.selectDropdownItem('Impact', riskInfo.rowsHash().Impact),
            risk.selectItemInlookupPopup('Owners1', riskInfo.rowsHash().Owners1, 'User Login Name'),
            clickButton.using(SAVE),
            risk.waitMessagePopupBoxVisible(),

        )
    }
}

export const checkRisk = {
    using: (riskInfo: DataTable) => {
        return Task.where(`#actor check all fields`,
            Wait.for(Duration.ofSeconds(3)),
            risk.checkTextInputFieldValue('Risk ID', Cookie.called(COOKIE_RISK_ID).value(), SUCCEEDED),
            risk.checkTextInputFieldValue('Risk Title', riskInfo.rowsHash().RiskTitle, SUCCEEDED),
            risk.checkDropdownInputFieldValue('Risk Type', riskInfo.rowsHash().RiskType, SUCCEEDED),
            risk.checkDropdownInputFieldValue('Risk Status', riskInfo.rowsHash().RiskStatus, SUCCEEDED),
            risk.checkNumberInputFieldValue('Probability', riskInfo.rowsHash().Probability, SUCCEEDED),
            risk.checkDropdownInputFieldValue('Impact', riskInfo.rowsHash().Impact, SUCCEEDED),
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

export const addRiskFromProject = {
    using: (riskInfo: DataTable) => {
        return Task.where(`#actor add risk from project`,
            browseProject.searchAndEditImplementationProject(riskInfo.rowsHash().Project),
            Wait.for(Duration.ofSeconds(3)),
            projectTab.clickTab('Risks'),
            Wait.for(Duration.ofSeconds(3)),
            Switch.to(browseRiskInfo.riskTabFrame()).and(
                Click.on(browseRiskInfo.addNewIcon()),
                Wait.for(Duration.ofSeconds(3)),
            ),
            addRisk.using(riskInfo)

        )
    }
}

export const checkWorkflowParticipant = {
    using: (username: string) => {
        return username === '(no participant)' ? Task.where(`#actor check workflow participant with ${username}`,
            Ensure.eventually(riskWorkflow.participantsTable(), isPresent()),
            Check.whether(
                risk.lookupInputFieldUl('Assigned To'), isPresent()
            ).andIfSo(
                Log.the('risk review already assigned')
            ).otherwise(
                Ensure.eventually(riskWorkflow.participantsTableCell('(no participant)'), isPresent())
            )
        ) : Task.where(`#actor check workflow participant with ${username}`,
            Ensure.eventually(riskWorkflow.participantsTable(), isPresent()),
            Check.whether(
                risk.lookupInputFieldUl('Assigned To'), isPresent()
            ).andIfSo(
                Ensure.eventually(riskWorkflow.participantsTableCell(username), isPresent())
            ).otherwise(
                Ensure.eventually(riskWorkflow.participantsTableCell('(no participant)'), isPresent())
            )

        )
    }
}

export const assignRiskReviewer = {
    using: (reviewer: string) => {
        return Task.where(`#actor assign risk reviewer with ${reviewer}`,
            risk.selectItemInlookupPopup('Assigned To', reviewer, 'Resource Name'),
            clickButton.using(SAVE),
            Wait.for(Duration.ofSeconds(5)),

        )
    }
}

export const reviewWorkflowTask = {
    using: (reviewResult: string, comment: string) => {
        return Task.where(`#actor select risk workflow review result with ${reviewResult} and add comment: ${comment}`,
            // 添加comment
            Ensure.eventually(risk.commentSectionFrame(), isPresent()),
            Switch.to(risk.commentSectionFrame()).and(
                Click.on(risk.addCommentIcon()),
            ),
            Wait.until(risk.addCommentPanel(), isPresent()),
            Switch.to(risk.addCommentPanel()).and(
                Enter.theValue(comment).into(risk.addCommentPanelCommentInputField()),
                Click.on(risk.addCommentPanelSaveButton()),
                Wait.for(Duration.ofSeconds(3))
            ),
            riskWorkflow.acceptWorkflowTaskAndsubmitReviewResult(reviewResult)
        )
    }
}

export const checkWorkflowStatusAndComment = {
    using: (comment: string) => {
        return Task.where(`#actor check workflow status and comment`,
            checkWorkflowComment.using(comment),
            Check.whether(
                riskWorkflow.reviewResultInput(), isPresent()
            ).andIfSo(
                Log.the('workflow task already accepted')
            ).otherwise(
                Ensure.eventually(targetButton('Accept Workflow Task'), isPresent()),
            )

        )
    }
}

export const checkWorkflowComment = {
    using: (comment: string) => {
        return Task.where(`#actor check workflow  comment`,
            Ensure.eventually(risk.commentSectionFrame(), isPresent()),
            Switch.to(risk.commentSectionFrame()).and(
                Ensure.eventually(risk.commentListTableCell(comment), isPresent())
            ),

        )
    }
}