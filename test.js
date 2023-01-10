"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var puppeteer = require("puppeteer");
// crawl 주기 설정 (시간 단위)
var crawlTerm = 6;
// 전화번호 RegExp
var contactNumberRegExp = /\d{2,3}(-|\.|\s*)\d{3,4}(-|\.|\s*)\d{3,4}/gm;
// 로그인할 아이디 비번
var koreapas_id = "gunpol";
var koreapas_pw = "159rjs497.";
function toTimestamp(dateString) {
    var date = new Date(dateString);
    return date.getTime();
}
function crawl(crawlTerm, koreapas_id, koreapas_pw) {
    return __awaiter(this, void 0, void 0, function () {
        var browser, page, crawledDatas, i, boardDate, openBracketIndex, lastEmptyIndex, boardId, boardIdArray, firstNumberIndex, barIndex, otherInfo, contactNumberMatchResult, contactNumber, homeImgUrls, boardCrawledData, currentTimestamp, boardTime, openBracketIndex, lastEmptyIndex, boardTimestamp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, puppeteer.launch({ headless: false })];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _a.sent();
                    return [4 /*yield*/, page.setViewport({ width: 1280, height: 720 })
                        //2. 홈페이지로 이동
                    ];
                case 3:
                    _a.sent();
                    //2. 홈페이지로 이동
                    return [4 /*yield*/, page.goto('https://www.koreapas.com/bbs/main.php')
                        // 3. 로그인
                        // 1) 아이디 비번 치기
                    ];
                case 4:
                    //2. 홈페이지로 이동
                    _a.sent();
                    // 3. 로그인
                    // 1) 아이디 비번 치기
                    return [4 /*yield*/, page.evaluate(function (id, pw) {
                            document.querySelector('input[name="user_id"]').value = id;
                            document.querySelector('input[name="password"]').value = pw;
                        }, koreapas_id, koreapas_pw)];
                case 5:
                    // 3. 로그인
                    // 1) 아이디 비번 치기
                    _a.sent();
                    // 2) 로그인 누르기
                    return [4 /*yield*/, page.click('body > div > div:nth-child(7) > div:nth-child(2) > div > table:nth-child(2) > tbody > tr > td:nth-child(2) > form > div > div > input')];
                case 6:
                    // 2) 로그인 누르기
                    _a.sent();
                    // await page.waitForTimeout(5000)
                    // 2. 복덕방 페이지로 이동
                    return [4 /*yield*/, page.goto('https://www.koreapas.com/bbs/zboard.php?id=house')
                        // await page.waitForTimeout(3000)
                        // 3. 하숙 탭 선택
                    ];
                case 7:
                    // await page.waitForTimeout(5000)
                    // 2. 복덕방 페이지로 이동
                    _a.sent();
                    // await page.waitForTimeout(3000)
                    // 3. 하숙 탭 선택
                    return [4 /*yield*/, page.goto('https://www.koreapas.com/bbs/zboard.php?category=2&id=house&page=1&page_num=30&sn=off&ss=on&sc=on&keyword=&tagkeyword=&select_arrange=headnum&desc=asc')
                        // await page.waitForTimeout(2000)
                        // 4. 크롤링 - 최근 crawlTerm 시간동안 올라온 게시물
                        // 크롤링 내용 : 전번, 사진 src , 게시글 내용, 게시물 번호, 게시물 날짜
                        // i. 최초 크롤링
                        // 1) 크롤링 결과물 준비
                    ];
                case 8:
                    // await page.waitForTimeout(3000)
                    // 3. 하숙 탭 선택
                    _a.sent();
                    crawledDatas = [];
                    i = 0;
                    _a.label = 9;
                case 9:
                    if (!(i < 30)) return [3 /*break*/, 17];
                    return [4 /*yield*/, page.click("#revolution_main_table > tbody > tr:nth-child(".concat(2 * i + 3, ") > td:nth-child(4) > a"))
                        // 정보들 크롤링 해서 객체에 담기
                        // boardDate 크롤링 + 정제
                        // 크롤링
                    ];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, page.$eval('body > div > div:nth-child(7) > div > table:nth-child(13) > tbody > tr > td:nth-child(2) > span:nth-child(5)', function (element) { return element.textContent; })];
                case 11:
                    boardDate = _a.sent();
                    // 앞부분 정제
                    boardDate = boardDate.replace('등록일 : ', '');
                    console.log('boardDate', boardDate);
                    // 뒷부분 정제 
                    // i. ~시간 전 부분 있으면 삭제
                    if (boardDate.includes('전')) {
                        openBracketIndex = boardDate.indexOf('(') - 1;
                        boardDate = boardDate.slice(0, openBracketIndex);
                        // ii. 없으면 공백 삭제
                    }
                    else {
                        lastEmptyIndex = boardDate.lastIndexOf(' ');
                        boardDate = boardDate.slice(0, boardDate.lastIndexOf(' '));
                    }
                    // '2023-01-10 12:38:52' 형식으로 정제 완료 후 timestamp 형식으로 전환
                    boardDate = toTimestamp(boardDate);
                    return [4 /*yield*/, page.$eval('body > div > div:nth-child(7) > div > table:nth-child(13) > tbody > tr > td:nth-child(2) > span:nth-child(6)', function (element) { return element.textContent; })];
                case 12:
                    boardId = _a.sent();
                    // ' | 글번호 : 192704 | 132179'
                    // 처음으로 숫자가 나오는 인덱스 찾고 => 거기서부터|나오기 앞앞 까지 크롤링
                    boardId = boardId.slice(3);
                    boardIdArray = boardId.split('');
                    firstNumberIndex = boardIdArray.findIndex(function (each) { return parseInt(each); });
                    barIndex = boardId.indexOf('|') - 1;
                    boardId = boardId.slice(firstNumberIndex, barIndex);
                    return [4 /*yield*/, page.$eval('#bonmoon > tbody > tr:nth-child(1) > td > div', function (element) { return element.textContent; })];
                case 13:
                    otherInfo = _a.sent();
                    contactNumberMatchResult = otherInfo === null || otherInfo === void 0 ? void 0 : otherInfo.match(contactNumberRegExp);
                    contactNumber = void 0;
                    contactNumber = contactNumberMatchResult[0];
                    contactNumber = contactNumber.replace(/\D/gm, "");
                    return [4 /*yield*/, page.$$eval('img[id^=gifb_]', function (elements) { return elements.map(function (element) { return element.src; }); })];
                case 14:
                    homeImgUrls = _a.sent();
                    boardCrawledData = {
                        boardId: parseInt(boardId),
                        boardDate: parseInt(boardDate),
                        contactNumber: contactNumber,
                        homeImgUrls: homeImgUrls,
                        otherInfo: otherInfo
                    };
                    console.log(boardCrawledData);
                    // 페이지 빠져나오기
                    return [4 /*yield*/, page.goBack()];
                case 15:
                    // 페이지 빠져나오기
                    _a.sent();
                    _a.label = 16;
                case 16:
                    i++;
                    return [3 /*break*/, 9];
                case 17:
                    currentTimestamp = Date.now();
                    // 2) 가장 위 게시물부터 시작, 클릭 => 시간 검증 => 검증 완료시 => 크롤링 => 나오기
                    // (1) 가장 위 게시물 클릭
                    return [4 /*yield*/, page.click('#revolution_main_table > tbody > tr:nth-child(3) > td:nth-child(4) > a')
                        // (2) 시간 가져와서, '등록일' 부분 제거
                    ];
                case 18:
                    // 2) 가장 위 게시물부터 시작, 클릭 => 시간 검증 => 검증 완료시 => 크롤링 => 나오기
                    // (1) 가장 위 게시물 클릭
                    _a.sent();
                    return [4 /*yield*/, page.$eval('body > div > div:nth-child(7) > div > table:nth-child(13) > tbody > tr > td:nth-child(2) > span:nth-child(5)', function (element) { return element.textContent; })];
                case 19:
                    boardTime = _a.sent();
                    boardTime = boardTime.replace('등록일 : ', '');
                    // (3) 데이터 형태 정제
                    // i. ~시간 전 부분 있으면 삭제
                    if (boardTime.includes('전')) {
                        openBracketIndex = boardTime.indexOf('(') - 1;
                        boardTime = boardTime.slice(0, openBracketIndex);
                        // ii. 없으면 공백 삭제
                    }
                    else {
                        lastEmptyIndex = boardTime.lastIndexOf(' ');
                        boardTime = boardTime.slice(0, boardTime.lastIndexOf(' '));
                    }
                    boardTimestamp = toTimestamp(boardTime);
                    // (4) 현재 시간과 비교후, 
                    // 처음 : 그냥 2주간 데이터 모두다 불러오기
                    // 갱신 : 매일 6시간마다 크롤링 요청 + 기존 데이터 삭제
                    // #revolution_main_table > tbody > tr:nth-child(5) > td:nth-child(4) > a
                    // #revolution_main_table > tbody > tr:nth-child(7) > td:nth-child(4) > a
                    // 
                    //3. 로그인
                    //4. 복덕방 게시판 이동
                    //5. 각페이지별 010-XXXX-XXXX 형식 찾기
                    return [2 /*return*/, [{ boardId: 1, boardDate: 2, contactNumber: "a", homeImgUrls: ["b"], otherInfo: "c" }]];
            }
        });
    });
}
crawl(crawlTerm, koreapas_id, koreapas_pw);
