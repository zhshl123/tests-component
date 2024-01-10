export declare const addSuperadmin: {
    using: (userInfo: CIPUserInfo) => void;
};
export declare const submitUserForm: {
    using: (userInfo: CIPUserInfo) => any;
};
export declare class CIPUserInfo {
    username: string;
    password: string;
}
export declare class UserForm {
    static usernameField: () => any;
    static passwordField: () => any;
}
export declare class BrowseUserAdvencedSearchPanel {
    static usernameField: () => any;
}
