jQuery(document).ready(function () {
    jQuery(".button-more-profile").click(function () {
        getDataProfile(this.id);
        jQuery("#modalTeamProfile").removeClass("hidden").addClass("flex");
        jQuery("#containerInfoProfile").scrollTop(0)
    });

    jQuery("#buttonCloseModalProfile").click(function () {
        jQuery("#modalTeamProfile").addClass("hidden").removeClass("flex");
        jQuery("#imageModal").attr("src", "").addClass("hidden");
        jQuery("#loadinImageAnimation").addClass("flex").removeClass("hidden");
        jQuery("#nameProfile").text("");
        jQuery("#jobProfile").text("");
        jQuery("#descriptionProfile").text("");
        jQuery("#fullDescription").html("");
    });
});

async function getDataProfile(id) {
    let dataProfile = await fetch(
        `https://mauriciapictures.com/wp-json/mp/v2/mpData/getDataProfile/${id}`
    );
    dataProfile = await dataProfile.json();
    dataProfile = JSON.parse(dataProfile)[0];

    let fullDescription = await fetch(
        `https://mauriciapictures.com/wp-json/mp/v2/mpData/getDescriptionProfile/${id}`
    );

    fullDescription = await fullDescription.json();
    fullDescription = JSON.parse(fullDescription);

    const { name, description, image, job } = dataProfile;

    if (dataProfile) {
        jQuery("#imageModal")
            .attr("src", image)
            .removeClass("hidden")
            .addClass("opacity-100");
        jQuery("#loadinImageAnimation").removeClass("flex").addClass("hidden");
        jQuery("#nameProfile").text(name);
        jQuery("#jobProfile").text(job);
        jQuery("#descriptionProfile").text(description);

        for (let i in fullDescription) {
            jQuery("#fullDescription").html(
                jQuery("#fullDescription").html() +
                    createSectionDescription(
                        fullDescription[i].nombre,
                        fullDescription[i].contenido
                    )
            );
        }
    }
}

function createSectionDescription(title, description) {
    var section = ` 
                <div class="p-2 section-info mb-5">
                     <h4 class="font-bold text-sm mb-1">${title}</h4>
                     <p class="text-base">${description}</p>
                </div>`;
    return section;
}
