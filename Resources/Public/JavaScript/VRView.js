window.addEventListener('load', onVrViewLoad);

if (typeof document.addEventListener === 'function') {
    document.addEventListener('Neos.PageLoaded', onVrViewLoad, false);
}

/**
 * On VRView load
 */
function onVrViewLoad() {
    var vrViewElements = document.getElementsByClassName('gerdemann-vrview');
    for (var i = 0; i < vrViewElements.length; i++) {
        var nodeIdentifier = vrViewElements[i].id.replace('vrview-', '');
        var sceneKeys = Object.keys(vrViewScenes[nodeIdentifier]);
        if (sceneKeys.length > 0) {
            var vrView = new VRView.Player(
                '#' + vrViewElements[i].id,
                vrViewScenes[nodeIdentifier][sceneKeys[0]].options
            );
            vrView.on('ready', onVRViewReady);
            vrView.on('click', onHotspotClick);

            /**
             * On VRView ready
             *
             * @param e
             */
            function onVRViewReady(e) {
                loadScene(sceneKeys[0], false)
            }

            /**
             * On hotspot click
             *
             * @param e
             */
            function onHotspotClick(e) {
                if (e.id) {
                    loadScene(e.id, true);
                }
            }

            /**
             * Load scene
             *
             * @param name
             * @param withContent
             */
            function loadScene(name, withContent) {
                if (typeof vrViewScenes[nodeIdentifier][name].options != 'undefined') {
                    if (withContent) {
                        vrView.setContent(vrViewScenes[nodeIdentifier][name].options);
                    }
                    if (typeof vrViewScenes[nodeIdentifier][name].hotspots != 'undefined') {
                        for (key in vrViewScenes[nodeIdentifier][name].hotspots) {
                            vrView.addHotspot(
                                vrViewScenes[nodeIdentifier][name].hotspots[key].scene,
                                vrViewScenes[nodeIdentifier][name].hotspots[key].options
                            );
                        }
                    }
                }
            }
        }
    }
}