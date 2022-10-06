import { atom } from "recoil";

interface IToDoState {
  [key: string]: string[];
}

export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: {
    "To do": ["a", "b"],
    Doing: ["c", "d"],
    Done: ["e", "f"],
  },
});
