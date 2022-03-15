import { Injectable } from "@angular/core";
import { CardStepModel } from "src/app/shared/components/cards/card-step/card-step.model";

@Injectable({
    providedIn: 'root',
})
export class ContestStepperService {
    constructor() { }

    public steps: CardStepModel[] = [
        new CardStepModel({
            svgUrl: 'notes',
            label: 'נתונים כלליים',
            path: 'details',
            size: 3,
            spacer: true,
        }),
        new CardStepModel({
            svgUrl: 'notes',
            label: 'נתונים מתכנית שנתית',
            path: 'yearly-details',
            size: 3,
            spacer: true,
        }),
        new CardStepModel({
            svgUrl: 'addperson',
            label: 'הנחיות עבודה למנות',
            path: 'work-instructions',
            size: 3,
            spacer: true,
        }),
        new CardStepModel({
            svgUrl: 'addperson',
            label: 'הנחיות עבודה לעומדים',
            path: 'work-instructions-stand',
            size: 3,
            spacer: true,
        }),
    ];

    public getSteps(): CardStepModel[] {
        return [...this.steps];
    }
}