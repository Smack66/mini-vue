

import  {reactive} from "./core/reactivity/index.js";
import { h } from "./h.js";

// export the App object and let the "createApp" to render,
// instead of write the render function manually 
// wrap the App object with the "createApp"
export const App = {
   render(context){
   return h(
      "div",
      {id : 1, name : "input"},
      [
        h("p", null, context.count.a),
        h("p", null, context.count.a + 100 )
      ]
    )
   },
   setup(){
     const count = reactive({a:1});
     window.globalCount =  count; 
     return {
      count
     }
   }
}



