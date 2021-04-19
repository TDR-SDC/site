function home() {
    var y = document.getElementById("body").scrollTop;
    console.log(y);
    var nav_bar = document.getElementById("header");
    var logo = document.getElementById("logo");

    if (y > 140) {
        nav_bar.style.animation = "scroll_down 0.75s 1 ";
        nav_bar.style.backgroundColor = "white";
    }
    else if (y < 140) {
        nav_bar.style.animation = "scroll_up 0.75s 1 ";
        nav_bar.style.backgroundColor = "unset";
    }
}
