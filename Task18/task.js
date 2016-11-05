var itemInput = document.querySelector('.item-input');
var lin = document.querySelector('.lin');
var rin = document.querySelector('.rin');
var lout = document.querySelector('.lout');
var rout = document.querySelector('.rout');
var itemsDisplay = document.querySelector('.items-display');

function inputItem(place) {
    var str = document.createElement('li');
    if (itemInput.value != '') {
        str.innerText = itemInput.value.trim();
        if (place == 'l') {
            itemsDisplay.insertBefore(str, itemsDisplay.childNodes[0]);
        } else if (place == 'r') {
            itemsDisplay.appendChild(str);
        }
    } else {
        alert('请先输入正确的值。')
    }
}

function outputItem(place) {
    if (itemsDisplay.innerHTML != '') {
        if (place == 'l') {
            alert(itemsDisplay.childNodes[0].innerText);
            itemsDisplay.removeChild(itemsDisplay.childNodes[0]);
        } else if (place == 'r') {
            alert(itemsDisplay.lastChild.innerText);
            itemsDisplay.removeChild(itemsDisplay.lastChild);
        }
    } else {
        alert('队列没有值，请先插入。')
    }
}

lin.onclick = function () {
    inputItem('l');
}

rin.onclick = function () {
    inputItem('r');
}

lout.onclick = function () {
    outputItem('l');
}

rout.onclick = function () {
    outputItem('r');
}

itemsDisplay.addEventListener('click', function (e) {
    alert(e.target.innerText);
    itemsDisplay.removeChild(e.target);
})