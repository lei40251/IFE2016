/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var aqiCityInput = document.getElementById('aqi-city-input');
    var aqiValueInput = document.getElementById('aqi-value-input');
    aqiData[aqiCityInput.value.trim()] = aqiValueInput.value.trim();
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var str = '';
    var tbody = document.getElementById('aqi-table').querySelector('tbody');
    for (let i in aqiData) {
        str += `<tr><td>${i}</td><td>${aqiData[i]}</td><td><button>删除</button></td></tr>`
    }
    tbody.innerHTML = str;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(target) {
    // do sth.
    var tr = target.parentNode.parentNode;
    var str = tr.querySelector('td').innerText;
    delete aqiData[str];
    renderAqiList();
}

function init() {
    var table = document.getElementById('aqi-table');
    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    var btnAdd = document.getElementById('add-btn');
    btnAdd.onclick = addBtnHandle;
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    table.addEventListener('click', function (e) {
        if (e.target.tagName.toLowerCase() == 'button') {
            delBtnHandle(e.target);
        }
    })
}

init();