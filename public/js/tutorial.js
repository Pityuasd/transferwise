/**
 *
 */
function setPositionTutorialModal(id) {
    $(id).css("top",  $(window).width() * 0.145);
    $(id).css("left", $(window).height() * -1.7);
}

function startTutorial() {
    $(window).on('load',function() {
        $('#openModalTutorial').modal('show');
    });

    $(window).ready(function(){
        $("#startTutorial").click(function(){
            $("#tutorialModalStepFirst").modal('show');
        });
    });

    $(window).ready(function(){
        $("#nextSecondTutorialStep").click(function(){
            $("#tutorialModalStepSecond").modal('show');
        });
    });

    $(window).ready(function(){
        $("#nextThirdTutorialStep").click(function(){
            $("#tutorialModalStepThird").modal('show');
        });
    });

    $(window).ready(function(){
        $("#nextFourthTutorialStep").click(function(){
            $("#tutorialModalStepFourth").modal('show');
        });
    });

    $(window).ready(function(){
        $("#nextFifthTutorialStep").click(function(){
            $("#tutorialModalStepFifth").modal('show');
        });
    });

    $(window).ready(function(){
        $("#nextSixthTutorialStep").click(function(){
            $("#tutorialModalStepSixth").modal('show');
        });
    });
}

startTutorial();
