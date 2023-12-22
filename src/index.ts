import * as usecase from "./usecase";


export function myFunction() {
  deleteUserData();
  getUserData();
  getUserData();
  saveUserData('{"hello":"world"}');
  getUserData();
  saveUserData('{"kosuzu":"akyuu"}');
  getUserData();
  deleteUserData();
}

// users/ POST
function saveUserData(jsonStr:string){
  Logger.log("ユーザーデータを保存します");
  usecase.UploadFile(jsonStr);
}

// users/ GET
function getUserData(){
  const user = usecase.GetUserData();
  Logger.log("ユーザー情報:"+user);
}

// users/ DELETE
function deleteUserData(){
  Logger.log("ユーザーデータを削除します");
  usecase.DeleteUserData();
}



export function doGet() {
    return getUserData();
}

export function doPost(e:any) {
  const jsonStr = e.postData.getDataAsString();
  return usecase.UploadFile(jsonStr);
}

export function doDelete(){
  usecase.DeleteUserData();
}
