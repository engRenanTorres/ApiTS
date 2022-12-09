export default interface Logs {
  ip: string;
  host?: string;
  date: string;
  time: string;
  endpoint: string;
  hierarchy: number;
  login?: string;
  fields?: string;

}