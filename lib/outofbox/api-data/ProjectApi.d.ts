export declare class ProjectApi {
    projetcName: string;
    projectId: string;
    apiGetProjectBySearch: (projectName: string) => any;
    apiSaveImplementedProject: {
        using: (projectInfo: DataTable) => any;
    };
}
export declare const projectApiInfo: ProjectApi;
