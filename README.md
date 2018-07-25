# Gobbler by JD Richards

## To play Gobber go to http://www.jdrichardstech.com/gobbler

## Email

**If you receive the email compressed file:**

1.  Download the file
2.  Uncompress the .zip file
3.  Change the extension of the game.txt file to game.js
4.  You now have the code and can run index.html in your Chrome Browser

## Github

_As js files are no longer allowed in gmail, even when zipped..._<br />
**Here is an alternative option for retrieving the Gobbler code:**

1.  Go to https://github.com/jdrichardstech/gobbler-game
2.  Click on the green Clone or Download button
3.  Copy the link
4.  Go to your terminal
5.  Type `git clone` <paste file here>
6.  `cd` into the folder
7.  Open the index.html file in your Chrome Browser

## Next Steps

1.  Fix Bug: The snake sometimes goes past the edge of playing screen and sometimes ends correctly.

2.  Fix audio console message: Not reading as an error but in messages of developer tools.

    > (DOMException: play() failed because the user didn't interact with the document first.) Not reading as an error thanks to workaround but find another way.

3.  Refactor: so that setInterval function does not begin at the load of screen

4.  Address no sound issue in Safari

5.  Address Promise error for crash sound at end of game in Safari

6.  Create Slow, Medium, Fast buttons to control the speed of the game so that one can choose rate of play

7.  Add score to screen while playing
