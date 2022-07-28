export default function makeListOfKeywords(articles) {
  const allKeyWords = [];
  const newArray = [];

  articles.forEach((element) => {
    allKeyWords.push(element.keyword);
  })

  allKeyWords.sort();

  for (let i = 0; i <= allKeyWords.length; i++) {
    for (let j = 0; j <= allKeyWords.length; j++) {
      const upTo = allKeyWords.lastIndexOf(allKeyWords[0]);
      newArray[j] = allKeyWords.slice(0, upTo + 1);
      allKeyWords.splice(0, upTo + 1);
    }
  }

  newArray.sort((a, b) => {
    return a.length - b.length;
  }).reverse();


  newArray.forEach((element, i) => {
    allKeyWords.push(element[0]);
  })

  if (allKeyWords.length < 4) {
    return allKeyWords.join(', ');
  } else {
    const output = allKeyWords[0]+', '+allKeyWords[1]+', and '+(allKeyWords.length-2)+' others.';
    return output;
  }
}