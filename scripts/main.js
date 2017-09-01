var leftArrows = document.getElementsByClassName('left'),
    rightArrows = document.getElementsByClassName('right'),
    itemContainers = document.getElementsByClassName('item-container'),
    slideCounter = document.getElementsByClassName('slider-num'),
    selectOptions = document.getElementsByClassName('option'),
    activeLink = 0,
    checkboxes = document.getElementsByTagName('label');
    childContainer = document.getElementsByClassName('children-slider')[0];

for(var i = 0; i < 4; i++){
    checkboxes[i].addEventListener('click', function (){
        childContainer.classList.toggle('no');
    });
}

for (var i = 0; i < selectOptions.length; i++){
    selectOptions[i].addEventListener('click', selectSort);
}
for (var i = 0; i < rightArrows.length; i++) {
    var rightArrow = rightArrows[i];
    rightArrow.addEventListener('click', setActive, false);
    rightArrow.itemID = i;

}
for (var i = 0; i < leftArrows.length; i++) {
    var leftArrow = leftArrows[i];
    leftArrow.addEventListener('click', setActive, false);
    leftArrow.itemID = i;
}

// function for getting select option

function selectSort(e) {
    if (e.target.textContent == 'price') {
        sortByPrice();
    }
    else if (e.target.textContent == 'name') {
        sortByName();
    }
}
function sortByPrice() {
    for (var i = 0; i < itemContainers.length; i++) {
        [].slice.call(itemContainers[i].children)
            .sort(function (a, b) {
                return getPrice(a) - getPrice(b);
            }).forEach(function (e) {
                itemContainers[i].appendChild(e);
            })
    }
}
// function for getting the price value from the element
function getPrice(e) {
    return Number(e.querySelector('.price')
        .textContent
        .replace(/[^\d.]+/g, '')) || 0;
}

function sortByName() {
    for (var i = 0; i < itemContainers.length; i++) {
        [].slice.call(itemContainers[i].children)
            .sort(function (a, b) {
                if (getName(a) > getName(b)) {
                    return 1
                }
                return -1;
            }).forEach(function (e) {
                itemContainers[i].appendChild(e);
            })
    }
}
// function for getting the name value from the element
function getName(e) {
    return e
        .querySelector('.name')
        .textContent || 0;
}

//slider

// set index of clicked slider
function setActive(e) {
    activeLink = e.target.itemID;
    changePosition(e.target);
}

function changePosition(e) {
    var checkArrow = e.classList[0];
    var currPos = itemContainers[activeLink].getBoundingClientRect().left;
    if ( checkArrow == 'right' && currPos > -3326) {
        slideCounter[activeLink].textContent = +slideCounter[activeLink].textContent + 1 + ' '; 
        console.log(currPos);
        itemContainers[activeLink].style.left = currPos -1281 +  'px';
    }
    else if (checkArrow == 'left' && currPos  < 0){
        slideCounter[activeLink].textContent = +slideCounter[activeLink].textContent - 1 + ' '; 
        console.log(currPos + ' ' + "1");
        itemContainers[activeLink].style.left = currPos + 1022 +  'px';
    }
}
