import { Firestore } from '@google-cloud/firestore';
import * as express from 'express';

const router = express.Router();

const contactRouter = (firestore: Firestore) => {
  
 
      router.get('/list', async (req, res) => {
        try {
          const page = parseInt(req.query.page as string) || 1;
          const keywords = req.query.keywords as string;
          const itemsPerPage = parseInt(req.query.itemsPerPage as string) || 15;
    
          const tableRef = firestore.collection("contact_message");


      
      const startAt = (page - 1) * itemsPerPage;


      const snapshot = await tableRef.where('name', "==", keywords).limit(itemsPerPage).offset(startAt).get();

      const data: any[] = snapshot.docs.map <any>(doc => ({
        id: doc.id,

      ...doc.data()
    }));

    res.json(data);

    }
    catch (error) {
      console.error(error);

      res.status(500).send("Internal Servert Error")

    }
  })
  
  router.post('/', async (req, res) => {
    try {
      
      const { name, subject, letter, email } = req.body;

      if (!name || !subject || !letter || !email) {
        return res.status(400).send("Missing required parameters in query");
      }

      const tableRef = firestore.collection("contact_message");
      await tableRef.add({
        name: name as string,
        subject: subject as string,
        letter: letter as string,
        email: email as string,
      });

      res.status(200).send("شكرا على رسالتك، سنتواصل معك قريباً");
      return; 
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
      return; 
    }
  });
  return router
 };
export  default contactRouter ;



