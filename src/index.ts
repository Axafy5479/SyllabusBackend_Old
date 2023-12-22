import * as usecase from "./usecase";


export function myFunction() {
  deleteUserData();
  getUserData();
  isNewUser();
  getUserData();
  changeUserData({grade:3});
  getUserData();
  updateLectures([{id:"kosuzu",semester:"A",year:2023},{id:"akyuu",semester:"A1",year:2023}]);
  getUserData();
  changeUserData({subject:"Li1"});
  getUserData();
  isNewUser();
}


function getUserData(){
  const user = usecase.GetUserData();
  Logger.log(user);
}

function updateLectures(lectures:usecase.Lecture[]){
  usecase.UpdateRegisteringLectures(lectures);
}

function isNewUser(){
  const isNewUser = usecase.IsNewUser();
  Logger.log(isNewUser);
}

function getRegisteringLectures(filter:usecase.LectureFilter){
  const lectures = usecase.GetLectures(filter);
  Logger.log(lectures);
}

function deleteUserData(){
  usecase.DeleteUserData();
}

function changeUserData(changing:usecase.UpdateUserData){
  usecase.ChangeUserData(changing);
}


// function doGet(e) {
//     uploadFile();
// }
