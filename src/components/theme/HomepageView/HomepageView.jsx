import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

// import Helmet from 'react-helmet';
// import { Container, Image } from 'semantic-ui-react';
// import { map } from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  // setFolderHeader,
  setFolderTabs, getParentFolderData } from '~/actions';

// import { settings, tiles } from '~/config';

// import // getTilesFieldname,
// // getTilesLayoutFieldname,
// // hasTilesData,
// '@plone/volto/helpers';

import BasicForestIMG from '~/components/theme/HomepageView/images/basic-forest.png';
import ForestCarbonIMG from '~/components/theme/HomepageView/images/forest-carbon.png';
import ForestIMG from '~/components/theme/HomepageView/images/forest.png';
import NatureIMG from '~/components/theme/HomepageView/images/nature.png';

const numberToWord = {
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
  10: 'ten',
  11: 'eleven',
  12: 'twelve',
};

const mapDispatchToProps = {
  // setFolderHeader,
  setFolderTabs,
  getParentFolderData,
};

const data = [
  { name: '00', Decidous: 4000, Conifers: 2400 },
  { name: '04', Decidous: 3000, Conifers: 1398 },
  { name: '08', Decidous: 2000, Conifers: 9800 },
  { name: '12', Decidous: 2780, Conifers: 3908 },
  { name: '16', Decidous: 1890, Conifers: 4800 },
];

class StackedBarChart extends Component {
  render() {
    return (
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Decidous" stackId="a" fill="#225511" />
          <Bar dataKey="Conifers" stackId="a" fill="#769e2e" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

class HomepageView extends Component {
  static propTypes = {
    tabs: PropTypes.array,
    content: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          description: PropTypes.string,
          url: PropTypes.string,
          image: PropTypes.object,
          image_caption: PropTypes.string,
          '@type': PropTypes.string,
        }),
      ),
    }).isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // this.props.setFolderHeader({ inCountryFolder: true });
  }

  componentWillUnmount() {
    // this.props.setFolderHeader({ inCountryFolder: false });
  }

  componentWillReceiveProps(nextProps) {
    if (
      JSON.stringify(nextProps.parent) !== JSON.stringify(this.props.parent)
    ) {
      const title = nextProps.parent.title;
      const description = nextProps.parent.description;
      const image =
        nextProps.parent.items &&
        nextProps.parent.items.find(c => c['@type'] === 'Image');
      const url = image && image.image.download;
      const inCountryFolder = true;
      // this.props.setFolderHeader({ title, description, url, inCountryFolder });
      const tabsItems = nextProps.parent.items
        .map(i => ({
          // this is ugly
          url: i['@id'].split('/Plone/')[1],
          title: i.title,
          '@type': i['@type'],
        }))
        .filter(i => i.title !== 'folder_info');
      this.props.setFolderTabs(tabsItems);
    }
  }

  render() {
    // const content = this.props.content;
    // const tilesFieldname = getTilesFieldname(content);
    // const tilesLayoutFieldname = getTilesLayoutFieldname(content);

    this.tabs = [
      { title: 'Coverage & Growth', url: '', type: 'Section' },
      { title: 'Economy', url: '', type: 'Section' },
      { title: 'Other Benefits', url: '', type: 'Section' },
    ];

    return (
      <div id="page-document" className="ui wrapper">
        <div className="main-content">
          <div className="centered-content">
            <h2>A bird's-eye view on Europe’s forests</h2>
            <p>
              Europe is one of the few regions of the world where forest cover
              has increased over the last century. The EU currently contains 5 %
              of the world's forests. Let’s take a look at factors which led to
              this net growth as well as their economical and ecological
              implication.
            </p>
          </div>

          {this.tabs && this.tabs.length ? (
            <div
              className={
                'ui home-tab item stackable tabs menu ' +
                numberToWord[this.tabs.length]
              }
            >
              {this.tabs.map((item, ix) => (
                <Link
                  key={ix}
                  className="item"
                  to={item.url}
                  title={item['@type']}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          ) : (
            ''
          )}

          <div className="ui active tab tab-content">
            <div className="ui stackable two column grid">
              <div className="column">
                <div className="ui two column stackable grid">
                  <div className="column">
                    <div className="ui segment coverage-segment">
                      <h5>Forest coverage</h5>
                      <div className="land-data-wrapper">
                        <div className="land-data">43%</div>
                        <div className="land-data-content">
                          of Europe's land surface <span>181 Mha</span>
                        </div>
                      </div>
                      <div className="coverage-data">
                        <div className="owned-data">
                          <span>71%</span> publicy owned
                        </div>
                        <div className="private-data">
                          <span>29%</span> private
                        </div>
                      </div>
                      <span className="discreet">2017 tree cover extent</span>
                    </div>
                  </div>

                  <div className="column">
                    <div className="ui segment data-box orange-data-highlight">
                      <h5>Protected forests</h5>
                      <div className="land-data-wrapper">
                        <div className="land-data">12%</div>
                        <div className="land-data-content">
                          of Europe's land surface <span>51 Mha</span>
                        </div>
                      </div>
                      <div className="ui bulleted list">
                        <div className="item">
                          Germany
                          <span>16.2Mha</span>
                        </div>
                        <div className="item">
                          Finland
                          <span>12.4Mha</span>
                        </div>
                        <div className="item">
                          Italy
                          <span>14.5Mha</span>
                        </div>
                      </div>
                      <span className="discreet">See all countries</span>
                    </div>
                  </div>
                </div>

                <div className="ui one column stackable grid">
                  <div className="column">
                    <div className="ui segment">
                      <div className="ui grid">
                        <div className="four wide column">
                          <h5>Growing stock</h5>
                          <div className="chart-hightlight">
                            Vestibulum eget est ac lorem dapibus lacinia.
                            Integer magna nunc, scelerisque in lacinia nec,
                            laoreet non augue. Nunc quis pharetra magna, in
                            convallis ligula.
                          </div>
                        </div>
                        <span className="discreet">2017 tree cover extent</span>
                        <div className="eight wide column">
                          <div className="chart-container">
                            <StackedBarChart />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="column map-container">
                <div className="map-wrapper">
                  <iframe
                    title="Test Map"
                    src="https://maps.eea.europa.eu/CopernicusViewer/?webmap=f9a8ae48d60a49f1bd9b16dba0f2c5fe&extent=-20.0,30.0,44.0,66.0&zoom=true"
                    width="100%"
                    height="490"
                  />
                </div>

                <div className="map-buttons">
                  <button className="ui primary button">Land Cover</button>
                  <button className="ui button">Map type no2</button>
                  <button className="ui button">Map type no3</button>
                </div>
              </div>
            </div>
          </div>

          <div className="thematic-areas">
            <div className="centered-content">
              <h2>Main thematic areas</h2>
              <p>
                For several decades now, environmental forest functions have
                attracted increasing attention mainly in relation to the
                protection of biodiversity and, more recently, in the context of
                climate change impacts and energy policies. Forests are
                increasingly valued for their role as regulators of climate and
                local weather, protection against natural disasters and
                renewable energy sources.
              </p>
            </div>

            <div className="ui stackable four column grid">
              <div className="column area-section">
                <div className="area-image">
                  <img src={BasicForestIMG} alt="" />
                </div>
                <div className="area-content">
                  <h5 className="area-title">Basic forest information</h5>
                  <p className="area-description">
                    Forests provide renewable raw materials and energy, maintain
                    biodiversity, and protect land and water resources.
                  </p>
                </div>
                <button className="ui button">Learn more</button>
              </div>

              <div className="column area-section">
                <div className="area-image">
                  <img src={NatureIMG} alt="" />
                </div>
                <div className="area-content">
                  <h5 className="area-title">Nature and biodiversity</h5>
                  <p className="area-description">
                    Biodiversity is the wide variety of animals, plants, their
                    habitats and their genes, and it is vital to countless human
                    activities.
                  </p>
                </div>
                <button className="ui button">Learn more</button>
              </div>

              <div className="column area-section">
                <div className="area-image">
                  <img src={ForestCarbonIMG} alt="" />
                </div>
                <div className="area-content">
                  <h5 className="area-title">Forest carbon - LULUCF</h5>
                  <p className="area-description">
                    EU climate policy which helps reduce EU greenhouse gas
                    emissions to at least 40 per cent below 1990 levels by 2030.
                  </p>
                </div>
                <button className="ui button">Learn more</button>
              </div>

              <div className="column area-section">
                <div className="area-image">
                  <img src={ForestIMG} alt="" />
                </div>
                <div className="area-content">
                  <h5 className="area-title">Forest bioeconomy</h5>
                  <p className="area-description">
                    Usin renewable biological resources to produce food,
                    materials and energy.
                  </p>
                </div>
                <button className="ui button">Learn more</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    tabs: state.folder_tabs.items,
    parent: state.parent_folder_data.items,
  }),
  mapDispatchToProps,
)(HomepageView);
