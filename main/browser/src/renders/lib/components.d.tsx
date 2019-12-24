
import _React from "react";
import _RDOM from "react-dom";

declare global {
    /**
     * The identifier used to capture Notifications.
     */
    export const RNotify = '__notify__';

    /**
     * A handler for `React` events.
     * @param e The `event` object.
     */
    export type ReactHndlKey = (e: _React.KeyboardEvent<Element>) => void;
    /**
     * ...
     */
    export type Kinds = "norm" | "info" | "warn" | "good" | "nope" | "mayb";

    /**
     * An props object vor label/value pairs.
     */
    export interface MultiObj {
        /**
         * ...
         */
        kind: Kinds;
        /**
         * The label
         */
        label: string;
        /**
         * The value.
         */
        value?: string;
        /**
         * ...
         */
        weight?: ("small");
        /**
         * ...
         */
        size?: (1|2|3|4|5|6);
        /**
         * ...
         */
        adjct?: string;
        /**
         * ...
         */
        more?: boolean;
        /**
         * ...
         */
        level?: {
            K: string;
            V: number;
        };
        /**
         * ...
         */
        collapse?: boolean;
    }
    /**
     * The name object of a user.
     */
    export interface NameObj {
        /**
         * The first-name of the user.
         */
        First: string;
        /**
         * The last-name of the user.
         */
        Last?: string;
    }
    /**
     * Props used in creating `Bubble` components.
     */
    export interface BubbleProps {
        /**
         * The purpose of the `Bubble`.
         */
        kind: ('user'|'add'|'more');
        /**
         * The element identifier of the `Bubble`.
         */
        id: string;
        /**
         * The name of a user-type `Bubble`.
         */
        name?: NameObj;
        /**
         * An _optional_ image-src to use for the `Bubble`.
         */
        img?: string;
        /**
         * An _optional_ list of `classNames` to style the `Bubble` with.
         */
        opts?: string[];
        /**
         * An _optional_ `plain-object` of custom `CSS` to style the `Bubble` with. 
         */
        style?: { [cssProp: string]: string; };
        /**
         * An _optional_ handler for user interaction.
         */
        onClick?(e: _React.SyntheticEvent): void;
    }
    /**
     * A list of user's name objects.
     */
    export interface BubbleObjs {
        [uid: number]: BubbleProps;
    }
    /**
     * A plain-object describing a Chat message.
     */
    export interface ChatMessage {
        /**
         *  The list of memberIDs this message is going to. Think of this as the threadID.
         */
        uids: number[];
        /**
         *  The user_id of the message sender.
         */
        who: number;
        /**
         * The text of the message.
         */
        text: string;
        /**
         * The time the message was sent.
         */
        time: Date;
        /**
         * An optional link to attach to the chat-user(s).
         */
        url?: string;
        /**
         * A flag denoting a new message.
         */
        latest?: boolean;
    }
    /**
     * A plain-object describing a Chat session.
     */
    export interface ChatProps {
        /**
         * The state of the Chat-window.
         */
        open?: boolean;
        /**
         *  The users within this Chat.
         */
        users: BubbleObjs;
        /**
         * The messages within this Chat.
         */
        messages: ChatMessage[];
        /**
         * The contents of the text-box input.
         */
        input?: string;
        /**
         * The `ReactRef` object representing the Chat's text-input.
         */
        forRef?: _React.RefObject<any>;
        /**
         * The handler for sending a message.
         */
        onKeyPress?(e: _React.SyntheticEvent): void;
    }
    /**
     * Props used in creating `Thread` components.
     */
    export interface ThreadProps {
        /**
         * A list of chat-threads the user is engaged in.
         */
        chats: ChatProps[];
        /**
         * The maximum amount of chat-users to display.
         */
        max?: number;
    }


    /**
     * The Base-Components one can use to create new Compoents with.
     */
    export type DFFComponent = (_React.Component|_React.PureComponent|Reflux.Component|Function);
    /**
     * A collection of Custom Components.
     */
    // export interface DFFComponents {
    //     [compName: string]: DFFComponent;
    // }
    export namespace DFFComponents {}

    /**
     * A collection of Base-Components one can use to create new Compoents with.
     */
    export type MixBase  	= { 
        React: 	_React.Component, 
        Pure: 	_React.PureComponent, 
        Reflux: Reflux.Component 
    }

    /**
     * The tag object that describe the Component collection, `from`, and it's `name`.
     */
    export type AgnoTag<F extends string, N extends string> = { 
        /**
         * The collection the Component resides in.
         */
        from: F;
        /**
         * The name of the Component.
         */
        name: N;
    }
    /**
     * A plain-object description of an Element/Component for use with 
     * {@link FluxComponents.Agnostic|Agnostic} or 
     * {@link FluxComponents.AgnoList|AgnoList}.
     */
    export type AgnoProps = {
        /**
         * The name of the Element/Component to render.
         */
        tag: AgnoTag<string,string> | keyof _React.ReactDOM;
        /**
         * If `true`, then each element set in {@link items} will be wrapped with the {@link tag}.
         */
        xerox: boolean;
        /**
         * The `ReactProps` for the Element/Component.
         */
        props: TPQryObject;
        /**
         * Any children within the element.
         */
        items: (string|AgnoProps|DFFComponent)[];
    }


    /**
     * A collection of all Component collections.
     */
    export namespace FluxElements {
        const RDOM: _React.ReactDOM;
    }

    /**
     * A collection of `Mixin` properties & methods for `React` components.
     */
    export interface FluxMixins {
        [mixinName: string]: {
            [memberName: string]: any;
        };
    }

    /**
     * A collection of Page structures to be rendered.
     */
    export interface FluxSpaces {
        [spaceName: string]: CFG.SPCE.SpaceHandler; 
    }

    /**
     * A collection of React-Components, Mixins, Functions, and other related utilities.
     */
    export namespace FluxComponents {
        /**
         * The user's session token. This will be needed when you need to make requests 
         * that require the user's token.
         */
        const Token:      string;
        /**
         * A user's basic-authentication string.
         * @hidden
         */
        const Basic:      string;
        /**
         * A global flag that tells you if the user is logged-in or not.
         */
        const IsAuthd:    boolean;
        const Receivers:  number;
        const Rejecters:  number;
        export import React = _React;
        const Actions:    FluxActions;
        const Reflux:     typeof ReFlux;
        const Spaces:     FluxSpaces;
        const Stores:     FluxStores;
        const Elements:   typeof FluxElements;
        const Mixins:     FluxMixins;
        /**
         * A React Mixin Factory. Starts with a Base-Component, `kind`, and inherits the mixins specifified in `mixes`.
         * @param kind The Component type to base this Component on.
         * @param {...string} mixes A list of mixins for the Base-Component to inherit from.
         * @returns The mixed-in Base-Compenent for your new Component to extend.
         */
        function Mix<T extends keyof MixBase>(kind: T, mixes?: string[]): MixBase[T];
        /**
         * Takes a tag object and returns the Component class it represents.
         * @param tag The tag object that describe the Component.
         * @returns The specified Component.
         */
        function Tag<F extends string, N extends string>(tag: AgnoTag<F,N>): DFFComponent;
        /**
         * Takes a plain-object description of an Element and returns the appropriate Component.
         * @param config The plain-object description of the Component.
         * @param key An optional Component `key` for Elements within a list.
         */
        function Agnostic(config: AgnoProps, key: string): DFFComponent;
        /**
         * Returns a list of the appropriate Components with their `ReactKeys` set.
         * @param list A list of AgnoProps.
         */
        function Agnolist(list: AgnoProps[]): DFFComponent[];
        /**
         * Retrieves the classes needed for a specified **[Font-Awesome](https://fontawesome.com)** icon.
         * @param icon The name of the icon.
         * @param theme The theme of the icon.
         * @returns An array of strings needed to render the icon.
         */
        function FA(icon: string, theme?: ('fas'|'far'|'fal'|'fad'|'fab')): string[];
        /**
         * Wraps a `URL` inside of a `url(...)` statement for `CSS` stylings.
         * @param url A `URL` string.
         */
        function iURL(url: string): string;
        /**
         * Joins the string values of a plain object into a string.
         * @param obj A plain-object of `{ key: string }`.
         * @param delim A string to join the object values by.
         */
        function joinV(obj: { [key: string]: string }, delim: string): string;
    }

    // export interface FluxComponents {
    //     Moar: string;
    // }

};

/**
 * Defines the `Flux-Components` for use within the App.
 * @param global The `Window` object, when called from a `Browser`. The `global` object, when called from the `Node` server.
 * @param Reflux The `Reflux` object.
 * @param Actions The `FluxActions`.
 * @param IOs The `SocketIO` container.
 */
declare function FluxComponentLoader(
    global: (NodeJS.Global|Window), 
    Reflux: typeof ReFlux, 
    Actions: FluxActions, 
    IOs: sIOs
): typeof FluxComponents;

export = FluxComponentLoader;