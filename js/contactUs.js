jQuery(document).ready(function () {
    jQuery("#formContact").submit(async function (e) {
        e.preventDefault();
        var responseCaptcha = grecaptcha.getResponse();
        if (responseCaptcha.length == 0) {
            jQuery("#g-recaptcha-error").removeClass("hidden");
            return false;
        }
        jQuery("#g-recaptcha-error").addClass("hidden");
        const name = jQuery("#name").val();
        const email = jQuery("#email").val();
        const message = jQuery("#message").val();
        const howFind = jQuery("#howFind").val();

        var formdata = new FormData();
        formdata.append("name", name);
        formdata.append("email", email);
        formdata.append("message", message);
        formdata.append("howFind", howFind);

        var requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow",
        };

        fetch(
            "https://mauriciapictures.com/wp-json/mp/v2/mpData/sendEmailContact",
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));

        jQuery("#messageEmailSent").removeClass("hidden");
        jQuery("#formContact").addClass("hidden").removeClass("flex");
    });
});

function recaptchaCallback() {
    console.log("test");
}
