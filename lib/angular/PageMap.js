"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageMap = void 0;
const DefaultStaticParams_1 = require("../DefaultStaticParams");
const PageName_1 = require("./common/statics/PageName");
// 项目地址
const PROJECT_URL = '/dailybuild_api/Angular/#';
/**
 * 设置页面名称与对应url的键值对
 * eg: pageMap.set("页面名称", "页面除去前缀之后的url")
 */
exports.pageMap = new Map();
exports.pageMap.set(DefaultStaticParams_1.LOGIN, PROJECT_URL + '/login');
exports.pageMap.set(PageName_1.BROWSE_INSPECTION_REPORT, PROJECT_URL + '/browse/inspectionreport/115/search/115__tabitem1');
exports.pageMap.set(PageName_1.CREATE_INSPECTION_REPORT, PROJECT_URL + '/manage/inspectionreport/0/114/general/114__tabitem1?tsid=1');
exports.pageMap.set(PageName_1.BROWSE_ASSET, PROJECT_URL + '/browse/assets/303/search/303__tabitem1');
exports.pageMap.set(PageName_1.BROWSE_VENDOR, PROJECT_URL + '/browse/vendors/322/search/322__tabitem1');
exports.pageMap.set(PageName_1.BROWSE_RESOURCE, PROJECT_URL + '/browse/resources/0/search/319__tabitem1');
//# sourceMappingURL=PageMap.js.map