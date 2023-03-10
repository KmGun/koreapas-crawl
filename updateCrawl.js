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
var test_1 = require("./test");
function updateCrawl(page, latestBoardDate, contactNumberRegExp) {
    return __awaiter(this, void 0, void 0, function () {
        var boardCrawledDatas, isOld, i, boardDateSelector, boardIdSelector, isRecentText, boardDate, openBracketIndex, lastEmptyIndex, boardId, boardIdArray, firstNumberIndex, barIndex, otherInfo, contactNumberMatchResult, contactNumber, homeImgUrls, boardCrawledData, isFirstPage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    boardCrawledDatas = [];
                    isOld = false;
                    _a.label = 1;
                case 1:
                    if (!!isOld) return [3 /*break*/, 19];
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < 30)) return [3 /*break*/, 16];
                    console.log('????????? ?????????');
                    return [4 /*yield*/, page.waitForSelector("#revolution_main_table > tbody > tr:nth-child(".concat(2 * i + 3, ") > td:nth-child(4) > a"))];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, Promise.all([
                            page.waitForNavigation(),
                            page.click("#revolution_main_table > tbody > tr:nth-child(".concat(2 * i + 3, ") > td:nth-child(4) > a"))
                        ])];
                case 4:
                    _a.sent();
                    console.log('????????????');
                    boardDateSelector = 4;
                    boardIdSelector = 5;
                    // "~?????? ???" ??? ?????? ?????????????????? +1???
                    // ??????
                    return [4 /*yield*/, page.waitForSelector('body > div > div:nth-child(7) > div > table:nth-child(13) > tbody > tr > td:nth-child(2) > span:nth-child(4)')];
                case 5:
                    // "~?????? ???" ??? ?????? ?????????????????? +1???
                    // ??????
                    _a.sent();
                    return [4 /*yield*/, page.$eval('body > div > div:nth-child(7) > div > table:nth-child(13) > tbody > tr > td:nth-child(2) > span:nth-child(4)', function (element) { return element.textContent; })];
                case 6:
                    isRecentText = _a.sent();
                    if (isRecentText === '?????? | ') {
                        boardDateSelector++;
                        boardIdSelector++;
                    }
                    // boardDate ????????? + ??????
                    // ?????????
                    return [4 /*yield*/, page.waitForSelector("body > div > div:nth-child(7) > div > table:nth-child(13) > tbody > tr > td:nth-child(2) > span:nth-child(".concat(boardDateSelector, ")"))];
                case 7:
                    // boardDate ????????? + ??????
                    // ?????????
                    _a.sent();
                    return [4 /*yield*/, page.$eval("body > div > div:nth-child(7) > div > table:nth-child(13) > tbody > tr > td:nth-child(2) > span:nth-child(".concat(boardDateSelector, ")"), function (element) { return element.textContent; })];
                case 8:
                    boardDate = _a.sent();
                    // ????????? ??????
                    boardDate = boardDate.replace('????????? : ', '');
                    // ????????? ?????? 
                    // i. ~?????? ??? ?????? ????????? ??????
                    if (boardDate.includes('???')) {
                        openBracketIndex = boardDate.indexOf('(') - 1;
                        boardDate = boardDate.slice(0, openBracketIndex);
                        // ii. ????????? ?????? ??????
                    }
                    else {
                        lastEmptyIndex = boardDate.lastIndexOf(' ');
                        boardDate = boardDate.slice(0, boardDate.lastIndexOf(' '));
                    }
                    // '2023-01-10 12:38:52' ???????????? ?????? ?????? ??? timestamp ???????????? ??????
                    boardDate = (0, test_1.toTimestamp)(boardDate);
                    if (parseInt(boardDate) <= latestBoardDate) {
                        console.log('================================Crawling Complete================================');
                        isOld = true;
                        return [3 /*break*/, 19];
                    }
                    // boardId ????????? + ??????
                    // ?????????
                    return [4 /*yield*/, page.waitForSelector("body > div > div:nth-child(7) > div > table:nth-child(13) > tbody > tr > td:nth-child(2) > span:nth-child(".concat(boardIdSelector, ")"))];
                case 9:
                    // boardId ????????? + ??????
                    // ?????????
                    _a.sent();
                    return [4 /*yield*/, page.$eval("body > div > div:nth-child(7) > div > table:nth-child(13) > tbody > tr > td:nth-child(2) > span:nth-child(".concat(boardIdSelector, ")"), function (element) { return element.textContent; })];
                case 10:
                    boardId = _a.sent();
                    // ' | ????????? : 192704 | 132179'
                    // ???????????? ????????? ????????? ????????? ?????? => ???????????????|????????? ?????? ?????? ?????????
                    boardId = boardId.slice(3);
                    boardIdArray = boardId.split('');
                    firstNumberIndex = boardIdArray.findIndex(function (each) { return parseInt(each); });
                    barIndex = boardId.indexOf('|') - 1;
                    boardId = boardId.slice(firstNumberIndex, barIndex);
                    // ????????? - otherInfo
                    return [4 /*yield*/, page.waitForSelector('#bonmoon > tbody > tr:nth-child(1) > td > div')];
                case 11:
                    // ????????? - otherInfo
                    _a.sent();
                    return [4 /*yield*/, page.$eval('#bonmoon > tbody > tr:nth-child(1) > td > div', function (element) { return element.textContent; })];
                case 12:
                    otherInfo = _a.sent();
                    contactNumberMatchResult = otherInfo === null || otherInfo === void 0 ? void 0 : otherInfo.match(contactNumberRegExp);
                    contactNumber = void 0;
                    if (contactNumberMatchResult !== null) {
                        contactNumber = contactNumberMatchResult[0];
                        contactNumber = contactNumber.replace(/\D/gm, "");
                    }
                    else {
                        contactNumber = "01012345678";
                    }
                    return [4 /*yield*/, page.$$eval('img[id^=gifb_]', function (elements) { return elements.map(function (element) { return element.src; }); })];
                case 13:
                    homeImgUrls = _a.sent();
                    boardCrawledData = {
                        boardId: parseInt(boardId),
                        boardDate: parseInt(boardDate),
                        contactNumber: contactNumber,
                        homeImgUrls: homeImgUrls,
                        otherInfo: otherInfo
                    };
                    console.log(boardCrawledData.boardId);
                    boardCrawledDatas.push(boardCrawledData);
                    console.log('data status', boardCrawledDatas);
                    // ????????? ???????????????
                    console.log('????????????');
                    return [4 /*yield*/, page.goBack()];
                case 14:
                    _a.sent();
                    _a.label = 15;
                case 15:
                    i++;
                    return [3 /*break*/, 2];
                case 16: return [4 /*yield*/, page.evaluate(function (selector) { return document.querySelector(selector) !== null; }, 'body > div > div:nth-child(7) > div > form > table:nth-child(14) > tbody > tr > td.nanum-g > span:nth-child(11) > a:nth-child(2)')
                    // ??????????????? ????????????, ?????????????????? ????????????
                ];
                case 17:
                    isFirstPage = _a.sent();
                    // ??????????????? ????????????, ?????????????????? ????????????
                    return [4 /*yield*/, Promise.all([
                            page.waitForNavigation(),
                            page.click("body > div > div:nth-child(7) > div > form > table:nth-child(14) > tbody > tr > td.nanum-g > span:nth-child(".concat(isFirstPage ? 11 : 12, ") > a:nth-child(2)"))
                        ])];
                case 18:
                    // ??????????????? ????????????, ?????????????????? ????????????
                    _a.sent();
                    return [3 /*break*/, 1];
                case 19: return [2 /*return*/, boardCrawledDatas];
            }
        });
    });
}
exports["default"] = updateCrawl;
