package com.kyledobitz.infrastructure.ui

import static org.springframework.http.HttpStatus.*
import grails.transaction.Transactional

@Transactional(readOnly = true)
class ComponentController {

    static responseFormats = ['json', 'xml']
    static allowedMethods = [save: "POST", update: "PUT", delete: "DELETE"]

    def index(Integer max) {
        params.max = Math.min(max ?: 10, 100)
        respond Component.list(params), model:[componentCount: Component.count()]
    }

    def show(Component component) {
        respond component
    }

    @Transactional
    def save(Component component) {
        if (component == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        component.app = App.get(params.app?.id)

        if (component.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond component.errors, view:'create'
            return
        }

        component.save
                .toBlocking()
                .first()

        respond component, [status: CREATED, view:"show"]
    }

    @Transactional
    def update(Component component) {
        if (component == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        if (component.hasErrors()) {
            transactionStatus.setRollbackOnly()
            respond component.errors, view:'edit'
            return
        }

        component.save flush:true

        respond component, [status: OK, view:"show"]
    }

    @Transactional
    def delete(Component component) {

        if (component == null) {
            transactionStatus.setRollbackOnly()
            render status: NOT_FOUND
            return
        }

        component.delete flush:true

        render status: NO_CONTENT
    }
}
