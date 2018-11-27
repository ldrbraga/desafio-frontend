let anchorlinks = document.querySelectorAll('.topbar__nav__menu__item a[href^="#"]')

anchorlinks.forEach(function (item) {
  item.addEventListener('click', (e) => {
    let hashval = item.getAttribute('href')
    let target = document.querySelector(hashval)
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
    history.pushState(null, null, hashval)
    e.preventDefault()
  })
})