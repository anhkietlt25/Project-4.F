const listNav = document.querySelectorAll('.navbar__list .navbar__item');
// console.log(listNav);

// cach 1
for( let i = 0; i < listNav.length; i++  ) {
    // console.log(listNav[i]);
    listNav[i].addEventListener('click', function(e) {
        e.preventDefault();
        listNav.forEach((item) => {
            item.classList.remove('navbar__link--active');
        });
        this.classList.add('navbar__link--active');
    });
}

// cach 2
// listNav.forEach((item) => {
//     item.addEventListener('click', (e) => {
//         e.preventDefault();
//         listNav.forEach((removeItem) => {
//             removeItem.classList.remove('navbar__link--active');
//         });
//         // console.log(item);
//         item.classList.toggle('navbar__link--active');
//     });
// });