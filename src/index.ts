import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as express from "express";
import mailList from "./addToMailList";
import contactRouter from "./contact";

const app = express();

admin.initializeApp();
const firestore = admin.firestore();
app.use('/maillist', mailList(firestore));
app.use('/contact', contactRouter(firestore));
export const api = functions.https.onRequest(app);


