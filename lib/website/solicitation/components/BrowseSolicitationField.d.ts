import { Question } from '@serenity-js/core';
import { SearchFromFields } from '../../common/abstract';
export declare class BrowseSolicitationFields extends SearchFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    /**
     *
     * @param itemName 校验的item值
     * @param expectedResult 预期结果 SUCCEEDED：匹配 FAILED 不匹配
     * @returns
     */
    checkSearchResult: (itemName: string | Question<any>, expectedResult: string | Question<any>) => any;
    /**
     * 校验单元格的值
     * @param fieldName 字段名
     * @param itemName 要检验的值
     * @param expectedResult 期望结果（单元格的值与要校验的值是否一致）
     * @returns
     */
    checkGridResult: (fieldName: string | Question<any>, itemName: string | Question<any>, expectedResult: string) => any;
    /**
 * grid List 列表
 * @returns
 */
    gridList: () => any;
    /**
* 获取含有关键词的单元格
* @param content 单元格内容
* @returns
*/
    gridTextTdList: (content: string | Question<any>) => any;
    /**
* 获取带链接的单元格
* @param content 单元格内容
* @returns
*/
    gridLinkTdList: (content: string | Question<any>) => any;
    /**
* 列表没有数据
*
*/
    emptyGrid: () => any;
}
export declare const browseSolicitation: BrowseSolicitationFields;
