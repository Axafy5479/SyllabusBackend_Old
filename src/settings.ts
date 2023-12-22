// 登録している授業データを保存するファイル名
export const UserDataFilename = "user.json";

// このアプリ専用のデータ保存領域
// https://developers.google.com/drive/api/guides/appdata?hl=ja
// scopeをdrive.appdataに絞るため、このディレクトリ外のファイルには触れない
export const ParentDir = "appDataFolder";

// 科類
export type Subject = "Sc1" | "Li1" | "Sc2" | "Li2" | "Sc3" | "Li3";

// 学期
export type Semester = "S" | "A" | "S1" | "S2" | "A1" | "A2";

