import { TemplateSlot } from 'ojs/ojvcomponent';
export declare const processNodeTemplate: (datum: any, template: TemplateSlot<any>, context: any, templateName: string) => Record<string, any>;
export declare const processTemplate: (data: any[], template: TemplateSlot<any>, getContext: (context: any, index: number) => any, templateName: string) => Record<string, any>[];
