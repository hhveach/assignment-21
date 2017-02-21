import Backbone from 'backbone';
import $ from 'jquery';
import {SingleModel, MultiCollection} from './models.js';
import HomeView from './homeview.js';
import ListingView from './listing.js';
import CategoryView from './category.js';
import SearchView from './search.js';


const AppRouter = Backbone.Router.extend({
  initialize: function(){
    Backbone.history.start();
  },

  routes: {
    'category/:cat' : 'categoryChange',
    'search/:key' : 'searchKey',
    'listing/:id' : 'listingId',
    '' : 'homePage'
  },

  categoryChange: function(cat){
    let change = new MultiCollection(cat);
    change.fetch().then(function(serverRes){
      // let results = change.models;
      let view = new CategoryView();
      view.render(change);
    });
  },

  listingId: function(id){
    let listing = new SingleModel(id);
    listing.fetch().then(function(serverRes){
      let view = new ListingView();
      view.render(listing);
    });
  },

  homePage: function(){
    let home = new MultiCollection();
    home.fetch().then(function(serverRes){
      // let results = home.models;
      let view = new HomeView();
      view.render(home);
    })
  },

  searchKey: function(key){
    let search = new MultiCollection(key);
    search.fetch().then(function(serverRes){
      // let results = search.models;
      let view = new SearchView;
      view.render(search);
    });
  }
});

const SickApp = new AppRouter();
