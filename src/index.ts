import { Error404, Success,Response } from "./response";
import * as usecase from "./usecase";

/**
 * GETメソッド
 * @param e doGetのコールバックメソッドに渡ってくるreqの情報
 * @returns GASによりサポートされるres型
 */
export function doGet(e:GoogleAppsScript.Events.DoGet):GoogleAppsScript.Content.TextOutput {

    let response:Response;

    // uri
    const path = route(e);

    // uriでswitch
    switch (path) {

        // GET  /users
        case "users":
            response = Success(usecase.GetUserData());
            break;

        // 存在しないuriの場合は404
        default:
            response = Error404(e);
            break;
    }
    
    // GASでサポートされているresponse型に変換
    return ContentService.createTextOutput(JSON.stringify(response));
}

/**
 * POSTメソッド
 * @param e doPostのコールバックメソッドに渡ってくるreqの情報
 * @returns GASによりサポートされるres型
 */
export function doPost(e:GoogleAppsScript.Events.DoPost):GoogleAppsScript.Content.TextOutput {
    let response:Response;

    // uri
    const path = route(e);

    // uriでswitch
    switch (path) {

        // POST /users
        case "users":
            // ファイル内容をbodyの内容で上書き(or 新規作成)
            usecase.UploadFile(e.postData.contents)
            // responseの内容は無し(エラーがないことがわかれば十分)
            response = Success("");
            break;

        // POST /delete-account
        case "delete-account":
            // ユーザー情報を削除
            usecase.DeleteUserData();
            // responseの内容は無し(エラーがないことがわかれば十分)
            response = Success("");
            break;

        // 存在しないuriの場合は404
        default:
            response = Error404(e);
            break;
    }
    
    // GASでサポートされているresponse型に変換
    return ContentService.createTextOutput(JSON.stringify(response));
}

/**
 * urlからどのapiが叩かれたかを取得
 * @param e コールバックメソッドの引数に渡ってくるreqの情報
 * @returns 叩かれたapiの名前
 */
function route(e:GoogleAppsScript.Events.AppsScriptHttpRequestEvent):string{
    const pathes = new String(e.pathInfo).split('/');
    if(pathes.length>0)return pathes[0];
    else return "";
}

//   GASにpushしたのち、スクリプトのスクリプトの先頭に次のコードをコードを追記する
//   function doGet(e){
//     return _entry.doGet(e);
//   }
  
//   function doPost(e){
//       return _entry.doPost(e);
//   }
