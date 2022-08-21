/// <reference path="../types/hm_jsmode.d.ts" />
function __stringify_helper__(obj, level) {
    var dumped_text = "";
    if (!level)
        level = 0;
    var level_padding = "";
    for (var j = 0; j < level + 1; j++)
        level_padding += "  ";
    if (level >= 1)
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
            dumped_text = "{\n" + dumped_text + "\n}";
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
if (typeof (module) != 'undefined' && module.exports) {
    module.exports.stringify = __stringify__;
}
else {
    stringify = __stringify__;
}
