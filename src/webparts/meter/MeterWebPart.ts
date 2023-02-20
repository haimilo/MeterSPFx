import { Version } from "@microsoft/sp-core-library";
import {
    IPropertyPaneConfiguration,
    PropertyPaneTextField,
    PropertyPaneHorizontalRule,
    PropertyPaneLabel,
    PropertyPaneSlider,
    PropertyPaneToggle,
    PropertyPaneDropdown,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import * as React from "react";
import * as ReactDom from "react-dom";
import { PropertyFieldNumber } from "@pnp/spfx-property-controls/lib/PropertyFieldNumber";
import {
    PropertyFieldColorPicker,
    PropertyFieldColorPickerStyle,
} from "@pnp/spfx-property-controls/lib/PropertyFieldColorPicker";
import * as strings from "MeterWebPartStrings";
import { IMeterProps } from "./components/IMeterProps";
import Meter from "./components/Meter";

export interface IMeterWebPartProps {
    title: string;
    description: string;
    percentage: number;
    showPercentageValue: boolean;
    headerAlignment: string;
    colorPercentage: string;
}

export default class MeterWebPart extends BaseClientSideWebPart<IMeterWebPartProps> {
    public render(): void {
        const element: React.ReactElement<IMeterProps> = React.createElement(
            Meter,
            {
                title: this.properties.title,
                description: this.properties.description,
                percentage: this.properties.percentage,
                context: this.context,
                showPercentageValue: this.properties.showPercentageValue,
                headerAlignment: this.properties.headerAlignment,
                colorPercentage: this.properties.colorPercentage,
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
                            groupName: "Common Setting",
                            groupFields: [
                                PropertyPaneTextField("title", {
                                    label: "Title",
                                }),
                                PropertyPaneDropdown("headerAlignment", {
                                    label: "Alignment Header",
                                    options: [
                                        {
                                            key: "left",
                                            text: "Left",
                                            index: 0,
                                        },
                                        {
                                            key: "center",
                                            text: "Center",
                                            index: 1,
                                        },
                                        {
                                            key: "right",
                                            text: "Right",
                                            index: 2,
                                        },
                                    ],
                                }),
                                PropertyPaneHorizontalRule(),
                                PropertyPaneTextField("description", {
                                    label: strings.DescriptionFieldLabel,
                                }),
                            ],
                        },
                    ],
                },
                {
                    header: {
                        description: "Charts",
                    },
                    groups: [
                        {
                            groupName: "Chart Settings",
                            groupFields: [
                                // PropertyPaneTextField("percentage", {
                                //   label: "Percentage",
                                // }),
                                PropertyPaneLabel(null, {
                                    text: "Set show/hide percentage value",
                                }),
                                PropertyPaneToggle("showPercentageValue", {
                                    onText: "Show percentage value",
                                    offText: "Hide percentage value",
                                    checked:
                                        this.properties.showPercentageValue,
                                }),
                                PropertyPaneSlider("percentage", {
                                    min: 0,
                                    max: 100,
                                    step: 1,
                                    value: this.properties.percentage,
                                }),
                                PropertyFieldNumber("percentage", {
                                    key: "percentage",
                                    label: "Percentage Value",
                                    description:
                                        "Enter a value between 0 and 100",
                                    maxValue: 100,
                                    minValue: 0,
                                    disabled: false,
                                    value: this.properties.percentage,
                                    placeholder: "Enter a number value",
                                }),
                                PropertyFieldColorPicker("colorPercentage", {
                                    label: "Percentage Color",
                                    selectedColor:
                                        this.properties.colorPercentage,
                                    onPropertyChange:
                                        this.onPropertyPaneFieldChanged,
                                    properties: this.properties,
                                    disabled: false,
                                    debounce: 100,
                                    isHidden: false,
                                    alphaSliderHidden: false,
                                    style: PropertyFieldColorPickerStyle.Full,
                                    iconName: "Precipitation",
                                    key: "colorFieldId",
                                }),
                            ],
                        },
                    ],
                },
            ],
        };
    }
}
