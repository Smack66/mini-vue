// // let a =  Dep(0);

// let b;

// effct(()=>{
//     b = a.value  + 10 ;
//     console.log(b);
// })

// a.value ++; 
const  {reactive, effect} = require("@vue/reactivity");

let c;
const origin = {a:1}
const newObj = reactive(origin);

effect(()=>{
    c = newObj.a + 10;
    // console.log(newObj);
    // console.log(c);
})
  
newObj.a = 200;
console.log(newObj );
origin.a = 300;
origin.a = 400;