export declare const addAssignment: {
    using: (AssignmentName: string, FrequencyType: string, AssignmentType: string, InspectionType: string, AssignTo: string, StartTime: string, EndTime: string) => any;
};
export declare const editAssignment: {
    using: (AssignmentInfo: DataTable) => any;
};
export declare const checkAssignmentInfo: {
    using: (AssignmentName: string) => any;
};
export declare const deleteAssignment: {
    using: () => any;
};
