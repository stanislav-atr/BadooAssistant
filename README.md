## About
Userscript to help you pick profiles through advanced filter options and convenient data output.

<img src="https://user-images.githubusercontent.com/68852737/147836766-b8408526-77a5-4f68-8245-fd571fcfd23d.gif" width="40%" height="40%">

## Disclaimer
- Captcha severely damages the userscript's usability at the moment.
- Userscript uses ```eval``` to render multiple images to console.

These might be fixed in the future.

## How to install
1. Clone the code: ```git clone https://github.com/stanislav-atr/BadooAssistant.git```
2. ```npm install```
3. Edit key values in ```filter.config.js``` to suit your needs or comment them out to ignore.**These should not conflict with website's native filter.**
4. Build the userscript with ```yarn webp``` or ```npm run webp```. You may use ```yarn watch``` or ```npm run watch``` to auto-rebuild userscript to keep experimenting with filter options.
5. Install [TamperMonkey](https://www.tampermonkey.net/) extension.
   - Create new script.
   - Get meta header from ```prefixTamperMonkey.js``` and add it to the script so it's contents look like this:
![tampermonkey contents](https://user-images.githubusercontent.com/68852737/147835026-fcc6ea74-93b3-4a44-a594-14d0fba0c757.png)
     - **Don't forget to update ```@require``` field accordingly!**
     
## How to use
1. Head to the ```https://badoo.com/people-nearby``` section in ```Mobile View```.
   ![image](https://user-images.githubusercontent.com/68852737/147835356-a7bae613-658e-4dec-9c5a-deada7fb0a2e.png)
   <img src="https://user-images.githubusercontent.com/68852737/147836887-ab393479-ba18-41be-8f93-40ed47cf8a2f.png" width="40%" height="40%">
2. Reload the page and check userscript console output, which should be starting with ```Userscript started!```: 
   - When first batch of profiles is filtered, _scroll down to get another batch_.
   - Enter ```re()``` in console for an easier way to restart the script.
   - Use ```watch``` script to change fitlering parameters on the go.

## ToDo list
###### Major:
- find a way to avoid captcha
- get rid of ```eval``` in profiles rendering.
###### Misc:
- handle profile rendering if no ```about_me``` text is present in filter config or profile being rendered (that is, avoid ```udnefined``` in output)
- include tampermonkey meta file with dynamically filled ```@require``` file into build
- document all major funcs
- organize error handling.
