var menuStatus = false;
function toggleMenu() {
    if (!menuStatus) {
        document.getElementById("mySidenav").style.width = "250px";
        menuStatus = true;
    }
    else {
        document.getElementById("mySidenav").style.width = "0";
        menuStatus = false;
    }
}

function positionMenu() {
    const windowWidth = window.innerWidth;
    console.log(windowWidth);
}