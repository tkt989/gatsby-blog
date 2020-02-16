#!/usr/bin/env node
const moment = require("moment")
const mustache = require("mustache")
const fs = require("fs")
const mkdirp = require("mkdirp")
const dirname = require("path").dirname

const now = moment()
const year = now.format("YYYY")
const month = now.format("MM")
const day = now.format("DD")

fs.readFile("./script/post.md", "utf-8", (err, content) => {
  const view = {
    title: process.argv[2],
    date: now.format(),
  }
  const render = mustache.render(content, view)
  const file = `./content/blog/${year}/${month}/${day}/${process.argv[2]}.md`
  mkdirp.sync(dirname(file))
  fs.writeFile(file, render, err => {
  })
})