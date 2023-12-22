import {ChangeUserData,GetUserData,UpdateRegisteringLectures} from "./usecase";


export function myFunction() {
  // DeleteUserData();
  ChangeUserData({grade:3});
  var user = GetUserData();
  Logger.log(user);
  UpdateRegisteringLectures([{id:"kosuzu",semester:"A",year:2023},{id:"akyuu",semester:"A1",year:2023}]);
  user = GetUserData();
  Logger.log(user);
  ChangeUserData({subject:"Li1"});
  user = GetUserData();
  Logger.log(user);
}


// function doGet(e) {
//     uploadFile();
// }
