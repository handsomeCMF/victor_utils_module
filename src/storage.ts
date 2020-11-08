import { Base64 } from 'js-base64';

const personKey = 'CAIMF-SHARE-';

const get = (getStorage: (arg: string) => any) => {
  return function (key: string) {
    const storageKey = `${personKey}-${key.toUpperCase()}`;
    const result = getStorage(storageKey) || '';
    const base64 = Base64.decode(result) || '""';
    return JSON.parse(base64);
  };
};

const set = (setStorage: (arg1: string, arg2: string) => void) => {
  return function (key: string, value: Record<string, unknown>) {
    const storageKey = `${personKey}-${key.toUpperCase()}`;
    const json = JSON.stringify(value);
    const base64 = Base64.encode(json);

    return setStorage(storageKey, base64);
  };
};

const getLocalItem = (key: string) => { return localStorage.getItem(key); };
const getSessionItem = (key: string) => { return sessionStorage.getItem(key); };
const setLocalItem = (key: string, value: string) => { localStorage.setItem(key, value); };
const setSessionItem = (key: string, value: string) => { sessionStorage.setItem(key, value); };

const getLocal = get(getLocalItem);
const getSession = get(getSessionItem);
const setLocal = set(setLocalItem);
const setSession = set(setSessionItem);

export { getLocal, setLocal, getSession, setSession };
