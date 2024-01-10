/**
 * 默认用户名为superadmin
 * @param username 用户名
 * @param password 密码
 * */
export declare const loginApi: (username?: string, password?: string) => any;
export interface CipUser {
    username: string;
    password: string;
}
