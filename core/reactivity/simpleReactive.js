let currentEffect = null;

class Dep {
    constructor(value){
        // String , Integer , Boolean 
        this.effects = new Set();
        this.value = value ;
    }
    collect(){
        // Where does the method defined in ? 
        // global lexical enviroment ?  
        if(currentEffect){
            this.effects.add(currentEffect);
        }
    }
    trigger(){
       this.effects.forEach((effect)=>{
          effect();
       }) 
    }
}
function reactive(originObject){
    //change key-value -> key-dep
    const target = structuredClone(originObject);
    const keys = Object.getOwnPropertyNames(target);
    for(let key of keys){
        target[key] = new Dep(target[key])
    }
    //generate Proxy
    const handler = {
        get: function(target, prop){
          const dep = Reflect.get(target, prop);       
          dep.collect();
          return Reflect.get(dep, "value"); 
        },        
        set: function(target, prop,newValue){
          const dep = Reflect.get(target, prop);
          Reflect.set(dep, "value", newValue);
          dep.trigger();
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


// setInterval(() => {
//   react.a++;
//   console.log("a = ", react.a);
//   console.log("===============");
//500)

console.log(origin);
react.a = 100; 
console.log(origin);
react.a = 500; 
