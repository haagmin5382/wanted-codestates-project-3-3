import DualSelector from "./components/DualSelector";
import { useState } from "react";
import emojiMenus from "./components/data";
import './scss/App.scss';
import { HiChevronDoubleLeft } from "react-icons/hi";
import { HiChevronDoubleRight } from "react-icons/hi";
import Settings from "./components/Settings";

const App = () => {
  // titleName
  const [availableName, setAvailableName] = useState("available options");
  const [selectedName, setSelectedName] = useState("selected options");
  // available에서 검색 및 기본으로 사용하는 렌더링 값
  const [availableOptionsArr, setAvailableOptionsArr] = useState(
    emojiMenus.filter((val) => !val.visible)
  );
  // available에서 검색으로 삭제된(filter) 기존의 값을 저장하는 값
  const [availableSaveOptionsArr, setAvailableSaveOptionsArr] = useState(
    emojiMenus.filter((val) => !val.visible)
  );
  // selected에서 검색 및 기본으로 사용하는 렌더링 값
  const [selectedOptionsArr, setSelectedOptionsArr] = useState(
    emojiMenus.filter((val) => val.visible)
  );
  // selected에서 검색으로 삭제된(filter) 기존의 값을 저장하는 값
  const [selectedSaveOptionsArr, setSelectedSaveOptionsArr] = useState(
    emojiMenus.filter((val) => val.visible)
  );

  // input에 따라 title 값 변경
  const onChangeAvailable = ({ target }) => setAvailableName(target.value);
  const onChangeSelected = ({ target }) => setSelectedName(target.value);

  // 전체 items 옮기는 핸들러
  const moveAllSelected = () => {
    const res = availableSaveOptionsArr.map((val) => {
      return { ...val, visible: true };
    });
    setSelectedOptionsArr([...selectedSaveOptionsArr, ...res]);
    setSelectedSaveOptionsArr([...selectedSaveOptionsArr, ...res]);
    setAvailableSaveOptionsArr([]);
    setAvailableOptionsArr([]);
  };
  const moveAllAvailable = () => {
    const res = selectedSaveOptionsArr.map((val) => {
      return { ...val, visible: true };
    });
    setAvailableOptionsArr([...availableSaveOptionsArr, ...res]);
    setAvailableSaveOptionsArr([...availableSaveOptionsArr, ...res]);
    setSelectedOptionsArr([]);
    setSelectedSaveOptionsArr([]);
  };
  return (
    <div id="App">
      <div className="center-box">
        <DualSelector
          titleName={availableName}
          optionsArr={availableOptionsArr}
          saveOptionsArr={availableSaveOptionsArr}
          changeOptionsArr={(res) => {
            setAvailableOptionsArr(res);
          }}        
        />
        {/* 버튼 태그에서 전체 옮기기 버튼 예시 */}
        {/* 버튼 컴포넌트가 들어갈 자리 */}
        <div>
          <button onClick={moveAllSelected}>
            <HiChevronDoubleRight color="#333" size="18" />
          </button>
          <button onClick={moveAllAvailable}>
            <HiChevronDoubleLeft color="#333"size="18" />
          </button>
          {/* 환경설정에서 사용하는 input 태그 이벤트 예시 */}
          {/* <input onChange={onChangeAvailable} value={availableName} />
          <input onChange={onChangeSelected} value={selectedName} /> */}
        </div>
        <DualSelector
          titleName={selectedName}
          optionsArr={selectedOptionsArr}
          saveOptionsArr={selectedSaveOptionsArr}
          changeOptionsArr={(res) => {
            setSelectedOptionsArr(res);
          }}
        />
      </div>
      <Settings />
    </div>
  );
};

export default App;
