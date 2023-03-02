// Reactivity Module 
// Ref
let currentEffect = null ;
class Dep {
    constructor(value){
        this.effects = new Set();
        this._value = value ;
    }
    get value(){
        // when the effect hasn't been collected, the function will be automatically executed once
        this.depend();
        return this._value;
    }
    set value(newVal) {
     this._value = newVal;
     this.trigger(); 
    }
    // To ensure the transprancy of the function 
    depend(){
        if(currentEffect){
            this.effects.add(currentEffect);
        }
    }
    trigger(){
        this.effects.forEach((effect)=>effect());
    }
}

function effectWatch(effect) {
    // collect the effect
    // Q1: why here should call the effect function ? 
    // what the difference will have ?
    // effect();
    // Q2: why should use a closure to get the effect ?
   // or should the effect be used outside the function ? ---- that is the most possible answer!! 
   
   // use the global variable to not use the collect function manually 
    currentEffect = effect;
    effect();
    // dep.collect(effect);
    currentEffect = null; 
}

const dep = new Dep(0);
let  b; 
effectWatch(()=>{
  b = dep.value + 10 ;
  console.log(b);
})
dep.value = 200 ; 
dep.value = 300 ; 
 
console.log("==============================");
// reactivity
class Reactivity {
    constructor(value){
        const depValue  = {}
        const keys = Object.getOwnPropertyNames(value);
        for(let key of keys){
            depValue[key] = new Dep(value[key]);
        }
        this.depValue= depValue;
    }
    get value(){
      // return : Proxy 
      const handler = {
        get: function(target, prop){
            if(prop ==="a"){
               
            }
        }
      }
    }
    
}

const origin = {a:1}
const react= new Reactivity(origin);

console.log(react);   
        
// react.value.a = 100 ; 
// if obj.a has dependency with b, and b will also change
 