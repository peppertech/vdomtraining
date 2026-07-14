import "css!./demo.css";
import 'ojs/ojlabel';
import 'ojs/ojnavigationlist';
import 'ojs/ojoption';
import 'ojs/ojradioset';
import 'ojs/ojswitcher';
import 'preact';
import { type ComponentProps } from 'preact';
import { useMemo,useState } from 'preact/hooks';

const PARAGRAPH =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra, risus ac interdum sollicitudin, sem erat ultrices ipsum, eget vehicula nibh augue sollicitudin ligula. Sed ullamcorper cursus feugiat. Mauris tristique aliquam dictum. Nulla facilisi. Nulla ut sapien sapien. Phasellus tristique arcu id ipsum mattis id aliquam risus sollicitudin.';

type TabId = 'home' | 'blogs' | 'settings' | 'about' | 'contact';
type TabbarEdge = 'top' | 'bottom';
type RadiosetValueChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-radioset'>['onvalueChanged']>
>[0];
type TabbarSelectionChangedEvent = Parameters<
  NonNullable<ComponentProps<'oj-tab-bar'>['onselectionChanged']>
>[0];

export const TabbarTbswitcher = () => {
  const [selectedItem, setSelectedItem] = useState<TabId>('blogs');
  const [currentEdge, setCurrentEdge] = useState<TabbarEdge>('top');
  const paragraphs = useMemo(() => Array.from({ length: 7 }, () => PARAGRAPH), []);

  const panelContent = (title: string) => (
    <div class="demo-tab-content">
      <h2>{title}</h2>
      {paragraphs.map((paragraph: string, index: number) => <p key={index}>{paragraph}</p>)}
    </div>
  );

  return (
    <div id="tabbardemo">
      <div class="oj-panel oj-bg-neutral-30 oj-sm-margin-4x-bottom">
        <div class="oj-flex demo-header oj-sm-justify-content-flex-end oj-sm-margin-4x-bottom">
          <div class="oj-flex-item oj-sm-padding-2x-horizontal">
            <oj-label id="lid">Tab bar edge</oj-label>
            <oj-radioset id="radiosetBasicDemoId" labelledBy="lid" value={currentEdge} onvalueChanged={(event: RadiosetValueChangedEvent) => setCurrentEdge(event.detail.value as TabbarEdge)} class="oj-choice-direction-row">
              <oj-option id="topopt" value="top">top</oj-option>
              <oj-option id="bottomopt" value="bottom">bottom</oj-option>
            </oj-radioset>
          </div>
        </div>
      </div>
      <div id="demo-container" class={`oj-flex demo-edge-${currentEdge}`}>
        <div class="demo-tabbar-container">
          <oj-tab-bar id="hnavlist" edge={currentEdge} onselectionChanged={(event: TabbarSelectionChangedEvent) => setSelectedItem(event.detail.value as TabId)} selection={selectedItem}>
            <ul>
              <li id="home"><a href="#" aria-controls="home-tab-panel" id="home-tab">Home</a></li>
              <li id="blogs"><a href="#" aria-controls="blogs-tab-panel" id="blogs-tab">Blogs</a></li>
              <li id="settings"><a href="#" aria-controls="settings-tab-panel" id="settings-tab">Settings</a></li>
              <li id="about"><a href="#" aria-controls="about-tab-panel" id="about-tab">About</a></li>
              <li id="contact"><a href="#" aria-controls="contact-tab-panel" id="contact-tab">Contact</a></li>
            </ul>
          </oj-tab-bar>
        </div>
        <div class="demo-switcher-container" tabindex={0}>
          <oj-switcher value={selectedItem}>
            <div slot="home" id="home-tab-panel" role="tabpanel" aria-labelledby="home-tab">{panelContent('Home page content area')}</div>
            <div slot="blogs" id="blogs-tab-panel" role="tabpanel" aria-labelledby="blogs-tab">{panelContent('Blogs content area')}</div>
            <div slot="settings" id="settings-tab-panel" role="tabpanel" aria-labelledby="settings-tab">{panelContent('Settings content area')}</div>
            <div slot="about" id="about-tab-panel" role="tabpanel" aria-labelledby="about-tab">{panelContent('About content area')}</div>
            <div slot="contact" id="contact-tab-panel" role="tabpanel" aria-labelledby="contact-tab">{panelContent('Contact page content area')}</div>
          </oj-switcher>
        </div>
      </div>
    </div>
  );
};

export default TabbarTbswitcher;
