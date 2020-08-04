const backSpace = 8;
const textBoxes = 4;
let maxLength = 4;
const totalLength = textBoxes * maxLength;

const moveCursorFront = (nextTextBox) => {
  document.getElementById(nextTextBox).focus();
};

const moveCursorBack = (prevTextBox) => {
  document.getElementById(prevTextBox).focus();
};

const sliceString = (str, start, end) => {
  newStr = str.slice(start, end);
  return newStr;
};

const checkNumberInput = (str) => {
  return isNaN(str);
};

const paste = (currentTextBox) => {
  event.preventDefault()
  currentTextBox.value = '';
  const text = event.clipboardData.getData('text/plain')
  let str = text;
  if (text.length > totalLength) {
    str = sliceString(str, 0, totalLength);
  }
  const flag = checkNumberInput(str);
  if (flag) {
    alert('Number is Invalid');
    return;
  }
  let boxId = currentTextBox.getAttribute('id');
  let k = boxId[5]
  let sub = ""
  for (let i = 0; i < str.length; i++) {
    sub += str[i]
    console.log("sub", sub, "boxID", boxId)
    document.getElementById(boxId).value = sub;
    if (sub.length === 4 && boxId !== 'card-4') {
      sub = ""
      boxId = 'card-' + (++k);
      console.log(boxId, "boxId")
      moveCursorFront(boxId);
    }
    else if(boxId === "card-4"){
      moveCursorFront("expiry-input-1")
    }
  }
};

const moveCursor = (prevTextBox, currentTextBox, nextTextBox) => {
  const length = currentTextBox.value.length;
  const inputType = currentTextBox.getAttribute('class');
  // console.log("inside moveCursor Func", prevTextBox, currentTextBox.getAttribute("id"), nextTextBox)
  if (inputType !== 'input') {
    maxLength = Number(currentTextBox.getAttribute('maxlength'));
  }
  else{
    maxLength = 4;
  }
  if (event.keyCode === backSpace) {
    if (length === 0 && prevTextBox !== 'begin') moveCursorBack(prevTextBox);
  } else if (length === maxLength) {
    if (nextTextBox === 'pay-btn') {
      document.getElementById('cvc-input').blur();
      document.getElementById('pay-btn').style.backgroundColor = 'red';
    }
    moveCursorFront(nextTextBox);
  }
  console.log(maxLength, "maxLength")
};

const payClicked = () => {
  // console.log('Clicked');
};
