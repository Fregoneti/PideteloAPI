const express = require('express');
const app = express();
const router = express.Router();
app.use(express.json());
app.use(express.urlencoded());
var cors = require('cors')
app.use(cors())
port = process.env.PORT || 443
app.listen(port, function () {
    console.log("operacion exitosa puerto 443");
})

const FCM = require('fcm-node')
var serverKey = 'AAAAfOZPjZw:APA91bECPLnyL5FBz93ZjfwNrf191EYthA1vJuHWIYtv2T3D5HBKUfHSsTdj2Ez4kVK9JLvJefX-WF-8fMeLMUzH-f4f-2tf08ks_rPEh1G1tLulf-6942UNkz9FYbA8mzlTa4OMLo8e'; //put the generated private key path here    

var fcm = new FCM(serverKey);

router.post("/notificaciones", (req, Response) => {

    console.log(req.body);

    var message = {
        to: req.body.token,
        collapse_key: 'PideteloYa!',

        notification: {
            title: 'Mensaje Nuevo',
            body: 'Te acaban de mandar un mensaje, revise PideteloYa!'
        },
    }

    fcm.send(message, function (err, response) {
        if (err) {
            Response.status(500).send();
            console.log("Something has gone wrong!")
        } else {
            console.log("Successfully sent with response: ", response)
            Response.status(200).send();
        }

    });
}

)


app.use(router);