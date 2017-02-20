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
    console.log('wired')
  },

  routes: {
    'category/:cat' : 'categoryChange',
    'search/:key' : 'searchKey',
    'listing/:id' : 'listingId',
    '' : 'homePage'
  },

  categoryChange: function(cat){
    let location = window.location.hash.slice()
    console.log(location)
    let change = new MultiCollection(cat);
    change.fetch().then(function(serverRes){
      let results = change.models;
      let view = new CategoryView();
      view.render(results);
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
      let results = home.models;
      let view = new HomeView();
      view.render(results);
    })
  },

  searchKey: function(key){
    let search = new MultiCollection(key);
    search.fetch().then(function(serverRes){
      console.log(search.models);
      let results = search.models;
      let view = new SearchView;
      view.render(results);
    });
  }
})

const SickApp = new AppRouter();
