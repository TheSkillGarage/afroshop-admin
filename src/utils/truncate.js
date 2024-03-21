export  const TruncateWord = (word, subStringLength)=>{
      return word.substring(0,subStringLength) + "..."
    }

export const joinStrings = (arrayOfWords, joinString) => {
  return arrayOfWords.filter(word => ![null, undefined].includes(word)).join(joinString);
}