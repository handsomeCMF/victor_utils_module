import { Base64 } from 'js-base64';
import * as md5 from 'md5';

interface storage {
  key: string,
  value: string,
}

const personKey = 'CAIMF-SHARE-';

const __get__ = (callback: Function) => {
  return function (key: string) {
    const storage_key = `${personKey}-${key.toUpperCase()}`;
    return callback(storage_key);
  }
};

const __set__ = (callback: Function) => {
  return function (key: string, value: object) {
    const storage_key = `${personKey}-${key.toUpperCase()}`;
    const json = JSON.stringify(value);
    const base64 = Base64.encode(json);
    const storage_value = md5(base64);
    return callback({
      key: storage_key,
      value: storage_value
    });
  }
};

const getLocalItem: Function = (key: string) => { localStorage.getItem(key); }
const getSessionItem: Function = (key: string) => { sessionStorage.getItem(key); }
const setLocalItem: Function = (key: string, value: string) => { localStorage.setItem(key, value); }
const setSessionItem: Function = (key: string, value: string) => { sessionStorage.setItem(key, value); }

const getLocal: Function = __get__(getLocalItem);
const getSession: Function = __get__(getSessionItem);
const setLocal: Function = __set__(setLocalItem);
const setSession: Function = __set__(setSessionItem);

export { getLocal, setLocal, getSession, setSession };
