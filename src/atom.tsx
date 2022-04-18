import { atom, selector } from "recoil";

// ✅ selector
// input(예)에서 state를 가져와서 그 state를 수정하고 output으로 내보낼 때 사용
// atom을 2개 만드는 것보다 selector을 만들어 해결할 수 있다.
// selector은 get 함수를 가진다.
// 그리고 그 get 함수는 첫번째 인자로 option이라는 object를 가져온다.
// 여기서는 get이 사용됨.
// selector의 값을 가져오기 위해 다른 컴포넌트에서 useRecoilValue를 써도 되고 useRecoilState를 써도 된다.
// 여러개의 atom를 하나의 selector로 결합할 수 있다.

export const minuteState = atom({
  key: "minutes",
  default: 0,
});

// hour input은 hourSelector와 연결된다.
// 위의 minuteState에 따라 값이 변화되므로 위의 상태에 따라 값을 리턴받는 함수를 작성한다.
export const hourSelector = selector<number>({
  key: "hours",
  get: ({ get }) => {
    const minutes = get(minuteState);
    // selector 안에서 atom에 접근하고 싶다면 get함수를 사용하면 된다.
    return minutes / 60;
  },
  set: ({ set }, newValue) => {
    // ✅ set함수는 원하는 값으로 state를 변경해주는 함수이다.
    const minutes = Number(newValue) * 60;
    set(minuteState, minutes);
  },
});
