

function modalPositioning(){
    $('#exampleModal').css("top", ($(window).height() * 0.6));
    $('#exampleModal').css("right", $(window).width() * 0.8);

    $("#exampleModal").modal();
}