import SelectionModule from '../selection';
import RubberBandModule from '../rubber-band';
import MoveModule from '../move';
import CursorModule from '../cursor';

import { SelectBehavior } from './behaviors/SelectBehavior';
import { PointerProvider } from './providers/PointerProvider';
import { PointerTool } from './tools/PointerTool';


export default {
    __depends__: [
        CursorModule,
        SelectionModule,
        RubberBandModule,
        MoveModule,
    ],
    __init__: [
        'pointer',
    ],
    __behaviors__: [
        [ 'pointer.select', SelectBehavior ],
    ],
    __commands__: [
    ],
    __rules__: [],
    __tools__: [
        [ 'pointer', PointerTool ],
    ],

    pointer: [ 'type', PointerProvider ],
};
