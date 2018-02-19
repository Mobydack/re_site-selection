(function(){
    var listElements = { //Объект с ссылками на элементы которые  используются далее
        buttonModalView: document.querySelector('.open-modal-view'), //кнопка [Мои сайты]
        bottomWrapper: document.querySelector('.bottom-wrapper'), //нижняя секция тега [header]
        headerWrapper: document.querySelector('.header-wrapper'), //сам [header]
        modalWrapper:  document.querySelector('.modal-wrapper'),
        modal: document.querySelector('.modal'),
        createNewSite: document.querySelector('.tile.create-new-site'),
        dashWrapper: document.querySelector('.dash-wrapper'),
        buttonViewSecondaryTable: document.querySelectorAll('.buttonView-secondary-table'),
        infoSiteName: document.querySelectorAll('.info__site-name input'),
        imgSite: document.querySelectorAll(".preview__image-site"),
        leftGruopCards: document.querySelectorAll(".secondary:not(.secondary-table) .secondary__leftgroup")
    }

    listElements.buttonModalView.addEventListener('click', viewEvent);

    var arrCard = Array.from(document.querySelectorAll('.modal__item-site'));

    var arrButtonViewCard = Array.from(document.querySelectorAll('.view-select button'));

    arrButtonViewCard.forEach(function(el, i, arr){
        el.addEventListener('click', toggleClass);
    })

    document.querySelector(".close-modal").addEventListener('click', viewEvent);

    window.addEventListener('resize', function(){ // слежение за ресайзом вьюпорта
        if(window.innerWidth <= 768 && arrCard[0].classList.contains('modal__item-site--table')) {
            toggleClass();
        }
    });

    Array.from(document.querySelectorAll(".ukit-alt .ukit-alt-title-img")).forEach(function(el, i, arr){
        el.addEventListener('mouseenter', hoverEnterAltTooltip);
        el.addEventListener('mouseleave', hoverLeaveAltTooltip);
        el.addEventListener('click', function(){ //прерывает распростроение событий на ссылку если клик был на тултипе
            if(event.target.classList.contains("ukit-alt-title-img")) {
                event.preventDefault();
            }
        }, false)
    });

    Array.from(listElements.buttonViewSecondaryTable).forEach(function(el, i, arr){
        el.addEventListener("click", viewLeftGroup);
    });

    Array.from(listElements.infoSiteName).forEach(function(el, index, arr) {
        el.addEventListener('focus', siteNameFocus);
    });

    Array.from(listElements.imgSite).forEach(function(el, i, arr){
        el.addEventListener("error", imgLoadError);
    });
    
    Array.from(listElements.leftGruopCards).forEach(function(el, i, arr){ //hidden text of edit-button if (secondary__leftgroup.Children > 2)
        if(el.childElementCount > 2) {
            el.classList.toggle("text--hidden");
        }
    });
    //далее не очень хороший код, надо исправить, но он для болванки
    

    //ponit events none (Переписат кусок кода)
    // var S = document.querySelectorAll(".tile.modal__item-site"); 
    
    // Array.from(S).forEach(function(el, index, arr){
    //     el.querySelector(".preview").setAttribute("data-hover-active", "false");
    //     el.querySelector(".preview").addEventListener("touchstart", function(){
    //         //проверка элемента вызвавшего события
    //         console.log(this.dataset.hoverActive)
    //         if(event.target.classList.contains("edit-button") && (this.dataset.hoverActive == "true")) {
    //            viewEvent();
    //            console.log(1);
    //         }
    //         //
    //         if(this.dataset.hoverActive == true){
    //             return 0;
    //         }
    //         var beforeHover = document.querySelector(".tile.modal__item-site .preview[data-hover-active='true']");
    //         if(!(beforeHover === null)) {
    //             beforeHover.dataset.hoverActive = false;
    //         }
    //         this.dataset.hoverActive = true;
            
    //     }, false)
    // });


    //Список функций и процедур для работы с событиями
    function hoverEnterAltTooltip() { //функция позиционирования у тултипа
        var offset = this.getBoundingClientRect(),
            topMargin = 20,
            leftMargin = 20;
        var tooltip = document.querySelector('.ukit-alt-tooltip.'+ this.dataset.tooltipHover);
        var left = (offset.left - tooltip.getBoundingClientRect().width / 2 + offset.width / 2),
            // top = (offset.top - tooltip.getBoundingClientRect().height - topMargin);
            top = (offset.top - topMargin);
        // if(window.innerWidth < 420) {
        //     left = 24;
        //     tooltip.style.right = 24 + "px";
        // }
        tooltip.style.top = top + "px";
        tooltip.style.left = left + "px";
        tooltip.style.opacity = 1;
    }

    function hoverLeaveAltTooltip() { //функция ховера у тултипа
        var tooltip = document.querySelector(".ukit-alt-tooltip."+this.dataset.tooltipHover);
        tooltip.style.opacity = 0;
    }

    function toggleClass() { //функция для добавления класса
        listElements.modal.classList.toggle('modal--table');
        listElements.createNewSite.classList.toggle('create-new-site--table');
        arrButtonViewCard.forEach(function(el, i, arr){
            el.classList.toggle('view-select--active');
        });
        arrCard.forEach(function(el, i, arr){
            el.classList.toggle('modal__item-site--table');
        });
    }

    function viewEvent() { //функция отображения карточек при нажатии на кнопку
        listElements.buttonModalView.classList.toggle('open-modal-view--active');
        listElements.bottomWrapper.classList.toggle('bottom-wrapper--active');
        listElements.headerWrapper.classList.toggle('header--fixed');
        listElements.modalWrapper.classList.toggle('modal-wrapper--active');
        listElements.dashWrapper.classList.toggle('dash-wrapper--deactive');

    }
    function viewLeftGroup() {//функци по отображению дополнительных элементов управления карточкой при нажатии на кнопку
        this.classList.toggle("buttonView-secondary-table--active");
        this.parentNode.querySelector(".secondary-table").classList.toggle("secondary-table--active");
    }
    function siteNameFocus() { //функция сокрытия элементов при событии [фокус] в поле [input] с названием сайта
        var el = this.parentNode;
        var iter = 0;
        while(!(el.classList.contains("modal__item-site--table")) && iter < 5) {
            el = el.parentNode;
            iter++;
        }
        var elSecondary = el.querySelector(".buttonView-secondary-table--active");
        if (!(elSecondary === null)) {
            var ev = document.createEvent("Event");
            ev.initEvent("click", false, true);
            elSecondary.dispatchEvent(ev);
        }
    }
    function imgLoadError() { //функция замены не загрузившегося скриншота сайта
        var img = this;
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "rgba(255, 255, 255, 0)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        canvas.toBlob(function(blob){
            var url = URL.createObjectURL(blob);
            img.onload = function(){
                URL.revokeObjectURL(url);
            }
            img.src = url;
        });
    }
})();