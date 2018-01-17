(function(){
    'use strict'
    const listElements = {
        buttonModalView: document.querySelector('.open-modal-view'),
        bottomWrapper: document.querySelector('.bottom-wrapper'),
        headerWrapper: document.querySelector('.header-wrapper'),
        modalWrapper:  document.querySelector('.modal-wrapper'),
        modal: document.querySelector('.modal'),
        createNewSite: document.querySelector('.tile.create-new-site')
    }
    listElements.buttonModalView.addEventListener('click', viewEvent);
    const arrCard = Array.from(document.querySelectorAll('.modal__item-site'));
    const arrButtonViewCard = Array.from(document.querySelectorAll('.view-select button'));
    arrButtonViewCard.forEach((el, i, arr) => {
        el.addEventListener('click', toggleClass);
    })
    document.querySelector(".close-modal").addEventListener('click', viewEvent);
    window.addEventListener('resize', ()=> {
        if(window.innerWidth <= 768 && arrCard[0].classList.contains('modal__item-site--table')) {
            toggleClass();
        }
    });
    // $(window).resize(function(){
    //     if($('body').innerWidth() <= 768 && $(".tile").hasClass('tile-table')){
    //         addClass();
    //     }
    // });
    function toggleClass() {
        listElements.modal.classList.toggle('modal--table');
        listElements.createNewSite.classList.toggle('create-new-site--table');
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