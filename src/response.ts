export type Response ={
    contents:any,
    error:Error
}

export type Error = {
    title:string,
    message:string
}

export function Success(contents:any):Response{
    return {contents:contents,error:noError};
}

export function Error404(e:GoogleAppsScript.Events.AppsScriptHttpRequestEvent):Response{
    const path = e.pathInfo;
    return {contents:null, error:{
        title:"page not found",
        message:`uri:${path} is not found.`
    }}
}

const noError = {title:"",message:"no error"}
