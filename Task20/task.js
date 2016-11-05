var itemInput = document.querySelector('.item-input');
var lin = document.querySelector('.lin');
var rin = document.querySelector('.rin');
var lout = document.querySelector('.lout');
var rout = document.querySelector('.rout');
var searchBtn = document.querySelector('.searchBtn');
var searchInput = document.querySelector('.search-input');
var itemsDisplay = document.querySelector('.items-display');

function search(str) {
    var itemArr = itemsDisplay.querySelectorAll('li');
    var reg = new RegExp(str,'g');
    for (let i = 0; i < itemArr.length; i++) {
        itemArr[i].innerHTML = itemArr[i].innerText.replace(reg, `<span style="background-color: #333;">${str}</span>`)
    }
}

function inputItem(place) {
    if (itemInput.value != '') {
        var tempArr = itemInput.value.split(',');
        for (let i = 0; i < tempArr.length; i++) {
            var str = document.createElement('li');
            str.innerText = tempArr[i];
            if (place == 'l') {
                itemsDisplay.insertBefore(str, itemsDisplay.childNodes[0]);
            } else if (place == 'r') {
                itemsDisplay.appendChild(str);
            }
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

searchBtn.onclick = function () {
    if (searchInput.value != '') {
        search(searchInput.value.trim());
    }
}

itemsDisplay.addEventListener('click', function (e) {
    alert(e.target.innerText);
    itemsDisplay.removeChild(e.target);
})