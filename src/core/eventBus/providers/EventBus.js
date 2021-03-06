import DiagramJsEventBus from 'diagram-js/lib/core/EventBus';


export default class EventBus extends DiagramJsEventBus {

    constructor () {
        super();
    }

    fire (name, payload, middleware) {
        const breadcrumbs = name.split('.');
        const fireMiddleware = middleware || breadcrumbs.length === 2;
        const type = breadcrumbs.splice(0, 2).join('.');

        if (fireMiddleware) {
            super.fire(type + '.start', payload);
        }

        const result = super.fire(name, payload);

        if (fireMiddleware) {
            super.fire(type + '.end', payload);
        }

        return result;
    }

    registerBehavior (name, priority, behavior) {
        const breadcrumbs = name.split('.');

        const prototype = Object.getPrototypeOf(behavior);
        const methods = Object.getOwnPropertyNames(prototype).filter((p) => {
            return p !== 'constructor'
                && p[0] !== '_'
                && typeof behavior[p] === 'function';
        });

        const type = breadcrumbs.splice(0, 2).join('.');
        methods.forEach((method) => {
            const callback = behavior[method].bind(behavior);

            switch (method) {
                case 'before':
                    this.on(type + '.start', callback);
                    break;
                case 'during':
                    this.on(type, callback);
                    break;
                case 'after':
                    this.on(type + '.end', callback);
                    break;
                default:
                    this.on(type + '.' + method, callback);
            }
        });
    }

}
