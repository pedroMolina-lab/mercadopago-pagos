import { firestore } from "./firestore";
import isAfter from "date-fns/isAfter";

const collection = firestore.collection("auth");

export class Auth {
  ref: FirebaseFirestore.DocumentReference;
  data: any;
  id: string;

  constructor(id) {
    this.id = id;

    this.ref = collection.doc(id);
  }

  async pull() {
    const snap = await this.ref.get();
    this.data = snap.data();
  }

  async push() {
    this.ref.update(this.data);
  }

  static async findByEmail(email: string) {
    const cleanEmail = email.trim().toLowerCase();
    const results = await collection.where("email", "==", cleanEmail).get();
    if (results.docs.length) {
      const first = results.docs[0];
      const newAuth = new Auth(first.id);
      newAuth.data = first.data();
      return newAuth;
    } else {
      return null;
    }
  }
  static async createNewAuth(data) {
    const newUserSnap = await collection.add(data);
    const newUser = new Auth(newUserSnap.id);
    newUser.data = newUserSnap;
    return newUser;
  }

  static async findByEmailAndCode(email: string, code: number) {
    const cleanEmail = email.trim().toLowerCase();
    const results = await collection
      .where("email", "==", cleanEmail)
      .where("code", "==", code)
      .get();
        if(results.empty){
            return null
        }else{
            const doc = results.docs[0]
            const auth = new Auth(doc.id)
            auth.data = doc.data()            
            return auth
        }
        
    }
    isCodeExpired(){
        const now = new Date()
        const expires = this.data.expires.toDate()
        console.log(now, expires);

        return isAfter(now, expires)
        
    }
    
}
