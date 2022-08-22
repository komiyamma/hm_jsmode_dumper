/**
 * @file 秀丸のjsmode用のTypeScript定義ファイル
 * @author Akitsugu Komiyama
 * @license MIT
 * @version v1.0.0
 */

/**
 *
 * stringify関数は、JavaScriptの各種オブジェクトや関数等を文字列化したものを取得する関数です。    
 * PHPのvar_dumpなどに近いでしょう。     
 * JSON.stringify とは異なるため注意してください。     
 *
 * @param obj
 * 文字列化したいオブジェクトや変数などを指定する
 * 
 * @see jsmode の require 関数
 * @link https://xn--pckzexbx21r8q9b.net/?page=nobu_tool_hm_jsmode_stringify
 *
 * @returns
 * 指定のモジュールのオブジェクト。    
 * 読み込みに失敗した場合は例外が発生する。    
 */
declare function stringify(obj: any): string;
