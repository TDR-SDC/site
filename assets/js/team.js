function hide_all() {
    var elements = document.getElementsByClassName('content');
    for (var i = 0; i < elements.length; i++)
        elements[i].style.display = "none";
}

function team() {
    hide_all();
    var current_element = document.getElementById('team');
    current_element.style.display = "revert";
}

function alumni() {
    hide_all();
    var current_element = document.getElementById('alumni');
    current_element.style.display = "revert";
}
