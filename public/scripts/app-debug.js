"use strict";

var getDatas = {
  getUser: function getUser() {
    fetch('https://api.github.com/users/ldrbraga').then(function (response) {
      return response.json();
    }).then(function (dataUser) {
      // console.log(dataUser) // Prints result from response.json() in getRequest
      var urlRepo = dataUser.repos_url;
      var urlStar = dataUser.subscriptions_url;
      var html = "<div class=\"github__card__image\">\n                        <figure>\n                            <img src=\"".concat(dataUser.avatar_url, "\" alt=\"\">\n                            <a href=\"").concat(dataUser.html_url, "\" target=\"_blank\">\n                                <figcaption>visitar perfil</figcaption>\n                            </a>\n                        </figure>\n                    </div> \n                    <div class=\"github__card__info\">  \n                        <div class=\"github__card__info__repository\">\n                            <p>reposit\xF3rios: ").concat(dataUser.public_repos, "</p>\n                            <p>seguidores: ").concat(dataUser.followers || 0, "</p>\n                            <p>seguindo: ").concat(dataUser.following || 0, "</p>\n                        </div>\n\n                        <div class=\"github__card__info__btn\">\n                            <button class=\"btn__list__repo\">ver reposit\xF3rios</button>\n                            <button class=\"btn__list__star\">ver favoritos</button>\n                        </div>\n                    </div>\n                    <div class=\"github__card__result\"></div>");
      document.querySelector('.github__card').innerHTML = html;
      eventContructHtml.eventContructHtmlRepo(urlRepo);
      eventContructHtml.eventContructHtmlStar(urlStar);
    }).catch(function (error) {
      return console.error(error);
    });
  },
  getRepoUser: function getRepoUser(url) {
    // console.log(urlRepo)
    fetch(url).then(function (response) {
      return response.json();
    }).then(function (dataRepo) {
      // console.log(dataRepo) // Prints result from response.json() in getRequest
      var html = "<div class=\"github__card__result__title\">\n                        <h3>lista de reposit\xF3rios</h3>\n                        </div>\n                        <div class=\"github__card__result__list\">\n                            <ul>\n                              ".concat(dataRepo.map(function (item) {
        return "<li>".concat(item.name, "</li>");
      }).join(''), "\n                            </ul>\n                        </div>");
      document.querySelector('.github__card__result').innerHTML = html;
    }).catch(function (error) {
      return console.error(error);
    });
  },
  getRepoStar: function getRepoStar(url) {
    // console.log(urlRepo)
    fetch(url).then(function (response) {
      return response.json();
    }).then(function (dataRepo) {
      // console.log(dataRepo) // Prints result from response.json() in getRequest
      var html = "<div class=\"github__card__result__title\">\n                        <h3>lista de favoritos</h3>\n                        </div>\n                        <div class=\"github__card__result__list\">\n                            <ul>\n                              ".concat(dataRepo.map(function (item) {
        return "<li>".concat(item.name, "</li>");
      }).join(''), "\n                            </ul>\n                        </div>");
      document.querySelector('.github__card__result').innerHTML = html;
    }).catch(function (error) {
      return console.error(error);
    });
  }
};
var eventContructHtml = {
  eventContructHtmlRepo: function eventContructHtmlRepo(urlRepoGet) {
    document.querySelector('.btn__list__repo').addEventListener('click', function () {
      getDatas.getRepoUser(urlRepoGet);
      setTimeout(function () {
        document.querySelector('.github__card__result').classList.add('dropdown');
      }, 1000);
    });
  },
  eventContructHtmlStar: function eventContructHtmlStar(urlStarGet) {
    document.querySelector('.btn__list__star').addEventListener('click', function () {
      getDatas.getRepoStar(urlStarGet);
      setTimeout(function () {
        document.querySelector('.github__card__result').classList.add('dropdown');
      }, 1000);
    });
  }
};

window.onload = function () {
  getDatas.getUser();
};