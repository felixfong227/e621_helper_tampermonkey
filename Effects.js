// All custom effects for the webpage
var warpBefore = false;


var Effects = {
    instagramLike(elm, isLike) {
        if(typeof isLike === 'undefined') isLike = true;
        if(elm) {
            var canvasTargetPoint = document.createElement('div');
            var wrapper = document.createElement('div');
            canvasTargetPoint.id = 'ext_e621_helper_like_canvas';

            canvasTargetPoint.style.position = 'absolute';
            canvasTargetPoint.style.top = '50%';
            canvasTargetPoint.style.left = '50%';
            canvasTargetPoint.style.width = '20%';

            if(!warpBefore) {
                wrapper.className = 'ext_e621_helper_like_overlay_container';
                wrapper.style.position = 'relative';
                elm.parentNode.insertBefore(wrapper, elm);
                wrapper.appendChild(elm);
                warpBefore = true;
            }

            elm.parentNode.insertBefore(canvasTargetPoint, elm);

            if(isLike) {
                // Show like animation
                bodymovin.loadAnimation({
                    container: canvasTargetPoint,
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    path: 'https://bypasscors.herokuapp.com/api/?url=https://assets5.lottiefiles.com/datafiles/d9bc9kYC2VttaKb/data.json'
                });
            } else {
                // Show heart broken animation
                bodymovin.loadAnimation({
                    container: canvasTargetPoint,
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    path: 'https://bypasscors.herokuapp.com/api/?url=https://assets5.lottiefiles.com/datafiles/tdCLmdmRpULFtsT/data.json',
                }).setSpeed(2.5)
            }

            setTimeout(function() {
                canvasTargetPoint.remove();
            }, 1000)

        }
    }
}