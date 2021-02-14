function partnerLogo(){
    var logos = [];
    var fileName = [];
    var imageList = [];
    var logo;
    var openList = "<div class = 'col-lg-2 col-md-4 col-sm-6'><li class='partner'>"; //Declare a variable to contain open list tag
    var closeList = "</li></div>"; //Declare a variable to contain close list tag

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

    document.getElementById("partners").innerHTML = "<div class = 'row'>" + imageList.join("") + "</div>";
}
partnerLogo();