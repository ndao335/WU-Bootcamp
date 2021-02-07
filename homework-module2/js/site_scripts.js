function partnerLogo(){
    var logos = [];
    var fileName = [];
    var imageList = [];
    var logo;
    var openList = "<li class='partner'>"; //Declare a variable to contain open list tag
    var closeList = "</li>"; //Declare a variable to contain close list tag

    fileName.push("partner-bustour");
    fileName.push("partner-cabinrental");
    fileName.push("partner-campingadv");
    fileName.push("partner-collegetours");
    fileName.push("partner-rentalbike");
    fileName.push("partner-tourgroup");


    for (var i = 0; i < 6; i++){
        logos.push("<img src='images/partners/" + fileName[i] + ".png'>")
        logo = openList + logos[i] + closeList;
        imageList.push(logo);
    }

    document.getElementById("partners").innerHTML = imageList;
}
partnerLogo();