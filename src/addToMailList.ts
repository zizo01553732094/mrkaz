import { Firestore } from '@google-cloud/firestore';
import * as express from 'express';


const router = express.Router();

const mailListRouter = (firestore: Firestore) => {
  router.get('/', async (req, res) =>{
    try{
      const secondTableRef =
      firestore.collection("mail_message");

      const snapshot = await secondTableRef.get();
      const data: any[] = snapshot.docs.map <any>(doc =>({
 
        id: doc.id,

        ...doc.data()
      }))

      res.json(data);
    }
    catch (error) {
      console.error(error);

      res.status(500).send("Internal Servert Error")

    }


  });
  router.post('/', async (req, res) => {
    try {
      const { email } = req.query;

      if (!email) {
        return res.status(400).send("Email is required in the query parameters");
      }

      const secondTableRef = firestore.collection("mail_list");
      const snapshot = await secondTableRef.where("email", "==", email).get();

      if (snapshot.empty) {
        await secondTableRef.add({ email });
        res.status(200).send("تم إضافة بريدك إلى النشرة البريدية");
      } else {
        res.status(400).send("نشكرك، هذا البريد بالفعل مشترك في النشرة البريدية");
      }

      return null; 
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
      return null; 
    }
  });
return router
};


 export default mailListRouter;
