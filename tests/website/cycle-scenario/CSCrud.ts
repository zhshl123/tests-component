/* eslint-disable unicorn/filename-case */
import { DataTable } from '@cucumber/cucumber';
import { Duration, Task, Wait} from '@serenity-js/core';

import { DELETE,OK,SAVE} from '../../DefaultStaticParams';
import {clickButton,clickMessagePopupButton ,waitMessagePopupBoxVisible} from '../common';
import { CS } from './EditCS';


export const addCycle = {
    using: (cycleInfo:DataTable) => {
        const BudgetPeriod = String(Number(cycleInfo.rowsHash().BudgetPeriod)-1)
        return Task.where(`#actor Input all fields and save `,
            CS.fillTextInputField('Cycle Name',cycleInfo.rowsHash().CycleName),
            CS.selectDropdownItem('Cycle Starting Year',cycleInfo.rowsHash().CycleStartingYear),
            CS.selectDropdownItemB('Number of Years',cycleInfo.rowsHash().NumberofYears),
            CS.selectSpecialDate('Proposal Start Date',cycleInfo.rowsHash().ProposalStartDate,0),
            CS.selectSpecialDate('Proposal End Date',cycleInfo.rowsHash().ProposalEndDate,1),
            CS.selectDropdownItemB('Budget Period',BudgetPeriod),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
           
        )
    }
} 

export const editCycle = {
    using: (cycleInfo:DataTable) => {
        const BudgetPeriod = String(Number(cycleInfo.rowsHash().BudgetPeriod)-1)
        return Task.where(`#actor Input all fields and save `,
            CS.fillTextInputField('Cycle Name',cycleInfo.rowsHash().CycleName),
            CS.selectDropdownItemB('Number of Years',cycleInfo.rowsHash().NumberofYears),
            CS.selectSpecialDate('Proposal Start Date',cycleInfo.rowsHash().ProposalStartDate,0),
            CS.selectSpecialDate('Proposal End Date',cycleInfo.rowsHash().ProposalEndDate,1),
            CS.selectDropdownItemB('Budget Period',BudgetPeriod),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
           
        )
    }
} 

export const addScenario = {
    using: (scenarioInfo:DataTable) => {
        return Task.where(`#actor Input all fields and save `,
            CS.selectDropdownItem('Cycle',scenarioInfo.rowsHash().Cycle),
            Wait.for(Duration.ofSeconds(3)),
            CS.fillTextInputField('Scenario Name',scenarioInfo.rowsHash().ScenarioName),
            CS.clickSingleCheckBox('Default Scenario',scenarioInfo.rowsHash().DefaultScenario),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
            
        )
    }
}

export const editScenario = {
    using: (scenarioInfo:DataTable) => {
        return Task.where(`#actor Input all fields and save `,
            CS.fillTextInputField('Scenario Name',scenarioInfo.rowsHash().ScenarioName),
            clickButton.using(SAVE),
            waitMessagePopupBoxVisible(),
           
        )
    }
}



export const deleteCS = {
    using: () => {
        return Task.where(`#actor click Delete button`,
            clickButton.using(DELETE),
            clickMessagePopupButton.using(OK)
        )
    }
}