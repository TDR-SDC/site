function tick() {
    var submit = document.getElementById('submit');
    console.log(form);
    setTimeout(() => {
        submit.value = "✅";
        submit.value = "Submit";
    }, 1500)
}
