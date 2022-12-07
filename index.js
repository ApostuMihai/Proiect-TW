const express = require("express");
const fs = require("fs");
app = express();
app.set("view engine", "ejs");
app.use("/resurse", express.static(__dirname + "/resurse"));
// app.get("/index", function (req, res) {
//   // console.log("ceva");
//   // res.send("Nu primesti");
//   // res.sendFile(__dirname + "/index.html");
//   res.render("pages/index");
// });
app.get(["/", "/index", "/home"], function (req, res) {
  res.render("pages/index", { ip: req.ip });
});

// app.get(["/despre"], function (req, res) {
//   res.render("pagini/despre", { imagini: obGlobal.imagini });
// });

app.get("/*", function (req, res, next) {
  res.render("pages" + req.url, function (err, rezRandare) {
    if (err) {
      res.render("pages/eroare");
    } else {
      res.send(rezRandare);
    }

    if (err) {
      if (err.message.includes("Failed to lookup view")) renderError(res, 404);
      else {
      }
    } else {
      res.send(rezRandare);
    }
  });
});
obGlobal = {
  erori: null,
};
function creatErrors() {
  var continutFisier = fs
    .readFileSync(__dirname + "/resurse/json/erori.json")
    .toString("utf-8");
  obGlobal.erori = JSON.parse(continutFisier);
}
function renderError(res, identificator, titlu, text, imagine) {
  var eroare = obGlobal.erori.info_erori.find(function (elem) {
    return elem.identificator == identificator;
  });

  titlu =
    titlu || (eroare && eroare.titlu) || obGlobal.erori.eroare_default.titlu;
  text = text || (eroare && eroare.text) || obGlobal.erori.eroare_default.text;
  imagine =
    imagine ||
    (eroare && obGlobal.erori.cale_baza + "/" + eroare.imagine) ||
    obGlobal.erori.cale_baza + "/" + obGlobal.erori.eroare_default.imagine;

  if (eroare && eroare.status) {
    res
      .status(identificator)
      .render("pages/eroare", { titlu: titlu, text: text, imagine: imagine });
  } else {
    res.render("pages/eroare", { titlu: titlu, text: text, imagine: imagine });
  }
}
app.listen(8080);
console.log("merge ");
