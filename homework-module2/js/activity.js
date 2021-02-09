$(document).ready(function(){
    
    $("td").mouseover(function(e){
        if($(this).attr("id") == "NotClickable")
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
