const multer = require("multer");
const path = require("path");

/* STORAGE CONFIG */

const storage = multer.diskStorage({

destination: function(req, file, cb){

cb(null, path.join(__dirname, "../frontend/images/weapons"));

},

filename: function(req, file, cb){

const ext = path.extname(file.originalname);

const name = req.body.weapon_name
? req.body.weapon_name.toLowerCase().replace(/\s+/g,"-")
: "weapon";

const unique = Date.now();

cb(null, name + "-" + unique + ext);

}

});

/* UPLOAD OBJECT */

const upload = multer({
storage: storage
});

module.exports = upload;
