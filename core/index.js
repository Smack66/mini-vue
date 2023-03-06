import { effectWatch } from "./reactivity/index.js";
// 
function createApp(rootComponent){
   return {
    mount(rootContainer){
        const context = rootComponent.setup();        
        effectWatch(()=>{
            window.count = context.count;
            rootContainer.innerText = context.count.a;
        })        
    }
   } 
}


export {createApp};