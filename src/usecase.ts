// fileManager.jsとindex.tsを仲介する
// (fileManagerはjavascriptで書かれていて危ない)

import * as repo from "./fileManager";

/**
 * UserDataを取得する
 * @returns ファイルの中身(ファイルが存在しない場合はnullを返す)
 */
export function GetUserData():string|null{
    // ユーザー情報を取得する
    const jsonStr = repo.TryGetUserDataStr() as string;
    return jsonStr ?? null;
}

/**
 * ユーザー情報を削除する
 */
export function DeleteUserData(){
    repo.DeleteUserData();
}

/**
 * ユーザー情報を更新する
 * @param jsonStr ファイルに上書きする内容
 */
export function UploadFile(jsonStr:string){
    repo.SaveJson(jsonStr);
}