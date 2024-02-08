"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const contactRouter = (firestore) => {
    /*router.get('/', async (req, res) => {
  
      try {
        const firestore = admin.firestore();
        const tableRef =
        firestore.collection("contact_message");
  
     
        const snapshot = await tableRef.get();
        const data: any[] = snapshot.docs.map <any>(doc => ({
          id: doc.id,
  
        ...doc.data()
      }));
  
      res.json(data);
  
      }
      catch {
  
      }
    })*/
    router.post('/', async (req, res) => {
        try {
            const { name, subject, letter, email } = req.body;
            const tableRef = firestore.collection("contact_message");
            await tableRef.add({
                name,
                subject,
                letter,
                email,
            });
            res.status(200).send("شكرا علي رسالتك سوف نتواصل معك قريبا");
        }
        catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    });
    return router;
};
exports.default = contactRouter;
//# sourceMappingURL=contact.js.map