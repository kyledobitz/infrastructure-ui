package com.kyledobitz.infrastructure.ui

import grails.gorm.rx.rest.RxRestEntity
import grails.rest.Resource

@Resource(uri="/component")
class Component implements RxRestEntity<Component> {
    String key
    String name
    String uuid

    String server
    String system

    App app

    static constraints = {
        key blank:false
        name blank:false

        server blank:false
        system blank:false
        app nullable:false
        uuid nullable:true
    }

    static mapping = {
    }
}