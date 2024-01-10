import { InvoiceLineItemFields } from "./InvoiceLineitemFields";

export const invoiceLineitemAttributeMap = new Map()
invoiceLineitemAttributeMap.set('SOV Item', 'SovItemAutoID')
invoiceLineitemAttributeMap.set('(Sub-)Contractor', 'VendorAutoID')
invoiceLineitemAttributeMap.set('Unit','UnitID' )
invoiceLineitemAttributeMap.set('Unit Price', 'SourceUnitPrice')
invoiceLineitemAttributeMap.set('Quantity','Quantity' )
invoiceLineitemAttributeMap.set('Amount', 'SourceAmount')
invoiceLineitemAttributeMap.set('Retainage Rate', 'RetainageRate')
invoiceLineitemAttributeMap.set('Retainage', 'SourceRetainage')
invoiceLineitemAttributeMap.set('Amount Less Retainage', 'AmountLessRetainage')


// splitting line item
invoiceLineitemAttributeMap.set('Project', 'ImplementedProjectAutoID')
invoiceLineitemAttributeMap.set('Fund', 'FundID')
invoiceLineitemAttributeMap.set('Percentage', 'Percentage')
invoiceLineitemAttributeMap.set('Amount', 'SourceAmount')


