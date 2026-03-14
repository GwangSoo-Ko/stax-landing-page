# STAX 랜딩페이지 세팅 가이드 (10분 완료)

## 파일 구성
- `index.html` — 랜딩페이지 (Invest-TI 퀴즈 + 설문 + 사전예약)
- `google_apps_script.js` — Google Sheets 데이터 수집 코드

---

## Step 1. Google Sheets 생성 (2분)

1. [Google Sheets](https://sheets.google.com) 접속 → **새 스프레드시트** 생성
2. 시트 이름을 `responses`로 변경 (하단 탭 우클릭 → 이름 바꾸기)
3. 첫 행(A1~F1)에 헤더 입력:

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| timestamp | phone | mbtiType | mbtiTitle | surveyData | userAgent |

---

## Step 2. Apps Script 배포 (3분)

1. 스프레드시트 상단 메뉴 → **확장 프로그램** → **Apps Script**
2. 에디터가 열리면 기존 코드 전체 삭제
3. `google_apps_script.js` 파일 내용 전체 복사-붙여넣기
4. **저장** (Ctrl+S)
5. 상단 **배포** → **새 배포**
6. 설정:
   - 유형: **웹 앱**
   - 설명: "STAX 사전예약"
   - 실행 주체: **나**
   - 액세스 권한: **모든 사용자**
7. **배포** 클릭 → Google 계정 승인 (팝업에서 "고급" → "안전하지 않음" 진행)
8. 생성된 **웹 앱 URL 복사** (https://script.google.com/macros/s/.../exec)

---

## Step 3. HTML에 URL 연결 (1분)

`index.html` 파일에서 아래 부분을 찾아 URL 교체:

```javascript
const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";
```
↓
```javascript
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/여기에_복사한_URL/exec";
```

---

## Step 4. GitHub Pages 배포 (3분)

### 방법 A: 기존 STAX_Image 레포 활용 (가장 빠름)
1. GitHub에서 `Sungbo-Sim/STAX_Image` 레포 접속
2. `index.html` 파일 업로드 (Add file → Upload files)
3. Settings → Pages → Source: Deploy from a branch → Branch: main → Save
4. 약 1~2분 후 `https://sungbo-sim.github.io/STAX_Image/` 에서 접속 가능

### 방법 B: 새 레포 생성
1. GitHub에서 새 Repository 생성 (예: `stax-landing`)
2. `index.html` 업로드
3. Settings → Pages → Source: Deploy from a branch → Branch: main → Save
4. `https://sungbo-sim.github.io/stax-landing/` 에서 접속

---

## Step 5. 테스트

1. 배포된 URL 접속
2. 퀴즈 완료 → 설문 응답 → 전화번호 입력 → 제출
3. Google Sheets 확인 → 새 행이 추가되었는지 확인

---

## 수집되는 데이터 (Google Sheets 열)

| 열 | 내용 | 예시 |
|----|------|------|
| timestamp | 제출 시각 (KST) | 2026. 3. 15. 오후 3:42:10 |
| phone | 전화번호 | 010-1234-5678 |
| mbtiType | 투자 MBTI | INTJ |
| mbtiTitle | 투자 동물 | 지혜로운 부엉이 |
| surveyData | 10문항 설문 응답 | userPersona=Student; spendingCategory=Tech; ... |
| userAgent | 접속 환경 | Mozilla/5.0 (iPhone; ...) |

---

## 사업계획서 증빙 활용법

신청 마감(3/24) 전까지 수집된 데이터를 스크린샷 찍어서:
- 사업계획서 "기타 참고자료"에 첨부
- "사전 예약자 N명, 투자 성향 분포, 가장 원하는 기능 1위: OO" 형태로 정리

---

## 트러블슈팅

**Q: Sheets에 데이터가 안 들어와요**
→ Apps Script 배포 시 "모든 사용자" 접근 권한이 맞는지 확인
→ 브라우저 콘솔(F12)에서 에러 메시지 확인

**Q: Apps Script 승인 화면에서 막혀요**
→ "고급" 클릭 → "안전하지 않은 앱으로 이동" 클릭 (본인 계정이므로 안전)

**Q: URL을 바꿨는데도 안 돼요**
→ 따옴표 안에 URL이 정확히 들어갔는지 확인. 앞뒤 공백 없어야 함
