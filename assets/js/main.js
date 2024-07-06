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

const arrowBtn = document.querySelectorAll('.member__controls i');
const list = document.querySelector('.member__list');
const wrapper = document.querySelector('.member__wrapper');
const firstCardWidth = list.querySelector('.member-item').offsetWidth;
// console.log(firstCardWidth);
const listChildrens = [...list.children];
// console.log(listChildrens);
// console.log(firstCardWidth);

// Calculate the number of cards that can fit in the list viewport.
let itemView = Math.round(list.offsetWidth / firstCardWidth);
// console.log(itemView);


// Insert copies of the last few list to beginning of list for infinite scrolling
listChildrens.slice(-itemView).reverse().forEach(card => {
    list.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the last few list to beginning of list for infinite scrolling
listChildrens.slice(0,itemView).forEach(card => {
    list.insertAdjacentHTML("beforeend", card.outerHTML);
});

let isDragging = false, startX, startScrollLeft, timeoutId;

// Add event listeners for the arrow buttons to scroll the list left and right.
arrowBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        list.scrollLeft += btn.id === "Previous" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    list.classList.add('dragging');
    // Records the initial cursor  and scroll position of the list
    startX = e.pageX;
    startScrollLeft = list.scrollLeft

}

const dragging = (e) => {
    if(!isDragging) return;
    // Updates the scroll position of the list based on the cursor movement
    list.scrollLeft = startScrollLeft - (e.pageX - startX);

}

const dragStop = () => {
    isDragging = false;
    list.classList.remove('dragging');
}

const autoPlay = () => {
    if(window.innerWidth < 800) return; // Return if window is smaller than 800
    // AutoPlay the list after every 3000ms
    timeoutId = setTimeout(() => list.scrollLeft += firstCardWidth, 3000);
}
autoPlay();

const infiniteScroll = () => {
    // If the list is at the beginning, scroll to the end
    if(list.scrollLeft === 0) {
        // console.log("You're reached to the left end");
        list.classList.add('no-transition');
        list.scrollLeft = list.scrollWidth - (2 * list.offsetWidth);
        list.classList.remove('no-transition');
    // If the list is at the end, scroll to the beginning
    }else if(Math.ceil(list.scrollLeft) === list.scrollWidth - list.offsetWidth) {
        // console.log("You're reached to the right end");
        list.classList.add('no-transition');
        list.scrollLeft = list.offsetWidth;
        list.classList.remove('no-transition');
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over list
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

list.addEventListener('mousedown', dragStart);
list.addEventListener('mousemove', dragging);
document.addEventListener('mouseup', dragStop);
list.addEventListener('scroll', infiniteScroll);
wrapper.addEventListener('mouseenter', () =>clearTimeout(timeoutId));
wrapper.addEventListener('mouseleave',autoPlay);

