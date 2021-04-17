function myFunction() {
    var y = document.getElementById("temp").scrollTop;
    console.log(y);
    var nav_bar = document.getElementById("header");
    var logo = document.getElementById("logo");

    if (y > 140) {
        nav_bar.style.animation = "scroll_down 0.75s 1 ";
        nav_bar.style.backgroundColor = "white";
        logo.style.animation = "logo_shrink 0.5s 1 ";
        logo.style.height = "13vh";
    }
    else if (y < 140) {
        nav_bar.style.animation = "scroll_up 0.75s 1 ";
        nav_bar.style.backgroundColor = "unset";
        logo.style.animation = "logo_grow 0.5s 1 ";
        logo.style.height = "20vh";
    }
}
