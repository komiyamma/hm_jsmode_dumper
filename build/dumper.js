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
    function replacer(key, value) {
        if (typeof value === "function") {
            return value.toString();
        }
        return value;
    }
    function _stringify(obj, space) {
        if (space === void 0) { space = 2; }
        var text = "";
        if (typeof (obj) == "undefined") { // typeofで判定する
            return undefined;
        }
        var text = JSON.stringify(obj, replacer, space);
        if (text) {
            text = text.replace(/\r\n/g, "\n").replace(/\n/g, "\r\n");
        }
        return "[type: " + typeof (obj) + "]\r\n" + text + "\r\n";
    }
    function _dir(obj, space) {
        return console.log(_stringify(obj, space));
    }
    if (typeof (module) != 'undefined' && module.exports) {
        module.exports.stringify = _stringify;
        module.exports.dir = _dir;
    }
    else {
        if (typeof (Dumper) != 'undefined') {
            if (Dumper.guid == null || Dumper.guid != guid) {
                output("本モジュールとは異なるDumperが、すでに定義されています。\r\n上書きします。\r\n");
            }
            // 一致していたら上書きはしない
            if (Dumper.guid == guid) {
                return;
            }
        }
        Dumper = {
            stringify: _stringify,
            dir: _dir,
            guid: guid
        };
    }
})();