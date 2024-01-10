import { Question } from '@serenity-js/core';
import { EditFromFields } from '../../common/abstract';
export declare class EditScheduleFields extends EditFromFields {
    entityMap: Map<string, string>;
    constructor(entityMap: any);
    scheduleGridTable: () => any;
    scheduleGridCheckbox: (itemName: string | Question<any>) => any;
    scheduleNameCellInGrid: (itemName: string | Question<any>) => any;
    scheduleGridTableBody: () => any;
    buttonInGridList: (buttonName: string, rowNumber: number) => any;
}
export declare const schedule: EditScheduleFields;
