var itemInput = document.querySelector('.item-input');
var lin = document.querySelector('.lin');
var rin = document.querySelector('.rin');
var lout = document.querySelector('.lout');
var rout = document.querySelector('.rout');
var sortB = document.querySelector('.sortB');
var itemsDisplay = document.querySelector('.items-display');

function initArr() {
    var list = itemsDisplay.querySelectorAll('li');
    var tempArr = [];
    for (let i = 0; i < list.length; i++) {
        tempArr.push(parseInt(list[i].lastChild.style.height.replace('px', '')));
    }
    sort(tempArr);
}

function layout(arr) {
    var str = '';
    for (let i = 0; i < arr.length; i++) {
        str += `<li><div style="height: ${parseInt(arr[i]) + 'px'};"></div></li>`
    }
    itemsDisplay.innerHTML = str;
}

let m= 0;

function sort(arr) {
    if (m < (arr.length - 1)) {
     setInterval(function () {
     // nb(arr);
     for (let j = 0; j < arr.length - m - 1; j++) {
     if (arr[j] > arr[j + 1]) {
     arr[j + 1] = [arr[j], arr[j] = arr[j + 1]][0];
     }
     layout(arr);
     }
     }, 100)
     }
     m++;
}

function inputItem(place) {
    var str = document.createElement('li');
    var div = document.createElement('div');
    if (itemInput.value != '' && parseInt(itemInput.value) > 10 && parseInt(itemInput.value) < 1000) {
        if (itemsDisplay.querySelectorAll('li').length < 60) {
            div.style.height = parseInt(itemInput.value) * 3 + 'px';
            str.appendChild(div);
            if (place == 'l') {
                itemsDisplay.insertBefore(str, itemsDisplay.childNodes[0]);
            } else if (place == 'r') {
                itemsDisplay.appendChild(str);
            }
        } else {
            alert('队列已满。')
        }
    } else {
        alert('请先输入正确的值。')
    }
}

function outputItem(place) {
    if (itemsDisplay.innerHTML != '') {
        if (place == 'l') {
            itemsDisplay.removeChild(itemsDisplay.childNodes[0]);
        } else if (place == 'r') {
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

sortB.onclick = function () {
    initArr();
}
