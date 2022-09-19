jQuery(document).ready(function () {
    spinnerLoad();
    navbarPosition(
        document.documentElement.scrollTop || document.body.scrollTop
    );
    jQuery(window).scroll(function () {
        let scrollY =
            document.documentElement.scrollTop || document.body.scrollTop;
        animationSections(scrollY);
        animationClients(scrollY);
        navbarPosition(scrollY);
    });
});

function animationSections(scrollY) {
    let sections = jQuery(".container-section");
    if (sections.length > 0) {
        for (let section of sections) {
            const currentSection = jQuery(section);

            // La seccion esta enfocada para mover los objetos
            const isScrollOnsection =
                scrollY >=
                    currentSection.offset().top - window.innerHeight * 0.5 &&
                scrollY <=
                    currentSection.offset().top + window.innerHeight * 0.2;

            if (isScrollOnsection) {
                const translateStyle = `translate(0,${
                    (scrollY - currentSection.offset().top) * -0.2
                }px)`;

                currentSection.find(".object-to-move").css({
                    transform: translateStyle,
                });
            }

            // La seccion esta enfocada para mover los hacer efecto scale
            const isScrollToScale =
                scrollY >=
                    currentSection.offset().top - window.innerHeight * 0.4 &&
                scrollY <=
                    currentSection.offset().top + window.innerHeight * 0.4;

            if (isScrollToScale) {
                currentSection.css({ transform: "scale(1)" });
            } else {
                currentSection.css({ transform: "scale(0.9)" });
            }
        }
    }
}

function animationClients(scrollY) {
    let containerClients = jQuery("#clients");
    let contentDataClients = jQuery("#contentDataClients");
    let titleClients = jQuery("#titleClients");

    if (containerClients.length > 0) {
        if (
            scrollY >=
                containerClients.offset().top - window.innerHeight * 0.5 &&
            scrollY <=
                containerClients.offset().top +
                    containerClients.innerHeight() -
                    containerClients.innerHeight() * 0.1
        ) {
            titleClients.css({
                transform: "translateY(0%)",
            });
            contentDataClients.css({
                opacity: "1",
            });
        } else {
            titleClients.css({
                transform: "translateY(100%)",
            });
            contentDataClients.css({
                opacity: "0",
            });
        }
    }
}

function navbarPosition(scrollY) {
    if (scrollY > 50) {
        jQuery("#mainHeader").addClass("bg-slateGray shadow-shadowLeft");
        jQuery("#mainHeader").removeClass("py-15").addClass("py-3");
    } else {
        jQuery("#mainHeader").addClass("py-15").removeClass("py-3");
        jQuery("#mainHeader").removeClass("bg-slateGray shadow-shadowLeft");
    }
}

function spinnerLoad() {
    setTimeout(function () {
        jQuery("#loaderMauricia").css({
            transform: "translateY(-100%)",
            visibility: "hidden",
        });
    }, 1000);
}

jQuery("#buttonOpenMenu").click(function () {
    jQuery("#headerMobile")
        .removeClass("-top-full opacity-0")
        .addClass("top-0 opacity-100");
});

jQuery("#buttonCloseMenu").click(function () {
    jQuery("#headerMobile")
        .addClass("-top-full opacity-0")
        .removeClass("top-0 opacity-100");
});

tailwind.config = {
    theme: {
        extend: {
            colors: {
                slateGray: "#617a99",
                indigo: "#274060",
                dark: "#353535",
                light: "#ffffff",
                lightSilver: "#d2d7df",
                burlywood: "#deb597",
                crimson: "#e31634",
                maximumGreen: "#638537",
                darkTransparent: "rgba(0, 0, 0, 0.50)",
            },
            backgroundImage: {
                gradientBlueLight:
                    "linear-gradient(180deg, #DBE8EE 0%, rgba(219, 232, 238, 0) 77.08%)",
                footerBG: ` url(https://mauriciapictures.com/wp-content/uploads/2019/12/footer-image.png)`,
                bannerOurWork:
                    "linear-gradient(0deg, rgba(61, 61, 61, 0.82), rgba(61, 61, 61, 0.82)), url(https://mauriciapictures.com/wp-content/uploads/2020/01/2019_09_27-IX-Mauricia-Pictures-BTS-Aqualectra-Commercial-115.jpg)",
                bannerContactUs:
                    "linear-gradient(0deg, rgba(61, 61, 61, 0.82), rgba(61, 61, 61, 0.82)), url(https://mauriciapictures.com/wp-content/uploads/2020/02/tumba-crane.gif)",
            },
            letterSpacing: {
                heroTitle: "0.5em",
            },
            boxShadow: {
                shadowLeft: "10px 10px 50px rgba(0, 0, 0, 0.5)",
                shadowFooter: "0px -4px 50px rgba(0, 0, 0, 0.2)",
                cards: "30px 30px 53px #d7d7d7, -30px -30px 53px #e9e9e9",
            },
            zIndex: {
                100: "100",
                200: "200",
                300: "300",
                400: "400",
                500: "500",
                600: "600",
            },
        },
        gridTemplateColumns: {
            mainSection: "3fr 4fr",
            customSection: "1fr 1fr",
            footerLayout: "400px 1fr",
            footerContent: "2fr 1fr 1fr",
            sectionForm: "1fr 350px",
            2: "grid-template-columns: repeat(2, minmax(0, 1fr))",
        },
    },
};
