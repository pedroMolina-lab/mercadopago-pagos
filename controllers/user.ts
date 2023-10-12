import { User } from "models/users";

export async function getUserById(id: string){

   const user = User.getById(id)
   return user
}

export async function updateUser(id: string, data: any){
    const user = await getUserById(id)

    user.data = data 
    await user.push()
    return user
}