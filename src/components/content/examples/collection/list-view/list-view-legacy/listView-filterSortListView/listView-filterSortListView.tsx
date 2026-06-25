// @ts-nocheck
import { Fragment, h } from 'preact';
import type { JSX } from 'preact';
import { useMemo, useRef, useState } from 'preact/hooks';
import { FilterFactory, type AttributeExprFilterDef, type CompoundFilterDef, type DataFilter, type DataProvider, type SortCriterion } from 'ojs/ojdataprovider';
import { IntlNumberConverter } from 'ojs/ojconverter-number';
import { ojCheckboxset } from 'ojs/ojcheckboxset';
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import ListDataProviderView = require('ojs/ojlistdataproviderview');
import 'ojs/ojcheckboxset';
import { ojSelectSingle } from 'ojs/ojselectsingle';
import 'ojs/ojselectsingle';
import 'ojs/ojdataprovider';
import 'ojs/ojconverter-number';
import 'ojs/ojlistview';
import 'ojs/ojgauge';
import 'ojs/ojbutton';
import 'ojs/ojlistitemlayout';
import * as jsonDataStr from 'text!../../../data/cookbook/dataCollections/listView/filterSortListView/productData.json';
import 'css!./demo.css';
import 'ojs/ojlabel';
import 'ojs/ojoption';

interface OptionData {
	    value: string;
	    label: string;
}

interface Product {
	    ID: number;
	    TITLE: string;
	    AUTHOR: string;
	    PUBLISH_DATE: string;
	    PRICE: number;
	    RATING: number;
	    IMAGE_URL: string;
	    REVIEWS: number;
}

type SortValue = 'default' | 'lh' | 'hl' | 'reviews' | 'date';
type ProductAttributeCriterion = AttributeExprFilterDef<Product>;
type ProductCompoundCriterion = CompoundFilterDef<Product>;
type ProductFilterCriterion = ProductAttributeCriterion | ProductCompoundCriterion;
type ProductFilterCriteriaMap = Record<string, ProductFilterCriterion>;
type ProductDataProvider = DataProvider<Product['ID'], Product>;
type ProductItemTemplateContext = {
	    data: Product;
};
type ProductImageStyle = JSX.CSSProperties;

export const ListViewFilterSortListView = () => {
	  const priceCriteriaRef = useRef<ProductFilterCriterion[]>([]);
	  const ratingCriteriaRef = useRef<ProductFilterCriterion[]>([]);
	  const authorCriteriaRef = useRef<ProductFilterCriterion[]>([]);
	  const currentSortCriteriaRef = useRef<SortCriterion<Product>[] | undefined>(undefined);
	  const currentFilterCriterionRef = useRef<DataFilter.Filter<Product> | undefined>(undefined);

	  const sortCriteriaMap = useMemo<Partial<Record<SortValue, SortCriterion<Product>>>>(() => ({
      lh: { attribute: 'PRICE', direction: 'ascending' },
      hl: { attribute: 'PRICE', direction: 'descending' },
      reviews: { attribute: 'REVIEWS', direction: 'descending' },
      date: { attribute: 'PUBLISH_DATE', direction: 'descending' }
  }), []);
	  const priceFilterCriteriaMap = useMemo<ProductFilterCriteriaMap>(() => ({
      lt30: { op: '$lt', attribute: 'PRICE', value: 30 },
      '30to40': { op: '$and', criteria: [{ op: '$ge', attribute: 'PRICE', value: 30 }, { op: '$le', attribute: 'PRICE', value: 39.99 }] },
      '40to50': { op: '$and', criteria: [{ op: '$ge', attribute: 'PRICE', value: 40 }, { op: '$le', attribute: 'PRICE', value: 49.99 }] },
      gt50: { op: '$ge', attribute: 'PRICE', value: 50 }
  }), []);
	  const ratingFilterCriteriaMap = useMemo<ProductFilterCriteriaMap>(() => ({
      five: { op: '$ge', attribute: 'RATING', value: 5 },
      four: { op: '$ge', attribute: 'RATING', value: 4 },
      three: { op: '$ge', attribute: 'RATING', value: 3 },
      two: { op: '$lt', attribute: 'RATING', value: 3 }
  }), []);
	  const authorFilterCriteriaMap = useMemo<ProductFilterCriteriaMap>(() => ({
      dcoward: { op: '$eq', attribute: 'AUTHOR', value: 'Danny Coward' },
      hschildt: { op: '$eq', attribute: 'AUTHOR', value: 'Herbert Schildt' },
      jmanico: { op: '$eq', attribute: 'AUTHOR', value: 'Jim Manico' },
      jbrock: { op: '$eq', attribute: 'AUTHOR', value: 'John Brock' },
      mnaftalin: { op: '$eq', attribute: 'AUTHOR', value: 'Maurice Naftalin' }
  }), []);
  const currencyOptions = useMemo(() => ({
      style: 'currency',
      currency: 'USD',
      currencyDisplay: 'symbol'
  }), []);
  const currencyConverter = useMemo(() => new IntlNumberConverter(currencyOptions), [currencyOptions]);
	  const productData = useMemo(() => JSON.parse(jsonDataStr) as Product[], []);
	  const baseDataProvider = useMemo<ProductDataProvider>(() => new ArrayDataProvider<Product['ID'], Product>(productData, {
	      keyAttributes: 'ID'
	  }), [productData]);
	  const [dataProvider, setDataProvider] = useState<ProductDataProvider>(baseDataProvider);
	  const [currentSort, setCurrentSort] = useState<SortValue>('default');
  const options = useMemo(() => [
      {
          value: 'default',
          label: 'New and Popular'
      },
      {
          value: 'lh',
          label: 'Price: Low to High'
      },
      {
          value: 'hl',
          label: 'Price: High to Low'
      },
      {
          value: 'reviews',
          label: 'Most Reviews'
      },
      {
          value: 'date',
          label: 'Publication Date'
      }
  ], []);
  const optionsDataProvider = useMemo(() => new ArrayDataProvider(options, {
      keyAttributes: 'value'
  }), [options]);

	  const getImageUrl = (url: string) => {
      const fileName = url.split('/').pop();
      return fileName ? `/styles/images/listView/${fileName}` : url;
  };

	  const getImage = (url: string): ProductImageStyle => {
      return {
          backgroundImage: `url("${getImageUrl(url)}")`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          height: '172px',
          width: '140px'
      };
  };

	  const handleSortCriteriaChanged = (event: ojSelectSingle.valueChanged<OptionData['value'], OptionData>) => {
	      const selectedSort = (event.detail.value as SortValue | null) ?? 'default';
	      setCurrentSort(selectedSort);
	      const selectedSortCriterion = sortCriteriaMap[selectedSort];
	      let sortCriteria = selectedSortCriterion ? [selectedSortCriterion] : undefined;
      currentSortCriteriaRef.current = sortCriteria;
      setDataProvider(new ListDataProviderView(baseDataProvider, {
          filterCriterion: currentFilterCriterionRef.current,
          sortCriteria: sortCriteria
      }));
  };

  const handlePriceFilterChanged = (event: ojCheckboxset.valueChanged<OptionData['value'], OptionData>) => {
      priceCriteriaRef.current = _getCriteria(event, priceFilterCriteriaMap);
      _handleFilterChanged();
  };

  const handleRatingFilterChanged = (event: ojCheckboxset.valueChanged<OptionData['value'], OptionData>) => {
      ratingCriteriaRef.current = _getCriteria(event, ratingFilterCriteriaMap);
      _handleFilterChanged();
  };

  const handleAuthorFilterChanged = (event: ojCheckboxset.valueChanged<OptionData['value'], OptionData>) => {
      authorCriteriaRef.current = _getCriteria(event, authorFilterCriteriaMap);
      _handleFilterChanged();
  };

	  const _getCriteria = (event: ojCheckboxset.valueChanged<OptionData['value'], OptionData>, criteriaMap: ProductFilterCriteriaMap) => {
	      const criteria: ProductFilterCriterion[] = [];
	      const values = event.detail.value ?? [];
	      values.forEach(function (value: string) {
          const filter = criteriaMap[value];
          if (filter) {
              criteria.push(filter);
          }
      });
      return criteria;
  };

	  const _handleFilterChanged = () => {
	      const criteria: ProductCompoundCriterion[] = [];
      if (priceCriteriaRef.current.length > 0) {
          criteria.push({ op: '$or', criteria: priceCriteriaRef.current });
      }
      if (ratingCriteriaRef.current.length > 0) {
          criteria.push({ op: '$or', criteria: ratingCriteriaRef.current });
      }
      if (authorCriteriaRef.current.length > 0) {
          criteria.push({ op: '$or', criteria: authorCriteriaRef.current });
      }
	      const filterCriterion: DataFilter.Filter<Product> | undefined = criteria.length === 0
	          ? undefined
	          : FilterFactory.getFilter({ filterDef: { op: '$and', criteria: criteria } }) as DataFilter.Filter<Product>;
      currentFilterCriterionRef.current = filterCriterion;
      setDataProvider(new ListDataProviderView(baseDataProvider, {
          filterCriterion,
          sortCriteria: currentSortCriteriaRef.current
      }));
  };

  return (
      <div id="root">
            <div class="oj-flex">
                    <div class="oj-lg-2 oj-md-3 oj-sm-only-hide oj-flex-item">
                              <div class="oj-sm-padding-2x-vertical">Refined by</div>
                              <oj-label id="price_filter_lbl">Price</oj-label>
                              <oj-checkboxset id="price_filter" labelled-by="price_filter_lbl" class="oj-sm-padding-4x-bottom" onvalueChanged={handlePriceFilterChanged}>
                                          <oj-option id="price_opt1" value="lt30">Less than $30</oj-option>
                                          <oj-option id="price_opt2" value="30to40">$30 - $39.99</oj-option>
                                          <oj-option id="price_opt3" value="40to50">$40 - $49.99</oj-option>
                                          <oj-option id="price_opt4" value="gt50">$50 and Above</oj-option>
                                      </oj-checkboxset>
                              <oj-label id="author_filter_lbl">Author</oj-label>
                              <oj-checkboxset id="author_filter" labelled-by="author_filter_lbl" class="oj-sm-padding-4x-bottom" onvalueChanged={handleAuthorFilterChanged}>
                                          <oj-option id="dcoward" value="dcoward">Danny Coward</oj-option>
                                          <oj-option id="hschildt" value="hschildt">Herbert Schildt</oj-option>
                                          <oj-option id="jmanico" value="jmanico">Jim Manico</oj-option>
                                          <oj-option id="jbrock" value="jbrock">John Brock</oj-option>
                                          <oj-option id="mnaftalin" value="mnaftalin">Maurice Naftalin</oj-option>
                                      </oj-checkboxset>
                              <oj-label id="rating_filter_lbl">Customer Reviews</oj-label>
                              <oj-checkboxset id="rating_filter" labelled-by="rating_filter_lbl" class="oj-sm-padding-4x-bottom" onvalueChanged={handleRatingFilterChanged}>
                                          <oj-option id="fivestars" value="five">5 Stars</oj-option>
                                          <oj-option id="fourstars" value="four">4 or More Stars</oj-option>
                                          <oj-option id="threestars" value="three">3 or More Stars</oj-option>
                                          <oj-option id="twostars" value="two">Less than 3 Stars</oj-option>
                                      </oj-checkboxset>
                          </div>
                    <div class="oj-lg-10 oj-md-9 oj-sm-12 oj-flex-item">
                              <div class="oj-flex">
                                          <div class="oj-lg-6 oj-md-6 oj-sm-12 oj-flex-item">
                                                        <oj-select-single id="sortBy" data={optionsDataProvider} label-hint="Sort by:" label-edge="inside" value={currentSort} class="oj-form-control-max-width-sm" onvalueChanged={handleSortCriteriaChanged} />
                                                    </div>
                                      </div>
                              <oj-list-view id="listview" aria-label="list with external sort and filter controls" class="demo-list demo-filter-sort-list oj-listview-item-padding-off" data={dataProvider} selection-mode="single" {...{ 'item.enter-key-focus-behavior': "focusWithin" }}>
	                                          <template slot="itemTemplate" render={(item: ProductItemTemplateContext) => (
                                                      <>
                                                          <oj-list-item-layout class="demo-product-layout">
                                                                            <div class="oj-typography-body-xl demo-product-title"><a href="#">{item.data.TITLE}</a></div>
                                                                            <div slot="secondary" class="demo-product-details">
                                                                                                <div class="demo-product-author">
                                                                                                                      <span>By</span>
                                                                                                                      <a href="#">{item.data.AUTHOR}</a>
                                                                                                                  </div>
                                                                                                <div class="oj-flex demo-product-meta">
                                                                                                                      <div class="oj-lg-12 oj-md-12 oj-sm-12 oj-flex-item">
                                                                                                                                              <ul class="oj-typography-body-xs demo-sku-model">
                                                                                                                                                                        <li class="oj-helper-inline-block oj-divider-end oj-divider-padding oj-divider-margin">
                                                                                                                                                                                                    <span>SKU:</span>
                                                                                                                                                                                                    <span>{item.data.ID}</span>
                                                                                                                                                                                                </li>
                                                                                                                                                                        <li class="oj-helper-inline-block oj-divider-end oj-divider-padding oj-divider-margin">
                                                                                                                                                                                                    <span>Release Date:</span>
                                                                                                                                                                                                    <span>{item.data.PUBLISH_DATE}</span>
                                                                                                                                                                                                </li>
                                                                                                                                                                        <li class="oj-helper-inline-block">
                                                                                                                                                                                                    <span>Format:</span>
                                                                                                                                                                                                    <span>Paperback</span>
                                                                                                                                                                                                </li>
                                                                                                                                                                    </ul>
                                                                                                                                          </div>
                                                                                                                  </div>
                                                                                                <div class="oj-flex demo-product-rating-row">
                                                                                                                      <div class="oj-lg-12 oj-md-12 oj-sm-12 oj-flex-item">
                                                                                                                                              <oj-rating-gauge value={item.data.RATING} readonly class="demo-gauge" aria-label="Rating provided" />
                                                                                                                                              <span class="demo-product-rating-value">{item.data.RATING}</span>
                                                                                                                                              <span>
                                                                                                                                                                        (
                                                                                                                                                                        <a href="#" class="tab-link">
                                                                                                                                                                                                    {item.data.REVIEWS}
                                                                                                                                                                                                    Reviews
                                                                                                                                                                                                </a>
                                                                                                                                                                        )
                                                                                                                                                                    </span>
                                                                                                                                          </div>
                                                                                                                  </div>
                                                                                            </div>
                                                                            <div slot="tertiary" class="demo-product-tertiary"><a class="oj-typography-body-xs" href="#">Check Shipping & Availability</a></div>
	                                                                            <div slot="trailing" style={getImage(item.data.IMAGE_URL)} />
                                                                            <div slot="quaternary" class="oj-typography-body-lg oj-typography-bold demo-product-price">{currencyConverter.format(item.data.PRICE)}</div>
                                                                            <div slot="navigation" class="demo-product-action"><a class="oj-typography-body-sm" href="#">Add to cart</a></div>
                                                                        </oj-list-item-layout>
                                                      </>
                                                    )} />
                                      </oj-list-view>
                          </div>
                </div>
        </div>
    );
};

export default ListViewFilterSortListView;
