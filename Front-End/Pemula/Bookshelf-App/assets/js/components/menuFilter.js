import { showCardFilter } from './card.js';

// NOTE: Filter
const btnFilter = document.querySelector('.dropdown-filter button');
const filterMenuContainer = document.querySelector('.dropdown-filter-menu');
const filterMenu = filterMenuContainer.querySelectorAll('.menu');

btnFilter.addEventListener('click', () => {
    filterMenuContainer.classList.toggle('show');
});

filterMenu.forEach(menu => {
    menu.addEventListener('click', event => {
        const filterMenuInput = menu.querySelector('input');
        if (event.target == filterMenuInput) {
            const valueFilter = event.target.value;
            showCardFilter(valueFilter);
            filterMenuContainer.classList.remove('show');
        }
    });
});

// NOTE: click anything except btnFilter & filterMenuContainer to close menu filter
document.addEventListener('click', event => {
    if (event.target != btnFilter) {
        let isMenu = false;
        if (event.target == filterMenuContainer) return;
        filterMenu.forEach(menu => {
            if (event.target == menu) isMenu = true;
        });
        if (!isMenu) filterMenuContainer.classList.remove('show');
    }
});
