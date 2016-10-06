package com.kyledobitz.infrastructure.ui

import grails.gorm.rx.rest.RxRestEntity
import grails.rest.Resource

@Resource(uri="/app")
class App implements RxRestEntity<App> {
    String key
    String name
//    String uuid

    static constraints = {
        key blank:false
        name blank:false
    }

    static mapping = {
    }
}