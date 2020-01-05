# AutomatedHunter
GoogleChrome Extension casually helps testing fundamental Web Problems.

The idea is to fuzz some common parameters semi-automatically without the need to entirely doing it manually and without using vulnerability scanners. The solution I implemented is a browser extension that detects these common parameters while browsing and tests them immediately and spawns up every test on a different tab to manually look at the resulting response. So far, it tests GET request parameters for common vulnerabilities like Local file inclusion, Remote File Inclusion, Endpoint SQL injection, and open redirect. 

### Installation:
- Enable Chrome developer mode.
- Load the extension. (After configuring the scope)
- Start browsing the site you are testing.
- It will spawn up new tabs for each basic test, which will allow you to force on more complicated tests.

[Read more + Demo](https://mohad.red/AutoHunter)
