import fetch from 'node-fetch';
import { log } from './utils';

async function get(url: string): Promise<string> {
  log('⤓', url);
  return fetch(url).then((res: any) => res.text());
}

async function getJSON(url: string): Promise<any> {
  log('⤓', url);
  return fetch(url).then((res: any) => res.json());
}

async function getRaw(url: string): Promise<Buffer> {
  log('⤓', url);
  return fetch(url).then((res: any) => res.buffer());
}

export { get, getJSON, getRaw };
