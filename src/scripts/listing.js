import Backbone from 'backbone';

const ListingView = Backbone.View.extend({
  el: '#app-container',

  events: {
    'click .thumbnail' : 'clickedItem',
    'click .listing' : 'clickedCategory',
    'keydown input' : 'inputSubmit'
  },

  inputSubmit: function(evt){
    let current = evt.target;
    if(evt.keyCode === 13){
      window.location.hash = `search/${current.value}`;
    };
  },

  clickedItem: function(evt){
    let current = evt.currentTarget.dataset.id;
    window.location.hash = `listing/${current}`;
  },

  clickedCategory  : function(evt){
    let current = evt.currentTarget.dataset.ctg;
    window.location.hash = `category/${current}`;
  },

  insertContent: function(data){
    let img = data.get('Images');
    let shop = data.get('Shop');
    let materials = data.get('materials');
    let finalStr =   `<div class="header">
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
                        <input type="text" placeholder="What are you shopping for?"/>
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
        materialsStr += `<p class="material">${listEl}</p>`;
        return materialsStr;
      });
      
    return  finalStr + ` ${imgStr}
                        <h3>Seller Policies</h3>
                        <h5>Payment</h5>
                        <p>${shop.policy_payment}</p>
                        <h5>Shipping</h5>
                        <p>${shop.policy_shipping}</p>
                        <h5>Refunds</h5>
                        <p>${shop.policy_refunds}</p>
                        <h5>Additional Information</h5>
                        <p>${shop.policy_additional}</p>
                        </div>

                        <div class="single-info">
                          <h1 class="long-title">${data.get('title')}</h1>
                          <h1 class="price">$${data.get('price')}<button>Ask Questions</button></h1>
                          <p class="grey">Materials</p>
                          ${materialsStr}
                          <p class="item-info">Item Description</p>
                          <p>${data.get('description')}</p>
                        </div>
                        </div>`;
},


    render: function(data){
      this.el.innerHTML = this.insertContent(data);
    }
});

export default ListingView;
