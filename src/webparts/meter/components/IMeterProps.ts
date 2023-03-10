import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IMeterProps {
    context: WebPartContext;
    description: string;
    title: string;
    percentage: number;
    showPercentageValue: boolean;
    headerAlignment: string;
    colorPercentage: string;
}
