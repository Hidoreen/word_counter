
class WordCounter {
  constructor(inputText) {
    this.inputText = inputText;
     this.inputText.addEventListener('input', () => {
         this.count();
     });
 }
  count(){
      let wordStat = this.getWordStat(this.inputText.value.trim());
      this.emitEvent(wordStat);
  }

  emitEvent(wordStat) {
      // Create count event
      let countEvent = new CustomEvent('count', {
          bubbles: true,
          cancelable: true,
          detail: {
              wordStat
          }
      });
      // dispatch the count event
      this.inputText.dispatchEvent(countEvent);

  }
  getWordStat(str) {
      let matches = str.match(/\S+/g);
      return {
          characters: str.length,
          words: matches ? matches.length : 0,
      };
  }
}

const inputText = document.querySelector('#text');
const statElem = document.querySelector('#stats');

// create a new instance of WordCounter
new WordCounter(inputText);


const render = (event) => {
    statElem.innerHTML = `<p>You've written <span class="highlight">${event.detail.wordStat.words} words</span> 
        and <span class="highlight">${event.detail.wordStat.characters} characters</span>.</p>`;
}

inputText.addEventListener('count', render);