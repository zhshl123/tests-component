"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emptyGrid = exports.gridLinkTdList = exports.gridTextTdList = exports.gridList = exports.checkLinkInGridList = exports.checkTextInGridList = exports.checkGridList = void 0;
const assertions_1 = require("@serenity-js/assertions");
const core_1 = require("@serenity-js/core");
const web_1 = require("@serenity-js/web");
/**
 * check grid List exist Or not
 * @returns
 */
const checkGridList = () => core_1.Task.where(`#actor check contracts list`, assertions_1.Ensure.eventually((0, exports.gridList)(), (0, assertions_1.isPresent)()));
exports.checkGridList = checkGridList;
exports.checkTextInGridList = {
    using: (textContent) => core_1.Task.where(`#actor check text table data in grid list with: ${textContent}`, assertions_1.Ensure.eventually((0, exports.gridList)(), (0, assertions_1.isPresent)()))
};
exports.checkLinkInGridList = {
    using: (linkWords) => core_1.Task.where(`#actor check link table data in grid list with: ${linkWords}`, assertions_1.Ensure.eventually((0, exports.gridList)(), (0, assertions_1.isPresent)()))
};
/**
 * grid List 列表
 * @returns
 */
const gridList = () => web_1.PageElements.located(web_1.By.css('.cstdgrid__bodyrow'))
    .describedAs('grid list');
exports.gridList = gridList;
/**
 * 获取含有关键词的单元格
 * @param content 单元格内容
 * @returns
 */
const gridTextTdList = (content) => web_1.PageElements.located(web_1.By.cssContainingText('td', content))
    .describedAs('Grid Text Table data List with content:' + content);
exports.gridTextTdList = gridTextTdList;
/**
 * 获取带链接的单元格
 * @param content 单元格内容
 * @returns
 */
const gridLinkTdList = (content) => web_1.PageElements.located(web_1.By.cssContainingText('a', content))
    .describedAs('Grid Link Table data List with content:' + content);
exports.gridLinkTdList = gridLinkTdList;
/**
 * 列表没有数据
 *
 */
const emptyGrid = () => web_1.PageElement.located(web_1.By.css('.cstdgrid__emptyrow'))
    .describedAs('empty grid');
exports.emptyGrid = emptyGrid;
//# sourceMappingURL=GridList.js.map