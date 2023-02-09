/// <amd-module name="@scom/scom-page-builder/assets.ts" />
declare module "@scom/scom-page-builder/assets.ts" {
    function fullPath(path: string): string;
    const _default: {
        fonts: {
            roboto: {
                bold: string;
                italic: string;
                light: string;
                medium: string;
                regular: string;
                thin: string;
            };
            notosans: {
                bold: string;
                italic: string;
                light: string;
                medium: string;
                regular: string;
                thin: string;
            };
        };
        icons: {
            logo: string;
            logoMobile: string;
            validocs: string;
        };
        img: {
            network: {
                bsc: string;
                eth: string;
                amio: string;
                avax: string;
                ftm: string;
                polygon: string;
            };
            wallet: {
                metamask: string;
                trustwallet: string;
                binanceChainWallet: string;
                walletconnect: string;
            };
        };
        fullPath: typeof fullPath;
    };
    export default _default;
}
/// <amd-module name="@scom/scom-page-builder/const/textbox.ts" />
declare module "@scom/scom-page-builder/const/textbox.ts" {
    export const textStyles: {
        title: string;
    }[];
}
/// <amd-module name="@scom/scom-page-builder/const/index.ts" />
declare module "@scom/scom-page-builder/const/index.ts" {
    export const EVENT: {
        ON_LOAD: string;
        ON_SAVE: string;
        ON_CONFIG_SAVE: string;
        ON_CONFIG_CHANGE: string;
        ON_PAGING_UPDATE: string;
        ON_SWITCH_PAGE: string;
        ON_TOGGLE_PAGE_VISIBILITY: string;
        ON_UPDATE_SECTIONS: string;
        ON_HASH_CHANGE: string;
        ON_PREVIEW: string;
        ON_ADD_ELEMENT: string;
        ON_CLONE: string;
        ON_RESIZE: string;
        ON_UPDATE_FOOTER: string;
    };
    export const DEFAULT_BOXED_LAYOUT_WIDTH = "1200px";
    export const DEFAULT_SCROLLBAR_WIDTH = 17;
    export const DEFAULT_SIDEBAR_MENU_WIDTH = 350;
    export const DEFAULT_FOOTER_HEIGHT = 50;
    export const IPFS_UPLOAD_END_POINT = "https://ipfs-gateway.scom.dev/api/1.0/sync/data";
    export const IPFS_GATEWAY_IJS = "https://ipfs.scom.dev/ipfs/";
    export const IPFS_GATEWAY = "https://ipfs.io/ipfs/";
    export * from "@scom/scom-page-builder/const/textbox.ts";
}
/// <amd-module name="@scom/scom-page-builder/utility/pathToRegexp.ts" />
declare module "@scom/scom-page-builder/utility/pathToRegexp.ts" {
    export interface ParseOptions {
        /**
         * Set the default delimiter for repeat parameters. (default: `'/'`)
         */
        delimiter?: string;
        /**
         * List of characters to automatically consider prefixes when parsing.
         */
        prefixes?: string;
    }
    /**
     * Parse a string for the raw tokens.
     */
    export function parse(str: string, options?: ParseOptions): Token[];
    export interface TokensToFunctionOptions {
        /**
         * When `true` the regexp will be case sensitive. (default: `false`)
         */
        sensitive?: boolean;
        /**
         * Function for encoding input strings for output.
         */
        encode?: (value: string, token: Key) => string;
        /**
         * When `false` the function can produce an invalid (unmatched) path. (default: `true`)
         */
        validate?: boolean;
    }
    /**
     * Compile a string to a template function for the path.
     */
    export function compile<P extends object = object>(str: string, options?: ParseOptions & TokensToFunctionOptions): PathFunction<P>;
    export type PathFunction<P extends object = object> = (data?: P) => string;
    /**
     * Expose a method for transforming tokens into the path function.
     */
    export function tokensToFunction<P extends object = object>(tokens: Token[], options?: TokensToFunctionOptions): PathFunction<P>;
    export interface RegexpToFunctionOptions {
        /**
         * Function for decoding strings for params.
         */
        decode?: (value: string, token: Key) => string;
    }
    /**
     * A match result contains data about the path match.
     */
    export interface MatchResult<P extends object = object> {
        path: string;
        index: number;
        params: P;
    }
    /**
     * A match is either `false` (no match) or a match result.
     */
    export type Match<P extends object = object> = false | MatchResult<P>;
    /**
     * The match function takes a string and returns whether it matched the path.
     */
    export type MatchFunction<P extends object = object> = (path: string) => Match<P>;
    /**
     * Create path match function from `path-to-regexp` spec.
     */
    export function match<P extends object = object>(str: Path, options?: ParseOptions & TokensToRegexpOptions & RegexpToFunctionOptions): MatchFunction<P>;
    /**
     * Create a path match function from `path-to-regexp` output.
     */
    export function regexpToFunction<P extends object = object>(re: RegExp, keys: Key[], options?: RegexpToFunctionOptions): MatchFunction<P>;
    /**
     * Metadata about a key.
     */
    export interface Key {
        name: string | number;
        prefix: string;
        suffix: string;
        pattern: string;
        modifier: string;
    }
    /**
     * A token is a string (nothing special) or key metadata (capture group).
     */
    export type Token = string | Key;
    export interface TokensToRegexpOptions {
        /**
         * When `true` the regexp will be case sensitive. (default: `false`)
         */
        sensitive?: boolean;
        /**
         * When `true` the regexp won't allow an optional trailing delimiter to match. (default: `false`)
         */
        strict?: boolean;
        /**
         * When `true` the regexp will match to the end of the string. (default: `true`)
         */
        end?: boolean;
        /**
         * When `true` the regexp will match from the beginning of the string. (default: `true`)
         */
        start?: boolean;
        /**
         * Sets the final character for non-ending optimistic matches. (default: `/`)
         */
        delimiter?: string;
        /**
         * List of characters that can also be "end" characters.
         */
        endsWith?: string;
        /**
         * Encode path tokens for use in the `RegExp`.
         */
        encode?: (value: string) => string;
    }
    /**
     * Expose a function for taking tokens and returning a RegExp.
     */
    export function tokensToRegexp(tokens: Token[], keys?: Key[], options?: TokensToRegexpOptions): RegExp;
    /**
     * Supported `path-to-regexp` input types.
     */
    export type Path = string | RegExp | Array<string | RegExp>;
    /**
     * Normalize the given path string, returning a regular expression.
     *
     * An empty array can be passed in for the keys, which will hold the
     * placeholder key descriptions. For example, using `/user/:id`, `keys` will
     * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
     */
    export function pathToRegexp(path: Path, keys?: Key[], options?: TokensToRegexpOptions & ParseOptions): RegExp;
}
/// <amd-module name="@scom/scom-page-builder/utility/command/interface.ts" />
declare module "@scom/scom-page-builder/utility/command/interface.ts" {
    export interface ICommand {
        execute(): void;
        undo(): void;
        redo(): void;
    }
}
/// <amd-module name="@scom/scom-page-builder/utility/command/add.ts" />
declare module "@scom/scom-page-builder/utility/command/add.ts" {
    import { Control } from "@ijstech/components";
    import { ICommand } from "@scom/scom-page-builder/utility/command/interface.ts";
    export class AddElementCommand implements ICommand {
        private element;
        private parent;
        constructor(element: Control, parent?: HTMLElement);
        execute(): void;
        undo(): void;
        redo(): void;
    }
}
/// <amd-module name="@scom/scom-page-builder/utility/command/history.ts" />
declare module "@scom/scom-page-builder/utility/command/history.ts" {
    import { ICommand } from "@scom/scom-page-builder/utility/command/interface.ts";
    export class CommandHistory {
        private commands;
        private currentCommandIndex;
        execute(command: ICommand): void;
        undo(): void;
        redo(): void;
    }
    export const commandHistory: CommandHistory;
}
/// <amd-module name="@scom/scom-page-builder/utility/command/move.ts" />
declare module "@scom/scom-page-builder/utility/command/move.ts" {
    import { ICommand } from "@scom/scom-page-builder/utility/command/interface.ts";
    export class MoveElementCommand implements ICommand {
        private element;
        private dropElm;
        private parent;
        private dataList;
        private dragIndex;
        private dropIndex;
        constructor(element: HTMLElement, dropElm: HTMLElement, parent: HTMLElement, data?: any[]);
        execute(): void;
        undo(): void;
        redo(): void;
    }
}
/// <amd-module name="@scom/scom-page-builder/utility/command/resize.ts" />
declare module "@scom/scom-page-builder/utility/command/resize.ts" {
    import { Control } from "@ijstech/components";
    import { ICommand } from "@scom/scom-page-builder/utility/command/interface.ts";
    export class ResizeElementCommand implements ICommand {
        private element;
        private initialWidth;
        private initialHeight;
        private finalWidth;
        private finalHeight;
        constructor(element: Control, initialWidth: number | string, initialHeight: number | string);
        execute(): void;
        undo(): void;
        redo(): void;
    }
}
/// <amd-module name="@scom/scom-page-builder/utility/command/index.ts" />
declare module "@scom/scom-page-builder/utility/command/index.ts" {
    export { AddElementCommand } from "@scom/scom-page-builder/utility/command/add.ts";
    export { CommandHistory, commandHistory } from "@scom/scom-page-builder/utility/command/history.ts";
    export { MoveElementCommand } from "@scom/scom-page-builder/utility/command/move.ts";
    export { ResizeElementCommand } from "@scom/scom-page-builder/utility/command/resize.ts";
    export { ICommand } from "@scom/scom-page-builder/utility/command/interface.ts";
}
/// <amd-module name="@scom/scom-page-builder/utility/index.ts" />
declare module "@scom/scom-page-builder/utility/index.ts" {
    import { Module } from '@ijstech/components';
    import { match, MatchFunction, compile } from "@scom/scom-page-builder/utility/pathToRegexp.ts";
    interface IGetModuleOptions {
        ipfscid?: string;
        localPath?: string;
    }
    const assignAttr: (module: any) => void;
    const uploadToIPFS: (data: any) => Promise<string>;
    const fetchFromIPFS: (cid: string) => Promise<any>;
    const formatNumber: (value: any, decimals?: number) => string;
    const formatNumberWithSeparators: (value: number, precision?: number) => string;
    const isCID: (cid: string) => boolean;
    const getCID: () => string;
    const getPagePath: (path?: string) => string;
    const updatePagePath: (pagePath: string) => void;
    const generateUUID: () => string;
    const isEmpty: (value: any) => boolean;
    const getModule: (options: IGetModuleOptions) => Promise<Module>;
    export { assignAttr, uploadToIPFS, fetchFromIPFS, match, MatchFunction, compile, formatNumber, formatNumberWithSeparators, isCID, getCID, getPagePath, updatePagePath, generateUUID, isEmpty, getModule };
    export * from "@scom/scom-page-builder/utility/command/index.ts";
}
/// <amd-module name="@scom/scom-page-builder/interface/core.ts" />
declare module "@scom/scom-page-builder/interface/core.ts" {
    import { MatchFunction } from "@scom/scom-page-builder/utility/index.ts";
    import { Styles } from '@ijstech/components';
    export interface IMenu {
        caption: string;
        url: string;
        module: string;
        params?: any;
        env?: string;
        networks?: number[];
        isToExternal?: boolean;
        img?: string;
        isDisabled?: boolean;
        menus?: IMenu[];
        regex?: MatchFunction;
    }
    export interface ISCConfig {
        env: string;
        moduleDir?: string;
        modules: {
            [name: string]: {
                path: string;
                dependencies: string[];
            };
        };
        dependencies?: {
            [name: string]: string;
        };
        menus: IMenu[];
        routes: IRoute[];
        networks?: INetwork[] | "*";
        copyrightInfo: string;
        version?: string;
        wallet?: string[];
        themes?: ITheme;
        breakpoints?: IBreakpoints;
    }
    export interface INetwork {
        name?: string;
        chainId: number;
        img?: string;
        rpc?: string;
        symbol?: string;
        env?: string;
        explorerName?: string;
        explorerTxUrl?: string;
        explorerAddressUrl?: string;
        isDisabled?: boolean;
    }
    export interface IRoute {
        url: string;
        module: string;
        default?: boolean;
        regex?: MatchFunction;
    }
    export interface ITheme {
        default: string;
        dark?: Styles.Theme.ITheme;
        light?: Styles.Theme.ITheme;
    }
    export interface IBreakpoints {
        mobile: number;
        tablet: number;
        desktop: number;
    }
}
/// <amd-module name="@scom/scom-page-builder/interface/jsonSchema.ts" />
declare module "@scom/scom-page-builder/interface/jsonSchema.ts" {
    export interface IDataSchema {
        type: 'integer' | 'number' | 'boolean' | 'string' | 'object';
        format?: 'date' | 'time' | 'date-time' | 'image';
        enum?: string[];
        oneOf?: {
            const: string;
            title: string;
        }[];
        required?: string[];
        properties?: {
            [key: string]: IDataSchema;
        };
        minLength?: number;
        maxLength?: number;
        minimum?: number;
        maximum?: number;
        default?: string | number | boolean;
        description?: string;
    }
    export type IUISchemaType = 'VerticalLayout' | 'HorizontalLayout' | 'Group' | 'Categorization' | 'Category' | 'Control';
    export type IUISchemaRulesEffect = 'HIDE' | 'SHOW' | 'DISABLE' | 'ENABLE';
    export type IUISchemaValidationType = 'check-null';
    export interface IUISchemaRulesCondition {
        scope: string;
        schema: {
            [key: string]: any;
        };
    }
    export interface IUISchemaRules {
        effect?: IUISchemaRulesEffect;
        condition?: IUISchemaRulesCondition;
    }
    export interface IUISchemaOptions {
        detail?: 'DEFAULT' | 'GENERATED' | 'REGISTERED' | IUISchema;
        showSortButtons?: boolean;
        elementLabelProp?: string;
        format?: 'date' | 'time' | 'date-time' | 'radio';
        maxWidth?: string;
        maxHeight?: string;
        slider?: boolean;
        multi?: boolean;
        color?: boolean;
        restrict?: boolean;
        showUnfocusedDescription?: boolean;
        hideRequiredAsterisk?: boolean;
        toggle?: boolean;
        readonly?: boolean;
        autocomplete?: boolean;
        variant?: 'stepper';
        validationType?: IUISchemaValidationType;
    }
    export interface IUISchema {
        title?: string;
        type: IUISchemaType;
        elements?: IUISchema[];
        label?: string | boolean;
        scope?: string;
        rule?: IUISchemaRules;
        options?: IUISchemaOptions;
    }
}
/// <amd-module name="@scom/scom-page-builder/interface/pageBlock.ts" />
declare module "@scom/scom-page-builder/interface/pageBlock.ts" {
    export interface IPageBlockData {
        name: string;
        description: string;
        ipfscid?: string;
        imgUrl?: string;
        category?: {
            icon: string;
            idx: string;
            name: string;
        }[];
        chainId?: number;
        packageId?: number;
        projectId?: number;
        local?: boolean;
        localPath?: string;
        dependencies?: any;
    }
    export interface ICommand {
        execute(): void;
        undo(): void;
        redo(): void;
    }
    export interface IPageBlockAction {
        name: string;
        icon: string;
        command: (builder: any, userInputData: any) => ICommand;
        userInputDataSchema: IConfigSchema;
    }
    export interface IPageBlock {
        getActions: () => IPageBlockAction[];
        getData: () => any;
        setData: (data: any) => Promise<void>;
        getTag: () => any;
        setTag: (tag: any) => Promise<void>;
    }
    export interface IConfigSchema {
        type: 'integer' | 'number' | 'boolean' | 'object';
        format?: 'date' | 'datetime' | 'color';
        required?: string[];
        properties?: {
            [key: string]: IConfigSchema;
        };
    }
    export interface IGetModuleOptions {
        ipfscid?: string;
        localPath?: string;
    }
}
/// <amd-module name="@scom/scom-page-builder/interface/component.ts" />
declare module "@scom/scom-page-builder/interface/component.ts" {
    export interface IImage {
        url: string;
        altText: string;
        backgroundColor: string;
        height: number;
        width: number;
        link: string;
    }
}
/// <amd-module name="@scom/scom-page-builder/interface/siteData.ts" />
declare module "@scom/scom-page-builder/interface/siteData.ts" {
    import { IPageBlockData } from "@scom/scom-page-builder/interface/pageBlock.ts";
    export interface IPageData {
        cid?: string;
        title?: string;
        name: string;
        path: string;
        url: string;
        visible: boolean;
        header: IPageHeader;
        sections: IPageSection[];
        footer: IPageFooter;
    }
    export enum HeaderType {
        'COVER' = "cover",
        'LARGE' = "largeBanner",
        'NORMAL' = "banner",
        'TITLE' = "titleOnly"
    }
    export interface IPageHeader {
        headerType: HeaderType;
        image: string;
        elements: IPageElement[];
    }
    export interface IPageSection {
        id: string;
        row: number;
        image?: string;
        backgroundColor?: string;
        elements: IPageElement[];
    }
    export interface IPageFooter {
        image: string;
        elements: IPageElement[];
    }
    export type ElementType = 'primitive' | 'composite';
    export interface IPageElement {
        id: string;
        column: number;
        columnSpan: number;
        type: 'primitive' | 'composite';
        properties: any;
        module?: IPageBlockData;
        elements?: IPageElement[];
        visibleOn?: string;
        invisibleOn?: string;
    }
    export interface IRowSettings {
        height?: string;
        width?: string;
        columns?: number;
        columnsSettings?: {
            width?: string;
            size?: {
                width?: string;
                height?: string;
            };
        }[];
        backgroundColor?: string;
        backgroundImageUrl?: string;
        isCloned?: boolean | true;
        isChanged?: boolean | true;
        isDeleted?: boolean | true;
    }
    type StyleValues = "-moz-initial" | "inherit" | "initial" | "revert" | "unset";
    export interface IContainerSettings {
        width?: string;
        maxWidth?: string;
        textAlign?: StyleValues | "center" | "end" | "justify" | "left" | "match-parent" | "right" | "start";
        overflow?: StyleValues | "-moz-hidden-unscrollable" | "auto" | "clip" | "hidden" | "scroll" | "visible" | (string & {});
    }
    export interface IConfigData {
        header: {
            showHeader: boolean;
            showWalletAuthentication: boolean;
            showLogo: boolean;
            headerBackgroundColor: string;
            logo: string;
        };
        body: {
            boxedLayout: boolean;
            boxedWidth: string;
            containerLayout: boolean;
            containerSettings: IContainerSettings;
            showPagination: boolean;
        };
        footer: {
            showFooter: boolean;
            stickyFooter: boolean;
            copyrightText: string;
        };
        menu: {
            showTopMenu: boolean;
            showSideMenu: boolean;
            fontColor: string;
        };
        url: {
            urlSuffix: string;
        };
    }
    export interface IAddPageArgs {
        name: string;
        url: string;
    }
    export interface IUpdatePageArgs {
        pageId: number;
    }
}
/// <amd-module name="@scom/scom-page-builder/interface/index.ts" />
declare module "@scom/scom-page-builder/interface/index.ts" {
    import { IMenu, INetwork, IRoute, ITheme, ISCConfig, IBreakpoints } from "@scom/scom-page-builder/interface/core.ts";
    import { IDataSchema, IUISchema, IUISchemaOptions, IUISchemaRules, IUISchemaRulesCondition, IUISchemaRulesEffect, IUISchemaType, IUISchemaValidationType } from "@scom/scom-page-builder/interface/jsonSchema.ts";
    export { IMenu, INetwork, IRoute, ITheme, ISCConfig, IBreakpoints, IDataSchema, IUISchema, IUISchemaOptions, IUISchemaRules, IUISchemaRulesCondition, IUISchemaRulesEffect, IUISchemaType, IUISchemaValidationType };
    export * from "@scom/scom-page-builder/interface/pageBlock.ts";
    export * from "@scom/scom-page-builder/interface/component.ts";
    export * from "@scom/scom-page-builder/interface/siteData.ts";
}
/// <amd-module name="@scom/scom-page-builder/page/pageHeader.css.ts" />
declare module "@scom/scom-page-builder/page/pageHeader.css.ts" { }
/// <amd-module name="@scom/scom-page-builder/page/pageHeader.tsx" />
declare module "@scom/scom-page-builder/page/pageHeader.tsx" {
    import { Module, ControlElement } from '@ijstech/components';
    import "@scom/scom-page-builder/page/pageHeader.css.ts";
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['ide-header']: PageHeaderElement;
            }
        }
    }
    export interface PageHeaderElement extends ControlElement {
    }
    export class PageHeader extends Module {
        private iconList;
        private toolbars;
        private imgLogo;
        private _logo;
        constructor(parent?: any);
        initEventBus(): void;
        set logo(data: string);
        get logo(): string;
        hideLogo(hide?: boolean): void;
        private renderIconList;
        private renderDropdown;
        init(): Promise<void>;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-page-builder/page/pageSection.css.ts" />
declare module "@scom/scom-page-builder/page/pageSection.css.ts" { }
/// <amd-module name="@scom/scom-page-builder/dialogs/confirmDialog.tsx" />
declare module "@scom/scom-page-builder/dialogs/confirmDialog.tsx" {
    import { Module, ControlElement, Container } from '@ijstech/components';
    export interface ConfirmDialogElement extends ControlElement {
        message: string;
        cancelButtonText?: string;
        confirmButtonText?: string;
        showCancelButton?: boolean;
        showConfirmButton?: boolean;
        onCancel?: () => Promise<void>;
        onConfirm?: () => Promise<void>;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ["scpage-confirm-dialog"]: ConfirmDialogElement;
            }
        }
    }
    export class ConfirmDialog extends Module {
        message: string;
        cancelButtonText: string;
        confirmButtonText: string;
        showCancelButton: boolean;
        showConfirmButton: boolean;
        onCancel: () => Promise<void>;
        onConfirm: () => Promise<void>;
        private dialog;
        private lbMessage;
        private btnCancel;
        private btnConfirm;
        constructor(parent?: Container, options?: any);
        init(): Promise<void>;
        confirm(): Promise<void>;
        cancel(): Promise<void>;
        show(): void;
        hide(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-page-builder/dialogs/loadingDialog.css.ts" />
declare module "@scom/scom-page-builder/dialogs/loadingDialog.css.ts" { }
/// <amd-module name="@scom/scom-page-builder/dialogs/loadingDialog.tsx" />
declare module "@scom/scom-page-builder/dialogs/loadingDialog.tsx" {
    import { Module, ControlElement } from '@ijstech/components';
    import "@scom/scom-page-builder/dialogs/loadingDialog.css.ts";
    export interface LoadingDialogElement extends ControlElement {
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['scpage-loading-dialog']: LoadingDialogElement;
            }
        }
    }
    export class LoadingDialog extends Module {
        private lbMessage;
        private mdLoading;
        constructor(parent?: any, options?: any);
        init(): Promise<void>;
        show(): void;
        hide(): void;
        updateMessage(message: string): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-page-builder/dialogs/rowSettingsDialog.css.ts" />
declare module "@scom/scom-page-builder/dialogs/rowSettingsDialog.css.ts" { }
/// <amd-module name="@scom/scom-page-builder/dialogs/rowSettingsDialog.tsx" />
declare module "@scom/scom-page-builder/dialogs/rowSettingsDialog.tsx" {
    import { Module, ControlElement, Control } from '@ijstech/components';
    import "@scom/scom-page-builder/dialogs/rowSettingsDialog.css.ts";
    import { IRowSettings } from "@scom/scom-page-builder/interface/index.ts";
    export interface RowSettingsDialogElement extends ControlElement {
        onSave: (config: IRowSettings) => Promise<void>;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['scpage-row-settings-dialog']: RowSettingsDialogElement;
            }
        }
    }
    export class RowSettingsDialog extends Module {
        private dialog;
        private ipWidth;
        private ipHeight;
        private ipColumns;
        private txtRowBackgroundColor;
        private txtRowBackgroundImageURL;
        private vstackColumnsWidth;
        private columnsWidth;
        private vstackColumnsSize;
        private columnsSize;
        private onSave;
        constructor(parent?: any);
        init(): Promise<void>;
        show(): void;
        hide(): void;
        setConfig(config: IRowSettings): void;
        getConfig(): IRowSettings;
        getColumnsSettings(): any[];
        onColumnsChanged(): void;
        onColumnWidthChanged(src: Control, idx: number): void;
        onColumnSizeChanged(src: Control, idx: number, key: string): void;
        updateColumnsSettings(length: number, columnsSettings?: any): void;
        confirm(): Promise<void>;
        cancel(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-page-builder/dialogs/moduleCard.css.ts" />
declare module "@scom/scom-page-builder/dialogs/moduleCard.css.ts" { }
/// <amd-module name="@scom/scom-page-builder/dialogs/moduleCard.tsx" />
declare module "@scom/scom-page-builder/dialogs/moduleCard.tsx" {
    import { Module, ControlElement } from '@ijstech/components';
    import "@scom/scom-page-builder/dialogs/moduleCard.css.ts";
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['scpage-module-card']: ModuleCardElement;
            }
        }
    }
    export interface ModuleCardElement extends ControlElement {
        data: IPageBlockData;
    }
    export interface IPageBlockData {
        name: string;
        description: string;
        ipfscid: string;
        imgUrl: string;
        category: {
            icon: string;
            idx: string;
            name: string;
        }[];
        chainId: number;
        packageId: number;
        projectId: number;
        local?: boolean;
        localPath?: string;
        dependencies?: any;
    }
    export class ModuleCard extends Module {
        private pnlModuleCard;
        private lbModuleName;
        private lbDescription;
        data: IPageBlockData;
        ipfscid: string;
        init(): Promise<void>;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-page-builder/dialogs/categoryCard.tsx" />
declare module "@scom/scom-page-builder/dialogs/categoryCard.tsx" {
    import { Module, ControlElement } from '@ijstech/components';
    import "@scom/scom-page-builder/dialogs/moduleCard.css.ts";
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['scpage-category-card']: CategoryCardElement;
            }
        }
    }
    export interface CategoryCardElement extends ControlElement {
        data: ICategoryData;
    }
    export interface ICategoryData {
        name: string;
        idx: string;
        icon: string;
        count: number;
    }
    export class CategoryCard extends Module {
        private pnlCategoryCard;
        private iconCategory;
        private lbCategoryName;
        private lbCategoryCount;
        data: ICategoryData;
        init(): Promise<void>;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-page-builder/dialogs/selectModuleDialog.css.ts" />
declare module "@scom/scom-page-builder/dialogs/selectModuleDialog.css.ts" { }
/// <amd-module name="@scom/scom-page-builder/dialogs/selectModuleDialog.tsx" />
declare module "@scom/scom-page-builder/dialogs/selectModuleDialog.tsx" {
    import { Module, ControlElement, Input, Container, Control } from '@ijstech/components';
    import { IPageBlockData, ModuleCard } from "@scom/scom-page-builder/dialogs/moduleCard.tsx";
    import { ICategoryData, CategoryCard } from "@scom/scom-page-builder/dialogs/categoryCard.tsx";
    import "@scom/scom-page-builder/dialogs/selectModuleDialog.css.ts";
    export interface SelectModuleDialogElement extends ControlElement {
        onCancel?: () => Promise<void>;
        onSelectModule?: (selectedModule: IPageBlockData) => Promise<void>;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ["scpage-select-module-dialog"]: SelectModuleDialogElement;
            }
        }
    }
    export class SelectModuleDialog extends Module {
        private dialog;
        private pnlModuleList;
        private pnlCategoryList;
        private btnConfirm;
        private txtSearch;
        private onSelectModule;
        private onCancel;
        private modules;
        private isLoading;
        constructor(parent?: Container, options?: any);
        init(): Promise<void>;
        handleCategoryAllClick(control: Control, event: Event): Promise<void>;
        handleCategoryClick(control: Control, event: Event): Promise<void>;
        getModules(category?: string): Promise<IPageBlockData[]>;
        getDevPageBlocks(): Promise<IPageBlockData[]>;
        getCategories(): Promise<ICategoryData[]>;
        show(): void;
        cancel(): Promise<void>;
        confirm(): Promise<void>;
        clearActive(): void;
        onModuleCardClick(control: Control): void;
        handleOnSearchChange(control: Input): void;
        renderModuleList(keyword?: string): Promise<void>;
        render(): any;
    }
    export { ModuleCard, CategoryCard };
}
/// <amd-module name="@scom/scom-page-builder/dialogs/settingsDialog.css.ts" />
declare module "@scom/scom-page-builder/dialogs/settingsDialog.css.ts" { }
/// <amd-module name="@scom/scom-page-builder/dialogs/settingsDialog.tsx" />
declare module "@scom/scom-page-builder/dialogs/settingsDialog.tsx" {
    import { Module, ControlElement, Upload } from '@ijstech/components';
    import "@scom/scom-page-builder/dialogs/settingsDialog.css.ts";
    import { IConfigData } from "@scom/scom-page-builder/interface/index.ts";
    export interface SettingsDialogElement extends ControlElement {
        onSave: (config: IConfigData) => Promise<void>;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['scpage-site-settings-dialog']: SettingsDialogElement;
            }
        }
    }
    export class SettingsDialog extends Module {
        private dialog;
        private switchShowHeader;
        private switchBoxedLayout;
        private pnlInputBoxed;
        private inputBoxedWidth;
        private switchContainerLayout;
        private pnlInputContainer;
        private inputContainerWidth;
        private inputContainerMaxWidth;
        private btnContainerTextAlign;
        private modalContainerTextAlign;
        private containerTextAlign?;
        private btnContainerOverflow;
        private modalContainerOverflow;
        private containerOverflow?;
        private switchShowPagination;
        private switchShowLogo;
        private switchShowTopMenu;
        private switchShowSideMenu;
        private switchShowWalletAuthentication;
        private switchStickyFooter;
        private switchShowFooter;
        private uploadLogo;
        private txtHeaderBackgroundColor;
        private txtMenuFontColor;
        private txCopyright;
        private btnWebsiteType;
        private modalWebsiteType;
        private gpBoxedLayout;
        private gpContainerLayout;
        private gpHeaderVisible;
        private gpShowWalletAuthentication;
        private gpLogoVisible;
        private gpLogo;
        private gpHeaderBackgroundColor;
        private gpPaginationVisible;
        private gpFooterVisible;
        private gpStickyFooter;
        private gpCopyright;
        private gpTopMenuVisible;
        private gpSideMenuVisible;
        private gpMenuFontColor;
        private onSave;
        private logo;
        constructor(parent?: any);
        init(): Promise<void>;
        initEventBus(): void;
        show(): void;
        hide(): void;
        setConfig(config: IConfigData): void;
        getConfig(): Promise<IConfigData>;
        confirm(): Promise<void>;
        onFileChanged(source: Upload, fileList: File[]): Promise<void>;
        onBoxedChanged(): void;
        onContainerChanged(): void;
        onTextAlignChanged(value: string): void;
        showModalContainerTextAlign(): void;
        onOverflowChanged(value: string): void;
        onSiteTypeChanged(value: string): void;
        showModalWebsiteType(): void;
        showModalContainerOverflow(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-page-builder/dialogs/pageBlockSettingsDialog.tsx" />
declare module "@scom/scom-page-builder/dialogs/pageBlockSettingsDialog.tsx" {
    import { Module, ControlElement } from '@ijstech/components';
    export interface PageBlockSettingsDialogElement extends ControlElement {
        onSave: (data: any) => void;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['scpage-pageblock-settings-dialog']: PageBlockSettingsDialogElement;
            }
        }
    }
    export class PageBlockSettingsDialog extends Module {
        private dialog;
        private pnlConfig;
        private pnlEvents;
        private txtVisibleOn;
        private txtInvisibleOn;
        private form;
        private schema;
        private onSave;
        private configData;
        constructor(parent?: any, options?: any);
        init(): Promise<void>;
        show(data: {
            schema: any;
            configData: any;
            events: any[];
            visibleOn: string;
            invisibleOn: string;
        }): void;
        close(): void;
        handleSaveClick(): Promise<void>;
        getFormData(object: any, name: string): Promise<any>;
        reset(): void;
        renderForm(object: any, name: string, nameBuilder?: string, data?: any, required?: string[]): any;
        private convertFieldNameToLabel;
        render(): Promise<any>;
    }
}
/// <amd-module name="@scom/scom-page-builder/dialogs/selectSiteTypeDialog.css.ts" />
declare module "@scom/scom-page-builder/dialogs/selectSiteTypeDialog.css.ts" { }
/// <amd-module name="@scom/scom-page-builder/dialogs/selectSiteTypeDialog.tsx" />
declare module "@scom/scom-page-builder/dialogs/selectSiteTypeDialog.tsx" {
    import { Module, ControlElement, Control } from '@ijstech/components';
    import "@scom/scom-page-builder/dialogs/selectSiteTypeDialog.css.ts";
    export interface RowSettingsDialogElement extends ControlElement {
        onSave: (siteType: any) => void;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['scpage-select-site-type-dialog']: RowSettingsDialogElement;
            }
        }
    }
    export class SelectSiteTypeDialog extends Module {
        private dialog;
        private pnlSecurePage;
        private pnlSecureBook;
        private onSave;
        constructor(parent?: any);
        init(): Promise<void>;
        show(): void;
        hide(): void;
        selectSecurePage(target: Control): void;
        selectSecureBook(target: Control): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-page-builder/dialogs/configDialog.css.ts" />
declare module "@scom/scom-page-builder/dialogs/configDialog.css.ts" { }
/// <amd-module name="@scom/scom-page-builder/dialogs/configDialog.tsx" />
declare module "@scom/scom-page-builder/dialogs/configDialog.tsx" {
    import { Module, ControlElement } from '@ijstech/components';
    import "@scom/scom-page-builder/dialogs/configDialog.css.ts";
    import { IDataSchema, IUISchema, IUISchemaValidationType } from "@scom/scom-page-builder/interface/index.ts";
    export interface ConfigDialogElement extends ControlElement {
        title?: string;
        onConfirm?: (data: any) => void;
    }
    export interface ValidationElement {
        scope: string;
        validateType: IUISchemaValidationType;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['scpage-config-dialog']: ConfigDialogElement;
            }
        }
    }
    export class ConfigDialog extends Module {
        private pnlConfigBody;
        private pnlConfigSidebar;
        private dialog;
        private validationControlList;
        private _dataSchema;
        private _uiSchema;
        private _flatRules;
        private _tabs;
        private onConfirm;
        constructor(parent?: any);
        init(): Promise<void>;
        setSchema(dataSchema: IDataSchema, uiSchema: IUISchema): void;
        show(): void;
        hide(): void;
        confirm(): void;
        checkIfValidationNeed(uiSchema: IUISchema): void;
        validateForm(): boolean;
        showValidationFailMsg(validationFailList: ValidationElement[]): void;
        getFormData(): any;
        render(): any;
        private clear;
        private renderForm;
        private getData;
        private setupRules;
        private createUI;
        private generateTemplateColumnsByNumber;
        private getDataSchemaByScope;
        private convertFieldNameToLabel;
    }
}
/// <amd-module name="@scom/scom-page-builder/dialogs/index.ts" />
declare module "@scom/scom-page-builder/dialogs/index.ts" {
    import { ConfirmDialog } from "@scom/scom-page-builder/dialogs/confirmDialog.tsx";
    import { LoadingDialog } from "@scom/scom-page-builder/dialogs/loadingDialog.tsx";
    import { RowSettingsDialog } from "@scom/scom-page-builder/dialogs/rowSettingsDialog.tsx";
    import { SelectModuleDialog } from "@scom/scom-page-builder/dialogs/selectModuleDialog.tsx";
    import { SettingsDialog } from "@scom/scom-page-builder/dialogs/settingsDialog.tsx";
    import { PageBlockSettingsDialog } from "@scom/scom-page-builder/dialogs/pageBlockSettingsDialog.tsx";
    import { SelectSiteTypeDialog } from "@scom/scom-page-builder/dialogs/selectSiteTypeDialog.tsx";
    import { ConfigDialog } from "@scom/scom-page-builder/dialogs/configDialog.tsx";
    export { ConfirmDialog, LoadingDialog, RowSettingsDialog, SelectModuleDialog, SettingsDialog, PageBlockSettingsDialog, SelectSiteTypeDialog, ConfigDialog };
}
/// <amd-module name="@scom/scom-page-builder/common/toolbar.css.ts" />
declare module "@scom/scom-page-builder/common/toolbar.css.ts" { }
/// <amd-module name="@scom/scom-page-builder/common/toolbar.tsx" />
declare module "@scom/scom-page-builder/common/toolbar.tsx" {
    import { Module, ControlElement } from '@ijstech/components';
    import "@scom/scom-page-builder/common/toolbar.css.ts";
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['ide-toolbar']: ToolbarElement;
            }
        }
    }
    export interface ToolbarElement extends ControlElement {
        readonly?: boolean;
    }
    export class IDEToolbar extends Module {
        private _toolList;
        private _readonly;
        private _isResizing;
        private _origWidth;
        private _origHeight;
        private _mouseDownPos;
        private contentStack;
        private toolsStack;
        private toolbar;
        private _eResizer;
        private _wResizer;
        private _nResizer;
        private _neResizer;
        private _nwResizer;
        private _currentResizer;
        private _currentPosition;
        private _component;
        private dragStack;
        private _mouseDownHandler;
        private _mouseUpHandler;
        private _mouseMoveHandler;
        data: any;
        constructor(parent?: any);
        private handleMouseDown;
        private handleMouseMove;
        private handleMouseUp;
        get toolList(): any[];
        set toolList(value: any[]);
        get readonly(): boolean;
        set readonly(value: boolean);
        private createMenu;
        private renderToolbars;
        showToolbars(): void;
        hideToolbars(): void;
        private renderResizeStack;
        private renderResizer;
        fetchModule(): Promise<void>;
        setData(data: any): Promise<void>;
        getData(): Promise<any>;
        setTag(tag: any): void;
        private checkToolbar;
        _handleClick(event: Event): boolean;
        init(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-page-builder/common/dragger.tsx" />
declare module "@scom/scom-page-builder/common/dragger.tsx" {
    import { Control, Module } from '@ijstech/components';
    export class ContainerDragger<T extends Module> {
        private target;
        private stack;
        private pnlOverlay;
        private dragger;
        private currentPosition;
        private dataList;
        private isDragging;
        constructor(target: T, stack: Control, dragger?: Control, dataList?: any[]);
        private initDragEvent;
        private mouseDownHandler;
        private mouseUpHandler;
        private resetTarget;
        private updateTarget;
        private mouseMoveHandler;
    }
}
/// <amd-module name="@scom/scom-page-builder/common/index.ts" />
declare module "@scom/scom-page-builder/common/index.ts" {
    import { IDEToolbar } from "@scom/scom-page-builder/common/toolbar.tsx";
    import { ContainerDragger } from "@scom/scom-page-builder/common/dragger.tsx";
    export { IDEToolbar, ContainerDragger };
}
/// <amd-module name="@scom/scom-page-builder/page/pageSection.tsx" />
declare module "@scom/scom-page-builder/page/pageSection.tsx" {
    import { Module, ControlElement } from '@ijstech/components';
    import "@scom/scom-page-builder/page/pageSection.css.ts";
    import { IPageElement } from "@scom/scom-page-builder/interface/index.ts";
    import { RowSettingsDialog } from "@scom/scom-page-builder/dialogs/index.ts";
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['ide-section']: PageSectionElement;
            }
        }
    }
    export interface PageSectionElement extends ControlElement {
        readonly?: boolean;
        containerSize?: {
            width?: string;
            height?: string;
        };
    }
    export class PageSection extends Module {
        private pnlLoading;
        private pnlMain;
        private pageSectionWrapper;
        private _dragger;
        private _data;
        private _readonly;
        private _size;
        private currentToolbar;
        private toolbarList;
        constructor(parent?: any);
        get size(): {
            width?: string;
            height?: string;
        };
        set size(value: {
            width?: string;
            height?: string;
        });
        get readonly(): boolean;
        set readonly(value: boolean);
        init(): void;
        private setActive;
        private initEventListener;
        private updateContainerSize;
        clear(): void;
        private createToolbar;
        setData(value: IPageElement): Promise<void>;
        getData(): Promise<IPageElement>;
        render(): any;
    }
    export { RowSettingsDialog };
}
/// <amd-module name="@scom/scom-page-builder/page/pageFooter.css.ts" />
declare module "@scom/scom-page-builder/page/pageFooter.css.ts" { }
/// <amd-module name="@scom/scom-page-builder/page/pageFooter.tsx" />
declare module "@scom/scom-page-builder/page/pageFooter.tsx" {
    import { Module, ControlElement } from '@ijstech/components';
    import "@scom/scom-page-builder/page/pageFooter.css.ts";
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['scpage-page-footer']: PageFooterElement;
            }
        }
    }
    export interface PageFooterElement extends ControlElement {
    }
    export class PageFooter extends Module {
        private _footer;
        private _sticky;
        private lbFooter;
        constructor(parent?: any);
        init(): Promise<void>;
        get footer(): string;
        set footer(value: string);
        get sticky(): boolean;
        set sticky(value: boolean);
        render(): any;
    }
}
/// <amd-module name="@scom/scom-page-builder/page/pageRow.css.ts" />
declare module "@scom/scom-page-builder/page/pageRow.css.ts" { }
/// <amd-module name="@scom/scom-page-builder/page/pageRow.tsx" />
declare module "@scom/scom-page-builder/page/pageRow.tsx" {
    import { Module, ControlElement, Control } from '@ijstech/components';
    import "@scom/scom-page-builder/page/pageRow.css.ts";
    import { IPageSection, IRowSettings } from "@scom/scom-page-builder/interface/index.ts";
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['ide-row']: PageRowElement;
            }
        }
    }
    export interface PageRowElement extends ControlElement {
        readonly?: boolean;
    }
    export class PageRow extends Module {
        private pnlElements;
        private actionsBar;
        private dragStack;
        private rowData;
        private _readonly;
        private isCloned;
        private isChanged;
        constructor(parent?: any);
        private initEventBus;
        init(): void;
        private createNewElement;
        private appendColumnsLayout;
        setData(rowData: IPageSection): Promise<void>;
        getData(): Promise<IPageSection>;
        onOpenRowSettingsDialog(): void;
        private onClone;
        private onResized;
        handleSectionSettingSave(config: IRowSettings): Promise<void>;
        onDeleteRow(control: Control): Promise<void>;
        onMoveUp(): void;
        onMoveDown(): void;
        render(): Promise<any>;
    }
}
/// <amd-module name="@scom/scom-page-builder/page/pagePaging.css.ts" />
declare module "@scom/scom-page-builder/page/pagePaging.css.ts" { }
/// <amd-module name="@scom/scom-page-builder/page/pagePaging.tsx" />
declare module "@scom/scom-page-builder/page/pagePaging.tsx" {
    import { ControlElement, Module } from '@ijstech/components';
    import "@scom/scom-page-builder/page/pagePaging.css.ts";
    import { IPageData } from "@scom/scom-page-builder/interface/index.ts";
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['scpage-page-paging']: PagePagingElement;
            }
        }
    }
    export interface PagePagingElement extends ControlElement {
        pagesData?: IPageData[];
        currentPageData?: IPageData;
    }
    export class PagePaging extends Module {
        private _visiblePagesData;
        private _currentPageData;
        private currentPageIndex;
        private prevPage;
        private nextPage;
        private prevPageWrapper;
        private nextPageWrapper;
        private prevPageLabel;
        private nextPageLabel;
        private prevPageNotExist;
        private nextPageNotExist;
        private isCurrentPageActive;
        constructor(parent?: any);
        init(): Promise<void>;
        initEventBus(): void;
        get pagesData(): IPageData[];
        set pagesData(value: IPageData[]);
        get currentPageData(): IPageData;
        set currentpageData(value: IPageData);
        setPaging(pages: IPageData[], currPage?: IPageData): Promise<void>;
        setVisible(visible: boolean): void;
        renderUI(): Promise<void>;
        navToPrevPage(): void;
        navToNextPage(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-page-builder/page/pageRows.css.ts" />
declare module "@scom/scom-page-builder/page/pageRows.css.ts" { }
/// <amd-module name="@scom/scom-page-builder/page/pageRows.tsx" />
declare module "@scom/scom-page-builder/page/pageRows.tsx" {
    import { Module, ControlElement } from '@ijstech/components';
    import { SelectModuleDialog } from "@scom/scom-page-builder/dialogs/index.ts";
    import { IPageData, IPageSection } from "@scom/scom-page-builder/interface/index.ts";
    import { PageSection } from "@scom/scom-page-builder/page/pageSection.tsx";
    import { PageRow } from "@scom/scom-page-builder/page/pageRow.tsx";
    import { PageFooter } from "@scom/scom-page-builder/page/pageFooter.tsx";
    import "@scom/scom-page-builder/page/pageRows.css.ts";
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['ide-rows']: PageRowsElement;
            }
        }
    }
    export interface PageRowsElement extends ControlElement {
        readonly?: boolean;
        draggable?: boolean;
    }
    export class PageRows extends Module {
        private rows;
        private pnlRows;
        private pagePaging;
        private pageFooter;
        private currentRow;
        private pnlRowOverlay;
        private currentPosition;
        private _readonly;
        private _draggable;
        private isDragging;
        constructor(parent?: any);
        initEventBus(): void;
        _handleClick(event: Event): boolean;
        init(): void;
        get draggable(): boolean;
        set draggable(value: boolean);
        private handleDrag;
        private initDragEvent;
        private mouseDownHandler;
        private mouseUpHandler;
        private resetCurrentRow;
        private updateCurrentRow;
        private onMoveHandler;
        getRows(): Promise<IPageSection[]>;
        setRows(rows: IPageSection[]): Promise<void>;
        renderRows(): Promise<void>;
        appendRow(rowData: IPageSection): Promise<PageRow>;
        onClone(data: {
            rowData: IPageSection;
            id: string;
        }): Promise<void>;
        clearRows(): void;
        set footerVisible(value: boolean);
        set footerSticky(value: boolean);
        set footerCopyright(value: string);
        setPaging(pages: IPageData[], currPage: IPageData): Promise<void>;
        setPagingVisibility(pagingVisible: boolean): void;
        updatePaging(): void;
        render(): any;
    }
    export { SelectModuleDialog, PageSection, PageFooter };
}
/// <amd-module name="@scom/scom-page-builder/page/pageSidebar.css.ts" />
declare module "@scom/scom-page-builder/page/pageSidebar.css.ts" { }
/// <amd-module name="@scom/scom-page-builder/page/pageSidebar.tsx" />
declare module "@scom/scom-page-builder/page/pageSidebar.tsx" {
    import { Module, ControlElement } from '@ijstech/components';
    import { IPageBlockData } from "@scom/scom-page-builder/interface/index.ts";
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['ide-sidebar']: PageSidebarElement;
            }
        }
    }
    import "@scom/scom-page-builder/page/pageSidebar.css.ts";
    export interface PageSidebarElement extends ControlElement {
        onSelectModule?: (selectedModule: IPageBlockData) => Promise<void>;
    }
    export class PageSidebar extends Module {
        private blockStack;
        private componentsStack;
        private firstStack;
        private _contentBlocks;
        private _components;
        private onSelectModule;
        constructor(parent?: any);
        init(): void;
        private renderUI;
        private onToggleBlock;
        private onAddComponent;
        private getModules;
        private getDevPageBlocks;
        private getCategories;
        private renderFirstStack;
        private renderBlockStack;
        private renderComponentList;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-page-builder/page/index.ts" />
declare module "@scom/scom-page-builder/page/index.ts" {
    import { PageHeader } from "@scom/scom-page-builder/page/pageHeader.tsx";
    import { PageSection } from "@scom/scom-page-builder/page/pageSection.tsx";
    import { PageFooter } from "@scom/scom-page-builder/page/pageFooter.tsx";
    import { PageRows } from "@scom/scom-page-builder/page/pageRows.tsx";
    import { PageRow } from "@scom/scom-page-builder/page/pageRow.tsx";
    import { PageSidebar } from "@scom/scom-page-builder/page/pageSidebar.tsx";
    import { PagePaging } from "@scom/scom-page-builder/page/pagePaging.tsx";
    export { PageHeader, PageSection, PageFooter, PageRows, PageRow, PageSidebar, PagePaging };
}
/// <amd-module name="@scom/scom-page-builder/builder/builderHeader.css.ts" />
declare module "@scom/scom-page-builder/builder/builderHeader.css.ts" { }
/// <amd-module name="@scom/scom-page-builder/builder/builderHeader.tsx" />
declare module "@scom/scom-page-builder/builder/builderHeader.tsx" {
    import { Module, ControlElement } from '@ijstech/components';
    import { HeaderType, IPageHeader } from "@scom/scom-page-builder/interface/index.ts";
    import "@scom/scom-page-builder/builder/builderHeader.css.ts";
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['builder-header']: HeaderElement;
            }
        }
    }
    export interface HeaderElement extends ControlElement {
        readonly?: boolean;
    }
    export class BuilderHeader extends Module {
        private pnlHeader;
        private pnlHeaderMain;
        private pnlTitle;
        private pnlConfig;
        private pnlHeaderType;
        private pnlHeaderTypeMain;
        private btnAddLogo;
        private pnlLogo;
        private mdUpload;
        private uploader;
        private nameInput;
        private btnChangeImg;
        private _headerType;
        private _image;
        private _elements;
        private _readonly;
        private _isUpdatingBg;
        private showAddStack;
        constructor(parent?: any);
        initEventBus(): void;
        get data(): IPageHeader;
        set data(value: IPageHeader);
        getData(): Promise<{
            elements: any[];
            headerType: HeaderType;
            image: string;
        }>;
        private resetData;
        private updateHeader;
        private addHeader;
        private onShowUpload;
        private onChangedBg;
        private onToggleType;
        private onUpdateImage;
        private onActiveType;
        private updateHeaderType;
        private renderHeaderType;
        init(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-page-builder/builder/builderFooter.css.ts" />
declare module "@scom/scom-page-builder/builder/builderFooter.css.ts" { }
/// <amd-module name="@scom/scom-page-builder/builder/builderFooter.tsx" />
declare module "@scom/scom-page-builder/builder/builderFooter.tsx" {
    import { Module, ControlElement } from '@ijstech/components';
    import { IPageFooter } from "@scom/scom-page-builder/interface/index.ts";
    import "@scom/scom-page-builder/builder/builderFooter.css.ts";
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['builder-footer']: FooterElement;
            }
        }
    }
    export interface FooterElement extends ControlElement {
        readonly?: boolean;
    }
    export class BuilderFooter extends Module {
        private pnlFooter;
        private pnlFooterMain;
        private pnlEditOverlay;
        private pnlOverlay;
        private pnlConfig;
        private mdUpload;
        private uploader;
        private _image;
        private _elements;
        private _readonly;
        private showAddStack;
        constructor(parent?: any);
        initEventBus(): void;
        private resetData;
        get data(): IPageFooter;
        set data(value: IPageFooter);
        getData(): Promise<{
            elements: any[];
            image: string;
        }>;
        private updateFooter;
        private addFooter;
        private updateOverlay;
        onChangedBg(): void;
        private onUpdateImage;
        init(): void;
        render(): any;
    }
}
/// <amd-module name="@scom/scom-page-builder/builder/index.ts" />
declare module "@scom/scom-page-builder/builder/index.ts" {
    export { BuilderHeader } from "@scom/scom-page-builder/builder/builderHeader.tsx";
    export { BuilderFooter } from "@scom/scom-page-builder/builder/builderFooter.tsx";
}
/// <amd-module name="@scom/scom-page-builder/theme/light.theme.ts" />
declare module "@scom/scom-page-builder/theme/light.theme.ts" {
    import { Styles } from '@ijstech/components';
    const Theme: Styles.Theme.ITheme;
    export default Theme;
}
/// <amd-module name="@scom/scom-page-builder/theme/dark.theme.ts" />
declare module "@scom/scom-page-builder/theme/dark.theme.ts" {
    import { Styles } from '@ijstech/components';
    const Theme: Styles.Theme.ITheme;
    export default Theme;
}
/// <amd-module name="@scom/scom-page-builder/theme/index.ts" />
declare module "@scom/scom-page-builder/theme/index.ts" {
    import LightTheme from "@scom/scom-page-builder/theme/light.theme.ts";
    import DarkTheme from "@scom/scom-page-builder/theme/dark.theme.ts";
    export { LightTheme, DarkTheme };
}
/// <amd-module name="@scom/scom-page-builder/index.css.ts" />
declare module "@scom/scom-page-builder/index.css.ts" { }
/// <amd-module name="@scom/scom-page-builder" />
declare module "@scom/scom-page-builder" {
    import { Container, Module } from '@ijstech/components';
    import { IPageData } from "@scom/scom-page-builder/interface/index.ts";
    import "@scom/scom-page-builder/index.css.ts";
    export default class Editor extends Module {
        private pageRows;
        private builderHeader;
        private builderFooter;
        private contentWrapper;
        constructor(parent?: Container, options?: any);
        getData(): Promise<{
            header: {
                elements: any[];
                headerType: import("@scom/scom-page-builder/interface/siteData.ts").HeaderType;
                image: string;
            };
            sections: import("@scom/scom-page-builder/interface/siteData.ts").IPageSection[];
            footer: {
                elements: any[];
                image: string;
            };
        }>;
        setData(value: IPageData): void;
        onLoad(): void;
        initEventBus(): void;
        private onAddRow;
        private onUpdateWrapper;
        render(): any;
    }
}
