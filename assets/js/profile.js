function hide_all() {
    var elements = document.getElementsByClassName('content');
    for (var i = 0; i < elements.length; i++)
        elements[i].style.display = "none";
}

function profile() {
    hide_all();
    var current_element = document.getElementById('display_update_profile');
    current_element.style.display = "block";
}

function add_user() {
    hide_all();
    var current_element = document.getElementById('add_user');
    current_element.style.display = "block";
}

function misc_corpo() {
    hide_all();
    var current_element = document.getElementById('misc_corpo');
    current_element.style.display = "block";
}

function sponsors() {
    hide_all();
    var current_element = document.getElementById('sponsors');
    current_element.style.display = "block";
}

function cad() {
    hide_all();
    var current_element = document.getElementById('cad');
    current_element.style.display = "block";
}

function team_docs() {
    hide_all();
    var current_element = document.getElementById('team_docs');
    current_element.style.display = "block";
}

function team_members() {
    hide_all();
    var current_element = document.getElementById('team_members');
    current_element.style.display = "block";
}
