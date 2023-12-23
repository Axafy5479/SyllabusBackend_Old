// HTTPリクエストへの応答


/**
 * どのpath、どのメソッドに対しても
 * この型をシリアル化した文字列を返す
 */
export type Response ={
    // 内容
    contents:any,

    // エラーの情報
    error:Error
}

/**
 * エラーの情報
 */
export type Error = {
    // エラーのライトル (エラーがなければ空)
    title:string,

    // エラーメッセージ (エラーがなければ "no error")
    message:string
}

/**
 * 処理に成功した時、返却したい内容から Response型のオブジェクトを作成する
 * @param contents クライアントに返す情報のメイン
 * @returns クライアントに返すResponse型のオブジェクト
 */
export function Success(contents:any):Response{
    return {
        // 引数の変数をcontentsに設定
        contents:contents,
        // エラーなし
        error:noError
    };
}

/**
 * NotFoundエラー
 * @param e doGetの引数に渡されるイベント
 * @returns 404エラーのResponse型
 */
export function Error404(e:GoogleAppsScript.Events.AppsScriptHttpRequestEvent):Response{
    const path = e.pathInfo;
    return {contents:null, error:{
        title:"page not found",
        message:`uri:${path} is not found.`
    }}
}

const noError = {title:"",message:"no error"}
