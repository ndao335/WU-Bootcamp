$(document).ready(function(){
    
    $("td").mouseover(function(e){
        if($(this).attr("id") == "NotClickable")
            $(this).css("cursor", "default");
        else
            $(this).css("cursor", "pointer");
    });
    
    $("td").click(function (){
        var tempCell = $(this).text();
        if(tempCell != "Not Available"){
            $(this).toggleClass("highlight");

            if($(this).hasClass("highlight")){
                var cellIndex = $(this).index();
                var cliffIndex = $('.table thead tr th').eq(cellIndex).text();
                $('#displaySelected').css("visibility", "visible");
                $('#displaySelected').css("margin-top", "2em");
                $('#result').append("<p>" + tempCell + "<mark> at " + cliffIndex + "</mark></p>");
            } else{
                $('#result p:contains(' + tempCell + ')').remove();
                if($('#result').has('p').length == false){
                    $('#displaySelected').css("visibility", "hidden");
                    $('#displaySelected').css("margin-top", "0");
                }
            }
        }
    });
})
