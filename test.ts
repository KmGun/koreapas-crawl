import * as puppeteer from 'puppeteer';



// crawl 주기 설정 (시간 단위)
const crawlTerm = 6;

// 로그인할 아이디 비번
const koreapas_id = "gunpol";
const koreapas_pw = "159rjs497."

// 크롤링 데이터 형식
interface ICrawledData {
    contactNumber : string;
    roomUrl : string;
    otherInfo : string;
}

function toTimestamp(dateString : string) : number {
    var date = new Date(dateString);
    return date.getTime();
}

async function crawl(crawlTerm : number , koreapas_id : string, koreapas_pw : string) : Promise<ICrawledData[]> {
    //1. 브라우저 켜고, 새탭 열기, 크기조정
    const browser = await puppeteer.launch({headless : false})
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
        // await page.waitForTimeout(5000)
    // 2. 복덕방 페이지로 이동
        await page.goto('https://www.koreapas.com/bbs/zboard.php?id=house')
        // await page.waitForTimeout(3000)

    // 3. 하숙 탭 선택
        await page.goto('https://www.koreapas.com/bbs/zboard.php?category=2&id=house&page=1&page_num=30&sn=off&ss=on&sc=on&keyword=&tagkeyword=&select_arrange=headnum&desc=asc')
        // await page.waitForTimeout(2000)
        

    // 3. 크롤링 - 최근 crawlTerm 시간동안 올라온 게시물
            // 크롤링 내용 : 전번, 사진 src , 게시글 내용
            // 0) 크롤링 결과물 준비
            const crawledData = [];

            // 1) 현재 시간 불러오기
            const currentTimestamp = Date.now();

            // 2) 가장 위 게시물부터 시작, 클릭 => 시간 검증 => 검증 완료시 => 크롤링 => 나오기
                // (1) 가장 위 게시물 클릭
                await page.click('#revolution_main_table > tbody > tr:nth-child(3) > td:nth-child(4) > a')
                await page.waitForSelector('body > div > div:nth-child(7) > div > table:nth-child(13) > tbody > tr > td:nth-child(2) > span:nth-child(5)', {
                    timeout: 5000 // wait for 10 seconds
                });

                // (2) 시간 가져와서, '등록일' 부분 제거
                          
                let boardTime = await page.$eval('body > div > div:nth-child(7) > div > table:nth-child(13) > tbody > tr > td:nth-child(2) > span:nth-child(5)',
                    element => element.textContent as string
                );
                boardTime = boardTime.replace('등록일 : ','')

                // (3) 데이터 형태 정제
                    // i. ~시간 전 부분 있으면 삭제
                    if (boardTime.includes('전')){
                        const openBracketIndex = boardTime.indexOf('(') - 1;
                        boardTime = boardTime.slice(0,openBracketIndex);
                    // ii. 없으면 공백 삭제
                    } else {
                        const lastEmptyIndex = boardTime.lastIndexOf(' ');
                         boardTime = boardTime.slice(0,boardTime.lastIndexOf(' '));
                    }
                        // '2023-01-10 12:38:52' 형식으로 정제 완료
                console.log(boardTime)
                // (4)
                toTimestamp(boardTime)
                  

                // (3) 
                

                


                // (2) 시간 검증 실패시 : 크롤링 종료




             
            // #revolution_main_table > tbody > tr:nth-child(5) > td:nth-child(4) > a
            // #revolution_main_table > tbody > tr:nth-child(7) > td:nth-child(4) > a
            
            
            

    // (대신 처음에는, 최근 2주간의 데이터를 크롤링한다.)


        

        

    //3. 로그인

    //4. 복덕방 게시판 이동

    //5. 각페이지별 010-XXXX-XXXX 형식 찾기






    return [{contactNumber : "a", roomUrl: "b", otherInfo : "c"}] 
}

crawl(crawlTerm,koreapas_id,koreapas_pw);