/*
 * Copyright (C) 2022 Akitsugu Komiyama
 * under the MIT License
 *
 * stringify v1.0.3
 */
(function () {
    var guid = "{2A86CB06-3ABC-4EFE-A75A-3B028D1B4D72}";
    var op_dllobj = null;
    function output(msg) {
        if (!op_dllobj) {
            op_dllobj = hidemaru.loadDll(hidemaruGlobal.hidemarudir() + "\\HmOutputPane.dll");
        }
        if (op_dllobj) {
            var msg_replaced = msg.replace(/\r\n/g, "\n").replace(/\n/g, "\r\n");
            return op_dllobj.dllFunc.Output(hidemaruGlobal.hidemaruhandle(0), msg_replaced);
        }
        return false;
    }
    // 関数の時に、文字列に治す
    function replacer(key, val) {
        if (typeof val === "function") {
            return val.toString();
        }
        return val;
    }
    function _stringify(obj, space) {
        if (space === void 0) {
            space = 2;
        }
        var dumped_text = "";
        if (typeof (obj) == "undefined") { // typeofで判定する
            return undefined;
        }
        var dumped_text = JSON.stringify(obj, replacer, space);
        if (dumped_text) {
            dumped_text = dumped_text.replace(/\r\n/g, "\n").replace(/\n/g, "\r\n");
        }
        return "[type: " + typeof (obj) + "]\r\n" + dumped_text + "\r\n";
    }
    function _dir(obj, space) {
        return console.log(_stringify(obj, space));
    }
    if (typeof (module) != 'undefined' && module.exports) {
        module.exports.stringify = _stringify;
        module.exports.dir = _dir;
    }
    else {
        if (typeof (stringify) != 'undefined') {
            if (stringify.guid == null || stringify.guid != guid) {
                output("本モジュールとは異なるstringifyが、すでに定義されています。\r\n上書きします。\r\n");
            }
        }
        stringify = _stringify;
        stringify.dir = _dir;
        stringify.guid = guid;
    }
})();
