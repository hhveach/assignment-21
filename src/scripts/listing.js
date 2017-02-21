import Backbone from 'backbone';

const ListingView = Backbone.View.extend({
  el: '#app-container',

  // events: {
  //   'click .small-img' : 'imageClick'
  // },
  //
  // imageClick: function(){
  //
  // },

  insertContent: function(data){
    let img = data.get('Images');
    let shop = data.get('Shop');
    let ship = data.get('ShippingInfo');
    let materials = data.get('materials');
      let finalStr = `<div class="header">
                        <h2 class="logo"><a href="#">Etsy</a></h2>
                      </div>
                      <hr/>
                      <div class="nav-bar">
                        <span class="listing" data-ctg="accessories">Accessories</span>
                        <span class="listing" data-ctg="jewelry">Jewelry</span>
                        <span class="listing" data-ctg="furniture">Furniture</span>
                        <span class="listing" data-ctg="crafts">Craft Supplies</span>
                        <span class="listing" data-ctg="weddings">Weddings</span>
                        <span class="listing" data-ctg="housewares">Housewares</span>
                        <span class="listing" data-ctg="vintage">Vintage</span>
                        <input type="text" placeholder="Search Etsy"/>
                        <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                      </div>
                      <hr/>
                      <div class="main-content column-container">
                      <div class="single-images"><img class="main" src="${img[0].url_fullxfull}"/>`;



      let imgStr = ``;
      let newStr = img.map(function(listEl){
        imgStr += `<img class="small-img" src="${listEl.url_75x75}"/>`;
        return imgStr;
      });

      let materialsStr = ``;
      let mstr = materials.map(function(listEl){
        materialsStr += `<span class="material">${listEl}</span>`;
        return materialsStr;
      });

      // let shipStr = ``;
      // let sstr = materials.map(function(listEl){
      //   shipStr += `<span>${listEl}</span>`;
      //   return shpipStr;
      // });

    return  finalStr + ` ${imgStr}
                        <h3>Item Details</h3>
                         <p>${data.get('description')}</p>
                        </div>

                        <div class="single-info">
                          <h1 class="title">${data.get('title')}</h1>
                          <h1 class="price">$${data.get('price')}<button>Ask Questions</button></h1>
                          <p>Materials</p>
                          ${materialsStr}
                          <p>Shipping</p>
                        </div>
                        </div>`;
},


    render: function(data){
      this.el.innerHTML = this.insertContent(data);
    }
});

export default ListingView;
