# AutomatedHunter
Google Chrome Extension automates testing fundamental Web Problems via Chrome

The idea is to scan some common parameters semi-automatically without the need to entirely doing it manually and without using vulnerability scanners. The solution I implemented is a browser extension that detects these common parameters while browsing and tests them immediately and spawns up every test on a different tab to manually look at the resulting response. So far, it tests GET request parameters for common vulnerabilities like Local file inclusion, Remote File Inclusion, Endpoint SQL injection, and open redirect. 


This is a simplified version without many tests. If you have cool ideas/tests/methodologies exploiting a specific type of vulnerability let's merge them togother :)

### Installation:
- Enable Chrome developer mode.
- Load the extension. (After configuring the scope)
- Start browsing the site you are testing.
- It will spawn up new tabs for each basic test.

### Future
If you want to invest time to imporve it, here are some ideas I think it worth considering and easy to implement over GET requests.
- Http parameter pollution.
- Command injection.
- Template Injection.
- Memory vulnerabilities. (Maybe?)

[Read more + Demo](https://mohad.red/AutoHunter)
