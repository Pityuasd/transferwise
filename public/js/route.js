/**
 *
 */

document.addEventListener("transferwise-marker-initialized", function () {
    /**
     * @param {String} from
     * @param {String} to
     */
    function create(from, to) {
        window.TransferWise.Location.getLocationCoordinates(
            from,
            function (fromCoordinates) {
                var fromWrapper = window.TransferWise.Marker.create(
                    fromCoordinates.latitude,
                    fromCoordinates.longitude
                );

                setTimeout(
                    function () {
                        window.TransferWise.Location.getLocationCoordinates(
                            to,
                            function (toCoordinates) {
                                var toWrapper = window.TransferWise.Marker.create(
                                    toCoordinates.latitude,
                                    toCoordinates.longitude,
                                    null,
                                    false
                                );
                                var fromWrapperRect = fromWrapper.getBoundingClientRect();
                                var toWrapperRect = toWrapper.getBoundingClientRect();

                                var fixBezierCurveTransition = 10;
                                var bezierCurveThirdPointX = (fromWrapperRect.x + toWrapperRect.x) / 2;
                                var bezierCurveThirdPointY = (fromWrapperRect.y + toWrapperRect.y) / 2 + fixBezierCurveTransition;

                            }
                    )
                    },
                    200
                );
            }
        );
    }

    window.TransferWise.Route = {
        create: create
    };
});
