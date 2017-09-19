const target=document.querySelector("#target");
const frag=document.createDocumentFragment();
for(let i=target.children.length-1;i>=0;--i)
  frag.appendChild(target.children[i]);

// 删除原来的子节点
while(target.hasChildNodes())
  target.removeChild(target.lastChild);
target.appendChild(frag);
