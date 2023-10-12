import { firestore } from "../lib/firestore";

const collection = firestore.collection("order");
export class Order {
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
    console.log("soy el data",this.data);
    
  }

  static async createNewOrder(newOrderData={}){
    const newOrderSnap = await collection.add(newOrderData)
    const newOrder = new Order(newOrderSnap.id)
    newOrder.data = newOrderData
    return newOrder
  }
}
