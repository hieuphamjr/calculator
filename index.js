let rad = true;
let deg = false;
let button = document.getElementsByTagName("button");
let key = document.getElementById("key");
let dis = document.getElementById("display");
let values = [];
let equals = false;
let ANS = 0;

function calculator(){
  eventHandler();
}
function eventHandler(){
  window.addEventListener('keypress',keyDisplay);
  key.addEventListener('click',display);
}
function keyDisplay(){
  if((event.keyCode >= 48 && event.keyCode <= 57)){
    printOnTheScrean(String.fromCharCode(event.keyCode),dis);
  }
}
function display(data){
  let target = event.target;
  if(target.className == 'digit' || target.className == 'operator' || target.className == 'function'){
    printOnTheScrean(target,dis);
    checkEquals(target,dis);
  }
  
}
function checkEquals(data,dis){
  if(data.textContent == "="){
    equals = true;
    values = dis.textContent.split(" ");
    operationByPriority(values);
  }
}
function printOnTheScrean(data,dis){
  if(data.textContent == "AC"){
      if(dis.textContent[dis.textContent.length-1]==" ")
        dis.textContent = parseFloat(a.toPrecision(10).toString());
      else if(equals)
        dis.textContent = "0";
      else {
        dis.textContent = parseFloat(a.toPrecision(10).toString());
      }
  }
  else if(data.className == "function"){
    equals = false;
    insertOrAdd(data.textContent+'( ',data.className);
  }
  else if(data.className == "operator"){
    equals = false;
    if(data.textContent == "("){
      insertOrAdd(data.textContent+' ',data.className);
    }
    else if(data.textContent == ")"){
      dis.textContent += ' '+data.textContent;
    }
    else {
        dis.textContent += ' '+data.textContent+' ';
    }
  }
  else if(data >= 0 && data <= 9){
    insertOrAdd(data,'digit');
  }
  else {
    insertOrAdd(data.textContent,data.className);
  }
  return dis;
}
function operationByPriority(values){
  let op = ['!','%','÷','×','-','+'];
  let i = 0;
  let f = 0;
  let index = 0;
  equals = true;
    while(i < op.length){
      for(let c = 0; c < values.length; c++){
        if(/\d+!/.test(values[c])){
          values[c] = factorial(parseFloat(values[c]));
          index++;
        }
      }
      // check Brackets
      if(values.indexOf("(") > -1){
        let bracket = [];
        index = values.indexOf("(");
        let lastIndex = values.indexOf(")");
        let x = index+1;
        for(let i = 0, a = x; a < lastIndex; a++, i++){
          bracket[i] = values[a];
          values[index] = null;
          index++;
        }
        values[lastIndex] = null;
        values[index] = operationByPriority(bracket);
        values = values.filter(function(v){
          return v != null;
        });
      }
      else if(values.indexOf(op[i]) > -1){
        index = values.indexOf(op[i]);
        values[index-1] = operation(parseFloat(values[index-1]),parseFloat(values[index+1]),values[index]);
        values[index] = null;
        values[index+1] = null;
        values = values.filter(function(v){
          return v != null;
        });
      }
      else if(values.indexOf(op[i]) == -1)
        i++;
    }
    dis.textContent = values[0];
    ANS = values[0];
    return values;
}

function operation(n1,n2,op){
  let result;
  switch(op){
    case "+":
      result = addition(n1,n2);
      break;
    case "-":
      result = subtruction(n1,n2);
      break;
    case "÷":
      result = division(n1,n2);
      break;
    case "×":
      result = multiplication(n1,n2);
      break;
    case "%":
      result = percentage(n1);
  }
  return result;

}
calculator();
function insertOrAdd(info,className){
  if(className == 'digit'){
    if(dis.textContent == '0' || equals){
        dis.textContent = info;
        equals = false;
    }
    else {
      dis.textContent += info;
    }
  }
  else if(className != "digit"){
    if(dis.textContent == '0')
      dis.textContent = info;
    else if(/\d/.test(dis.textContent[dis.textContent.length-1]) || dis.textContent[dis.textContent.length-1] == '(' || dis.textContent[dis.textContent.length-1] == ')'){
      dis.textContent += ' × '+info;
    }
    else {
      dis.textContent += info;
    }
  }
}
function addition(n1,n2){
  return n1+n2;
}
function multiplication(n1,n2){
  return n1*n2;
}
function subtruction(n1,n2){
  return n1-n2;
}
function division(n1,n2){
  return n1/n2;
}
function percentage(n1){
  return n1/100;
}
