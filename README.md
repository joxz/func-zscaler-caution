# func-zscaler-caution

This is an Azure Function to generate Zscaler custom caution notifications for users.

Zscaler provides the blocking reason and other variables as query params. The function reads those and outputs a HTML page that urges the user to execute caution when visiting target website.

[Zscaler Help - Caution Custom Notification](https://help.zscaler.com/zia/caution-custom-notification)

[Translate i18next JSON resources/files](https://translate.i18next.com/)

[Local function test URL](http://localhost:7071/caution?url=https://www.gambling.com/&referer=&reason=Not+allowed+to+browse+Gambling+category&reasoncode=CATEGORY_DENIED&timebound=1&action=deny&kind=category&rule=322760&cat=Gambling&user=user@domain.tld&locid=00000000&lang=fr_FR&zsq=JDspV0Ft81ZLq0j55Z0FsFsL6n0VSDV0F86pDD6zsq)
