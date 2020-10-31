// const domRoot = document.getElementById("root");

// const domInput = document.createElement("input");
// // Set properties
// domInput["type"] = "text";
// domInput["value"] = "Hi world";
// domInput["className"] = "my-class";
// // Listen to events
// domInput.addEventListener("change", (e) => alert(e.target.value));
// // Create a text node
// const domText = document.createTextNode("");
// // Set text node content
// domText["nodeValue"] = "Foo";
// // Append an element
// domRoot.appendChild(domInput);
// // Append a text node (same as previous)
// domRoot.appendChild(domText);

export function render(element, parentDom) {
  const { type, props } = element;

  // create DOM element
  const isTextElement = type === 'TEXT ELEMENT';

  const dom = isTextElement ? document.createTextNode("") : document.createElement(type);

  const isListener = (name) => name.startsWith("on");
  Object.keys(props)
    .filter(isListener)
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, props[name]);
    });

  const isAttribute = (name) => !isListener(name) && name !== "children";
  Object.keys(props)
    .filter(isAttribute)
    .forEach((name) => {
      dom[name] = props[name];
    });

  const childElements = props.children || [];
  childElements.forEach((childElements) => render(childElements, dom));

  parentDom.appendChild(dom);
}

const TEXT_ELEMENT = "TEXT ELEMENT";

export function createElement(type, config, ...args) {
  const props = Object.assign({}, config);
  const hasChildren = args.length > 0;
  const rawChildren = hasChildren ? [].concat(...args) : [];
  props.children = rawChildren
    .filter(c => c !== null && c!== false)
    .map(c => c instanceof Object ? c : createTextElement(c));
  return { type, props };
}

function createTextElement(value) {
  return createElement(TEXT_ELEMENT, { nodeValue: value });
}


export default {}
