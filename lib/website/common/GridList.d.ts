import { Question } from '@serenity-js/core';
/**
 * check grid List exist Or not
 * @returns
 */
export declare const checkGridList: () => any;
export declare const checkTextInGridList: {
    using: (textContent: string | Question<any>) => any;
};
export declare const checkLinkInGridList: {
    using: (linkWords: string | Question<any>) => any;
};
/**
 * grid List 列表
 * @returns
 */
export declare const gridList: () => any;
/**
 * 获取含有关键词的单元格
 * @param content 单元格内容
 * @returns
 */
export declare const gridTextTdList: (content: string | Question<any>) => any;
/**
 * 获取带链接的单元格
 * @param content 单元格内容
 * @returns
 */
export declare const gridLinkTdList: (content: string | Question<any>) => any;
/**
 * 列表没有数据
 *
 */
export declare const emptyGrid: () => any;
