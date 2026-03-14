// ============================================================
// STAX 사전예약 데이터 수집 - Google Apps Script
// ============================================================
// 
// [설정 방법 - 5분 소요]
//
// 1. Google Sheets 새 스프레드시트 생성
//    → 시트 이름을 "responses" 로 변경
//    → 첫 행(헤더)에 아래 내용 입력:
//    timestamp | phone | mbtiType | mbtiTitle | surveyData | userAgent
//
// 2. 상단 메뉴 → 확장 프로그램 → Apps Script 클릭
//
// 3. 기존 코드 전체 삭제 후, 이 파일 내용 전체 복사-붙여넣기
//
// 4. 배포 → 새 배포 → 유형: "웹 앱" 선택
//    → 실행 주체: "나" 
//    → 액세스 권한: "모든 사용자"
//    → 배포 클릭
//
// 5. 생성된 웹 앱 URL 복사 (https://script.google.com/macros/s/..../exec)
//    → HTML 파일의 GOOGLE_SCRIPT_URL 변수에 붙여넣기
//
// ============================================================

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("responses");
    
    if (!sheet) {
      sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
      sheet.setName("responses");
    }
    
    var data = JSON.parse(e.postData.contents);
    
    // 설문 데이터를 읽기 좋은 형태로 변환
    var surveyStr = "";
    if (data.surveyData) {
      var survey = data.surveyData;
      var keys = Object.keys(survey);
      for (var i = 0; i < keys.length; i++) {
        surveyStr += keys[i] + "=" + survey[keys[i]] + "; ";
      }
    }
    
    var row = [
      new Date().toLocaleString("ko-KR", {timeZone: "Asia/Seoul"}),
      data.phone || "",
      data.mbtiType || "",
      data.mbtiTitle || "",
      surveyStr,
      data.userAgent || ""
    ];
    
    sheet.appendRow(row);
    
    return ContentService
      .createTextOutput(JSON.stringify({result: "ok"}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({result: "error", message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// CORS preflight 대응
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({result: "ok", message: "STAX data endpoint is running."}))
    .setMimeType(ContentService.MimeType.JSON);
}
