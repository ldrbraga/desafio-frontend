"use strict";var getDatas={getUser:function(){fetch("https://api.github.com/users/ldrbraga").then(function(t){return t.json()}).then(function(t){var n=t.repos_url,e=t.subscriptions_url,r='<div class="github__card__image">\n                        <figure>\n                            <img src="'.concat(t.avatar_url,'" alt="">\n                            <a href="').concat(t.html_url,'" target="_blank">\n                                <figcaption>visitar perfil</figcaption>\n                            </a>\n                        </figure>\n                    </div> \n                    <div class="github__card__info">  \n                        <div class="github__card__info__repository">\n                            <p>repositórios: ').concat(t.public_repos,"</p>\n                            <p>seguidores: ").concat(t.followers||0,"</p>\n                            <p>seguindo: ").concat(t.following||0,'</p>\n                        </div>\n\n                        <div class="github__card__info__btn">\n                            <button class="btn__list__repo">ver repositórios</button>\n                            <button class="btn__list__star">ver favoritos</button>\n                        </div>\n                    </div>\n                    <div class="github__card__result"></div>');document.querySelector(".github__card").innerHTML=r,eventContructHtml.eventContructHtmlRepo(n),eventContructHtml.eventContructHtmlStar(e)}).catch(function(t){return console.error(t)})},getRepoUser:function(t){fetch(t).then(function(t){return t.json()}).then(function(t){var n='<div class="github__card__result__title">\n                        <h3>lista de repositórios</h3>\n                        </div>\n                        <div class="github__card__result__list">\n                            <ul>\n                              '.concat(t.map(function(t){return"<li>".concat(t.name,"</li>")}).join(""),"\n                            </ul>\n                        </div>");document.querySelector(".github__card__result").innerHTML=n}).catch(function(t){return console.error(t)})},getRepoStar:function(t){fetch(t).then(function(t){return t.json()}).then(function(t){var n='<div class="github__card__result__title">\n                        <h3>lista de favoritos</h3>\n                        </div>\n                        <div class="github__card__result__list">\n                            <ul>\n                              '.concat(t.map(function(t){return"<li>".concat(t.name,"</li>")}).join(""),"\n                            </ul>\n                        </div>");document.querySelector(".github__card__result").innerHTML=n}).catch(function(t){return console.error(t)})}},eventContructHtml={eventContructHtmlRepo:function(t){document.querySelector(".btn__list__repo").addEventListener("click",function(){getDatas.getRepoUser(t),setTimeout(function(){document.querySelector(".github__card__result").classList.add("dropdown")},1e3)})},eventContructHtmlStar:function(t){document.querySelector(".btn__list__star").addEventListener("click",function(){getDatas.getRepoStar(t),setTimeout(function(){document.querySelector(".github__card__result").classList.add("dropdown")},1e3)})}};window.onload=function(){getDatas.getUser()};