const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const path = __dirname + '/build/';
const app = express();
app.use(express.static(path));

app.use(cors());
app.use(express.json()); // parses incoming requests with JSON payloads

//console.log("HOST: " + process.env.DB_HOST);
//create connection to server database
const db = mysql.createPool({
    host: process.env.DB_HOST, //localhost
    user: process.env.DB_USER, //root
    password: process.env.DB_PASSWORD, //password
    database: process.env.DB
}); /* */

//create connection to local database
/* const db = mysql.createPool({
    host: process.env.DB_HOST, //localhost
    user: process.env.DB_USER, //root
    password: process.env.DB_PASSWORD, //password
    database: process.env.DB,
    port: process.env.DB_PORT
}); */

app.get('/', function(req, res) {
    res.sendFile(path + "index.html")
});

app.get("/seminars", (req, res) => {
    db.query(`SELECT termine.id, 
    termine.anbieter_id,
        anbieter.anbietername,
        anbieter.anbieter_logo_pfad,
        anbieter.nur_anbieter,
        termine.kategorie_id,
        kategorie.kategoriename,
        kategorie.kategoriebild,
        termine.seminarart_id,
        seminarart.artname,
        seminarort.seminarort_titel,
        seminarort.street_nr,
        seminarort.zip_code,
        seminarort.city,
        termine.datum_von,
        termine.datum_bis,
        termine.uhrzeit_von,
        termine.uhrzeit_bis,
        termine.veranstaltungsort,
        termine.seminartitel,
        termine.seminarbeschreibung,
        termine.preis_ivd,
        termine.preis_extern,
        termine.ivd_stunden,
        termine.teilnahmezertifikat_jn,
        termine.seminarbild_pfad,
        termine.link,
        termine.direct_link,
        termine.keywords
FROM
    ivd_seminarkalender_termine AS termine
        LEFT JOIN
    ivd_seminarkalender_anbieter AS anbieter ON anbieter.id = termine.anbieter_id
        LEFT JOIN
    ivd_seminarkalender_kategorie AS kategorie ON kategorie.id = termine.kategorie_id
        LEFT JOIN
    ivd_seminarkalender_seminarart AS seminarart ON seminarart.id = termine.seminarart_id
        LEFT JOIN
    ivd_seminarkalender_seminarort AS seminarort ON seminarort.id = termine.seminarort_id
        
 ORDER BY datum_von ASC`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get("/referenten", (req, res) => {
    db.query(`SELECT 
    termine.id AS seminarid, 
bind.referent_id,
referent.name,
referent.vorname,
referent.firma,
referent.position,
referent.referentenbild_pfad,
referent.email
FROM
ivd_seminarkalender_termine AS termine
    RIGHT JOIN
ivd_seminarkalender_bind_termin_referent AS bind ON bind.seminar_id = termine.id
    LEFT JOIN
ivd_seminarkalender_referenten AS referent ON referent.id = bind.referent_id
ORDER BY datum_von ASC
`, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

const listener = app.listen(PORT, () => {
    console.log('App is listening on port ' + listener.address().port)
})