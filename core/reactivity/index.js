let currentEffect = null ; // to get "currentEffect" in the "get" method
// targetsMap: key -> targetMap
const targetsMap = new Map();

class Dep {
    constructor(value){
       this._value = value; 
       this.effects = new Set();
    }
    depend(){
      // only the first "get" should collect the dependency
      if(currentEffect){
       this.effects.add(currentEffect); 
      }
    }
    
    notice(){
       this.effects.forEach((effect)=>{
        effect();
       })
    }
    get value(){
      //Initial get should collect the dependency 
      this.depend();
      return this._value; 
    }
    set value(newVal){
      this._value = newVal;
      this.notice();
    }
}

export function effectWatch(effect){
   currentEffect = effect ;
   effect();
   currentEffect = null;
}
function getEffects(target, key){
    let targetEffects = targetsMap.get(target);
    if(!targetEffects){
      targetEffects = new Map();
      targetsMap.set(target, targetEffects);
    }
    let effects = targetEffects.get(key);
    if(!effects){
      effects = new Set();
      targetEffects.set(key, effects);
     }
    return effects;
}
export function reactive(target){
   const handler = {
      get: function (target, key){
        const effects = getEffects(target, key); 
        if(currentEffect) effects.add(currentEffect);
        return Reflect.get(target, key);
      }, 
      set: function (target, key, value){
         Reflect.set(target, key, value);
         const effects = getEffects(target, key);
         effects.forEach((effect)=>{
            effect();
         })
         //must return true , else will throw an error
         //Because ES 6 adopt "strict mode" automatically no matter if you have written a "use strict"
         return true;
      }
   }
   
   return new Proxy(target, handler) ;
}





// const dep = new Dep(3);
// let b;

// effectWatch(()=>{
//    b = dep.value + 100; 
//    console.log(b);
// })// firstly, b will turn to 101

// dep.value = 100; //b will turn to 200.
// dep.value = 2000;

// console.log("==========Reactive================");
// let target = {a:500};
// const a = reactive(target);
// // bb equals to 101 
// let bb;
// effectWatch(()=>{
//   // trigger the get method of the proxy
//   bb = a.a + 100; 
//   console.log("hahaha",bb);
// })
// // console.log(targetsMap);
// a.a = 1000;

// console.log("=====Reactive Test =============");
// let cc; 
// let d = reactive({c:5});
// effectWatch(()=>{
//   cc = d.c + 1000 ;
//   console.log(cc);
// })
// d.c = 100000;



// then bb will be 200
