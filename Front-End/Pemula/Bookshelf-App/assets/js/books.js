import {
    containerCard,
    makeCardBook,
    updateCardBook,
    showCardFilter
} from './components/card.js';
import { editBookModal, formModal } from './components/modal.js';

const addBook = () => {
    const title = document.getElementById('book-title');
    const author = document.getElementById('book-author');
    const years = document.getElementById('book-years');
    const isCompleted = document.getElementById('book-iscompleted');

    const cardBook = makeCardBook(
        title.value,
        author.value,
        years.value,
        isCompleted.checked
    );
    containerCard.append(cardBook);

    // NOTE: When add new book, filter back to All and show All books
    const allFilter = document.querySelector('input#all');
    allFilter.checked = true;
    showCardFilter(allFilter.value);
    // NOTE: reset value input when add Button clicked
    title.value = '';
    author.value = '';
    years.value = '';
    isCompleted.checked = false;
    // console.log(title, author, years, isCompleted);
};

const changeBookToCompleted = cardBookElement => {
    updateCardBook(cardBookElement, { isCompleted: true });
};

const changeBookToUnCompleted = cardBookElement => {
    updateCardBook(cardBookElement, { isCompleted: false });
};

const validationInput = () => {
    const modalContent = document.querySelector('.main-content');
    const inputText = modalContent.querySelectorAll('input[type = text]');

    let isValid = true;

    inputText.forEach(inp => {
        if (!inp.value.trim()) {
            alert(inp.previousSibling.innerText + ' is Required');
            isValid = false;
        }

        if (inp.id == 'book-years' && inp.value.match(/\D/g)) {
            alert(inp.previousSibling.innerText + ' must a number!');
            isValid = false;
        }
    });

    return isValid;
};

const getValueInputModal = cardBookElement => {
    const titleValue = cardBookElement.querySelector('.text-title').innerText;
    const textSubtitle =
        cardBookElement.querySelector('.text-subtitle').innerText;
    const textIsCompleted =
        cardBookElement.querySelector('.text-isCompleted').innerText;

    const subtitle = textSubtitle.split(' | ');

    const [authorValue, yearsValue] = subtitle;

    let isCompleted;

    if (textIsCompleted === 'Completed') isCompleted = true;
    if (textIsCompleted === 'Uncompleted') isCompleted = false;

    const valueObject = {
        titleValue,
        authorValue,
        yearsValue
    };

    const valueFormModal = [...formModal];

    const arrValueFormModal = valueFormModal.map((input, index) => {
        let newInput = Object.assign({}, input);

        if (input.id === 'book-iscompleted') {
            newInput.isChecked = isCompleted;
        } else {
            for (const [i, val] of Object.keys(valueObject).entries()) {
                if (index === i) {
                    newInput.value = valueObject[val];
                }
            }
        }

        return newInput;
    });

    editBookModal(arrValueFormModal, 'Edit Book', {
        isEdit: true,
        cardElement: cardBookElement
    });
};

const editBook = cardElement => {
    const title = document.getElementById('book-title').value;
    const author = document.getElementById('book-author').value;
    const years = document.getElementById('book-years').value;
    const isCompleted = document.getElementById('book-iscompleted').checked;

    updateCardBook(cardElement, { title, author, years, isCompleted });
};

export {
    addBook,
    editBook,
    changeBookToCompleted,
    changeBookToUnCompleted,
    getValueInputModal,
    validationInput
};
