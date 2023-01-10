import * as puppeteer from 'puppeteer';



// crawl 주기 설정 (시간 단위)
const crawlTerm = 6;

// 전화번호 RegExp
const contactNumberRegExp = /\d{2,3}(-|\.|\s*)\d{3,4}(-|\.|\s*)\d{3,4}/gm;

// 로그인할 아이디 비번
const koreapas_id = "gunpol";
const koreapas_pw = "159rjs497."

// 크롤링 데이터 형식
interface IBoardCrawledData {
    boardId : number;
    boardDate : number;
    contactNumber : string;
    homeImgUrls : string[];
    otherInfo : string;
}

function toTimestamp(dateString : string) : number {
    var date = new Date(dateString);
    return date.getTime();
}

async function crawl(crawlTerm : number , koreapas_id : string, koreapas_pw : string) : Promise<IBoardCrawledData[]> {
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
        

    // 4. 크롤링 - 최근 crawlTerm 시간동안 올라온 게시물
            // 크롤링 내용 : 전번, 사진 src , 게시글 내용, 게시물 번호, 게시물 날짜
            // i. 최초 크롤링
            
                // 1) 크롤링 결과물 준비
                const crawledDatas = [];

                // 2) 크롤링 (크롤링동안 게시물 올라오는건 고려 X, 대신 사람들 안올라오는 시간에 크롤링 ㄱㄱ)
                    // 한페이지 크롤링
                    for (let i=0;i<30;i++) {
                        await page.click(`#revolution_main_table > tbody > tr:nth-child(${2*i+3}) > td:nth-child(4) > a`)
                        // 정보들 크롤링 해서 객체에 담기
                            // boardDate 크롤링 + 정제
                                // 크롤링
                                let boardDate = await page.$eval('body > div > div:nth-child(7) > div > table:nth-child(13) > tbody > tr > td:nth-child(2) > span:nth-child(5)',
                                    element => element.textContent as string
                                );
                                // 앞부분 정제
                                boardDate = boardDate.replace('등록일 : ','')
                                console.log('boardDate',boardDate)
                                // 뒷부분 정제 
                                    // i. ~시간 전 부분 있으면 삭제
                                    if (boardDate.includes('전')){
                                        const openBracketIndex = boardDate.indexOf('(') - 1;
                                        boardDate = boardDate.slice(0,openBracketIndex);
                                    // ii. 없으면 공백 삭제
                                    } else {
                                        const lastEmptyIndex = boardDate.lastIndexOf(' ');
                                        boardDate = boardDate.slice(0,boardDate.lastIndexOf(' '));
                                    }
                                // '2023-01-10 12:38:52' 형식으로 정제 완료 후 timestamp 형식으로 전환
                                boardDate = toTimestamp(boardDate) as any;
                            // boardId 크롤링 + 정제
                                // 크롤링
                                let boardId = await page.$eval('body > div > div:nth-child(7) > div > table:nth-child(13) > tbody > tr > td:nth-child(2) > span:nth-child(6)',
                                    element => element.textContent as string
                                );
                                // ' | 글번호 : 192704 | 132179'
                                    // 처음으로 숫자가 나오는 인덱스 찾고 => 거기서부터|나오기 앞앞 까지 크롤링
                                    boardId = boardId.slice(3);
                                    const boardIdArray = boardId.split('');
                                    const firstNumberIndex = boardIdArray.findIndex(each => parseInt(each));
                                    const barIndex = boardId.indexOf('|') -1 ;
                                    boardId = boardId.slice(firstNumberIndex,barIndex);
                            // 게시글 - otherInfo
                                let otherInfo = await page.$eval('#bonmoon > tbody > tr:nth-child(1) > td > div',
                                    element => element.textContent as string
                                );

                            // 전화번호 - contactNumber
                                const contactNumberMatchResult = otherInfo?.match(contactNumberRegExp);
                                let contactNumber : string;
                                contactNumber = (contactNumberMatchResult as any)[0];
                                contactNumber = contactNumber.replace(/\D/gm,"");

                                 
                                 // 01012345678 형식으로 반환
                            // 이미지 url - homeImgUrl
                                // 이미지 최대 10장가져옴

                                    const homeImgUrls = await page.$$eval('img[id^=gifb_]',
                                        elements => elements.map(element => element.src)
                                    );
                            // 객체에 담기
                            const boardCrawledData : IBoardCrawledData = {
                                boardId : parseInt(boardId),
                                boardDate : parseInt(boardDate),
                                contactNumber,
                                homeImgUrls,
                                otherInfo,
                            }
                            console.log(boardCrawledData);

                        // 페이지 빠져나오기
                        await page.goBack();
                        
                    }

                    

                    // 빠져나오기 











            // 1) 현재 시간 불러오기
            const currentTimestamp = Date.now();

            // 2) 가장 위 게시물부터 시작, 클릭 => 시간 검증 => 검증 완료시 => 크롤링 => 나오기
                // (1) 가장 위 게시물 클릭
                await page.click('#revolution_main_table > tbody > tr:nth-child(3) > td:nth-child(4) > a')

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
                // '2023-01-10 12:38:52' 형식으로 정제 완료 후 timestamp 형식으로 전환
                const boardTimestamp = toTimestamp(boardTime)

                // (4) 현재 시간과 비교후, 
                  

                    // 처음 : 그냥 2주간 데이터 모두다 불러오기
                    // 갱신 : 매일 6시간마다 크롤링 요청 + 기존 데이터 삭제



             
            // #revolution_main_table > tbody > tr:nth-child(5) > td:nth-child(4) > a
            // #revolution_main_table > tbody > tr:nth-child(7) > td:nth-child(4) > a
            
            
            

    // 


        

        

    //3. 로그인

    //4. 복덕방 게시판 이동

    //5. 각페이지별 010-XXXX-XXXX 형식 찾기






    return [{boardId : 1, boardDate : 2, contactNumber : "a", homeImgUrls: ["b"], otherInfo : "c"}] 
}

crawl(crawlTerm,koreapas_id,koreapas_pw);