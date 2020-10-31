import { Base64 } from 'js-base64';
import * as md5 from 'md5';


const personKey = 'CAIMF-SHARE-';

const get = (callback: (arg: string) => void) => {
  return function (key: string) {
    const storageKey = `${personKey}-${key.toUpperCase()}`;

    return callback(storageKey);
  };
};

const set = (callback: (arg1: string, arg2: string) => void) => {
  return function (key: string, value: Record<string, unknown>) {
    const storageKey = `${personKey}-${key.toUpperCase()}`;
    const json = JSON.stringify(value);
    const base64 = Base64.encode(json);
    const storageValue = md5(base64);

    return callback(storageKey, storageValue);
  };
};

const getLocalItem = (key: string) => { localStorage.getItem(key); };
const getSessionItem = (key: string) => { sessionStorage.getItem(key); };
const setLocalItem = (key: string, value: string) => { localStorage.setItem(key, value); };
const setSessionItem = (key: string, value: string) => { sessionStorage.setItem(key, value); };

const getLocal = get(getLocalItem);
const getSession = get(getSessionItem);
const setLocal = set(setLocalItem);
const setSession = set(setSessionItem);

export { getLocal, setLocal, getSession, setSession };
