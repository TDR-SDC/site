function animate(obj, initVal, lastVal, duration) {

    let startTime = null;
    //get the current timestamp and assign it to the currentTime variable
    let currentTime = Date.now();
    //pass the current timestamp to the step function
    const step = (currentTime) => {

        //if the start time is null, assign the current time to startTime
        if (!startTime) {
            startTime = currentTime;
        }
        //calculate the value to be used in calculating the number to be displayed
        const progress = Math.min((currentTime - startTime) / duration, 1);

        //calculate what to be displayed using the value gotten above
        if (obj.id == 'achievement' || obj.id == 'alumni')
            obj.innerHTML = Math.floor(progress * (lastVal - initVal) + initVal) + "+";
        else
            obj.innerHTML = Math.floor(progress * (lastVal - initVal) + initVal);

        //checking to make sure the counter does not exceed the last value (lastVal)
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
        else {
            window.cancelAnimationFrame(window.requestAnimationFrame(step));
        }
    };
    //start animating
    window.requestAnimationFrame(step);
}


function increment_counter() {
    let text1 = document.getElementById('cars');
    let text2 = document.getElementById('achievement');
    let text3 = document.getElementById('awards');
    let text4 = document.getElementById('team-members');
    let text5 = document.getElementById('sponsors');
    let text6 = document.getElementById('alumni');
    animate(text1, 1, 12, 2000);
    animate(text2, 1, 15, 2000);
    animate(text3, 1, 20, 2000);
    animate(text4, 1, 26, 2000);
    animate(text5, 1, 35, 2000);
    animate(text6, 1, 120, 2000);
}

function reset_counter() {
    document.getElementById('cars').innerHTML = 0;
    document.getElementById('team-members').innerHTML = 0;
    document.getElementById('achievement-counter').innerHTML = 0;
    document.getElementById('awards').innerHTML = 0;
}

var executed = false;

function home() {
    var y = document.getElementById("body").scrollTop;
    if (y > 800 && !executed) {
        increment_counter();
        executed = true;
    }
    else if (y < 800 && executed) {
        reset_counter();
        executed = false;
    }
}

function team_section_height() {
    var individual_team = document.getElementById('individual_team_descriptescript');
    var sdc = document.getElementById('sdc_descript');
    var sdc_height = document.getElementById('sdc_descript').offsetHeight;
    var dr = document.getElementById('defianz_descript');
    var dr_height = document.getElementById('defianz_descript').offsetHeight;
    if (dr_height >= sdc_height) {
        dr.style.height = dr_height;
        sdc.style.height = dr_height;
        individual_team.style.height = dr_height;
    }
    else {
        dr.style.height = sdc_height;
        sdc.style.height = sdc_height;
        individual_team.style.height = sdc_height;
    }
}
