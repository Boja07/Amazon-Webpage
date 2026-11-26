
class Product {
  
  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
   
  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice() {
    return `$${(this.priceCents / 100).toFixed(2)}`;
  }

  extraInfoHTML(){
    return "";
  }
}

class Clothing extends Product {
  constructor(productDetails) {
    super(productDetails);  
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHTML() {
    return `<a href="${this.sizeChartLink}" target="_blank">Size Chart</a>`;
  }
}
export let products=[];
let xhr;
export function load(callback){
  xhr= new XMLHttpRequest;
  xhr.onreadystatechange=info1;
  xhr.open('GET','backend/products.json',true);
  xhr.send();
  function info1(){
    if(this.readyState==4 && this.status==200){
      const productData=JSON.parse(xhr.responseText);
      products=productData.map((productDetails) => {
        if( productDetails.type==='clothing') return new Clothing(productDetails);

        else return new Product(productDetails);
      });
      callback();
    }
  }
}

