import {
    changeBookToCompleted,
    changeBookToUnCompleted,
    addBook,
    getValueInputModal,
    validationInput,
    editBook
} from './../books.js';
import { deleteCardBook } from './card.js';
import { toggleModal } from './modal.js';

// NOTE: Membuat abstrak Button
const createButton = ({ className, eventListener, textBtn, idBtn }) => {
    const button = document.createElement('button');
    button.classList.add('btn', ...className);

    if (idBtn) button.setAttribute('id', idBtn);

    button.innerText = textBtn;
    button.addEventListener('click', event => {
        eventListener(event);
    });

    return button;
};

// NOTE: Membuat button Finish
const finishButton = () =>
    createButton({
        className: ['btn-green', 'mr-3'],
        eventListener: event => {
            changeBookToCompleted(event.target.parentElement.parentElement);
        },
        textBtn: 'Finish'
    });

// NOTE: Membuat button Delete
const deleteButton = () =>
    createButton({
        className: ['btn-red', 'ml-3'],
        eventListener: event => {
            const isDelete = confirm('Are you Sure delete this book?');
            if (isDelete)
                deleteCardBook(event.target.parentElement.parentElement);
        },
        textBtn: 'Delete'
    });

// NOTE: Membuat button unfinish
const unFinishButton = () =>
    createButton({
        className: ['btn-grey', 'mr-3'],
        eventListener: event =>
            changeBookToUnCompleted(event.target.parentNode.parentNode),
        textBtn: 'Unfinish'
    });

//NoTE: Membuat button edit
const editButton = () =>
    createButton({
        className: ['btn-yellow', 'ml-3', 'mr-3'],
        textBtn: 'Edit',
        eventListener: event => {
            getValueInputModal(event.target.parentNode.parentNode);
            toggleModal();
        }
    });

//NOTE: Membuat button add book pada modal
const addNewBookBtn = () =>
    createButton({
        className: ['btn-main'],
        textBtn: 'Add Book',
        idBtn: 'addBookBtn',
        eventListener: () => {
            if (validationInput()) {
                addBook();
                toggleModal();
            }
        }
    });

const editFormModalBtn = cardElement =>
    createButton({
        className: ['btn-yellow'],
        textBtn: 'Edit Book',
        eventListener: () => {
            if (validationInput()) {
                editBook(cardElement);
                toggleModal();
            }
        }
    });
export {
    finishButton,
    deleteButton,
    unFinishButton,
    addNewBookBtn,
    editButton,
    editFormModalBtn
};
