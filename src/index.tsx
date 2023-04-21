import { application, Container, ControlElement, customElements, customModule, Module, Panel } from '@ijstech/components';
import { } from '@ijstech/eth-contract'
import { BuilderFooter, BuilderHeader } from './builder/index';
import { EVENT } from './const/index';
import { ElementType, ELEMENT_NAME, IPageBlockData, IPageData } from './interface/index';
import { PageRows } from './page/index';
import { getDappContainer, pageObject } from './store/index';
import { currentTheme } from './theme/index';
import { generateUUID } from './utility/index';
import { setRootDir as _setRootDir } from './store/index';
import './index.css';

const Theme = currentTheme;
interface IElementConfig {
    module: IPageBlockData;
    type: ElementType;
}

interface PageBuilderElement extends ControlElement {
    rootDir?: string;
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            ['i-scom-page-builder']: PageBuilderElement;
        }
    }
}

@customElements("i-scom-page-builder")
@customModule
export default class Editor extends Module {
    private pageRows: PageRows;
    // private builderHeader: BuilderHeader;
    private builderFooter: BuilderFooter;
    private contentWrapper: Panel;

    constructor(parent?: Container, options?: any) {
        super(parent, options);
        this.getData = this.getData.bind(this);
        this.setData = this.setData.bind(this);
        this.initEventBus();
    }

    init() {
        const rootDir = this.getAttribute('rootDir', true);
        if (rootDir) {
            this.setRootDir(rootDir);
        }
        super.init();
    }

    setRootDir(value: string) {
        _setRootDir(value);
    }

    getData() {
        return {
            // header: pageObject.header,
            sections: pageObject.sections.filter(section => section.elements && section.elements.length),
            footer: pageObject.footer
        }
    }

    async setData(value: IPageData) {
        // pageObject.header = value.header;
        pageObject.sections = value?.sections || [];
        pageObject.footer = value?.footer;

        try {
            // await this.builderHeader.setData(value.header);
            await this.pageRows.setRows(value?.sections || []);
            await this.builderFooter.setData(value?.footer);
        } catch (error) {
            console.log('setdata', error)
        }
    }

    initEventBus() {
        application.EventBus.register(this, EVENT.ON_ADD_ELEMENT, (data: IElementConfig) => {
            if (!data) return;
            this.onAddRow(data);
        });
        application.EventBus.register(this, EVENT.ON_UPDATE_SECTIONS, async () => { })
        application.EventBus.register(this, EVENT.ON_UPDATE_FOOTER, async () => this.onUpdateWrapper())
    }

    private async onAddRow(data: IElementConfig) {
        const { type, module } = data;
        let element = {
            id: generateUUID(),
            column: 1,
            columnSpan: module.category === 'components' ? 12 : 3,
            type,
            module,
            properties: {} as any
        }
        let rowData = {
            id: generateUUID(),
            row: pageObject.sections.length + 1,
            elements: [element]
        };
        if (module.path === 'scom-nft-minter' || module.path === 'scom-gem-token') {
            element.module = module;
            element.columnSpan = 6;
            element.properties = {
                networks: [{
                    chainId: 43113
                }],
                wallets: [{
                    name: "metamask"
                }],
                width: '100%'
            }
        }
        return await this.pageRows.appendRow(rowData);
    }

    private onUpdateWrapper() {
        //     this.contentWrapper.minHeight = `calc((100vh - 6rem) - ${this.builderFooter.offsetHeight}px)`;
        //     this.contentWrapper.padding = {bottom: this.builderFooter.offsetHeight};
    }

    render() {
        return (
            <i-panel id="editor" width={'100%'} height={'100%'}>
                <ide-header
                    id={'pageHeader'}
                    dock={'top'}
                    border={{ bottom: { width: 1, style: 'solid', color: '#dadce0' } }}
                ></ide-header>
                <i-grid-layout
                    templateColumns={['auto', '400px']}
                    autoFillInHoles={true}
                    dock="fill"
                    height="100%"
                >
                    <i-panel
                        class="main-content"
                        height="100%"
                        overflow={{ y: 'auto' }}
                        background={{ color: Theme.background.default }}
                        border={{ right: { width: 1, style: 'solid', color: Theme.divider } }}
                        padding={{ bottom: '1rem' }}
                    >
                        <i-panel
                            id="pageContent"
                            maxWidth={1400}
                            width="100%"
                            margin={{ left: 'auto', right: 'auto' }}
                        >
                            <i-panel
                                maxWidth={1280}
                                minHeight="100vh"
                                margin={{ top: 8, bottom: 8, left: 60, right: 60 }}
                                background={{ color: '#fff' }}
                                class="pnl-editor-wrapper"
                            >
                                <i-panel
                                    id="contentWrapper"
                                    padding={{ bottom: '12rem' }}
                                    minHeight="calc((100vh - 6rem) - 12rem)"
                                >
                                    {/* <builder-header id="builderHeader"></builder-header> */}
                                    <ide-rows id="pageRows" draggable={true}></ide-rows>
                                </i-panel>
                                <builder-footer id="builderFooter"></builder-footer>
                            </i-panel>
                        </i-panel>
                    </i-panel>
                    <i-panel class="main-sidebar" height="100%" overflow={{ y: 'auto' }}>
                        <ide-sidebar id={'pageSidebar'} width="100%"></ide-sidebar>
                    </i-panel>
                </i-grid-layout>
            </i-panel>
        );
    }
}
