/*
    ファイル操作関連の関数を定義
    Drive関連の型がおかしいため、javascriptで記述している
*/



/******************* 保存場所 *******************/

// ユーザーデータを保存するファイルの名前
export const saveFileName = "user.json";

// このアプリ専用のデータ保存領域
// https://developers.google.com/drive/api/guides/appdata?hl=ja
// scopeをdrive.appdataに絞るため、このディレクトリ外のファイルには触れない
export const parentDir = "appDataFolder";

/***********************************************/





/******************* ファイルの取得 *******************/


// アプリケーション領域のファイルを全て取得する
export function GetAllAppFiles(){
    var files = Drive.Files.list({spaces: [parentDir]}).files;
    return files;
}

// アプリケーション領域のファイルの中から、特定のファイル名のファイルを取得
// 無ければnullを返す
export function TryGetAppFilesByName(fileName){
    // 全てのファイルを取得
    var files = GetAllAppFiles();

    // ファイルが1つもない場合nullを返す
    if(files == null) return null;

    // 目的の名前のファイルを探す
    return files.find(f=>f.name == saveFileName);
}

// ユーザーファイル (saveFileName) を取得
// なければnullを返す
export function TryGetUserDataStr(){
    // 名前が userData.userDataFilename のものを取得
    const file = TryGetAppFilesByName(saveFileName);

    // ファイルが1つもない場合nullを返す
    if(file == null) return null;

    // ファイルの中身を読む
    return Drive.Files.get(file.id,{alt:"media"});
}

// ユーザーファイル (saveFileName) のIdを取得
// なければnullを返す
export function TryGetUserDataFileId(){
    // 名前が userData.userDataFilename のものを取得
    const file = TryGetAppFilesByName(saveFileName);

    // 存在すればidを返し、無ければnullを返す
    return file != null ? file.id : null;
}
/*********************************************************/


/******************* ファイルの保存 *******************/

// ファイルをuserDataObjectで上書き保存
export function SaveJson(jsonStr){
    // バイナリデータの用意
    var blob = Utilities.newBlob('', "text/plain", saveFileName);

    // ファイルに書き込むためjsonStrをバイナリ化
    blob.setDataFromString(jsonStr, 'utf-8');

    // ファイルのメタデータ
    metaData = {
        name: saveFileName,
        mimeType: "text/plain"
    };

    // もしすでにuserDataが存在している場合、そのIdを取得
    const fileId = TryGetUserDataFileId();

    // idがあれば、そのファイルを上書き
    if(fileId!=null)updateUserFile(fileId,blob,metaData);

    // 無ければ新規作成
    else createUserData(blob,metaData);
}

// ファイルの新規作成
function createUserData(blob,metaData){
    metaData.parents = [parentDir];
    Drive.Files.create(metaData, blob);
}

// ファイルの上書き保存
function updateUserFile(id,blob,metaData){
  Drive.Files.update(metaData,id, blob);
}
/****************************************************/



/******************* ファイルの削除 *******************/

// アプリケーション領域のファイルを全て削除
export function DeleteUserData(){

    // アプリケーション領域のファイルのidを全て取得
    const fileIds = Array.from(GetAllAppFiles(), f=>f.id);

    // idを指定して削除
    fileIds.forEach(id => Drive.Files.remove(id));
}
/****************************************************/