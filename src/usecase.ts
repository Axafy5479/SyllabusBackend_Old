import * as repo from "./repository";
import {Subject,Semester} from "./settings";

// ユーザー情報
type UserData = {
    id:string,
    subject:Subject | null,
    grade:number | null,
    lectures:Lecture[],
    updated_at:Date
}

// ユーザー情報
export type UserDataEntity = {
    id:string,
    subject:Subject | null,
    grade:number | null,
    lectures:Lecture[]
}

// ユーザー情報
export type UpdateUserData = {
    subject?:Subject|null,
    grade?:number|null,
}

// 講義情報
export type Lecture = {
    id:string,
    year:number,
    semester:Semester,
}

export type LectureFilter = {
    year:number | null,
    semesters:Semester[] | null
}

export function IsNewUser():boolean{
    return repo.TryGetUserData() == null;
}

// UserDataを取得する
export function GetUserData():UserData{
    // ユーザー情報を取得する
    let user = repo.TryGetUserData() as UserData;
    if(user!=null){
        // nullでない場合はそのまま返す
        return user;
    }else{
        // nullの場合、初期化されたユーザー情報を返す

        // 現在のユーザーのメールアドレスを取得
        const id = Session.getActiveUser().getEmail();
        return {id:id,lectures:[],subject:null,grade:null,updated_at:new Date()};
    }
}

// UserDataから現在の学年を学年を算出し、UserDataEntityを返す
function ToEntity(userData:UserData):UserDataEntity{
    if(userData.grade!=null){
        const today = new Date();
        const updated = userData.updated_at;

        today.setMonth(today.getMonth() - 3);
        updated.setMonth(updated.getMonth() - 3);


        const grade = userData.grade + today.getFullYear() - updated.getFullYear();

        return {id:userData.id, subject:userData.subject, lectures:userData.lectures, grade:grade};
    }
    else{
        return {id:userData.id, subject:userData.subject, lectures:userData.lectures, grade:null};
    }
}


export function ChangeUserData(dataDiff:UpdateUserData){
    let user = GetUserData();

    if(dataDiff.grade !=null){
        user.grade = dataDiff.grade;
    }

    if(dataDiff.subject!=null){
        user.subject = dataDiff.subject;
    }

    repo.SaveUserData(user);
}

export function UpdateRegisteringLectures(lectures:Lecture[]){
    const userData = GetUserData() as UserData;
    userData.lectures = lectures;
    repo.SaveUserData(userData);
}

export function GetLectures(filter:LectureFilter){

}

export function DeleteUserData(){
    repo.DeleteUserData();
}