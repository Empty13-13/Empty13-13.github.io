'use strict';

document.addEventListener('DOMContentLoaded', (event) => {

  let dataStatistic = {
    "ticketsFound": 1300,
    "boughtTickets": 100,
    "savingsPurchasedTickets": 1000000,
    "satisfiedCustomers": 1
  }
  let url = `http://194.58.92.109/v1/info/homepageStatistics`

  replaceData();

  async function replaceData() {
    const ticketsFound = await document.querySelector('#ticketsFound')
    const boughtTickets = await document.querySelector('#boughtTickets')
    const savingsPurchased_tickets = await document.querySelector('#savingsPurchased_tickets')
    const satisfiedCustomers = await document.querySelector('#satisfiedCustomers')

    if (ticketsFound && boughtTickets && savingsPurchased_tickets && satisfiedCustomers) {
      try {
        const dataStatistic = await fetchData(url)

        ticketsFound.innerHTML = dataStatistic.ticketsFound.toLocaleString().replaceAll(',',' ');
        boughtTickets.innerHTML = dataStatistic.boughtTickets.toLocaleString().replaceAll(',',' ');
        savingsPurchased_tickets.innerHTML = dataStatistic.savingsPurchasedTickets.toLocaleString().replaceAll(',',' ') + " ₽";
        satisfiedCustomers.innerHTML = dataStatistic.howManyCities.toLocaleString().replaceAll(',',' ');

      } catch (error) {
        console.error(error);
      }
    }
  }


  async function fetchData(url) {
    try {
      const response = await fetch(url)
      return await response.json()
    } catch (error) {
      console.error(error)
    }
  }
})
