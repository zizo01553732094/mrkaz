"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const mailListRouter = (firestore) => {
    router.post('/', async (req, res) => {
        try {
            const { email } = req.body;
            const secondTableRef = firestore.collection("mail_list");
            const snapshot = await secondTableRef.where("email", "==", email).get();
            if (snapshot.empty) {
                // Email not found
                await secondTableRef.add({ email });
                res.status(200).send("تم إضافة بريدك إلي النشرة البريدية");
            }
            else {
                // Email  exists
                res.status(400)
                    .send("نشكرك هذا البريد بالفعل مشترك في النشرة البريدية");
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }
    });
    return router;
};
exports.default = mailListRouter;
//# sourceMappingURL=addToMailList.js.map