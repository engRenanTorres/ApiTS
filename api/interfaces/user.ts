export interface UserBase {
  firstName: string,
  familyName: string,
  login: string, 
  email: string,
  password: string,
  hierarchy: number
}
export interface UsersList {success: number, data: []}

export default interface User extends UserBase {
  id:number,
}

