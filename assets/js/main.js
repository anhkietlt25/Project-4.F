const listNav = document.querySelectorAll('.navbar__list .navbar__item');
// console.log(listNav);

listNav.forEach((item) => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        listNav.forEach((removeItem) => {
            removeItem.classList.remove('navbar__link--active');
        });
        // console.log(item);
        item.classList.toggle('navbar__link--active');
    });
});