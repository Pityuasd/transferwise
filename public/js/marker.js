/**
 *
 */

document.addEventListener("transferwise-map-initialized", function () {
    /**
     * @type {*|{}}
     */
    var Marker = window.TransferWise.Marker || {};

    /**
     * @type {string}
     */
    var EVENT_MARKER_INITIALIZED = "transferwise-marker-initialized";

    /**
     * @param {Number} latitude
     * @param {Number} longitude
     * @param {String} wrapperClasses
     * @param {String} markerClasses
     */
    function create(latitude, longitude, wrapperClasses, markerClasses) {
        var wrapper = document.createElement("div");
        var point = document.createElement("div");
        wrapper.appendChild(point);

        wrapper.className = wrapperClasses || "marker-default-wrapper";
        point.className = markerClasses || "marker-default";

        new mapboxgl.Marker(wrapper)
            .setLngLat([longitude, latitude])
            .addTo(window.TransferWise.map);

        setTimeout(
            function () {
                wrapper.classList.add("animated");
                wrapper.classList.add("fadeOut");

                setTimeout(
                    function () {
                        wrapper.remove();
                    },
                    2000
                )
            },
            500
        );
    }

    Marker = {
        create: create
    };

    window.TransferWise.Marker = Marker;
});
