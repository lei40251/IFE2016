"use strict";

var coding = document.querySelector('.coding');
var cmd = document.querySelector('.cmd');
var lineNum = [];

function createLine() {
    var li = document.createElement('li');
    li.innerText = lineNum.length + 1;
    lineNum[lineNum.length] = li;
    renderLine();
}

function renderLine() {
    var ul = cmd.querySelector('ul');
    for (let i = 0; i < lineNum.length; ++i) {
        ul.appendChild(lineNum[i]);
    }
}

createLine();
coding.onkeydown = function (e) {
    if (e.keyCode == 13) {
        createLine();
    }
}
coding.onscroll = function () {
    cmd.querySelector('ul').style.marginTop = `-${coding.scrollTop}px`;
}
