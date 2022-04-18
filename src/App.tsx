import React from "react";
import { useRecoilState } from "recoil";
import { minuteState, hourSelector } from "./atom";

function App() {
  const [minutes, setMinutes] = useRecoilState(minuteState);
  const [hours, setHours] = useRecoilState(hourSelector);
  // useRecoilState를 selector로 쓰고 있다면 결과값으로 array[배열]를 받게 된다.
  // 이 배열의 첫번째 요소는 get 함수에서 리턴한 값이며, 두번째 요소는 set 함수를 실행시킨다.

  const onMinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value); // + 은 문자열을 숫자형으로 바꿔준다.
  };
  const onHoursChange = (event: React.FormEvent<HTMLInputElement>) => {
    setHours(+event.currentTarget.value);
  };

  return (
    <div>
      <input
        value={minutes}
        onChange={onMinutesChange}
        type="number"
        placeholder="Minutes"
      />
      <input
        value={hours}
        onChange={onHoursChange}
        type="number"
        placeholder="Hours"
      />
    </div>
  );
}

export default App;
