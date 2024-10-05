# 🍴 레시피와 쇼핑이 더해진 What’s in your fridge
![image](https://github.com/zzgh06/cooking-recipe-be/assets/127922435/b549bfe3-30e2-4195-9399-683b292fbfee)
What’s in your fridge 는 사용자가 다양한 레시피를 확인하고, 필요한 식재료를 간편하게 구매할 수 있는 웹사이트입니다.
>
<br>

### 개발 기간

- 전체 개발 기간: 2024-06-16 ~ 2024-06-30
- 백앤드 구현: 2024-06-18 ~ 2024-06-27
- 프론트앤드 및 기능 구현: 2024-06-18 ~ 2024-06-30

### 배포 주소

> <div>프론트 서버 : https://whats-in-yours-fridge.netlify.app</div>
> 백엔드 서버 : http://whats-in-your-fridge.ap-northeast-2.elasticbeanstalk.com
> <br>

### 테스트 계정

- **Test ID**: admin
- **Test PW**: 123

## 프로젝트 소개

**What’s in your fridge**는 요리를 할 때 여러 사이트를 돌아다니며 레시피를 찾고 식재료를 따로 구매하는 번거로움을 없애기 위해 기획하게 되었습니다.
- 사용자가 요리 레시피를 쉽게 검색하고, 해당 레시피에 필요한 식재료를 바로 구매할 수 있도록 돕고, 
- My 냉장고 기능을 통해 사용자가 가지고 있는 식재료를 이용하여 만든 레시피를 추천해줍니다.
- 다양한 유저들을 마음에 드는 레시피나 상품에 평점을 주고 댓글을 작성할 수 있습니다.
<br>

## 팀원 구성

|이정우|정성욱|최충현|오혜림|
|:------:|:---:|:---:|:-----:|
|[@leejeongwoo1](https://github.com/leejeongwoo1/leejeongwoo1)|[@SungJung0616](https://github.com/SungJung0616)|[@zzgh06](https://github.com/zzgh06)|[@ohloara](https://github.com/ohloara)|
<br>

## 담당한 역할 및 주요 기능
1. 상품 목록 무한 스크롤을 통한 전체 상품 정보 제공 구현
- intersection Observer 및 React Query, useRef 와 같은 React Hook을 통해 위치를 감지하여 새로운 데이터 요청

2. My 냉장고 추천 레시피 제공 구현
- React Query을 활용한 추천 레시피 제공 기능 구현

3. 장보기 메모 기능 구현
- React Query 데이터 패칭과 React-Toolkit를 활용한 전역 상태 관리 구현

4. 소셜 로그인 및 레시피 공유 기능 구현
- Kakao API를 활용하여 소셜 로그인 및 레시피 공유     

5. 비밀 번호 관련 기능 구현
- React Query Hook을 통한 비밀번호 재인증 및 변경 기능 구현
- NodeEmailer API 활용하여 비밀번호 찾기 기능 구현

6. 관리자 페이지 UI 및 기능 구현
- chart.js 라이브러리를 기반으로 차트 구현
- 총 매출 및 신규 가입 고객, 주문상태를 시각화하여 제공


## 시작 가이드

1. 리포지토리 클론
    ```sh
    git clone git@github.com:zzgh06/cooking-recipe-be.git
    ```
2. 패키지 설치
    ```sh
    cd cooking-recipe-be
    npm install
    ```
3. 환경변수 설정
    ```
    MONGO_URI=your_mongo_uri
    JWT_SECRET=your_jwt_secret
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    ```
4. 로컬 서버 시작
    ```sh
    npm run local_start
    ```
<br>

## 📚 STACKS
### Environment
<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
### Config
<img src="https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white">

### Development
<img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white"/> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">  <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white"> <img src="https://img.shields.io/badge/mongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white"> <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=for-the-badge&logo=Tailwind CSS&logoColor=white"/> 

### deployment
<img src="https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white"> <img src="https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7">
<br>
<br>

## 채택한 개발 기술과 브랜치 전략

**TypeScript**

- 타입 검사를 통한 코드 안정성 및 신뢰성 향상시켜 오류 최소화
- 타입을 명확히 지정함으로써, 유지 보수와 코드 품질을 향상

**React**

- 컴포넌트화를 통해 추후 유지보수와 재사용성을 고려.
- 유저 배너, 상단과 하단 배너 등 중복되어 사용되는 부분이 많아 컴포넌트화를 통해 리소스 절약.

**Redux Toolkit 과 React Query**

- Redux Toolkit을 사용하여 전역 상태 관리를 더욱 간편하게 구현
- React Query를 통해 API를 통해 데이터를 가져오고, 그 데이터를 관리, 캐싱, 리패칭
- Redux Toolkit는 전역 상태나 로컬 상태를 관리하는데 최적화 되어 있지만 서버 상태를 관리하는데 복잡하기 때문에 서버 상태관리하는데 최적화된 React Query를 통해 서버 상태를 분리 및 관리하여 코드 간결성 및 유지보수 향상

## 브랜치 전략

- Git-flow 전략을 기반으로 master, develop 브랜치와 feature 보조 브랜치를 운용했습니다.
- master, develop, Feat 브랜치로 나누어 개발을 하였습니다.
- master 브랜치는 배포 단계에서만 사용하는 브랜치입니다.
- develop 브랜치는 개발 단계에서 git-flow의 master 역할을 하는 브랜치입니다.
- Feat 브랜치는 기능 단위로 독립적인 개발 환경을 위하여 사용하고 merge 후 각 브랜치를 삭제해주었습니다.

## 프로젝트 구조

### 백앤드

### 백앤드 폴더 구조

[cooking-recipe-be.md](./cooking-recipe-be.txt)

### 백앤드 ERD

![ERD](./public/image/erd.png)

### API 문서

- [Swagger API Documentation (Local)](http://localhost:5000/api-docs)
- [Swagger API Documentation (Production)](http://whats-in-your-fridge.ap-northeast-2.elasticbeanstalk.com/api-docs)

## 프론트앤드

### 프론트앤드 폴더구조

[cooking-recipe-fe.md](./cooking-recipe-fe.txt)

## 화면 구성

|레시피 페이지|레시피 상세 페이지|
|:------:|:------:|
|![image](https://github.com/zzgh06/cooking-recipe-be/assets/127922435/67fffb80-cd5b-4b85-97ea-4a66c17d8e58)|![image](https://github.com/zzgh06/cooking-recipe-be/assets/127922435/fc0316fc-6b81-485b-9804-4662433d00b0)|

|스토어 페이지|스토어 상세 페이지|
|:---:|:------:|
|![image](https://github.com/zzgh06/cooking-recipe-be/assets/127922435/b5937626-ae3d-43c7-9e29-7ef02f6b5c28)|![image](https://github.com/zzgh06/cooking-recipe-be/assets/127922435/6a69d98e-8a16-4105-b4a7-b8d2ef44f498)|

|My 냉장고 페이지|admin 페이지|
|:------:|:------:|
|![image](https://github.com/zzgh06/cooking-recipe-be/assets/127922435/39273759-b8a2-4ac5-94dd-c5e5e8fb526b)|![image](https://github.com/zzgh06/cooking-recipe-be/assets/127922435/4dde076d-63e9-4655-9a11-d961d5a36ad2)|
<br>

## ⭐ 주요 기능 
  ### 1. 레시피 관리
  - 다양한 레시피 검색 및 작성
  - 레시피 상세 정보 보기
  - 레시피 좋아요 및 공유하기 
  ### 2. 식재료 관리
  - 필요한 식재료 장바구니 추가
  - 식재료 구매
  ### 3. 장보기 메모
  - 레시피 내 사용되는 재료 중 장보기 메모에 추가
  - 장보기 목록 중 완료 목록 이동
  - 장보기 목록 중 삭제가 필요한 목록 삭제 
  ### 3. 냉장고 관리
  - 냉장고 식재료 관리
  - 냉장고 내 식재료 레시피 추천
  ### 4. 리뷰 및 사용자 관리
  - 레시피, 식재료 리뷰 작성
<br>

## 사용 방법
1. 홈페이지에서 원하는 레시피 상세 페이지에 들어갑니다.
2. 필요한 식재료 장보기 메모에 추가 혹은 바로 구매가 필요한 식재료를 장바구니에 추가합니다.
3. 장바구니 페이지로 이동하여 식재료를 구매합니다.
3. My 냉장고 페이지 내 현재 자신이 가지고 있는 재료(상품)을 등록한 후 추천 레시피를 확인합니다.
5. 마이 페이지 내에서 주문 정보 및 장보기 메모, 자신이 등록한 레시피 등 개인 정보를 확인, 관리합니다.
<br>