"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCS = exports.editScenario = exports.addScenario = exports.editCycle = exports.addCycle = void 0;
const core_1 = require("@serenity-js/core");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const EditCS_1 = require("./EditCS");
exports.addCycle = {
    using: (cycleInfo) => {
        const BudgetPeriod = String(Number(cycleInfo.rowsHash().BudgetPeriod) - 1);
        return core_1.Task.where(`#actor Input all fields and save `, EditCS_1.CS.fillTextInputField('Cycle Name', cycleInfo.rowsHash().CycleName), EditCS_1.CS.selectDropdownItem('Cycle Starting Year', cycleInfo.rowsHash().CycleStartingYear), EditCS_1.CS.selectDropdownItemB('Number of Years', cycleInfo.rowsHash().NumberofYears), EditCS_1.CS.selectSpecialDate('Proposal Start Date', cycleInfo.rowsHash().ProposalStartDate, 0), EditCS_1.CS.selectSpecialDate('Proposal End Date', cycleInfo.rowsHash().ProposalEndDate, 1), EditCS_1.CS.selectDropdownItemB('Budget Period', BudgetPeriod), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)());
    }
};
exports.editCycle = {
    using: (cycleInfo) => {
        const BudgetPeriod = String(Number(cycleInfo.rowsHash().BudgetPeriod) - 1);
        return core_1.Task.where(`#actor Input all fields and save `, EditCS_1.CS.fillTextInputField('Cycle Name', cycleInfo.rowsHash().CycleName), EditCS_1.CS.selectDropdownItemB('Number of Years', cycleInfo.rowsHash().NumberofYears), EditCS_1.CS.selectSpecialDate('Proposal Start Date', cycleInfo.rowsHash().ProposalStartDate, 0), EditCS_1.CS.selectSpecialDate('Proposal End Date', cycleInfo.rowsHash().ProposalEndDate, 1), EditCS_1.CS.selectDropdownItemB('Budget Period', BudgetPeriod), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)());
    }
};
exports.addScenario = {
    using: (scenarioInfo) => {
        EditCS_1.CS.timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor Input all fields and save `, EditCS_1.CS.selectDropdownItem('Cycle', scenarioInfo.rowsHash().Cycle), core_1.Wait.for(core_1.Duration.ofSeconds(3)), EditCS_1.CS.fillTextInputField('Scenario Name', scenarioInfo.rowsHash().ScenarioName + EditCS_1.CS.timestamp), EditCS_1.CS.setCookie(statics_1.COOKIE_SCENARIO_NAME, scenarioInfo.rowsHash().ScenarioName + EditCS_1.CS.timestamp), EditCS_1.CS.clickSingleCheckBox('Default Scenario', scenarioInfo.rowsHash().DefaultScenario), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)());
    }
};
exports.editScenario = {
    using: (scenarioInfo) => {
        EditCS_1.CS.timestamp = common_1.formatted_now;
        return core_1.Task.where(`#actor Input all fields and save `, EditCS_1.CS.fillTextInputField('Scenario Name', scenarioInfo.rowsHash().ScenarioName + EditCS_1.CS.timestamp), EditCS_1.CS.setCookie(statics_1.COOKIE_SCENARIO_NAME, scenarioInfo.rowsHash().ScenarioName + EditCS_1.CS.timestamp), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)());
    }
};
exports.deleteCS = {
    using: () => {
        return core_1.Task.where(`#actor click Delete button`, common_1.clickButton.using(DefaultStaticParams_1.DELETE), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK), core_1.Wait.for(core_1.Duration.ofSeconds(5)));
    }
};
//# sourceMappingURL=CSCrud.js.map