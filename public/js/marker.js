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
     * @param {String} color
     * @param {Boolean} display
     */
    function create(latitude, longitude, color, display) {
        if (typeof display === "undefined") {
            display = true;
        }

        var wrapper = document.createElement("div");

        if (!display) {
            wrapper.style.visibility = "hidden";
        }

        var point = document.createElement("div");
        wrapper.appendChild(point);

        color = color || "default";
        wrapper.className = "marker-" + color + "-wrapper";
        point.className = "marker-" + color;

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

        return wrapper;
    }

    Marker = {
        create: create
    };

    // Dispatching event on document to initialize markers
    document.dispatchEvent(new Event(EVENT_MARKER_INITIALIZED));
    window.TransferWise.Marker = Marker;
});
