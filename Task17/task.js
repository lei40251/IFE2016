/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 366; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}
//获得随机颜色
function color() {
    return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
}

//判断日期是当年的第几周
function yearWeek(dateStr) {
    var date = new Date(dateStr);
    var startYear = date.getFullYear();
    var baseDate = new Date(`${startYear}-01-01`);
    var week = 0;
    console.log(baseDate.getDay());
    baseDate.setDate(baseDate.getDate() + 7 - baseDate.getDay());

    if (date - baseDate > 0) {
        week = Math.ceil((date - baseDate) / 60 / 60 / 24 / 1000 / 7) + 1;
    } else {
        week = 1;
    }
    return week;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: -1,
    nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
    initAqiChartData(function () {
        var aqiChartWrap = document.querySelector('.aqi-chart-wrap');
        var str = '';
        if (chartData != undefined) {
            var num = Object.keys(chartData).length;
            var j = 0;
            var backgroundColor = '';
            for (let i in chartData) {
                if (chartData[i] < 200) {
                    backgroundColor = 'blue';
                } else if (chartData[i] >= 200 && chartData[i] < 300) {
                    backgroundColor = "yellow";
                } else if (chartData[i] >= 300 && chartData[i] < 400) {
                    backgroundColor = 'orange';
                } else if (chartData[i] >= 400) {
                    backgroundColor = 'red';
                }
                str += `<div class="aqi-chart-item" title="${i},${chartData[i]}" style="width: ${100 / num}%;left: ${(100 / num) * j}%;height: ${chartData[i]}px;background-color: ${backgroundColor};"></div>`;
                j++;
            }
        }
        aqiChartWrap.innerHTML = str;
    })
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(e) {
    // 确定是否选项发生了变化
    if (e.target.name == 'gra-time') {
        // 设置对应数据
        pageState.nowGraTime = e.target.value;
    }
    // 调用图表渲染函数
    renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(e) {
    // 确定是否选项发生了变化
    if (e.target.value != pageState.nowSelectCity) {
        // 设置对应数据
        pageState.nowSelectCity = e.target.value;
    }
    // 调用图表渲染函数
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var formGraTime = document.getElementById('form-gra-time');
    formGraTime.addEventListener('click', function (e) {
        graTimeChange(e);
    });
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var str = '<option>请选择城市</option>';
    var citySelect = document.getElementById('city-select');
    for (let i in aqiSourceData) {
        str += `<option>${i}</option>`;
    }
    citySelect.innerHTML = str;
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    citySelect.onchange = citySelectChange;
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData(callback) {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    var tempMonth = {};
    var tempWeek={};
    switch (pageState.nowGraTime) {
        case 'day':
            chartData = aqiSourceData[pageState.nowSelectCity];
            break;
        case 'week':
            chartData = aqiSourceData[pageState.nowSelectCity];
            for (let i in chartData) {
                if (tempWeek[yearWeek(i)] != undefined) {
                    tempWeek[yearWeek(i)].push(chartData[i]);
                } else {
                    tempWeek[yearWeek(i)] = [];
                    tempWeek[yearWeek(i)].push(chartData[i]);
                }
            }
            chartData = {};
            for (let i in tempWeek) {
                var tempSum = 0;
                for (let j = 0; j < tempWeek[i].length; j++) {
                    tempSum += tempWeek[i][j];
                }
                chartData[parseInt(i) + '周平均'] = parseInt(tempSum / tempWeek[i].length)
            }
            break;
        case 'month':
            chartData = aqiSourceData[pageState.nowSelectCity];
            for (let i in chartData) {
                if (tempMonth[new Date(i).getMonth()] != undefined) {
                    tempMonth[new Date(i).getMonth()].push(chartData[i]);
                } else {
                    tempMonth[new Date(i).getMonth()] = [];
                    tempMonth[new Date(i).getMonth()].push(chartData[i]);
                }
            }
            chartData = {};
            for (let i in tempMonth) {
                var tempSum = 0;
                for (let j = 0; j < tempMonth[i].length; j++) {
                    tempSum += tempMonth[i][j];
                }
                chartData[parseInt(i) + 1 + '月平均'] = parseInt(tempSum / tempMonth[i].length)
            }
            break;
        default:
            break;
    }
    if (typeof callback === 'function') {
        callback();
    }
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm()
    initCitySelector();
    initAqiChartData();
}

init();
