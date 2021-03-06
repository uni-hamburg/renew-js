import { Tool } from '../../../core/toolbox/Tool';


export class HandTool extends Tool {

    constructor (eventBus) {
        super();
        this.eventBus = eventBus;
    }

    onDisable (event) {
        this.eventBus.fire('cursor.unset');
    }

    onEnable (event) {
        this.eventBus.fire('cursor.set.grab');
    }

    onMouseDown (event) {
        this.eventBus.fire('cursor.set.grabbing');
    }

    onMouseMove (event) {
        if (event.mouseDown) {
            this.eventBus.fire('hand.move', event);
        }
    }

    onMouseUp (event) {
        this.eventBus.fire('cursor.set.grab');
    }

}
