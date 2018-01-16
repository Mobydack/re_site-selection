(function(){
    'use strict'
    const listElements = {
        buttonModalView: document.querySelector('.open-modal-view'),
        bottomWrapper: document.querySelector('.bottom-wrapper'),
        headerWrapper: document.querySelector('.header-wrapper'),
        modalWrapper:  document.querySelector('.modal-wrapper'),
        modal: document.querySelector('.modal')
    }
    listElements.buttonModalView.addEventListener('click', viewEvent);
    const arrCard = Array.from(document.querySelectorAll('.modal__item-site'));
    const arrButtonViewCard = Array.from(document.querySelectorAll('.view-select button'));
    arrButtonViewCard.forEach((el, i, arr) => {
        el.addEventListener('click', toggleClass);
    })
    function toggleClass() {
        listElements.modal.classList.toggle('modal--table');
        arrButtonViewCard.forEach((el, i, arr) => {
            el.classList.toggle('view-select--active');
        });
        arrCard.forEach((el, i, arr) => {
            el.classList.toggle('modal__item-site--table');
        });
    }
    function viewEvent() {
        listElements.buttonModalView.classList.toggle('open-modal-view--active');
        listElements.bottomWrapper.classList.toggle('bottom-wrapper--active');
        listElements.headerWrapper.classList.toggle('header--fixed');
        listElements.modalWrapper.classList.toggle('modal-wrapper--active');
    }
})();