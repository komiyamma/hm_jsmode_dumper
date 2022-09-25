/*
 * Copyright (C) 2022 Akitsugu Komiyama
 * under the MIT License
 *
 * dumper v1.0.5
 */
/// <reference path="../../hm_jsmode_ts_difinition/types/hm_jsmode_strict.d.ts" />

declare var module: any
declare var Dumper: { stringify: any, dir: any, guid: string };

(function () {
    const guid = "{2A86CB06-3ABC-4EFE-A75A-3B028D1B4D72}";
    let op_dllobj: hidemaru.ILoadDllResult = hidemaru.loadDll("HmOutputPane.dll");
    let hidemaruhandlezero = hidemaru.getCurrentWindowHandle();
    function output(msg: string): number {
        let msg_replaced = msg.replace(/\r\n/g, "\n").replace(/\n/g, "\r\n");
        return op_dllobj.dllFunc.Output(hidemaruhandlezero, msg_replaced);
    }

    // 関数の時に、文字列に治す
    function replacer(key: string, value: any) {
        if (typeof value === "function") {
            return "[fn]:" + value.toString();
        }
        return value;
    }

    function _stringify(obj: any, space: number | string = 2): string | undefined {
        let text: string = "";
        if (typeof (obj) == "undefined") { // typeofで判定する
            return undefined;
        }
        text = JSON.stringify(obj, replacer, space);

        if (text) {
            text = text.replace(/\r\n/g, "\n").replace(/\n/g, "\r\n");
        }

        return "[type: " + typeof (obj) + "]\r\n" + text + "\r\n";
    }

    function _dir(obj: any, space: number | string) {
        return console.log(_stringify(obj, space));
    }

    if (typeof (module) != 'undefined' && module.exports) {
        module.exports.stringify = _stringify;
        module.exports.dir = _dir;
    } else {
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
