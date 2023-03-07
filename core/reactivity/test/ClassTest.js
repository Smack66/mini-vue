// Actually, you can not use property name as your get name to get the corresponding name
// Because there will be infinite callback of the "get" method
class Test{
    constructor(a){
        this._value = a;
    }
    get value(){
        return this._value + "hahhahaha"
    }
    set value(val){
        this._value = val + "gagagagag";
        return true ;
    }
}

const test = new Test(123);
console.log(test.value);

// Set Test
const set = new Set();
set.add(()=>{
    console.log("hahaha");
})
set.add(null);
console.log("====set=====");
set.forEach((item)=>{
    console.log(item);
})
console.log("====set=====");

// 10 + null
console.log(10 + null);

// targetsMap 
const map = new Map();
const obj = {a:1, b:2};
map.set(obj, 3);
console.log(map);
console.log(map.get(obj));


//  if "Reflect.get" can trigger the "set" method of the target ?
// "yes f"
const target = {
    _value: 3,
    get value(){
      console.log('"get" method has been triggered' );
      return this._value; 
    },
    set value(newVal){
      console.log('"set" method has been triggered' );
    }
}
Reflect.get(target, 'value');
Reflect.set(target, 'value', 3);


// // document.innerHTML
// const myTest= document.querySelector("#test");
// myTest.innerHTML = '<div>123</div>';
// const myTest2 = document.querySelector("#test2");
// myTest.innerText= '<div>123</div>';



//test const 
const obj1 = {
    a:1,
    b:2
}
for(const key in obj1){
    const value = obj1[key];
    console.log(key, value);
}
