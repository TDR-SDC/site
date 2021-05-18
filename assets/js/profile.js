var current_profile_element = document.getElementById('profile');

function show_profile_section(profile_section) {
    var element = document.getElementById(profile_section);
    current_profile_element.style.display = "none";
    element.style.display = "block";
    current_profile_element = element;
}
