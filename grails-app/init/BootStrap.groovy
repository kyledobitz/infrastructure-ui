import com.kyledobitz.infrastructure.ui.App
import com.kyledobitz.infrastructure.ui.Component
import org.grails.datastore.mapping.core.*
import org.grails.datastore.rx.rest.*
import org.springframework.core.env.PropertyResolver

class BootStrap {

    def init = { servletContext ->
        PropertyResolver configuration = DatastoreUtils.createPropertyResolver(
                'grails.gorm.rest.readTimeout':1500,
                'grails.gorm.rest.host':'http://localhost:8080')
        new RxRestDatastoreClient(
                configuration,
                App, Component
        )
    }
    def destroy = {
    }
}
