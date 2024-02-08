"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const express = require("express");
const addToMailList_1 = require("./addToMailList");
const contact_1 = require("./contact");
const app = express();
admin.initializeApp();
const firestore = admin.firestore();
app.use('/mailList', (0, addToMailList_1.default)(firestore));
app.use('/contact', (0, contact_1.default)(firestore));
exports.api = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map