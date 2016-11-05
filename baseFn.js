(function (win) {
    var fn = {
        /**
         * 判断对象是否为空的方法
         * @method isEmptyObj
         * @param {Object} o 需要判断的对象
         * @return { Boolean } 为空返回 [!0] true ，否则返回 [!1] false
         * */
        isEmptyObj: function (O) {
            var t;
            for (t in O)
                return !1;
            return !0
        },
        /**
         * 对象拷贝的方法
         * @method extend
         * @param {Object} Obj 原对象
         * @param {Object} newObj 需要拷贝的对象
         * @return { Object } Obj 拷贝后的对象
         * */
        extend: function (Obj, newObj) {
            if (!this._isEmptyObj(newObj)) {
                for (let i in Obj) {
                    if (newObj[i] != undefined) {
                        Obj[i] = newObj[i];
                    }
                }
            }
            return Obj;
        }
    };
    win.$ = fn;
})(window)