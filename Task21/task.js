var tagInput = document.querySelector('.tag-input');
var tag = document.querySelector('.tag');
var hobbyTextarea = document.querySelector('.hobby-textarea');
var hobbyBtn = document.querySelector('.hobby-btn');
var hobby = document.querySelector('.hobby');

//数据格式
var reg = new RegExp('[,，\n]', 'g');
function dataInit(string) {
    var str = string.replace(reg, ',');
    //数组去重
    // return Array.from(new Set(str.split(',')));
    return str.split(',');
}

//数组插入标签
function insertInto(arr, node) {
    var tempArr = [];
    var lists = node.querySelectorAll('li');

    for (let i = 0; i < lists.length; i++) {
        tempArr.push(lists[i].innerText);
    }

    var dataArr = Array.from(new Set(tempArr.concat(arr))).slice(-10);
    node.innerHTML = '';

    for (let i = 0; i < dataArr.length; i++) {
        if (dataArr[i] != '') {
            var str = document.createElement('li');
            str.innerHTML = dataArr[i];
            // node.insertBefore(str, node.childNodes[0]);
            node.appendChild(str);
        }
    }
}

//删除标签
function delTag(e, node) {
    if (e.target.nodeName.toLowerCase() == 'li') {
        alert(e.target.innerText.replace('点击删除', ''));
        node.removeChild(e.target);
    }
}

function addText(node) {
    node.addEventListener('mouseover', function (e) {
        if (e.target.nodeName.toLowerCase() == 'li') {
            e.target.innerText = '点击删除' + e.target.innerText;
        }
    });
    node.addEventListener('mouseout', function (e) {
        if (e.target.nodeName.toLowerCase() == 'li') {
            e.target.innerHTML = e.target.innerText.replace('点击删除', '');
        }
    });
}

addText(hobby);
addText(tag);

//绑定事件
tagInput.addEventListener('keydown', function (e) {
    if (e.keyCode == 13) {
        insertInto(dataInit(tagInput.value), tag);
    }
})

hobbyBtn.onclick = function () {
    insertInto(dataInit(hobbyTextarea.value), hobby);
}

hobby.addEventListener('click', function (e) {
    delTag(e, this);
})

tag.addEventListener('click', function (e) {
    delTag(e, this);
})