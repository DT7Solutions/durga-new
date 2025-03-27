document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById("video-bg");

    function isVideoPlaying(video) {
        return !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);
    }

    function playVideoWithAudio() {
        video.muted = false; // Try to unmute
        video.play().then(() => {
            console.log("Video is playing with sound.");
        }).catch(error => {
            console.error("Autoplay with audio blocked:", error);
            video.muted = true; // Fallback: Mute and retry autoplay
            video.play().then(() => {
                console.log("Video is playing, but muted.");
            }).catch(err => {
                console.error("Autoplay failed completely:", err);
            });
        });
    }

    // Try playing the video on page load
    playVideoWithAudio();

    // If video is not playing, attempt to restart after 2 seconds
    setTimeout(() => {
        if (!isVideoPlaying(video)) {
            console.warn("Video is not playing, retrying...");
            playVideoWithAudio();
        }
    }, 2000);

    // Unmute video when user interacts with the page
    document.addEventListener("click", function enableAudio() {
        video.muted = false;
        video.play();
        console.log("Video audio enabled after user interaction.");
        document.removeEventListener("click", enableAudio);
    });

    // Mute video when window is inactive
    document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
            video.muted = true;
            console.log("Window inactive: Video muted.");
        } else {
            video.muted = false;
            video.play();
            console.log("Window active: Video unmuted and playing.");
        }
    });
});