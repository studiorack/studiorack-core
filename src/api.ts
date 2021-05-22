import fetch from 'node-fetch';

async function get(url: string): Promise<string> {
  console.log('⤓', url);
  return fetch(url).then((res: any) => res.text());
}

async function getJSON(url: string): Promise<any> {
  console.log('⤓', url);
  return fetch(url).then((res: any) => res.json());
}

async function getRaw(url: string): Promise<Buffer> {
  console.log('⤓', url);
  return fetch(url).then((res: any) => res.buffer());
}

export { get, getJSON, getRaw };
