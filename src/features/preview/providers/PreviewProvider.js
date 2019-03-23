import { translate } from 'diagram-js/lib/util/SvgTransformUtil';
import { append, classes, clone, create, remove } from 'tiny-svg';


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

            switch (element.type) {
                case 'shape':
                    graphicsFactory.drawShape(visual, element);
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
        console.log('clear');
        if (this.visuals) {
            remove(this.visuals);
            this.visuals = null;
        }
    }

    moveTo (x, y) {
        if (this.visuals) {
            this.moveBy(x - this.visuals.elements[0].x, y - this.visuals.elements[0].y);
        }
    }

    moveBy (tx, ty) {
        if (this.visuals) {
            translate(this.visuals, tx, ty);
            console.log(this.visuals.elements.map(e => e.id), tx, ty);
        }
    }

}
