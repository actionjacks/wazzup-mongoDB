import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher";
import cors from "cors";

//app config
const app = express();
const port = process.env.PORT || 9000;
//from https://pusher.com/
const pusher = new Pusher({
  appId: "1071900",
  key: "329b02fb812b5a1068a8",
  secret: "feb7c91fdcf374d13b82",
  cluster: "eu",
  encrypted: true,
});

//middleware
//===============================================
//npm run build from frontend folder!! and copy build files to public
// app.use(express.static("public"));
//===============================================
app.use(express.json());
app.use(cors());

//ta linijka nie jest potrzebna jesli uzywamy cors
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Orgin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "*");
//   next();
// });

//db config
const connection_url = `mongodb+srv://jack:${"riprip"}@jaxoo.lcoew.mongodb.net/${"messengerDB"}?retryWrites=true&w=majority
`;
mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//dzieki temu aktualizujemy wszelki zmiany bacendu i frontendu
const db = mongoose.connection;
db.once("open", () => {
  console.log("DB connected");
  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log(change);

    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
      });
    } else {
      console.log("error triggering pusher");
    }
  });
});

// api routes
app.get("/", (req, res) => res.status(200).send("server running"));

//do testow mozna uzyć postmana
//np localhost:9000/messages/new i podajac schemat wiadomosci metoda post w json schemat uzyty jest messages z importu dbMessages.js
app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
app.get("/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

//listener
app.listen(port, () => console.log(`listening on localhost:${port}`));
