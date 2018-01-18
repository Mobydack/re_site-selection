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

    // $('.ukit-alt-title-img').hover(function(){
    //     let offset = $(this).offset(),
    //         topMargin = 20,
    //         leftMargin = 0;
    //     $('.ukit-alt-title-tooltip').css('opacity', '1');
    //     $('.ukit-alt-title-tooltip').offset({top: offset.top - $('.ukit-alt-title-tooltip').height() - topMargin, left: offset.left - $(this).width() / 3 + leftMargin});
    //   }, function(){
    //     $('.ukit-alt-title-tooltip').css('opacity', '0');
    //   });
    const massAltTooltip = Array.from(document.querySelectorAll(".ukit-alt .ukit-alt-title-img"));
    massAltTooltip.forEach((el, i, arr)=>{
        el.addEventListener('mouseenter', hoverEnterAltTooltip);
        el.addEventListener('mouseleave', hoverLeaveAltTooltip);
    });
    function hoverEnterAltTooltip() {
        console.log(this)
        const offset = this.getBoundingClientRect(),
            topMargin = 20,
            leftMargin = 20;
        console.log(this.clientHeight);
        const tooltip = document.querySelector(`.ukit-alt-tooltip.${this.dataset.tooltipHover}`);
        console.log(tooltip);
        tooltip.style.top = `${offset.top - tooltip.getBoundingClientRect().height - topMargin}px`;
        tooltip.style.left = `${offset.left - tooltip.getBoundingClientRect().width / 2 + offset.width / 2}px`;
        tooltip.style.opacity = 1;
    }

    function hoverLeaveAltTooltip() {
        const tooltip = document.querySelector(`.ukit-alt-tooltip.${this.dataset.tooltipHover}`);
        tooltip.style.opacity = 0;
    }

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