export interface BaseEntity{
   
    EntityName: string,
    IsBulkEditStatus: false,
    Id: '',
    Name: '',
    TimeStamp: 0,
    Attributes: any,
    Displays: any,
    DeniedAttributes: [],
    ReadOnlyAttributes: [],
    Children: Children,
    Association: Association,
    Document: document,
    AccessType: 'Write',
    WF: {
        Enabled: false,
        IsRunning: false,
        RunAt: ''
    },
    Workflow: '',
    Type: 'Formal',
    accessInfo: '',
    OriginalValues: '',
    ActionType: 'A'
}

interface Children {}
interface Association{}
interface document{}
