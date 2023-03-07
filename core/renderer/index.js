export function renderElement(vdom, container){
// vdom: { tag : string, props: object/null , children: string/ array} 
    const {tag, props, children } = vdom;
    // tags 
    const el = document.createElement(tag);
    // props
    if(props){
        for(const key in props){
           const value = props[key];
           const attrNode =  document.createAttribute(key);
           attrNode.value = value;
           el.setAttributeNode(attrNode);
        }
    }
    //children
    // 1. string  -> set as the text of the el
    if(typeof children === "string" || typeof children === "number"){
      const textNode = document.createTextNode(children);
      el.appendChild(textNode);
    }
    // 2. array  -> set as the children node of the el
    if(Array.isArray(children)){
        for(const childVdom of children){
           renderElement(childVdom, el);
        }
    }
    container.append(el);
}