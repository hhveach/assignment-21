import Backbone from 'backbone';

export const SingleModel = Backbone.Model.extend({
  url: ``,

  initialize: function(listid){
    this.url = `https://openapi.etsy.com/v2/listings/${listid}.js?includes=Images,Shop,&api_key=mys8nyjcnzpwarpygfo80jow&callback=?`;
  },

  parse: function(rawServerRes){
    if(typeof rawServerRes.results !== 'undefined' ){
      return rawServerRes.results[0];
    } else {
      return rawServerRes;
    }
  }
});

export const MultiCollection = Backbone.Collection.extend({
  model: SingleModel,

  url: `https://openapi.etsy.com/v2/listings/active.js?includes=Images,Shop,&api_key=mys8nyjcnzpwarpygfo80jow&callback=?`,

  initialize: function(){},

  parse: function(rawServerRes){
    return rawServerRes.results;
  }
})
