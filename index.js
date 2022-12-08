//Get Mongoose
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017", {
  useNewUrlParser: false,
});

//Check Mongoose
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Mongoose Connection Success");
});

//Create a schema
var christmasLightsSchema = new mongoose.Schema({
  //name
  name: String,
  //are they battery (true) or mains (false)
  batteryOpperated: Boolean,
});

christmasLightsSchema.methods.speak = function () {
  var productName = this.name
    ? "The product name for these lights is: " + this.name
    : "No name";
  var battery =
    this.batteryOpperated === true
      ? "and these lights are battery powered."
      : "and these lights are mains powered. ";
  console.log("PRODUCTS", productName, battery);
  return "worked";
};

//Create a model
const Lights = mongoose.model("Lights", christmasLightsSchema);

//Add data to model
var warmWhite = new Lights({ name: "warmWhite", batteryOpperated: true });
var multiColour = new Lights({ name: "multiColour", batteryOpperated: false });

//Submit model
warmWhite.save(function (err, item) {
  if (err) return console.error(err);
  item.speak();
});

multiColour.save(function (err, item) {
  if (err) return console.error(err);
  item.speak();
});

//Find all
Lights.find(function (err, items) {
  if (err) return console.error(err);
  console.log("FIND ALL", items);
});

//Find specific
Lights.find({ name: /^warmWhite/ }, function (err, results) {
  if (err) return console.error(err);
  console.log("SEARCH WARMWHITE", results);
});

Lights.find({ name: /^multiColour/ }, function (err, results) {
  if (err) return console.error(err);
  console.log("SEARCH MULTICOLOUR", results);
});

//Remove (?)
Lights.remove({ name: /^multiColour/ }, function (err, item) {
  if (err) return console.error(err);
  console.log("REMOVE", item);
});
