var infoData;
var informationAnimationSpeed = 200;

fetch("./assets/a12/info.json").then(res => res.json()).then(data => {
  infoData = data;
});

// INITIATE EMBEDDED YOUTUBE VIDEO
var tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("disassembly-video", {
    height: "390",
    width: "640",
    videoId: "I-ZNBaZbNF4",
    playerVars: {
      playsinline: 1
    },
    events: {
      onReady: onPlayerReady
    }
  });
}

function onPlayerReady(event) {
  event.target.seekTo(45);
}

//============================== JQUERY CODE ===========================//
$(document).ready(function(e) {
  // Handle Clicks on engine-component
  // Set text content of .information-content and animate height change
  $(".engine-component").click(function(e) {
    let originalHeight = $(".information-content").height();
    infoData.forEach(engineComponent => {
      if (engineComponent.id === $(this).attr("id")) {
        $(".engine-component").removeClass("selected");
        $(this).addClass("selected");
        $(".information-content").addClass("information-visible");
        $("#information-content-close-button").addClass("close-button-visible");
        $(".information-content h1").text(engineComponent.name);
        $(".information-content section").text(engineComponent.info);
        $(".information-content").height("auto");
        let newHeight = $(".information-content").height();
        $(".information-content").height(originalHeight);
        $(".information-content").animate(
          { height: newHeight },
          informationAnimationSpeed
        );
      }
    });
  });

  // Handle closing of information-content
  $("#information-content-close-button").click(function() {
    $(".information-content").animate({ height: 0 }, informationAnimationSpeed);
    $(".information-content h1").text(null);
    $(".information-content section").text(null);
    $(".information-content").removeClass("information-visible");
    $("#information-content-close-button").removeClass("close-button-visible");
    $(".engine-component").removeClass("selected");
  });

  // Toggle disassembly video
  var videoOpen = false;
  
  $("#video-cta").click(function() {
    videoOpen ? closeVideo() : openVideo();
  });

  $("#video-close-button").click(function() {
    closeVideo();
  });

  function openVideo() {
    videoOpen = true;
    $("#disassembly-video").animate({ top: "10vh" }, 500);
    $("#video-close-button").animate({ top: "10vh" }, 500);
    $(".screen-dim").animate({ opacity: 1 }, 500);
    $("#video-cta").text("Collapse Video \u23F7");
    player.playVideo();
  }

  function closeVideo() {
    videoOpen = false;
    $("#disassembly-video").animate({ top: "200vh" }, 500);
    $("#video-close-button").animate({ top: "200vh" }, 500);
    $(".screen-dim").animate({ opacity: 0 }, 500);
    $("#video-cta").text("Watch a video! \u23F6");
    player.pauseVideo();
  }
});
