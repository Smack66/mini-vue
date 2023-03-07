import { effectWatch } from "./reactivity/index.js"; 
import { renderElement } from "./renderer/index.js";
// 
function createApp(rootComponent){
   return {
    mount(rootContainer){
        const context = rootComponent.setup(); 
        effectWatch(()=>{
            // why should the vdom assignment should be placed in the function ???????
            // if not, there will be no reactive effect
            // Reason: there should be "get" method to collect the dependency
            const vdom = rootComponent.render(context);
            rootContainer.innerText = '';
            renderElement(vdom, rootContainer);
        })
        // effectWatch(()=>{
        //     rootContainer.innerHTML = "";
        //     const renderContent = rootComponent.render(context);
        //     rootContainer.appendChild(renderContent);
        // })        
    }
   } 




}

export {createApp};