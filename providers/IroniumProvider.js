'use strict'

const path = require('path')
const { ServiceProvider } = require('@adonisjs/fold')

class IroniumProvider extends ServiceProvider {
  register () {
    this.app.singleton('Adonis/Addons/Ironium', function (app) {
      const Helpers = app.use('Adonis/Src/Helpers')
      const Logger = app.use('Adonis/Src/Logger')
      const Config = app.use('Adonis/Src/Config')
      const Ironium = require('../src/Ironium')
      const { jobs } = require(path.join(Helpers.appRoot(), 'start/app.js')) || []
      for (let i = 0; i < jobs.length; i++) {
        const Job = app.use(jobs[i])
        jobs[i] = new Job()
      }
      return new Ironium(Logger, Config.get('ironium'), jobs)
    })

    this.app.alias('Adonis/Addons/Ironium', 'Ironium')
  }
}

module.exports = IroniumProvider
