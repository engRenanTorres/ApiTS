export interface UserBase {
  firstName: string,
  familyName: string,
  login: string, 
  email: string,
  password: string,
  hierarchy: number
}

export default interface User extends UserBase {
  id:number,
}

