"use strict";
function check(config) {
    var tempArr = Object.keys(config.fileds);
    for (let i = 0; i < tempArr.length; ++i) {
        let tempEle = document.querySelectorAll(tempArr[i]);
        for (let j = 0; j < tempEle.length; ++j) {
            tempEle[j].onfocus = function () {
                msgDefault(config.fileds[tempArr[i]].msg, this);
            }
            tempEle[j].onblur = function () {
                var item = config.fileds[tempArr[i]];
                validityItem(item, this);
            }
        }
    }

    document.querySelector(config.form).onsubmit = function () {
        if (validitySubmit(tempArr, config)) {
            config.success();
        } else {
            config.fail();
        }
        return false;
    }
}

function validityItem(item, thisEle) {
    var tempStr = '';
    if (item.trim == true) {
        tempStr = thisEle.value.trim();
    } else {
        tempStr = thisEle;
    }
    if (item.trim == true) {
        if (item.required == true) {
            let tempMsg = thisEle.parentNode.querySelector('.msg');
            if (item.test(tempStr)) {
                return msgSuccess(item.success, thisEle);
            } else {
                return msgError(item.error, thisEle);
            }
        }
    }
}

function validitySubmit(arr, config) {
    var flag = true;
    for (let m = 0; m < arr.length; ++m) {
        let tempEle = document.querySelectorAll(arr[m]);
        for (let n = 0; n < tempEle.length; ++n) {
            var item = config.fileds[arr[m]];
            flag = validityItem(item, tempEle[n]);
        }
    }
    return flag;
}

function createMsg(color, str, node) {
    if (node.nextElementSibling != null) {
        if (node.nextElementSibling.nodeName.toLocaleLowerCase() == 'span' && node.nextElementSibling.className.indexOf('msg') > -1) {
            node.parentNode.removeChild(node.nextElementSibling);
        }
    }
    var tempSpan = document.createElement('span');
    tempSpan.innerText = str;
    tempSpan.className = 'msg';
    tempSpan.style.color = color;
    insertAfter(tempSpan, node);
    node.style.borderColor = color;
}


function msgDefault(str, node) {
    var color = '#999';
    createMsg(color, str, node);
}

function msgError(str, node) {
    var color = 'red';
    createMsg(color, str, node);
    return false;
}

function msgSuccess(str, node) {
    var color = 'green';
    createMsg(color, str, node);
    return true;
}

function insertAfter(newNode, node) {
    if (node.parentNode.lastChild == node) {
        node.parentNode.appendChild(newNode);
    } else {
        node.parentNode.insertBefore(newNode, node.nextElementSibling);
    }
}