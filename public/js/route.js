/**
 *
 */

document.addEventListener("transferwise-marker-initialized", function () {
    /**
     * @param {String} from
     * @param {String} to
     * @param {String=} color
     */
    function create(from, to, color) {
        color = color || "default";

        window.TransferWise.Location.getLocationCoordinates(
            from,
            function (fromCoordinates) {
                var fromWrapper = window.TransferWise.Marker.create(
                    fromCoordinates.latitude,
                    fromCoordinates.longitude,
                    color
                );

                setTimeout(
                    function () {
                        window.TransferWise.Location.getLocationCoordinates(
                            to,
                            function (toCoordinates) {
                                var toWrapper = window.TransferWise.Marker.create(
                                    toCoordinates.latitude,
                                    toCoordinates.longitude,
                                    color,
                                    false
                                );
                                var fromWrapperRect = fromWrapper.getBoundingClientRect();
                                var toWrapperRect = toWrapper.getBoundingClientRect();

                                fireworks.push(
                                    new Firework(
                                        fromWrapperRect.x,
                                        fromWrapperRect.y - 50,
                                        toWrapperRect.x,
                                        toWrapperRect.y - 55,
                                        color
                                    )
                                );
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
