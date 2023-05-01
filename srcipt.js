window.addEventListener('load', function() {
    setTimeout(function() {
        Swal.fire({
            title: 'Use your keyboard to play drums!',
            html: '<iframe width="420" height="236" src="https://www.youtube.com/embed/Z89PjkvSfu4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
            timer: 6000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
            }
        });
    }, 1500);
});

const keys = document.querySelectorAll(".key");

function playSound(e){
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if(!audio) return;
    audio.currentTime = 0;
    audio.play();
    key.classList.add('playing');
};

function removeTransition(e){
    if(e.propertyName !== "transform") return;
    this.classList.remove("playing");
}

keys.forEach(key => {
    key.addEventListener('transitionend', removeTransition);
});

window.addEventListener("keydown", playSound);

function playSoundTouch(e) {
    const target = e.target.closest('.key');
    if (!target) return;
    const keyCode = target.getAttribute('data-key');
    const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    target.classList.add('playing');
}

function removeTransitionTouch(e) {
    const target = e.target.closest('.key');
    if (!target) return;
    target.classList.remove('playing');
}

keys.forEach(key => {
    key.addEventListener('touchstart', playSoundTouch, { passive: true });
    key.addEventListener('touchend', removeTransitionTouch, { passive: true });
});
