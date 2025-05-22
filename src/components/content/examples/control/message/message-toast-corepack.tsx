import {
    MessageToastItem,
    MessageToastTemplateValueParameters,
    CMessageToastElement
} from 'oj-c/message-toast';
import MutableArrayDataProvider = require('ojs/ojmutablearraydataprovider');

import 'preact';
import 'oj-c/message-toast';
import 'oj-c/button';

type CustomAction = {
    link?: string;
    title?: string;
};

type DemoMessageToastItem = MessageToastItem & {
    id: string;
    action?: CustomAction;
    detailLink?: CustomAction;
};

const initialMessages: Array<DemoMessageToastItem> = [
    {
        id: 'message1',
        severity: 'warning',
        summary: 'Warning message summary',
        detail:
            "This message uses the 'detail-template-value' property of the oj-c-message-toast component to choose the 'actions' template from the provided dynamic template slots." +
            'This overrides the default detail and renders the custom detail text and the action items.',
        action: { title: 'Retry', link: '#retry' }
    },
    {
        id: 'message2',
        severity: 'info',
        summary: 'Info message summary',
        detail:
            "This message uses the 'detail-template-value' property of the oj-c-message-toast component to choose the 'detailLink' template from the provided dynamic template slots." +
            'This overrides the default detail and renders the custom detail text and an inlined link.',
        detailLink: { title: 'More Info', link: '#viewDetails' }
    },
    {
        id: 'message3',
        severity: 'info',
        summary: 'Info message summary',
        detail: "",
        detailLink: { title: 'More Info', link: '#viewDetails' }
    }
];
const messages = new MutableArrayDataProvider([], {
    keyAttributes: 'id'
});

const loadMessages = () => {
    messages.data = initialMessages;
}


const _removeMessage = (key: string) => {
    const data = messages.data.slice();
    messages.data = data.filter((message) => (message as any).id !== key);
}


const detailLinkTemplate: CMessageToastElement.RenderDetailTemplate<DemoMessageToastItem['id'], DemoMessageToastItem> = (message) => {
    const handleAction = () => {

        // Perform action for "View details"

        // After performing the action, remove the current message
        _removeMessage(message.key);
    };

    return (
        <>
            {/* <!-- The detail text area --> */}
            <div class="oj-flex-item">
                <span>{message.data.detail} </span>
                <a href={message.data.detailLink?.link}
                    onClick={handleAction}
                    class="oj-link-embedded oj-link-subtle-secondary">
                    {message.data.detailLink?.title}
                </a>
            </div>
        </>
    )
}

const actionTemplate: CMessageToastElement.RenderDetailTemplate<DemoMessageToastItem['id'], DemoMessageToastItem> = (message) => {

    const handleAction = () => {

        // Perform action for "Learn more"

        // After performing the action, remove the current message
        _removeMessage(message.key);
    };

    return (
        <>
            <div class="oj-flex-item">
                <span>{message.data.detail}</span>
            </div>
            <div class="oj-flex-item oj-sm-padding-2x-top">
                <a
                    href={message.data.action?.link}
                    onClick={handleAction}
                    class="oj-link-standalone oj-typography-body-sm oj-typography-semi-bold">
                    {message.data.action?.title}
                </a>
            </div >
        </>
    )
}

const closeMessage = (event: CMessageToastElement.ojClose<DemoMessageToastItem['id'], DemoMessageToastItem>) => {
    _removeMessage(event.detail.key);
};

/**
 * Generates the name of the template slot to be used for the given message.
 *
 * @param context The item context
 * @returns The name of the template slot to be used
 */
const getDetailTemplate = (
    context: MessageToastTemplateValueParameters<DemoMessageToastItem['id'], DemoMessageToastItem>
) => {
    if (context.data.action) {
        return 'action';
    }
    if (context.data.detailLink) {
        return 'detailLink';
    }
    return undefined;
};


export function CMessageToast() {


    return (
        <div id="containerDiv">
            <oj-c-message-toast
                data={messages}
                detailTemplateValue={getDetailTemplate}
                onojClose={closeMessage}>
                {/* <!-- A template for rendering action items for a message --> */}
                <template slot="action" render={actionTemplate}></template>
                <template slot="detailLink" render={detailLinkTemplate}></template >
            </oj-c-message-toast >
            <oj-c-button onojAction={loadMessages} label='Show toast messages'></oj-c-button>
        </div >
    )
}
// analyse the preact component Components in the file components.tsx, along with the preact hook useMetadataForComponents and figure out why this goes into a loop when the array of components passed to the hook is large enough to require multiple batch fetches. The symptom is that we get repeated identical fetches from the server implying that the useEffect call on line 62 of the useMetadataForComponents.ts is being executed too frequently