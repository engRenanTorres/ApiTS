//Objeto que é retornado sempre que insere ou atuliza dados no bd
export default interface MySQLResult {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  serverStatus: number;
  warningCount: number;
  message: string;
  protocol41: boolean;
  changedRows: number;
}
