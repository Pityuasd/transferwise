

function modalPositioning(isSingleCountry){
    if(isSingleCountry){
        $('#exampleModal').css("top", ($(window).height() * 0.55));
        $('#exampleModal').css("right", $(window).width() * 0.8);

        if($('#countries').is(':visible')){
            $('#countries').modal().hide();
        }

        $("#exampleModal").modal();
    }else{
        $('#countries').css("top", ($(window).height() * 0.55));
        $('#countries').css("right", $(window).width() * 0.8);

        if($('#exampleModal').is(':visible')){
            $('#exampleModal').modal().hide();
        }
        $("#countries").modal();
    }
}