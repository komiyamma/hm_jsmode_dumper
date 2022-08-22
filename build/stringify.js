/*
 * Copyright (C) 2022 Akitsugu Komiyama
 * under the MIT License
 *
 * stringify v1.0.1
 *
 * stringify関数は、JavaScriptの各種オブジェクトや関数等を文字列化したものを取得する関数です。
 * PHPのvar_dumpなどに近いでしょう。
 * JSON.stringify とは異なるため注意してください。
 */
(function () {
    var guid = "{2A86CB06-3ABC-4EFE-A75A-3B028D1B4D72}";
    var _outputpane_dllobj = null;
    function _output(msg) {
        if (!_outputpane_dllobj) {
            _outputpane_dllobj = hidemaru.loadDll(hidemaruGlobal.hidemarudir() + "\\HmOutputPane.dll");
        }
        if (_outputpane_dllobj) {
            var msg_replaced = msg.replace(/\r\n/g, "\n").replace(/\n/g, "\r\n");
            return _outputpane_dllobj.dllFunc.Output(hidemaruGlobal.hidemaruhandle(0), msg_replaced);
        }
        return false;
    }
    function __stringify_helper__(obj, level) {
        var dumped_text = "";
        if (!level)
            level = 0;
        var level_padding = "";
        for (var j = 0; j < level + 1; j++)
            level_padding += "  ";
        if (level >= 10)
            return level_padding + "..."; // スタックが深すぎる
        if (typeof (obj) == 'object') {
            for (var item in obj) {
                var value = obj[item];
                if (typeof (value) == 'object') {
                    dumped_text += level_padding + "\"" + item + "\" :\n";
                    var next_level_text = __stringify_helper__(value, level + 1);
                    if (next_level_text.length == 0) {
                        dumped_text += level_padding + "{},";
                    }
                    else {
                        dumped_text += level_padding + "{\n" + next_level_text + "\n" + level_padding + "},";
                    }
                }
                else if (typeof (value) == "string") {
                    dumped_text += level_padding + "\"" + item + "\" : \"" + value + "\",\n";
                }
                else if (typeof (value) == "function") {
                    value = value.toString().replace(/[\n|\r]/g, " ");
                    dumped_text += level_padding + "\"" + item + "\" : " + value + ",\n";
                }
                else {
                    dumped_text += level_padding + "\"" + item + "\" : " + value + ",\n";
                }
            }
        }
        else {
            dumped_text = "" + obj;
        }
        return dumped_text;
    }
    function __stringify__(obj) {
        var dumped_text = "";
        if (obj == null || obj == undefined) {
            if (typeof (obj) == "undefined") { // typeofで判定する
                dumped_text = "(undefined)";
            }
            else {
                dumped_text = "(null)";
            }
        }
        else if (typeof (obj) == "object") {
            dumped_text = __stringify_helper__(obj, 0);
            if (dumped_text.length == 0) {
                dumped_text = "{}";
            }
            else {
                dumped_text = "{\n" + dumped_text + "}";
            }
        }
        else if (typeof (obj) == "function") {
            dumped_text = obj.toString();
        }
        else {
            dumped_text = JSON.stringify(obj);
        }
        if (dumped_text) {
            dumped_text = dumped_text.replace(/\r\n/g, "\n").replace(/\n/g, "\r\n");
        }
        return "[type: " + typeof (obj) + "]\r\n" + dumped_text + "\r\n";
    }
    function __dir__(obj) {
        return console.log(__stringify__(obj));
    }
    if (typeof (module) != 'undefined' && module.exports) {
        module.exports.stringify = __stringify__;
        module.exports.dir = __dir__;
    }
    else {
        if (typeof (stringify) != 'undefined') {
            if (stringify.guid == null || stringify.guid != guid) {
                _output("本モジュールとは異なるstringifyが、すでに定義されています。\r\n上書きします。\r\n");
            }
        }
        stringify = __stringify__;
        stringify.dir = __dir__;
        stringify.guid = guid;
    }
})();
