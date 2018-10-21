/**
 *
 */

var startTutorial = (function () {
    $(window).ready(function () {
        $("#nextSecondTutorialStep").click(function(){
            $("#tutorialModalStepSecond").modal('show');
        });

        $("#nextThirdTutorialStep").click(function(){
            $("#tutorialModalStepThird").modal('show');
        });

        $("#nextFourthTutorialStep").click(function(){
            $("#tutorialModalStepFourth").modal('show');
        });

        $("#nextFifthTutorialStep").click(function(){
            $("#tutorialModalStepFifth").modal('show');
        });

        $("#nextSixthTutorialStep").click(function(){
            $("#tutorialModalStepSixth").modal('show');
        });
    });
})();

var setPositionTutorialModal = function (id) {
    // $(id).css("top", $(window).height() / 2);
    // $(id).css("left", $(window).width() - 280);
};
