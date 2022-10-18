
const alphaChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const numChars = '0123456789';
const symbolChars = '~`!@#$%^&*()_-+={[}],|:;<>.?/';

function genChar(numbersPresent = true, symbolsPresent = true) {
    let totalLength = alphaChars.length;
    if (numbersPresent && symbolsPresent) {
        totalLength += numChars.length + symbolChars.length;
        let randNdx = Math.floor(totalLength * Math.random());
        if (randNdx < alphaChars.length) {
            return alphaChars.charAt(randNdx);
        } else if (randNdx < alphaChars.length + numChars.length) {
            return numChars.charAt(randNdx - alphaChars.length);
        } else {
            return symbolChars.charAt(randNdx - totalLength + symbolChars.length);
        }
    }

    if (numbersPresent) {
        totalLength += numChars.length;
        let randNdx = Math.floor(totalLength * Math.random());

        return randNdx < alphaChars.length ? alphaChars.charAt(randNdx) : numChars.charAt(randNdx - alphaChars.length);
    }

    if (symbolsPresent) {
        totalLength += symbolChars.length;
        let randNdx = Math.floor(totalLength * Math.random());

        return randNdx < alphaChars.length ? alphaChars.charAt(randNdx) : symbolChars.charAt(randNdx - alphaChars.length);
    }

    return alphaChars.charAt(Math.floor(totalLength * Math.random()));
}

const passElems = document.getElementById('passwords').children;
const btn = document.getElementById('generate-passwords');

const formElem = document.getElementById('password-form');

formElem.addEventListener('submit', function (evt) {
    evt.preventDefault();
    
    const passLength = this['length'].value;
    const numberPresent = this['number'].checked;
    const symbolPresent = this['symbol'].checked;
    
    for (const passElem of passElems) {
        let generatedPassword = '';
        for (let i = 0; i < passLength; i++) {
            generatedPassword += genChar(numberPresent, symbolPresent);
        }

        passElem.firstChild.textContent = generatedPassword;
    }
});

for (const passElem of passElems) {
    passElem.addEventListener('click', async function (evt) {
        const passwordToCopy = this.firstChild.textContent.trim();

        if (!passwordToCopy) {
            return;
        }

        if (!navigator.clipboard) {
            let textArea = document.createElement("textarea");
            textArea.value = passwordToCopy;
              
            // Avoid scrolling to bottom
            textArea.style.top = '0';
            textArea.style.left = '0';
            textArea.style.position = 'fixed';
            
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
                let successful = document.execCommand('copy');
                if (!successful) {
                    console.log('Fallback: Copying text command was ' + msg);
                }
            } catch (err) {
                console.error('Fallback: Oops, unable to copy', err);
            }
            
            document.body.removeChild(textArea);
        }

        try {
            await navigator.clipboard.writeText(passwordToCopy);
        } catch (err) {
            console.error(`Async: could not copy text: ${err}`);
        }
    });
}

