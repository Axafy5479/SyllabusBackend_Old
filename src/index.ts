import { Error404, Success,Response } from "./response";
import * as usecase from "./usecase";

export function doGet(e:GoogleAppsScript.Events.DoGet):GoogleAppsScript.Content.TextOutput {
    const path = route(e);
    let response:Response = Error404(e);

    switch (path) {
      case "users":
        response = Success(usecase.GetUserData());
        break;
      default:
        break;
    }
    
    return ContentService.createTextOutput(JSON.stringify(response));
}

export function doPost(e:GoogleAppsScript.Events.DoPost):GoogleAppsScript.Content.TextOutput {

  const path = route(e);
  let response:Response = Error404(e);

  switch (path) {
    case "users":
      const jsonStr = e.postData.contents;
      Logger.log(jsonStr);
      usecase.UploadFile(jsonStr)
      response = Success("");
      break;
    case "delete-account":
      usecase.DeleteUserData();
      response = Success("");
      break;
    default:
      break;
  }
  
  return ContentService.createTextOutput(JSON.stringify(response));
}

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
