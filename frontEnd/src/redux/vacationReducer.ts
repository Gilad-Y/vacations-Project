import { vacationModel } from "../Models/vacationModel";

export class vacationState {
  public vacation: vacationModel[] = [];
}

export enum vacationActionType {
  addVacation = "addVacation",
  downloadVacations = "downloadVacations",
  deleteVacation = "deleteVacation",
}

export interface vacationAction {
  type: vacationActionType;
  payload?: any;
}

export function addVacation(newVacation: vacationModel): vacationAction {
  return {
    type: vacationActionType.addVacation,
    payload: newVacation,
  };
}
export function downloadVacation(
  vacationList: vacationModel[]
): vacationAction {
  return {
    type: vacationActionType.downloadVacations,
    payload: vacationList,
  };
}
export function deleteVacation(id: number): vacationAction {
  return {
    type: vacationActionType.deleteVacation,
    payload: id,
  };
}

export const vacationReducer = (
  currentState: vacationState = new vacationState(),
  action: vacationAction
): vacationState => {
  const newState: vacationState = { ...currentState };
  switch (action.type) {
    case vacationActionType.addVacation:
      newState.vacation.push(action.payload);
      break;
    case vacationActionType.downloadVacations:
      newState.vacation = action.payload;
      break;
    case vacationActionType.deleteVacation:
      newState.vacation = [...newState.vacation].filter(
        (item) => item.vacationCode != action.payload
      );
      break;
  }
  return newState;
};
