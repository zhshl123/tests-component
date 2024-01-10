import { LOGIN } from '../DefaultStaticParams';
import { BROWSE_ASSET, BROWSE_INSPECTION_REPORT, BROWSE_RESOURCE,BROWSE_VENDOR, CREATE_INSPECTION_REPORT } from './common/statics/PageName';

// 项目地址
const PROJECT_URL ='/dailybuild_api/Angular/#'

/**
 * 设置页面名称与对应url的键值对
 * eg: pageMap.set("页面名称", "页面除去前缀之后的url")
 */
export const pageMap = new Map()
pageMap.set(LOGIN, PROJECT_URL + '/login');
pageMap.set(BROWSE_INSPECTION_REPORT, PROJECT_URL + '/browse/inspectionreport/115/search/115__tabitem1');
pageMap.set(CREATE_INSPECTION_REPORT, PROJECT_URL + '/manage/inspectionreport/0/114/general/114__tabitem1?tsid=1');
pageMap.set(BROWSE_ASSET, PROJECT_URL + '/browse/assets/303/search/303__tabitem1');
pageMap.set(BROWSE_VENDOR, PROJECT_URL + '/browse/vendors/322/search/322__tabitem1')
pageMap.set(BROWSE_RESOURCE, PROJECT_URL + '/browse/resources/0/search/319__tabitem1')