const getDatas = {
  getUser: () => {
    fetch('https://api.github.com/users/ldrbraga')
      .then(response => response.json())
      .then(dataUser => {
        const urlRepo = dataUser.repos_url
        const urlStar = dataUser.subscriptions_url

        const html = `<div class="github__card__image">
                        <figure>
                            <img src="${dataUser.avatar_url}" alt="">
                            <a href="${dataUser.html_url}" target="_blank">
                                <figcaption>visitar perfil</figcaption>
                            </a>
                        </figure>
                    </div> 
                    <div class="github__card__info">  
                        <div class="github__card__info__repository">
                            <p>repositórios: ${dataUser.public_repos}</p>
                            <p>seguidores: ${dataUser.followers || 0}</p>
                            <p>seguindo: ${dataUser.following  || 0}</p>
                        </div>

                        <div class="github__card__info__btn">
                            <button class="btn__list__repo">ver repositórios</button>
                            <button class="btn__list__star">ver favoritos</button>
                        </div>
                    </div>
                    <div class="github__card__result"></div>`

        document.querySelector('.github__card').innerHTML = html;

        eventContructHtml.eventContructHtmlRepo(urlRepo)
        eventContructHtml.eventContructHtmlStar(urlStar)

      })
      .catch(error => console.error(error))
  },

  getRepoUser: (url) => {
    fetch(url)
      .then(response => response.json())
      .then(dataRepo => {
        const html = `<div class="github__card__result__title">
                        <h3>lista de repositórios</h3>
                        </div>
                        <div class="github__card__result__list">
                            <ul>
                              ${
                                dataRepo.map( (item) => {
                                  return `<li>${item.name}</li>`
                                }).join('')  
                              }
                            </ul>
                        </div>`

        document.querySelector('.github__card__result').innerHTML = html
      })
      .catch(error => console.error(error))
  },

  getRepoStar: (url) => {
    fetch(url)
      .then(response => response.json())
      .then(dataRepo => {
        const html = `<div class="github__card__result__title">
                        <h3>lista de favoritos</h3>
                        </div>
                        <div class="github__card__result__list">
                            <ul>
                              ${
                                dataRepo.map( (item) => {
                                  return `<li>${item.name}</li>`
                                }).join('')  
                              }
                            </ul>
                        </div>`

        document.querySelector('.github__card__result').innerHTML = html;
      })
      .catch(error => console.error(error))
  }
}

const eventContructHtml = {
  eventContructHtmlRepo: (urlRepoGet) => {
    document.querySelector('.btn__list__repo').addEventListener('click', () => {
      getDatas.getRepoUser(urlRepoGet)

      setTimeout(() => {
        document.querySelector('.github__card__result').classList.add('dropdown')
      }, 1000)
    })
  },

  eventContructHtmlStar: (urlStarGet) => {
    document.querySelector('.btn__list__star').addEventListener('click', () => {
      getDatas.getRepoStar(urlStarGet)

      setTimeout(() => {
        document.querySelector('.github__card__result').classList.add('dropdown')
      }, 1000)
    })
  }
}

window.onload = () => {
  getDatas.getUser()
}