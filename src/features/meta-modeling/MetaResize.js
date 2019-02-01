/**
 * Resize any shape and path relative to initial state
 */
export class MetaResize {
    constructor (eventBus) {
        this.eventBus = eventBus;

        this.init();
    }

    init () {
        this.eventBus.on('resize.start', this.onResizeStart.bind(this));
        this.eventBus.on('resize.move', this.onResizeMove.bind(this));
        this.eventBus.on('resize.end', this.onResizeEnd.bind(this));
    }

    onResizeStart (event) {
    }

    onResizeMove (event) {
        this.resizeElement(event.shape.body);
    }

    /**
     * Recursive resize of elements and children
     * @param {Object} element svgson object
     */
    resizeElement (element) {
        element.children.forEach((child) => {
            this.resizeElement(child);
        });
    }

    onResizeEnd (event) {
    }
}