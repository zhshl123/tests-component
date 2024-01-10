"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRanking = exports.checkRanking = exports.editRanking = exports.addRanking = void 0;
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
const DefaultStaticParams_1 = require("../../DefaultStaticParams");
const common_1 = require("../common");
const statics_1 = require("../common/statics");
const EditRanking_1 = require("./EditRanking");
exports.addRanking = {
    using: (rankingPhaseName, rankingStandard, rankingTemplate, startDate, endDate) => {
        const timestamp = common_1.formatted_now;
        EditRanking_1.ranking.rankingPhaseName = rankingPhaseName;
        EditRanking_1.ranking.rankingStandard = rankingStandard;
        EditRanking_1.ranking.rankingTemplate = rankingTemplate;
        return core_1.Task.where(`#actor Input all fields and save `, EditRanking_1.ranking.fillTextInputField('Ranking Phase Name', rankingPhaseName + timestamp), EditRanking_1.ranking.setCookie(statics_1.COOKIE_RANKING_NAME, rankingPhaseName + timestamp), EditRanking_1.ranking.selectDropdownItem('Ranking Standard', rankingStandard), core_1.Wait.for(core_1.Duration.ofSeconds(3)), core_1.Check.whether(EditRanking_1.ranking.dropdownField('Ranking Template'), (0, web_1.isVisible)()).andIfSo(EditRanking_1.ranking.selectDropdownItem('Ranking Template', rankingTemplate)).otherwise(core_1.Log.the('Ranking Template is not present')), core_1.Wait.for(core_1.Duration.ofSeconds(3)), EditRanking_1.ranking.selectSpecialDate('Start Date', startDate, 0), EditRanking_1.ranking.selectSpecialDate('End Date', endDate, 1), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)());
    }
};
exports.editRanking = {
    using: (rankingInfo) => {
        return core_1.Task.where(`#actor Input all fields and save `, EditRanking_1.ranking.selectSpecialDate('Start Date', rankingInfo.rowsHash().StartDate, 0), EditRanking_1.ranking.selectSpecialDate('End Date', rankingInfo.rowsHash().EndDate, 1), common_1.clickButton.using(DefaultStaticParams_1.SAVE), (0, common_1.waitMessagePopupBoxVisible)());
    }
};
exports.checkRanking = {
    using: (rankingInfo) => {
        return core_1.Task.where(`#actor check all fields`, EditRanking_1.ranking.checkTextInputFieldValue('Ranking Phase Name', web_1.Cookie.called(statics_1.COOKIE_RANKING_NAME).value(), DefaultStaticParams_1.SUCCEEDED), EditRanking_1.ranking.checkDropdownInputFieldValue('Ranking Standard', EditRanking_1.ranking.rankingStandard, DefaultStaticParams_1.SUCCEEDED), core_1.Check.whether(EditRanking_1.ranking.dropdownField('Ranking Template'), (0, web_1.isVisible)()).andIfSo(EditRanking_1.ranking.checkDropdownInputFieldValue('Ranking Template', EditRanking_1.ranking.rankingTemplate, DefaultStaticParams_1.SUCCEEDED)).otherwise(core_1.Log.the('Ranking Template is not present')), EditRanking_1.ranking.checkDateInputFieldValue('Start Date', rankingInfo.rowsHash().StartDate, DefaultStaticParams_1.SUCCEEDED), EditRanking_1.ranking.checkDateInputFieldValue('End Date', rankingInfo.rowsHash().EndDate, DefaultStaticParams_1.SUCCEEDED));
    }
};
exports.deleteRanking = {
    using: () => {
        return core_1.Task.where(`#actor click Delete button`, common_1.clickButton.using(DefaultStaticParams_1.DELETE), common_1.clickMessagePopupButton.using(DefaultStaticParams_1.OK));
    }
};
//# sourceMappingURL=RankingCurd.js.map