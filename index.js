    let menuIcon = document.querySelector('#menue-icon');
    let navbar= document.querySelector('.navbar');

    menuIcon.onclick=()=>{
        menuIcon.classList.toggle('fa-x');
        navbar.classList.toggle('active');
    
    };


    // ---------------------------//

    let sections= document.querySelector('section')
    let navLinks = document.querySelector('header nav a');

    window.onscroll= ()=>{
        sections.forEach((sec) => {
            let top = window.scrollY;
            let offset = sec.offsetTop-150;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if(top>= offset && top<=offset+height){
                navLinks.forEach.apply(links=>{
                    links.classist.remove('active');
                    document.querySelector('header nav a[href"-'+id+']').classList.add('active')

                })
            }
        });
    
    

    //---------------stikcy navbar-------//

    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY>100);

    windowIcon.classList.remove('fa-x');
    favbar.classList.remove('active');
   
   
    };

ScrollReveal({
    distance: `100px`,
    duration:2000,
    delay:200
});

ScrollReveal().reveal('.home-contact h1, .home-content ,heading', {oringin: 'top'});
ScrollReveal().reveal('.projects-container, .home-img img, .contacts form', {origin: 'bottom'});
ScrollReveal().reveal('.about-content', {oringin: 'left'});
ScrollReveal().reveal('.about-image img, .home-contact p', {oringin: 'right'});

var typed = new Typed('#my-name, #my-statue', {
    strings:['smail Hossain'],
    typeSpeed:150,
    backSpeed:70,
    loop: true,
});
var written = new Typed('.my-status', {
    strings:['Software Engineering undergraduate', 'An IT Enthusiast'],
    typeSpeed:100,
    backSpeed:70,
    loop: true,
});