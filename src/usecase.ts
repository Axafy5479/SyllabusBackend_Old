import * as repo from "./repository";


export function IsNewUser():boolean{
    return repo.TryGetUserDataStr() == null;
}

// UserDataを取得する
export function GetUserData():string|null{
    // ユーザー情報を取得する
    const jsonStr = repo.TryGetUserDataStr() as string;
    return jsonStr ?? null;
}


export function DeleteUserData(){
    repo.DeleteUserData();
}

export function UploadFile(jsonStr:string){
    repo.SaveJson(jsonStr);
}