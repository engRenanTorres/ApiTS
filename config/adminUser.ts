import User from "../api/interfaces/user";
import { createUserFunction} from "../api/users/userController";


const admin : User = {
  id: 0,
  firstName: "admin",
  familyName: "ad",
  login: "adm",
  email: "admin@admin.com",
  password: "admin123456",
  hierarchy: 0
}
export default () => {
  try{
    createUserFunction(admin);
  }catch{}
}
