package com.kyledobitz.infrastructure.ui

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class AppController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond App.list(params), model:[appCount: App.count()]
    }

    def show(App app) {
        respond app
                .toBlocking()
                .first()
    }

    @Transactional
    def save(App app) {
        if (app == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (app.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond app.errors, view:'create'
            return
        }

        app = app.save()
                .toBlocking()
                .first()

        respond app, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(App app) {
        if (app == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (app.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond app.errors, view:'edit'
            return
        }

        app.save flush:true

        respond app, [status: OK, view:"show"]
    }

    @Transactional
    def delete(App app) {

        if (app == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        app.delete flush:true

        render status: NO_CONTENT
    }
}
