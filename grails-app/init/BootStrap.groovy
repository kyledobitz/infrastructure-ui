import com.kyledobitz.infrastructure.ui.App
import com.kyledobitz.infrastructure.ui.Component
import groovy.json.JsonSlurper
import org.grails.datastore.mapping.core.*
import org.grails.datastore.rx.rest.*
import org.springframework.core.env.PropertyResolver

class BootStrap {

    def init = { servletContext ->
        println "gathering external config"

        def rootConfigUrl = "http://localhost:8500/v1/kv/infrastructure-ui"

        def json = new JsonSlurper()

        def getValue = { url ->
            try{
                return new String(json.parseText(url.toURL().getText()).first().Value.decodeBase64())
            }catch(Exception e){
                println "Cannot find $url"
                return ""
            }
        }

        def api =[
                url: getValue("$rootConfigUrl/api-url"),
                username: getValue("$rootConfigUrl/sensitive/username"),
                password: getValue("$rootConfigUrl/sensitive/password")
        ]

        println "api.url: $api.url"

        PropertyResolver configuration = DatastoreUtils.createPropertyResolver(
                'grails.gorm.rest.readTimeout':1500,
                'grails.gorm.rest.host': api.url ?: 'http://localhost:8080')
        new RxRestDatastoreClient(
                configuration,
                App, Component
        )
    }
    def destroy = {
    }
}
