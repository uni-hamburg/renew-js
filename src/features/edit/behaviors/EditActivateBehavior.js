import { Behavior } from '../../../core/eventBus/Behavior';


export class EditActivateBehavior extends Behavior {

    constructor (directEditing) {
        super();
        this.directEditing = directEditing;
    }

    during (context) {
        console.log('here');
        this.directEditing.activate(context);
    }

}
