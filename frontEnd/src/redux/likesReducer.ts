import { likeModel } from "../Models/likeModel";

export class likesState {
  public likes: likeModel[] = [];
}

export enum likeActionType {
  addLike = "addLike",
  downloadLikes = "downloadLikes",
  deleteLike = "deleteLike",
}

export interface likeAction {
  type: likeActionType;
  payload?: any;
}

export function addLike(newLike: likeModel): likeAction {
  return {
    type: likeActionType.addLike,
    payload: newLike,
  };
}
export function downloadLike(likeList: likeModel[]): likeAction {
  return {
    type: likeActionType.downloadLikes,
    payload: likeList,
  };
}
export function deleteLike(like: likeModel): likeAction {
  return {
    type: likeActionType.deleteLike,
    payload: like,
  };
}

export const likeReducer = (
  currentState: likesState = new likesState(),
  action: likeAction
): likesState => {
  const newState: likesState = { ...currentState };
  switch (action.type) {
    case likeActionType.addLike:
      newState.likes.push(action.payload);
      break;
    case likeActionType.downloadLikes:
      newState.likes = action.payload;
      break;
    case likeActionType.deleteLike:
      newState.likes = [...newState.likes].filter(
        (item) => item != action.payload
      );
      break;
  }
  return newState;
};
