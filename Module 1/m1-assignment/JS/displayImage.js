var photos = [];
var fileNames = [];
var imageList = [];
var image;
var openTag = "<div class = 'singleImage'>"
var closeTag = "</div>"

var desc = "";
var openDescTag = "<div id='description' onclick='infoDisplay(this, true)'><div class='text'>";
var closeDescTag = "</div></div>";
var descTexts = [
    "Athena provided weapon to help Perseus on his quest.",
    "Perseus gave the gorgon head to Athena after he killed it", 
    "Hermes helped Perseus by giving him direction on his quest", 
    "Pegasus borned from the blood of the Gorgon Medusa", 
    "Perseus ride Pegasus", 
    "Perseus saved Andromeda from the Kraken sent by Poseidon", 
    "Perseus asked King Cephus to marry Andromeda.", 
    "Perseus and Andromeda returned to their home at Argos",
    "The Kraken is a Scandinavian Mythological Seamonster", 
    "Perseus turned Phineus and his army to stone"];

var caption = "";
var openCaptionTag = "<div class='caption'>";
var closeCaptionTag = "</div>";
var captionTexts = [
    "Perseus & Athena",
    "Perseus & Athena Alt", 
    "Perseus & Hermes", 
    "Perseus & Pegasus", 
    "Perseus & Pegasus Alt", 
    "Perseus saved Andromeda", 
    "Perseus saved Andromeda Alt", 
    "Perseus & Andromeda",
    "Sea monster attacked", 
    "Turned others to stone"];

var imageInfo = [
    "Athena giving Perseus the shield to fight Medusa",
    "Looking at Medusa with a mirror? Man, you are really are smart, Athena! [Painting by Bernhard Rode, 'Frederick the Great as Perseus', 1756.]",
    "Perseus received godly help from Hermes, The Messenger of Gods, on his quest to slay Medusa.",
    "Pegasus, in Greek mythology, a winged horse that sprang from the blood of the Gorgon Medusa as she was beheaded by the hero Perseus.",
    "Perseus made use of Pegasus in his long return journey to the island of Seriphos, rescuing Andromeda from the sea monster in Aethiopia from the back of the winged horse.",
    "Painting by Joachim Wtewael (1566–1638), Perseus Releases Andromeda (1611), oil on canvas, 180 × 150 cm, Musée du Louvre, Paris.",
    "Perseus’ love for Andromeda allows him to defeat the sea monster and rescue the beautiful and life-giving princess. And Andromeda’s love for Perseus seals their bond of marital union despite the politicking of Phineus and his ambitious lust for power.",
    "The story of Perseus and Andromeda offers hope that faith and love will triumph in the end. Faith, hope, and love bring about that most remarkable metamorphosis—a metamorphosis that reveals life instead of death.",
    "The Kraken is a Scandinavian Mythological Seamonster of tremendous size of strength said to exist off the coasts of Norway and Greenland. Its tentacles are large enough to be able to pull entire Ships under the Water and destroy cities with relative ease.",
    "'Perseus Confronting Phineus with the Head of Medusa', painting by Sebastiano Ricci, Italian 1659 - 1734"
]
var backBox = "<div class='backdrop'></div><div class='box'><div class='close'>x</div></div>"

for (var i = 0; i < 10; i++){
    fileNames.push("photo" + (i + 1));
    photos.push("<img src='images/gallery/" + fileNames[i] + ".png'>"); 
    image = photos[i];
    caption = openCaptionTag + captionTexts[i] + closeCaptionTag;
    desc = openDescTag + descTexts[i] + closeDescTag;
    imageList.push(openTag + desc + image + caption + closeTag);
}

document.getElementById("gallery").innerHTML = imageList.join("") + backBox;

var modal = document.getElementById("infoBox");
var headerInfo = "<h2 id='infoHead'></h2>";
var pTag = "<p id='infoDesc'></p>";
var anchorTag = "<a id='infoClose'>Click This to Close</a>";
modal.innerHTML = headerInfo + pTag + anchorTag;

var header = document.getElementById("infoHead");
var information = document.getElementById("infoDesc");

var closeBox = document.getElementById("infoClose");
closeBox.addEventListener("click", ()=> infoDisplay(null, false));

function infoDisplay(object, hiddenValue){
    if(object != null)
        var indexOfDescription = descTexts.indexOf(object.textContent);
    if(hiddenValue == false){
        modal.style.visibility = "hidden";
    } else{
        header.innerHTML = captionTexts[indexOfDescription];
        information.innerHTML = imageInfo[indexOfDescription];
        modal.style.visibility = "visible";
    }
}