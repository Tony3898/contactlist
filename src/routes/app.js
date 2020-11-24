const express = require('express');
const Promise = require("bluebird");
const router = express.Router();
const path = require('path')
const readFile = Promise.promisify(require("fs").readFile);

const getTitle = (nav, pagePath) => {
  return nav.filter((data) => {
    return data.path.toLowerCase() === pagePath;
  }).map((data) => {
    return data.name
  });
}

const renderHtml = (req, res) => {
  let pagePath = req.url.includes('?') ? req.url.substring(0, req.url.indexOf('?')) : req.url;
  let reqPage = pagePath.includes('/app/') ? pagePath.split("/app/")[1] : pagePath.replace('/', '')
  let filePath = path.join("ui/pages/" + reqPage + ".html")
  let nav = Tony.Config.nav;
  let title = nav ? getTitle(nav, '/app' + pagePath) : null
  title = nav && title.length ? title : reqPage.includes("-") ? reqPage.replace("-", " ") : reqPage.includes('?') ? reqPage.substring(0, reqPage.indexOf('?')) : reqPage
  readFile(filePath, 'utf-8').then(html => {
    res.render('page.hbs', {
      title: title ? title.toUpperCase() : Tony.Config.project_name.toUpperCase(),
      nav: nav ? nav : null,
      project: Tony.Config.project_name,
      html: html,
      query: req.query
    });
  }).catch(err => {
    if (err.code === 'ENOENT')
      res.render('404.hbs', {
        title: 'Error - Page Not Found'
      })
  })
}

module.exports = router.get("*", (req, res, next) => {
  renderHtml(req, res)
})