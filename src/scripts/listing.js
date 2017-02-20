import Backbone from 'backbone';

const ListingView = Backbone.View.extend({
  el: '#app-container',

  insertContent: function(data){
      console.log(data)
      let img = data.get('Images');
      let shop = data.get('Shop');
      return         `<div class="header">
                        <h2 class="logo"><a href="#">Etsy</a></h2>
                        <i class="fa fa-shopping-cart" aria-hidden="true"></i>
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
                      </div>
                      <hr/>
                      <div class="main-content column-container">


               <div class="thumbnail" data-id="${data.get('listing_id')}">
               <img src="${img[0].url_170x135}"/>
               <h6>${data.get('title')}</h6>
               <p>${shop.shop_name}<span>$${data.get('price')}</span></p>
               </div></div>`;
    },

    render: function(data){
      this.el.innerHTML = this.insertContent(data);
    }
});

export default ListingView;