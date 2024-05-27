import fetch from 'node-fetch';
import { log } from './utils.js';

async function apiBuffer(url: string): Promise<Buffer> {
  log('⤓', url);
  return fetch(url).then((res: fetch.Response) => res.buffer());
}

async function apiJson(url: string): Promise<any> {
  log('⤓', url);
  return fetch(url).then((res: fetch.Response) => res.json());
}

async function apiText(url: string): Promise<string> {
  log('⤓', url);
  return fetch(url).then((res: fetch.Response) => res.text());
}

export { apiBuffer, apiJson, apiText };
