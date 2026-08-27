export let cart=JSON.parse(localStorage.getItem('cart'))||
[{
        id:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity:2,
        deliveyOptionsId:'1'
    },
    {
        id:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity:1,
        deliveyOptionsId:'2'
    }
];

function saveLocalStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}
export function addQuantity(pId, quantity = 1){
  const quantityToAdd = Number(quantity);
    let matchingItem;
    cart.forEach((item)=>{
      if(pId===item.id)
        matchingItem=item;
    });
    
    if(matchingItem){
      matchingItem.quantity+=quantityToAdd;
    }else{
        cart.push({
          id:pId,
          quantity:quantityToAdd,
          deliveyOptionsId:'1'
        });
    }
    console.log(cart);
    saveLocalStorage();
}

export function removeCartProduct(productId){
  const newCart=[];

  cart.forEach((product)=>{

    if(product.id!==productId){
      newCart.push(product);
    }
  })

  cart=newCart;
  saveLocalStorage();
}