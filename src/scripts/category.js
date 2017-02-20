import Backbone from 'backbone';

const CategoryView = Backbone.View.extend({
  el: '#app-container',

  insertContent : function(data){
    console.log(data)
    let location = window.location.hash.slice(1)
    let content = data.map(function(listEl){
        let cat = listEl.get('category_path');
        let img = listEl.get('Images');
        let shop = listEl.get('Shop');
        let finalStr = ``;
        if(`category/${cat[0]}` === `${location}`){


        finalStr = `<div class="header">
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
                    <div class="main-content column-container">`;


      return  finalStr + `<div class="thumbnail" data-id="${listEl.get('listing_id')}">
               <img src="${img[0].url_170x135}"/>
               <h6>${listEl.title}</h6>
               <p>${shop.shop_name}<span>${listEl.price}</span></p>
               </div>`
            }}).join('');
      return content + `</div>`;
    },

    render: function(data){
      this.el.innerHTML = this.insertContent(data);
    }
});

export default CategoryView;
