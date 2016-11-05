(function (window) {
    "use strict";
    function Table(config) {
        this.config = config;
        this.side = this.config.width / this.config.amount;
        this.robotDeg = 0;
    }

    Table.prototype = {
        constructor: Table,
        init: function () {
            var container = document.querySelector(this.config.container);
            container.style.width = container.style.height = this.config.width + 'px';
            for (let i = 0; i < this.config.amount; ++i) {
                var rowSpan = this._createEle('span', 'row', i + 1, 0);
                rowSpan.style.top = this.side * i + 'px';
                rowSpan.innerText = i + 1;
                rowSpan.style.left = `-${this.side}px`;
                document.querySelector(this.config.container).appendChild(rowSpan);
                for (let j = 0; j < this.config.amount; ++j) {
                    if (i == 0) {
                        var colSpan = this._createEle('span', 'col', 0, j + 1);
                        colSpan.innerText = j + 1;
                        colSpan.style.top = `-${this.side}px`;
                        document.querySelector(this.config.container).appendChild(colSpan);
                    }
                    document.querySelector(this.config.container).appendChild(this._createEle('span', 'cell', i + 1, j + 1));
                }
            }
            this._createRobot(this.config.robotX_axis, this.config.robotY_axis);
        },
        _isEmptyObj: function (o) {
            var t;
            for (t in o)
                return !1;
            return !0
        },
        _extend: function (Obj, newObj) {
            if (!this._isEmptyObj(newObj)) {
                for (let i in Obj) {
                    if (newObj[i] != undefined) {
                        Obj[i] = newObj[i];
                    }
                }
            }
            return Obj;
        },
        _createEle: function (tag, className, x_axis, y_axis) {
            var tempSpan = document.createElement(tag);
            tempSpan.style.width = tempSpan.style.height = this.side + 'px';
            tempSpan.style.lineHeight = this.side + 'px';
            tempSpan.className = className;
            tempSpan.setAttribute('data-x', x_axis);
            tempSpan.setAttribute('data-y', y_axis);
            return tempSpan;
        },
        _createRobot: function (x_axis, y_axis) {
            let robot = this._createEle('div', 'robot', x_axis, y_axis);
            robot.style.top = this.side * (y_axis - 1) + 'px';
            robot.style.left = this.side * (x_axis - 1) + 'px';
            robot.style.transform = `rotate(${this.robotDeg}deg)`;
            robot.style.zIndex = 2;
            document.querySelector(this.config.container).appendChild(robot);
        },
        robotGo: function (option) {
            let defaultOpt = {
                direction: 0,
                num: 1
            };
            let robot = document.querySelector('.robot');
            let deg = /[+-]?[\d]+/.exec(robot.style.transform);
            var robotX = parseInt(robot.getAttribute('data-x'));
            var robotY = parseInt(robot.getAttribute('data-y'));
            var opt = this._extend(defaultOpt, option);
            opt.num == '' ? opt.num = 1 : opt.num = parseInt(opt.num);
            switch (opt.direction || (deg[0] % 360) / 90) {
                case 0:
                    if (robotX > opt.num) {
                        robot.style.top = this.side * (robotX - opt.num - 1) + 'px';
                        robot.setAttribute('data-x', `${robotX - opt.num}`);
                    } else {
                        alert("别挪了！到边了~")
                    }
                    break;
                case 1:
                case -3:
                    if (robotY < (this.config.amount - opt.num)) {
                        robot.style.left = this.side * (robotY + opt.num - 1) + 'px';
                        robot.setAttribute('data-y', `${robotY + opt.num}`);
                    } else {
                        alert("别挪了！到边了~")
                    }
                    break;
                case 2:
                case -2:
                    if (robotX < this.config.amount - opt.num) {
                        robot.style.top = this.side * (robotX + opt.num - 1) + 'px';
                        robot.setAttribute('data-x', `${robotX + opt.num}`);
                    } else {
                        alert("别挪了！到边了~")
                    }
                    break;
                case 3:
                case -1:
                    if (robotY > opt.num) {
                        robot.style.left = this.side * (robotY - opt.num - 1) + 'px';
                        robot.setAttribute('data-y', `${robotY - opt.num}`);
                    } else {
                        alert("别挪了！到边了~")
                    }
                    break;
                default:
                    console.error('命令输入错误！');

            }
        },
        robotTurn: function (command) {
            let robot = document.querySelector('.robot');
            let deg = /[+-]?[\d]+/.exec(robot.style.transform);
            switch (command) {
                case 'TUN LEF':
                    deg -= 90;
                    break;
                case 'TUN RIG':
                    deg = parseInt(deg) + 90;
                    break;
                case 'TUN BAC':
                    deg = parseInt(deg) + 180;
                    break;
                case 'MOV LEF':
                    deg = -90;
                    break;
                case 'MOV TOP':
                    deg = 0;
                    break;
                case 'MOV RIG':
                    deg = 90;
                    break;
                case 'MOV BOT':
                    deg = 180;
                    break;
                default:
                    console.error('命令输入错误！');
            }
            robot.style.transform = `rotate(${deg}deg)`;
        }
    };
    window.createGrid = function (config) {
        return new Table(config);
    }
})(window)
