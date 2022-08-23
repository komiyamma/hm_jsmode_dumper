/**
 * @file 秀丸のjsmode用のTypeScript定義ファイル
 * @author Akitsugu Komiyama
 * @license MIT
 * @version v1.0.2
 */

import { dir } from "../build/stringify";

/**
 *
 * stringify関数は、JavaScriptの各種オブジェクトや関数等を文字列化したものを取得する関数です。    
 * PHPのvar_dumpやJavaScriptのconsole.dirに近いものです。     
 * 
 * JSON.stringify とは異なるため注意してください。     
 *
 * @param obj
 * 文字列化したいオブジェクトや変数などを指定する
 * 
 * @param space
 * インデントのスペース数。     
 * 文字列で指定した場合は、深度分が該当の文字列でインデントされる。
 * 
 * @see jsmode の stringify 関数
 * @link https://xn--pckzexbx21r8q9b.net/?page=nobu_tool_hm_jsmode_stringify
 * 
 * @see JSON.stringify
 * @link https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
 *
 * @returns
 * 指定のオブジェクトや値を文字列化したもの
 */
declare function stringify(obj: any, space: number|string): string;


/**
 *
 * stringify 関数で文字列化したものを、console.log へと出力します。
 * 
 * @param obj
 * 文字列化したいオブジェクトや変数などを指定する
 * 
 * @param space
 * インデントのスペース数。     
 * 文字列で指定した場合は、深度分が該当の文字列でインデントされる。
 * 
 * @see jsmode の stringify 関数
 * @link https://xn--pckzexbx21r8q9b.net/?page=nobu_tool_hm_jsmode_stringify
 * 
 * @see JSON.stringify
 * @link https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
 *
 * @returns
 * なし
 */
 declare namespace stringify {
    function dir(obj: any, space: number|string): void;
}
