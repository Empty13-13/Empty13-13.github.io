document.addEventListener('DOMContentLoaded', (event) => {

  let ticketBody = document.querySelector('#ticketBody')

  if (ticketBody) {
    startTicket()

    async function startTicket() {
      //Переменные
      let uuid = getURLVarArr().uuid
      let url = `http://194.58.92.109/v1/advantageousTickets/${uuid}`
      let data = await fetchData(url)
      let iconsUrl = `http://194.58.92.109/v1/info/airlineLogo?width=200&height=200&airlineCode=${data.airline}`
      let departureDate = new Date(data.departureDate)
      let arrivalDate = new Date(data.arrivalDate)
      let imgAirline = document.querySelector('#imgAirline')
      let titlePage = document.querySelector('.search-result-slide__title')

      let coverageBtn = document.querySelector('.ticket-safe__btn.btn')
      let coveragePrice = document.querySelector('.ticket-safe__cost > span')
      let coverageData = await fetchData(`http://194.58.92.109/v1/insurance/priceInsurance?ticketId=${uuid}`)
      coveragePrice.innerHTML = `от ${coverageData.price.toLocaleString().replaceAll(',',' ')} ₽`
      coverageBtn.href = coverageData.link

      //Добавляем изображение
      if (imgAirline) {
        imgAirline.src = iconsUrl
      }

      //Добавляем название сверху
      if (titlePage) {
        titlePage.innerHTML = data.arrivalCityName
      }

      //Функция запроса к данным
      async function fetchData(url) {
        try {
          const response = await fetch(url)
          return await response.json()
        } catch (error) {
          console.error(error)
        }
      }

      //Функция собирание переменных из адресной строки
      function getURLVarArr() {
        var data = [];
        var query = String(document.location.href).split('?');
        if (query[1]) {
          var part = query[1].split('&');
          for (i = 0; i < part.length; i++) {
            var dat = part[i].split('=');
            data[dat[0]] = dat[1];
          }
        }
        return data;
      }

      //Создание блока билета
      const getTicket = () => {
        let month = 'января,феварля,марта,апреля,мая,июня,июля,августа,сентября,октября,ноября,декабря'.split(',')
        let body = document.createElement('div')
        body.classList.add('main-info-ticket__block')
        let departureLines = createLine(data.transfers).join()

        //Проверка на обратный путь
        if (data.arrivalDate) {
          //Создание линии
          let arrivalLines = createLine(data.returnTransfers).join()

          let html = `
                  <div class="main-info-ticket__row">
                    <div class="main-info-ticket__ticket ticket-main-info-ticket">
                      <div class="ticket-main-info-ticket__body">
                        <div class="ticket-main-info-ticket__bottom-line">
                          <div class="ticket-main-info-ticket__column">
                            <div class="ticket-main-info-ticket__time">${departureDate.getHours() < 10 ? "0" + departureDate.getHours() : departureDate.getHours()}:${departureDate.getMinutes() < 10 ? "0" + departureDate.getMinutes() : departureDate.getMinutes()}</div>
                            <p class="ticket-main-info-ticket__date">${departureDate.toLocaleString('ru', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }).replaceAll(',',' ')}</p>
                            <p class="ticket-main-info-ticket__day">${departureDate.toLocaleString('ru', {
            weekday: 'long'
          }).replaceAll(',',' ')}</p></div>
                          <div class="ticket-main-info-ticket__column info-ticket-times">
                            <div class="info-ticket-times__body">
                              <div class="info-ticket-times__top-line">
                                <div class="info-ticket-times__block">
                                  <picture>
                                    <source srcset="img/ticket/arrow-up-right.svg" type="image/webp">
                                    <img src="img/ticket/arrow-up-right.svg" alt="" class="info-ticket-times__img">
                                  </picture>
                                  <p>${data.departureCityName} <span> MOW</span></p>
                                </div>
                                <div class="info-ticket-times__block">
                                  <p>${data.arrivalCityName} <span> SGN</span></p>
                                  <picture>
                                    <source srcset="img/ticket/arrow-down-right.svg" type="image/webp">
                                    <img src="img/ticket/arrow-down-right.svg" alt="" class="info-ticket-times__img">
                                  </picture>
                                </div>
                              </div>
                              <div class="info-ticket-times__time-line time-line">
                                <div class="search-info-ticket-times__time-line time-line">
                                  <div class="time-line__line">
                                  ${departureLines}
                                  </div>
                                </div>
                              </div>
                              <div class="info-ticket-times__bottom-line">
                                <div class="info-ticket-times__text">DME</div>
                                <div class="info-ticket-times__text">${data.transfers > 0 ? data.transfers + (data.transfers > 1 ? " пересадки" : data.transfers > 4 ? " пересадок" : " пересадка") : ""}</div>
                                <div class="info-ticket-times__text">SGN</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr class="hr">
                      <div class="ticket-main-info-ticket__body">
                        <div class="ticket-main-info-ticket__bottom-line">
                          <div class="ticket-main-info-ticket__column">
                            <div class="ticket-main-info-ticket__time">${arrivalDate.getHours() < 10 ? "0" + arrivalDate.getHours() : arrivalDate.getHours()}:${arrivalDate.getMinutes() < 10 ? "0" + arrivalDate.getMinutes() : arrivalDate.getMinutes()}</div>
                            <p class="ticket-main-info-ticket__date">${arrivalDate.toLocaleString('ru', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }).replaceAll(',',' ')}</p>
                            <p class="ticket-main-info-ticket__day">${arrivalDate.toLocaleString('ru', {
            weekday: 'long'
          }).replaceAll(',',' ')}</p></div>
                          <div class="ticket-main-info-ticket__column info-ticket-times">
                            <div class="info-ticket-times__body">
                              <div class="info-ticket-times__top-line">
                                <div class="info-ticket-times__block">
                                  <picture>
                                    <source srcset="img/ticket/arrow-up-right.svg" type="image/webp">
                                    <img src="img/ticket/arrow-up-right.svg" alt="" class="info-ticket-times__img">
                                  </picture>
                                  <p>${data.arrivalCityName} <span> MOW</span></p>
                                </div>
                                <div class="info-ticket-times__block">
                                  <p>${data.departureCityName} <span> SGN</span></p>
                                  <picture>
                                    <source srcset="img/ticket/arrow-down-right.svg" type="image/webp">
                                    <img src="img/ticket/arrow-down-right.svg" alt="" class="info-ticket-times__img">
                                  </picture>
                                </div>
                              </div>
                              <div class="info-ticket-times__time-line time-line">
                                <div class="search-info-ticket-times__time-line time-line">
                                  <div class="time-line__line">
                                  ${arrivalLines}
                                    </div>
                                </div>
                              </div>
                              <div class="info-ticket-times__bottom-line">
                                <div class="info-ticket-times__text">DME</div>
                                <div class="info-ticket-times__text">${data.returnTransfers > 0 ? data.returnTransfers + (data.returnTransfers > 1 ? " пересадки" : data.returnTransfers > 4 ? " пересадок" : " пересадка") : ""}</div>
                                <div class="info-ticket-times__text">SGN</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>
                  <div class="buy-info-ticket">
                    <div class="buy-info-ticket__body">
                      <div class="buy-info-ticket__top">
                        <div class="buy-info-ticket__price">${data.price.toLocaleString().replaceAll(',',' ')} ₽</div>
                        <div class="buy-info-ticket__sell">-${data.discountPercentage}%</div>
                      </div>
                      <div class="buy-info-ticket__center">
                        <p class="buy-info-ticket__text">Средняя цена:  <span>${data.averageCost.toLocaleString().replaceAll(',',' ')} ₽</span></p>
                        <p class="buy-info-ticket__text">Вы экономите:  <span>${(data.averageCost - data.price).toLocaleString().replaceAll(',',' ')} ₽</span></p>
                      </div>
                      <a target="_blank" href="${data.link}" class="buy-info-ticket__btn">Подробнее</a>
                    </div>
                  </div>
      `
          body.innerHTML = html
        } else {

          let html = `
                                    <div class="main-info-ticket__row">
                    <div class="main-info-ticket__ticket ticket-main-info-ticket">
                      <div class="ticket-main-info-ticket__body">
                        <div class="ticket-main-info-ticket__bottom-line">
                          <div class="ticket-main-info-ticket__column">
                            <div class="ticket-main-info-ticket__time">${departureDate.getHours() < 10 ? "0" + departureDate.getHours() : departureDate.getHours()}:${departureDate.getMinutes() < 10 ? "0" + departureDate.getMinutes() : departureDate.getMinutes()} </div>
                            <p class="ticket-main-info-ticket__date">${departureDate.toLocaleString('ru', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }).replaceAll(',',' ')}</p>
                            <p class="ticket-main-info-ticket__day">${departureDate.toLocaleString('ru', {
            weekday: 'long'
          }).replaceAll(',',' ')}</p></div>
                          <div class="ticket-main-info-ticket__column info-ticket-times">
                            <div class="info-ticket-times__body">
                              <div class="info-ticket-times__top-line">
                                <div class="info-ticket-times__block">
                                  <picture>
                                    <source srcset="img/ticket/arrow-up-right.svg" type="image/webp">
                                    <img src="img/ticket/arrow-up-right.svg" alt="" class="info-ticket-times__img">
                                  </picture>
                                  <p>${data.departureCityName} <span> MOW</span></p>
                                </div>
                                <div class="info-ticket-times__block">
                                  <p>${data.arrivalCityName} <span> SGN</span></p>
                                  <picture>
                                    <source srcset="img/ticket/arrow-down-right.svg" type="image/webp">
                                    <img src="img/ticket/arrow-down-right.svg" alt="" class="info-ticket-times__img">
                                  </picture>
                                </div>
                              </div>
                              <div class="info-ticket-times__time-line time-line">
                                <div class="search-info-ticket-times__time-line time-line">
                                  <div class="time-line__line">
                                  ${departureLines}
                                    </div>
                                </div>
                              </div>
                              <div class="info-ticket-times__bottom-line">
                                <div class="info-ticket-times__text">DME</div>
                                <div class="info-ticket-times__text">${data.transfers > 0 ? data.transfers + (data.transfers > 1 ? " пересадки" : data.transfers > 4 ? " пересадок" : " пересадка") : ""}</div>
                                <div class="info-ticket-times__text">SGN</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="main-info-ticket__return return-main-info-ticket">
                      <div class="return-main-info-ticket__body">
                        <div class="return-main-info-ticket__column">
                          <div class="return-main-info-ticket__texts"><p class="return-main-info-ticket__return-text">
                            Обратный билет через:</p>
                            <p class="return-main-info-ticket__days-text">12-45 дней</p></div>
                          <div class="return-main-info-ticket__days-line">
                            <div class="return-main-info-ticket__range"></div>
                            <div class="return-main-info-ticket__days">
                              <div class="return-main-info-ticket__start-day">1 день</div>
                              <div class="return-main-info-ticket__end-day">30 дней</div>
                            </div>
                          </div>
                        </div>
                        <div class="return-main-info-ticket__column"><a href="" class="return-main-info-ticket__return-btn">Найти
                                                                                                                            обратный
                                                                                                                            билет</a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="buy-info-ticket">
                    <div class="buy-info-ticket__body">
                      <div class="buy-info-ticket__top">
                        <div class="buy-info-ticket__price">${data.price.toLocaleString().replaceAll(',',' ')} ₽</div>
                        <div class="buy-info-ticket__sell">-${data.discountPercentage}%</div>
                      </div>
                      <div class="buy-info-ticket__center">
                        <p class="buy-info-ticket__text">Средняя цена:  <span>${data.averageCost.toLocaleString().replaceAll(',',' ')} ₽</span></p>
                        <p class="buy-info-ticket__text">Вы экономите:  <span>${(data.averageCost - data.price).toLocaleString().replaceAll(',',' ')} ₽</span></p>
                      </div>
                      <a target="_blank" href="${data.link}" class="buy-info-ticket__btn">Подробнее</a>
                    </div>
                  </div>

      `
          body.innerHTML = html
        }
        return body

        function createLine(num) {
          let blueLines = []
          if (num < 1) {
            let line = `<span class="time-line__blue" style="width: 100%;left: 0%;"></span>`
            blueLines.push(line)

            return blueLines
          }
          let widthSpace = 100 / (num + 1) / 4
          let width = 100 / (num + 1) - widthSpace
          let left = width

          let line = `<span class="time-line__blue" style="width: ${width}%;left: 0%;"></span>`
          blueLines.push(line)

          for (let i = 0; i < num; i++) {
            left += widthSpace + widthSpace / num
            let line = `<span class="time-line__blue" style="width: ${width}%;left: ${left}%;"></span>`
            blueLines.push(line)
            left += width
          }
          return blueLines
        }
      }

      ticketBody.innerHTML = ""
      await ticketBody.append(getTicket())


      //Добавляем слайдер
      const priceSlider = document.querySelector('.return-main-info-ticket__range');
      if (priceSlider) {
        noUiSlider.create(priceSlider, {
          start: [12, 18],
          behaviour: 'drag',
          step: 1,
          connect: true,
          range: {
            'min': 1,
            'max': 30
          }
        });

        let timeBlock = document.querySelector('.return-main-info-ticket__days-text')
        priceSlider.noUiSlider.on('update', (values, handle) => {
          timeBlock.innerText = `${values[0].split('.')[0]}-${values[1].split('.')[0]} дней`
        })
      }
    }
  }

})

//====================================================================================================

