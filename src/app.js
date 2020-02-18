import Vue from "vue";

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#app',
    data: {
      countries: [],
      selectedCountry: {
        name: "",
        flag: ""
      },
      favouriteCountries: []
    },
    computed: {
      totalPopulation: function(){
        return this.countries.reduce((runningTotal, country) => {
          return runningTotal + country.population
        }, 0);
      }
    },
    mounted(){
      this.fetchCountries();
    },
    methods: {
      fetchCountries: function(){
        const request = fetch('https://restcountries.eu/rest/v2/all')
        .then(response => response.json())
        .then(data => this.countries = data);
      },
      addToFavourites: function(){
        this.favouriteCountries.push(this.selectedCountry.name);
      },
      isBordered: function(country){
        return this.selectedCountry.borders.includes(country.alpha3Code);
      }
    }
  })
})
