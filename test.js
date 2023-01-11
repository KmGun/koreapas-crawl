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
exports.toTimestamp = void 0;
var puppeteer = require("puppeteer");
var updateCrawl_1 = require("./updateCrawl");
// crawl 주기 설정 (단위 주의)
var crawlTerm = 6; // 시간
var firstCrawlPeriod = 20; // 얘는 일 단위
// 전화번호 RegExp
var contactNumberRegExp = /\d{2,3}(-|\.|\s*)\d{3,4}(-|\.|\s*)\d{3,4}/gm;
// 로그인할 아이디 비번
var koreapas_id = "gunpol";
var koreapas_pw = "159rjs497.";
function toTimestamp(dateString) {
    var date = new Date(dateString);
    return date.getTime();
}
exports.toTimestamp = toTimestamp;
function crawl(firstCrawlPeriod, koreapas_id, koreapas_pw) {
    return __awaiter(this, void 0, void 0, function () {
        var browser, page, boardCrawledDatas;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, puppeteer.launch({ headless: false, devtools: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' })];
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
                    // 2. 복덕방 페이지로 이동
                    return [4 /*yield*/, page.goto('https://www.koreapas.com/bbs/zboard.php?id=house')
                        // await page.waitForTimeout(3000)
                        // 3. 하숙 탭 선택
                    ];
                case 7:
                    // 2. 복덕방 페이지로 이동
                    _a.sent();
                    // await page.waitForTimeout(3000)
                    // 3. 하숙 탭 선택
                    return [4 /*yield*/, page.goto('https://www.koreapas.com/bbs/zboard.php?category=2&id=house&page=1&page_num=30&sn=off&ss=on&sc=on&keyword=&tagkeyword=&select_arrange=headnum&desc=asc')
                        // 4. 크롤링 - 최근 crawlTerm 시간동안 올라온 게시물
                        // i. 최초 크롤링 - 현재 시간으로부터 기준시간만큼만 크롤링
                        // const boardCrawledDatas = await firstCrawl(page,firstCrawlPeriod,contactNumberRegExp);
                    ];
                case 8:
                    // await page.waitForTimeout(3000)
                    // 3. 하숙 탭 선택
                    _a.sent();
                    return [4 /*yield*/, (0, updateCrawl_1["default"])(page, 1673263499000, contactNumberRegExp)];
                case 9:
                    boardCrawledDatas = _a.sent();
                    console.log('결과', boardCrawledDatas);
                    return [4 /*yield*/, browser.close()];
                case 10:
                    _a.sent();
                    return [2 /*return*/, boardCrawledDatas];
            }
        });
    });
}
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, crawl(firstCrawlPeriod, koreapas_id, koreapas_pw)];
            case 1:
                result = _a.sent();
                console.log(result);
                return [2 /*return*/];
        }
    });
}); })();
