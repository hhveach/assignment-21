import Backbone from 'backbone';

const HomeView = Backbone.View.extend({
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

  insertContent : function(data){
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
                      <input type="text" placeholder="What are you shopping for?"/>
                      <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                    </div>
                    <hr/>
                    <div class="main-content column-container">`;
    let content = data.map(function(listEl){
      let shop = listEl.get('Shop');
      let img = listEl.get('Images');
      if(img === undefined || img.length === 0){
        img =  `<img src"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQERAQExMQEBAXGBASFxAREBARFRUQFhUWFxUWFRcYHCggGBslHhYXIjEhJSkrLi4uFx8zODMsNygtLisBCgoKDQ0NGg0NFy4ZHxkrKysrKy0rLSsrKysrKysrKysrKy0rKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAMIBAwMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAwUGBAIBB//EAD8QAAIBAgQBCQUFBwMFAAAAAAABAgMRBAUSITEGEyJBUWFxgaEyUpGx0SMzYnLBFSRCU4Lh8BSi8TQ1Y3OS/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD9xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKrMs2lSqxpRp85KSuulbt7u4tTN5y5rGUdCi56dlLZfxcQOzD523zsZU3TqQi56G+KS7TtyzG89TjUtpvq6N78G0VLy+qliMRVcdbpziox4JW/sU7oKNDDVk5a3Nrjskm+HZw9QNw2cuZ46NCHONOSulZWvv4lJmFPn8XKlNvRGndJO2+lO/wAWcNSTngU5NtwqaU2+pr+4Gxp1FKKl1NJ/E9pmXzGiorB0FdU5NOSu97tX382dPJ7oVsTRTeiLVk3e27QFjm+P/wBPT5zTq3UbXtxv9CDGZwoQo1FHUqjS42tfyIeV3/T/ANcfkyqzLoqlT6lUhOK/BOKfzuBr7nLmePjQhrknJXSsrX38Skx9Ln8XUpzb0xptxSdrPSnf4s4K03PAxlJtuFRxTb6mgNnTnqSfakyuznNv9Po6Otyvte1kuvgdWXUI06cIx4Wvu78d38ygzqvCWJcZyUYxpzir+/KL29V8ANDg8SqlOFThqSdr8L9RNcx8XzmB/FSnfyf/AD6HZRlz2InPVpUKKtP3XKPH/cwNJc5p4ioqqp823Tau6l+D32t5L4mRvGE6MqTqSeuzrO8VN3WyXgy5r/8AcKf5P0mB34DMudq1qem3Nu173vu15cDvuZzLF9tjulo49P3d5blWnGE6MqTqPp2dZ3ipu62S8ANRPMrYiOH08Y6td+5vh5EuaY3maUqltVtO17cWlx8ymzDDqpjowbaThvZ2drS2OGlJ/wCjxEbtqM4JX6lqiBrcLW1whPhqUZWvwurkpkszqNrB02pSg4QbhDjLhwLDkypxdaLjUjTunBTTWzvt6IC9AAAAAAAAAAAAACtxOXSliKddOKjFWa3u+P1LIAQ4yk505wWzlGUbvvVinqZHN0KNLVC8JOTe9mm3w+JfACozDKqkqvPUpxhJx0PUr3XA8SyL925hSWrVrcmtnIugBTYjKas4Ubziq1N7T07NdSt5InynLZUnUnOSnUm7tpWX+blkAK/O8BKvT5uLUXdO7vba/Z4nPmeTOrzLTipQsm3fdK30LgAU+YZVUlVdalOMJOOiWpX24benwPE8i/dlQUlq1a9TWzZdgCDA05xpxjNqUls2lZd3ocODym1WtUqaJ63srXsr9/kWoApsLk0oLEQ1R5upfSlfo8bXPmW5K6dOrCck3NadUb7RtbrLoAZ39hVtNKDnT005OSWmSbu7u7LCpl0nio17x0qOnTvf+L6lkAKehk8lLEuUlpq3Ste63fH4nL+wq2mlBzp6acm0kpJtN3dzRACoxmWVZYhV4ShFqOlKSb3s1+pFHI5LD1KWqOuclJys7bNP9C8AFPisnlKNBxmo1aSilJq6drHTlWBnS1upN1Jyd3u7LwTO8AAAAAAAAAAAAAAAAAAAAAAAAAACKviIU1ecoxXbJpASgz+YcpoR2pLnH7zuo/VlXPlLiH1wXhH6sDaAxcOUuIX8t+MX+jOqlyrn/FTi/wAra+YGqBS4flLQl7WqD71dfFFtRrRmtUZKS7U0wJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAR1q8IK8pRiu9pFHnWd0nTlCEtcnZWs3FrrTf0At6mPox2dSCfZqRkM7lOrUnUupQWy0yUrR4JtJ7HGq8P5UP/AKnb5nyeKbTilGCfFRXHxb3YHOAAB0YHDc7OMNUY3v0pcEc4A08OT+HXtVr+DhH6klLB4Wk7wrzU+rTNSbfZpS3MpY7MpxXNVoT6r2f5XswN9QbcYuStKyuu89hAAAAAAAAAAAAAAAAAAAAAAAAAAAABVcoMydCC0+3K6TfUlxZamb5ZLo0n3yXogM1WrSm9Um5PtbuRgAeowb4JvwTZK8NNe1GSX5Wd2S5w8PeLipQe/Umn3MtJ5/S0yWzvfeSkmr9qSd2vH4AZicGnb/Gu08nbipxmpSSslJJL8LW/qr+ZyQi20lu3ZJd7ARi2fCfFWj9mt0uL7Z9fkuBAB8Pp8NBl+X06FNYjEeMafyuutgTZTjMdJK0VOG280o7dzNFQnNrpRUX2KWpfJGfr4mpOPOVpvD0X7NGHtyXzOOnm2Hi9qEmvelUbl4gbEHBg8ypzULezLaMm79LrjLsl8zvAAAAAAAAAAAAAAAAAAAAAAAAAGe5ZL7On+Z/I0JQ8sF9lB/iXyYGQAAA9Ri20lxex5J8H95DxQH2s1GOhO7vdy6rray+pNlitzlX3INr876MfV+hxFjhF+7Yh99JeV7gVx8Pp8At+TmBVSprl93DpO/BvqX6+R3xqRrzniav3FLaEeqT6vHq9DxfmcAre1VfpL+y9SDPZc3ToYZdSU5d8n/jA90eUDlVTnCnobUX0byUfFkvKbKoQjz0Fp3SlFcN+DXYZ2Cu0u9G15RbYWd/wLzugM7kUtXOUfei5R7qkN4tGtyvFc7ShPras/wAy2Zjcgf7xS8f0NLyXf2U//ZP9ALgAAAAAAAAAAAAAAAAAAAAAAAApeVq+w/qj+pdFRypg3h5dzi/K4GJAAAmwf3kPFEJNg/vIeKAiLPLFqo4qHXpjNf0u7Kw7MnxXNVYys2neMkle8Xs9gOI+ljm2VzoybSbpPeMknwfU+xlcBqMxp3jgKfVeHyRU8o5N4mp3aV5aUWuKnfD4Ot7koX+T9URZrRoVa8tc+ZmrXdrxnG3RafU7beQFdkGDdWtH3YtSk+5cF5lxyvxSUYUlxb1PwXD/ADuPccywuFp6aT5yXd1y7ZMzOJxE603OW8pPgvRIDsyJWnOr1U4Tl5tWXzNNybouGHhfjK8/jw9Cjp4JpQwq9ubU6zX8MVwia2jayS2S2XggPYAAAAAAAAAAAAAAAAAAAAAAABFiEmrNJp7NPg0yUjrLYDMZjyd4yo7/APjk914PrKCrTlF6ZJxfY1Zn6DYjr4eFRWnGM13rfyYH5+dGXxvVprtlFfFmlr8m6Mt4ynDu2kvXc95fkNOlJTcnUkt1dJJPtAhw/JylH25SqPsXRX1LOhQhT2hCMO9Lf4k7Q0kHlSf/ADuVuMySjUu0ual2x9nziWmkaQKvLsBOMJ4aotVKV9NSO68H2PrIMXlbrxUG1HEU1pu+FSmuDTLtXR97LpO3Du8CjG/sSqn0nSguturDY7cFQjB2oJ16381q1On3q/FmjqU4y3lGEvGKZ9SsrKyXYlZAceAwSoxe+qpLedR9b7F3Fhh+BHpJqSsgPYAAAAAAAAAAAAAAAAAAAAAAAB5mtj0AIbCxJpGkCOwsSaRpAjsLEmk+2AisLEthpAisLEmkaQI7CxLY+aQPCiSnxI+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf//Z"/>`;
      }
      else {img = `<img src="${img[0].url_170x135}"/>`;}

    return ` <div class="thumbnail" data-id="${listEl.get('listing_id')}">
             ${img}
             <h6>${listEl.get('title')}</h6>
             <p>${shop.shop_name}<span>$${listEl.get('price')}</span></p>
             </div>`
          }).join('');
    return finalStr + content + `</div>`;
  },

  render: function(data){
    this.el.innerHTML = this.insertContent(data);
  }
});

export default HomeView;
