const puppy = require("puppeteer");

let places=[
    'Delhi',
    'Kolkata',
    'Himachal Pradesh'
];
//await page.setDefaultNavigationTimeout(0);
const p=["Restaurants","Hotels","Bars and pubs"];
const yourLocation=process.argv[2];

 
async function main(){
    const browser = await puppy.launch({ 
        headless: false ,
        defaultViewport: false,
    });

    let pages = await browser.pages(); 
    let  tab = pages[0]; 
    
        await helper(tab);
}

async function helper(tab){
        await tab.setDefaultNavigationTimeout(0); 
        for(let i of places){
        await tab.setViewport({width:1280,height:600});
        await tab.goto('https://www.google.com/maps');

        
        await tab.waitForSelector("#gs_taif50");
        await tab.type("#gs_taif50",i);
        await tab.keyboard.press("Enter"); 
        await tab.waitForNavigation({waitUntil: "networkidle2"});
        //await tab.waitForSelector('button[data-value="Nearby"]');
        //await tab.click('button[data-value="Nearby"]');
        //await tab .waitForNavigation({waitUntil: "networkidle2"});

        for(let k of p){
            
         await tab.waitForSelector('button[data-value="Nearby"]');
        await tab.click('button[data-value="Nearby"]');
        await tab .waitForNavigation({waitUntil: "networkidle2"});
        await tab.waitForSelector("#searchboxinput");
        await tab.type("#searchboxinput",k);
        await tab.click('.searchbox-searchbutton-container button');
       await tab .waitForNavigation({waitUntil: "networkidle2"});
        await tab.waitForSelector(".place-result-container-place-link", {visible: true});
        let options = await tab.$$(".place-result-container-place-link");
        
       for(let j=0;j<options.length;j++){
            await options[j].click();
            console.log("abc")
            await tab .waitForNavigation({waitUntil: "networkidle2"});
          
        }

    }
        
       
        
           }
      
      
        }
     
main();