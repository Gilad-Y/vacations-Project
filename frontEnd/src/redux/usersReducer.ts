import { userModel } from "../Models/userModel";

export class UserState {
  public user: userModel[] = [];
}

export enum UserActionType {
  addUser = "addUser",
  logInUser = "logInUser",
  logOutUser = "logOutUser",
}

export interface UserAction {
  type: UserActionType;
  payload?: any;
}

export function addUser(newUser: userModel): UserAction {
  return {
    type: UserActionType.addUser,
    payload: newUser,
  };
}

export function logInUser(loggedUser: userModel): UserAction {
  return {
    type: UserActionType.logInUser,
    payload: loggedUser,
  };
}

export function logOutUser(): UserAction {
  return {
    type: UserActionType.logOutUser,
  };
}

export const UserReducer = (
  currentState: UserState = new UserState(),
  action: UserAction
): UserState => {
  const newState: UserState = { ...currentState };
  switch (action.type) {
    case UserActionType.addUser:
      newState.user.push(action.payload);
      break;
    case UserActionType.logInUser:
      newState.user = action.payload;
      break;
    case UserActionType.logOutUser:
      newState.user = [];
      break;
  }
  return newState;
};
