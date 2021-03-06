import Backbone from 'backbone';

const SearchView = Backbone.View.extend({
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
    let finalStr = `<div class="header">
                      <h2 class="logo"><a href="#">Etsy</a></h2>
                    </div>
                    <hr/>
                    <div class="nav-bar">
                      <span class="listing" data-ctg="accessories" data-tax="">Accessories</span>
                      <span class="listing" data-ctg="jewelry" data-tax="">Jewelry</span>
                      <span class="listing" data-ctg="furniture" data-tax="">Furniture</span>
                      <span class="listing" data-ctg="crafts" data-tax="">Craft Supplies</span>
                      <span class="listing" data-ctg="weddings" data-tax="">Weddings</span>
                      <span class="listing" data-ctg="housewares" data-tax="">Housewares</span>
                      <span class="listing" data-ctg="vintage" data-tax="">Vintage</span>
                      <input type="text" placeholder="What are you shopping for?"/>
                      <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                    </div>
                    <hr/>
                    <div class="main-content column-container">`;
    let content = data.map(function(listEl){
      let img = listEl.get('Images');
      let shop = listEl.get('Shop');
      return `
             <div class="thumbnail" data-id="${listEl.get('listing_id')}" data-tax="${listEl.get('taxonomy_id')}">
             <img src="${img[0].url_170x135}"/>
             <h6>${listEl.get('title')}</h6>
             <p>${shop.shop_name}<span>$${listEl.get('price')}</span></p>
             </div>`
          }).join('');
    return finalStr + content + `</div>`;
  },

  render: function(data){
    this.el.innerHTML = this.insertContent(data);
  }
})

export default SearchView;
