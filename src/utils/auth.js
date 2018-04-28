/**
 * Created by Administrator on 2017/12/24.
 */
const TokenKey = 'Meiluocanxue-Token';

export function getToken() {
    return localStorage.getItem(TokenKey) || '';
}

export function setToken(token) {
    return localStorage.setItem(TokenKey, token);
}

export function removeToken() {
    return localStorage.removeItem(TokenKey);
}