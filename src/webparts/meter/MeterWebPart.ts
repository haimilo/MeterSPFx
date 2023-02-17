import { Version } from "@microsoft/sp-core-library";
import {
    IPropertyPaneConfiguration,
    PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import * as React from "react";
import * as ReactDom from "react-dom";

import * as strings from "MeterWebPartStrings";
import { IMeterProps } from "./components/IMeterProps";
import Meter from "./components/Meter";

export interface IMeterWebPartProps {
    title: string;
    description: string;
    percentage: number;
}

export default class MeterWebPart extends BaseClientSideWebPart<IMeterWebPartProps> {
    public render(): void {
        const element: React.ReactElement<IMeterProps> = React.createElement(
            Meter,
            {
                title: this.properties.title,
                description: this.properties.description,
                percentage: this.properties.percentage,
                context: this.context
            }
        );

        ReactDom.render(element, this.domElement);
    }

    protected onDispose(): void {
        ReactDom.unmountComponentAtNode(this.domElement);
    }

    protected get dataVersion(): Version {
        return Version.parse("1.0");
    }

    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription,
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                PropertyPaneTextField("title", {
                                    label: "Title",
                                }),
                                PropertyPaneTextField("description", {
                                    label: strings.DescriptionFieldLabel,
                                }),
                                PropertyPaneTextField("percentage", {
                                    label: "Percentage",
                                }),
                            ],
                        },
                    ],
                },
            ],
        };
    }
}
