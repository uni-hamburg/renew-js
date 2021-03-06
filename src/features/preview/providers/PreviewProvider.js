import { translate } from 'diagram-js/lib/util/SvgTransformUtil';
import { append, classes, clone, create, remove } from 'tiny-svg';
import cloneDeep from 'lodash/cloneDeep';


export class PreviewProvider {

    constructor (canvas) {
        this.canvas = canvas;

        this.visuals = null;
    }

    createVisuals (elements) {
        elements = Array.isArray(elements) ? elements : [ elements ];

        this.clearVisuals();

        this.visuals = create('g', { opacity: 0.6 });
        this.visuals.elements = [];

        // hijack renderer to draw preview
        const elementRegistry = this.canvas._elementRegistry;
        const graphicsFactory = this.canvas._graphicsFactory;

        elements.forEach((element) => {
            const graphics = elementRegistry.getGraphics(element.id);
            let visual;

            if (!graphics) {
                visual = create('g', { id: element.id + '-preview' });
                classes(visual).add('djs-visual');
                translate(visual, element.x, element.y);
            } else {
                visual = clone(graphics);
            }

            element = cloneDeep(element);
            element.id += '-preview';

            switch (element.type) {
                case 'shape':
                    graphicsFactory.drawShape(visual, element);
                    element.sx = element.x;
                    element.sy = element.y;
                    this.visuals.elements.push(element);
                    break;
                case 'connection':
                    graphicsFactory.drawConnection(visual, element);
                    break;
            }

            append(this.visuals, visual);
        });

        append(this.canvas.getDefaultLayer(), this.visuals);

        return this.visuals;
    }

    clearVisuals () {
        if (this.visuals) {
            remove(this.visuals);
            this.visuals = null;
        }
    }

    move (dx, dy) {
        if (this.visuals) {
            translate(this.visuals, dx, dy);
            this.visuals.elements.forEach((element) => {
                element.x = element.sx + dx;
                element.y = element.sy + dy;
            });
        }
    }

}
