import * as puppeteer from 'puppeteer';
import firstCrawl from './\bfirstCrawl';
import updateCrawl from './updateCrawl';



// crawl 주기 설정 (단위 주의)
const crawlTerm = 6; // 시간
const firstCrawlPeriod = 20; // 얘는 일 단위

// 전화번호 RegExp
const contactNumberRegExp = /\d{2,3}(-|\.|\s*)\d{3,4}(-|\.|\s*)\d{3,4}/gm;

// 로그인할 아이디 비번
const koreapas_id = "gunpol";
const koreapas_pw = "159rjs497."

// 크롤링 데이터 형식
    // 크롤링 내용 : 전번, 사진 src , 게시글 내용, 게시물 번호, 게시물 날짜
export interface IBoardCrawledData {
    boardId : number;
    boardDate : number;
    contactNumber : string;
    homeImgUrls : string[];
    otherInfo : string;
}

export function toTimestamp(dateString : string) : number {
    var date = new Date(dateString);
    return date.getTime();
}

async function crawl(firstCrawlPeriod : number , koreapas_id : string, koreapas_pw : string) : Promise<IBoardCrawledData[]> {
    //1. 브라우저 켜고, 새탭 열기, 크기조정
    const browser = await puppeteer.launch({headless : false,devtools:true,executablePath :'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' })
	const page = await browser.newPage();
	await page.setViewport({width: 1280, height:720})
    //2. 홈페이지로 이동
    await page.goto('https://www.koreapas.com/bbs/main.php')
    // 3. 로그인
        // 1) 아이디 비번 치기
        await page.evaluate((id, pw) => {
            (document.querySelector('input[name="user_id"]') as HTMLInputElement).value = id;
            (document.querySelector('input[name="password"]') as HTMLInputElement).value = pw;
            }, koreapas_id, koreapas_pw);
        // 2) 로그인 누르기
        await page.click('body > div > div:nth-child(7) > div:nth-child(2) > div > table:nth-child(2) > tbody > tr > td:nth-child(2) > form > div > div > input');

    // 2. 복덕방 페이지로 이동
        await page.goto('https://www.koreapas.com/bbs/zboard.php?id=house')
        // await page.waitForTimeout(3000)

    // 3. 하숙 탭 선택
        await page.goto('https://www.koreapas.com/bbs/zboard.php?category=2&id=house&page=1&page_num=30&sn=off&ss=on&sc=on&keyword=&tagkeyword=&select_arrange=headnum&desc=asc')        

    // 4. 크롤링 - 최근 crawlTerm 시간동안 올라온 게시물
            // i. 최초 크롤링 - 현재 시간으로부터 기준시간만큼만 크롤링
        // const boardCrawledDatas = await firstCrawl(page,firstCrawlPeriod,contactNumberRegExp);
        const boardCrawledDatas = await updateCrawl(page,1673263499000,contactNumberRegExp);
        console.log('결과',boardCrawledDatas)
            
                

                    
    await browser.close();
    return boardCrawledDatas as any;
}
(async () => {
    const result = await crawl(firstCrawlPeriod,koreapas_id,koreapas_pw);
    console.log(result);
})();
