let allVideos = [];
let allImages = [];
let filteredImages = [];
let filteredVideos = [];
let currentImage;
let currentVideo;

jQuery(document).ready(function () {
    getAllVideos();
    getAllImages();

    // section videos
    jQuery("#buttonVideos").click(function () {
        jQuery(this).addClass("bg-[#395E8B]").removeClass("bg-[#474747]");
        jQuery("#AllVideos").click();
        jQuery("#buttonImages")
            .removeClass("bg-[#395E8B]")
            .addClass("bg-[#474747]");
        jQuery("#portafolioVideos").addClass("flex").removeClass("hidden");
        jQuery("#portafolioImages").removeClass("flex").addClass("hidden");
    });

    // section images
    jQuery("#buttonImages").click(function () {
        jQuery(this).addClass("bg-[#395E8B]").removeClass("bg-[#474747]");
        jQuery("#AllImages").click();
        jQuery("#buttonVideos")
            .removeClass("bg-[#395E8B]")
            .addClass("bg-[#474747]");
        jQuery("#portafolioVideos").removeClass("flex").addClass("hidden");
        jQuery("#portafolioImages").addClass("flex").removeClass("hidden");
    });

    //Select video
    jQuery("body").on("click", ".card-video", function () {
        jQuery("#modalVideo").removeClass("-top-full").addClass("top-0");
        const video = allVideos.filter((video) => video.id === this.id)[0];
        currentVideo = video.id;
        jQuery("#iframeVideo").attr(
            "src",
            `https://www.youtube.com/embed/${video.linkVideo}`
        );

        jQuery("#titleVideoModal").html(video.title);
        jQuery("#categoryVideoModal").html(video.category);
        jQuery("#descriptionVideoModal").html(video.description);
    });

    //Select image
    jQuery("body").on("click", ".card-image", function () {
        jQuery("#modalImage").removeClass("-top-full").addClass("top-0");
        const image = allImages.filter((image) => image.id === this.id)[0];
        currentImage = image.id;

        jQuery("#imageSelected").attr("src", image.url);
        jQuery("#titleImageModal").html(image.title);
    });

    //Close video
    jQuery("#buttonCloseModalVideo").click(function () {
        jQuery("#modalVideo").addClass("-top-full").removeClass("top-0");
        setTimeout(() => {
            jQuery("#iframeVideo").attr("src", ``);
            jQuery("#titleVideoModal").html("");
            jQuery("#categoryVideoModal").html("");
            jQuery("#descriptionVideoModal").html("");
        }, 200);
    });

    //Close image
    jQuery("#buttonCloseModalPicture").click(function () {
        jQuery("#modalImage").addClass("-top-full").removeClass("top-0");
        setTimeout(() => {
            jQuery("#imageSelected").attr("src", "");
            jQuery("#titleImageModal").html("");
        }, 200);
    });

    //filter videos
    jQuery("body").on("click", ".input-filter-videos", function (e) {
        let filtered = [];
        const category = e.target.value;
        jQuery("#currentCategory").html(category);
        jQuery("#containerVideosPortafolio")
            .addClass("opacity-0")
            .removeClass("opacity-100");

        setTimeout(() => {
            if (
                category === "all videos" &&
                allVideos &&
                allVideos.length > 0
            ) {
                filtered = allVideos;
            } else {
                filtered = allVideos.filter(
                    (video) => video.category === category
                );
            }

            filteredVideos = filtered;

            if (filtered && filtered.length > 0) {
                jQuery("#containerVideosPortafolio").html("");
                for (let video of filtered) {
                    jQuery("#containerVideosPortafolio").html(
                        jQuery("#containerVideosPortafolio").html() +
                            createNewItemVideo(
                                video.id,
                                video.linkCoverImage,
                                video.title
                            )
                    );
                }
            }

            for (let element of jQuery(".input-filter-videos")) {
                if (this.id === element.id) {
                    jQuery(element)
                        .next()
                        .addClass("bg-dark")
                        .removeClass("bg-slateGray");
                } else {
                    jQuery(element)
                        .next()
                        .removeClass("bg-dark")
                        .addClass("bg-slateGray");
                }
            }
            jQuery("#containerVideosPortafolio")
                .removeClass("opacity-0")
                .addClass("opacity-100");
        }, 300);
    });

    //filter images
    jQuery("body").on("click", ".input-filter-images", function (e) {
        let filtered = [];
        const category = e.target.value;
        jQuery("#currentCategory").html(category);
        jQuery("#containerImagesPortafolio")
            .addClass("opacity-0")
            .removeClass("opacity-100");

        setTimeout(() => {
            if (
                category === "all images" &&
                allImages &&
                allImages.length > 0
            ) {
                filtered = allImages;
            } else {
                filtered = allImages.filter(
                    (image) => image.category === category
                );
            }

            filteredImages = filtered;
            if (filtered && filtered.length > 0) {
                jQuery("#containerImagesPortafolio").html("");
                for (let image of filtered) {
                    jQuery("#containerImagesPortafolio").html(
                        jQuery("#containerImagesPortafolio").html() +
                            createNewItemImage(image.id, image.url, image.title)
                    );
                }
            }

            for (let element of jQuery(".input-filter-images")) {
                if (this.id === element.id) {
                    jQuery(element)
                        .next()
                        .addClass("bg-dark")
                        .removeClass("bg-slateGray");
                } else {
                    jQuery(element)
                        .next()
                        .removeClass("bg-dark")
                        .addClass("bg-slateGray");
                }
            }
            jQuery("#containerImagesPortafolio")
                .removeClass("opacity-0")
                .addClass("opacity-100");
        }, 300);
    });

    // next image
    jQuery("#nextImage").click(function () {
        const currentIndex = filteredImages.findIndex(
            (element) => currentImage === element.id
        );
        const nextImage = filteredImages.at(currentIndex + 1);

        if (nextImage) {
            jQuery("#imageSelected").attr("src", nextImage.url);
            jQuery("#titleImageModal").html(nextImage.title);
            currentImage = nextImage.id;
            return;
        }

        const firstImage = filteredImages.at(0);
        jQuery("#imageSelected").attr("src", firstImage.url);
        jQuery("#titleImageModal").html(firstImage.title);
        currentImage = firstImage.id;
    });

    // previus image
    jQuery("#previousImage").click(function () {
        const currentIndex = filteredImages.findIndex(
            (element) => currentImage === element.id
        );

        if (currentIndex > 0) {
            const previousImage = filteredImages.at(currentIndex - 1);
            jQuery("#imageSelected").attr("src", previousImage.url);
            jQuery("#titleImageModal").html(previousImage.title);
            currentImage = previousImage.id;
            return;
        }

        const lastImage = filteredImages.at(-1);
        jQuery("#imageSelected").attr("src", lastImage.url);
        jQuery("#titleImageModal").html(lastImage.title);
        currentImage = lastImage.id;
    });

    // next video
    jQuery("#nextVideo").click(function () {
        const currentIndex = filteredVideos.findIndex(
            (element) => currentVideo === element.id
        );
        const nextVideo = filteredVideos.at(currentIndex + 1);

        if (nextVideo) {
            jQuery("#iframeVideo").attr(
                "src",
                `https://www.youtube.com/embed/${nextVideo.linkVideo}`
            );

            jQuery("#titleVideoModal").html(nextVideo.title);
            jQuery("#categoryVideoModal").html(nextVideo.category);
            jQuery("#descriptionVideoModal").html(nextVideo.description);
            currentVideo = nextVideo.id;
            return;
        }

        const firstVideo = filteredVideos.at(0);
        jQuery("#iframeVideo").attr(
            "src",
            `https://www.youtube.com/embed/${firstVideo.linkVideo}`
        );
        jQuery("#titleVideoModal").html(firstVideo.title);
        jQuery("#categoryVideoModal").html(firstVideo.category);
        jQuery("#descriptionVideoModal").html(firstVideo.description);
        currentVideo = firstVideo.id;
    });

    // previous video
    jQuery("#previousVideo").click(function () {
        const currentIndex = filteredVideos.findIndex(
            (element) => currentVideo === element.id
        );

        if (currentIndex > 0) {
            const previousVideo = filteredVideos.at(currentIndex - 1);
            jQuery("#iframeVideo").attr(
                "src",
                `https://www.youtube.com/embed/${previousVideo.linkVideo}`
            );

            jQuery("#titleVideoModal").html(previousVideo.title);
            jQuery("#categoryVideoModal").html(previousVideo.category);
            jQuery("#descriptionVideoModal").html(previousVideo.description);
            currentVideo = previousVideo.id;
            return;
        }

        const lastVideo = filteredVideos.at(-1);
        jQuery("#iframeVideo").attr(
            "src",
            `https://www.youtube.com/embed/${lastVideo.linkVideo}`
        );

        jQuery("#titleVideoModal").html(lastVideo.title);
        jQuery("#categoryVideoModal").html(lastVideo.category);
        jQuery("#descriptionVideoModal").html(lastVideo.description);
        currentVideo = lastVideo.id;
    });
});

// Fecth images and videos

async function getAllVideos() {
    let response = await fetch(
        "https://mauriciapictures.com/wp-json/mp/v2/mpData/getVideosPortafolio"
    );
    response = await response.json();
    let videos = JSON.parse(response);
    videos = videos.reverse();
    allVideos = videos;
    filteredVideos = videos;

    if (videos && videos.length > 0) {
        jQuery("#containerVideosPortafolio").html("");
        for (let video of videos) {
            jQuery("#containerVideosPortafolio").html(
                jQuery("#containerVideosPortafolio").html() +
                    createNewItemVideo(
                        video.id,
                        video.linkCoverImage,
                        video.title
                    )
            );
        }
    }
}

async function getAllImages() {
    let response = await fetch(
        "https://mauriciapictures.com/wp-json/mp/v2/mpData/getImagesPortafolio"
    );
    response = await response.json();
    let images = JSON.parse(response);
    images = images.reverse();
    allImages = images;
    if (images && images.length > 0) {
        jQuery("#containerImagesPortafolio").html("");
        for (let image of images) {
            jQuery("#containerImagesPortafolio").html(
                jQuery("#containerImagesPortafolio").html() +
                    createNewItemImage(image.id, image.url, image.title)
            );
        }
    }
}

// Template cards video and images

function createNewItemVideo(id, img, title) {
    const item = `<div id="${id}" class="card-video group w-full sm:w-[350px] h-[300px] cursor-pointer relative rounded-md overflow-hidden shadow-cards relative z-[1]">
                         <div class="h-full w-full bg-cover bg-top bg-[url('${img}')] group-hover:scale-110 absolute top-0 left-0 z-[-1] ">
                         </div>
                         <span class="h-full w-full bg-[rgba(1,1,1,0.4)] absolute top-0 left-0 z-[-1]"></span>
                         <h2 class="text-white mx-4 mb-1 text-2xl font-bold max-h-[40px] overflow-hidden text-ellipsis p-2 absolute bottom-2">
                              ${title}
                         </h2>
                    </div>`;
    return item;
}

function createNewItemImage(id, url, title) {
    const item = `<div id="${id}" class="card-image group w-full sm:w-[300px] h-[400px] cursor-pointer relative rounded-md overflow-hidden shadow-cards relative z-[1]">
                        <div class="h-full w-full bg-cover bg-top bg-[url('${url}')] group-hover:scale-110 absolute top-0 left-0 z-[-1]"></div>
                        <span class="h-full w-full bg-[rgba(1,1,1,0.4)] group-hover:bg-[rgba(1,1,1,0.1)] absolute top-0 left-0 z-[-1]"></span>
                        <h2 class="text-white mx-4 mb-1 text-xs font-normal max-h-[15px] overflow-hidden text-ellipsis absolute bottom-3">
                        ${title}
                        </h2>
                    </div>`;
    return item;
}
