import { PageTabs } from "../../common/abstract";

export class InvoiceTab extends PageTabs{
    entityMap: Map<string, string>
    constructor(entityMap) {
        super(entityMap);

    }
}




const contractTabMap = new Map()
contractTabMap.set('Line Items', '2')
contractTabMap.set('Splitting Line Items', '3')


export const invoiceTab = new InvoiceTab(contractTabMap)