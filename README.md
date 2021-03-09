# 자바스크립트로 만드는 ToDoList
<br/>

## 화면
[ToDoList](https://hyewonji.github.io/JavaScript_ToDoList/)

![https://user-images.githubusercontent.com/60416187/110417963-e731ef00-80d9-11eb-894c-6a13024425e3.gif](https://user-images.githubusercontent.com/60416187/110417963-e731ef00-80d9-11eb-894c-6a13024425e3.gif)


<br/>

## 주요 기능

1. favicon.js에서 `favicon`을 설정해준다.
    - html link tag를 생성하고 `ref`와 `href`를 설정해준다.

2. **OpenWeatherMap**에서 Api를 가져와 현재 날씨를 아이콘으로 표시해준다.
    - `Navigator.geolocation.getCurrentPosition()` 함수로 현재 `위도`와 `적도`를 불러온다.
    - `fetch()`함수를 이용해 현재 위치한 `위도`, `적도` 에 해당하는 날씨 API를 불러와 `JSON`으로 파싱한다.
    - 날씨 description에 따라 이미지 `src`를 지정해을 보여준다.

3. 날씨 이미지에 마우스를 가져가면 현재 위치의 상세날씨를 볼 수 있다.
    - 날씨 이미지가 포함된 HTML Tag에 'tooltip-text'라는 `Attribute`를 주었다.
    - `날씨 정보`를 HTML Tag에 'tooltip-text'의 `값`으로 넣어주어 tooltip이 나타나게 한다.

4. ToDoList
    - 화면이 리로드될때 `LocalStorage` 의 저장된 ToDoList를 가져온다.
    - `input` 창에 값을 입력하고 `submit` 하면 새로운 항목이 추가된다.
    - ToDoList 왼쪽 아이콘을 클릭하면 `완료`, 오른쪽 아이콘을 클릭하면 `삭제` 이벤트가 실행된다.
    - `submit`, `완료`, `삭제` 시 하단에 **'완료 개수 / 총 개수'** 와 **LocalStorage**가 `업데이트` 된다.
    - Check All - 항목 모두 완료, UnCheck All - 항목 모두 미완료, Delete All - 모든 항목 삭제

5. 모바일에서 기기의 방향에 따라 배경색이 변한다.
    - `Media Query`의 `orientation` 속성을 이용했다.
