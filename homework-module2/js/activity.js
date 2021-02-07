$(document).ready(function(){
    
    $("td").mouseover(function(e){
        var tempCell = $(this).text();
        if(tempCell == "Not Available" || 
        tempCell == "Hiking" ||
        tempCell == "Kayak" ||
        tempCell == "Skydiving" ||
        tempCell == "Biking" ||
        tempCell == "Camping")
            $(this).css("cursor", "default");
        else
            $(this).css("cursor", "pointer");
    });
    
    $("td").bind("click", function (e){
        var tempCell = $(this).text();
        if(tempCell != "Not Available")
            $(e.target).closest("td").toggleClass("highlight");
    });
})
