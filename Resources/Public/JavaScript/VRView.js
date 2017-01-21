window.addEventListener('load', onVrViewLoad);

if (typeof document.addEventListener === 'function') {
    document.addEventListener('Neos.PageLoaded', onVrViewLoad, false);
}

function onVrViewLoad() {
    var vrViewElements = document.getElementsByClassName('gerdemann-vrview');
    for (var i = 0; i < vrViewElements.length; i++) {
        var options = {
            is_stereo: vrViewElements[i].dataset.isstereo,
            width: vrViewElements[i].dataset.width,
            height: vrViewElements[i].dataset.height,
            default_yaw: vrViewElements[i].dataset.defaultyaw
        };

        if (typeof vrViewElements[i].dataset.image != 'undefined') {
            options.image = vrViewElements[i].dataset.image;
        } else if (typeof vrViewElements[i].dataset.video != 'undefined') {
            options.video = vrViewElements[i].dataset.video;
        }

        var vrView = new VRView.Player(
            '#' + vrViewElements[i].id,
            options
        );
    }
}