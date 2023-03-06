let currentEffect = null;
const aEffect = new Set();
const bEffect = new Set();
class Dep {
    constructor(value){
        // String , Integer , Boolean 
        this.effects = new Set();
        this.value = value ;
    }
    collect(){
        if(currentEffect){
            this.effects.add(currentEffect);
        }
    }
}
const w = 1; 
(new Dep(2)).collect();
function reactive(target){
    const handler = {
        get: function(target, prop){
           if(currentEffect) {
            if(prop === "a") {
               aEffect.add(currentEffect); 
            }           
            else if(prop === "b"){
                bEffect.add(currentEffect);
            }
          }
           return Reflect.get(target,prop)            
        },        
        set: function(target, prop, value){
          Reflect.set(target, prop, value)
          if(prop === "a"){
            aEffect.forEach((effect)=>{
                effect();
            })
          }
          if(prop === "b"){
            aEffect.forEach((effect)=>{
                effect();
            })
          }
           
        }
    };   
    const proxy = new Proxy(target, handler); 
    return proxy;
}
function effectWatch(effect) {
    currentEffect = effect;
    effect();
    currentEffect = null;     
}
const origin = {a:1,b:2};
const react = reactive(origin);
let c ; // the statistic of dom 
let d ; 

effectWatch(()=>{
    c = react.a + 10; 
    console.log("c = " + c);
})


effectWatch(()=>{
    d = react.a + react.b + 10 ;
    console.log("d = " +  d); 
})

console.log();
// setInterval(() => {
//   console.log("a = " + react.a++);
//   console.log("===============");
// }, 1000);