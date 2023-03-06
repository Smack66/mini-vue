// // let a =  Dep(0);

// let b;

// effct(()=>{
//     b = a.value  + 10 ;
//     console.log(b);
// })

// a.value ++; 
// const  {reactive, effect} = require("@vue/reactivity");
// const {effectWatch, reactive} = require("./core/reactivity/Reactive.tutorial.js")


let c;
const origin = {a:1}
const newObj = reactive(origin);

// effect(()=>{
//     c = newObj.a + 10;
//     // console.log(newObj);
//     // console.log(c);
// })
  


import  {reactive} from "./core/reactivity/index.js";
// effectWatch(()=>{
//    c =  newObj.a + 100;
//    console.log(c);
// })
newObj.a = 1000;

// export the App object and let the "createApp" to render,
// instead of write the render function manually 
// wrap the App object with the "createApp"
export const App = {
   render(context){
     
   },
   setup(){
     const count = reactive({a:1});
     window.globalCount =  count; 
     return {
      count
     }
   }
}



