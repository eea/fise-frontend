import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  ResponsiveContainer,
  BarChart,
  Area,
  AreaChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

import Helmet from 'react-helmet';
import { Container, Image } from 'semantic-ui-react';
import { map } from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  // setFolderHeader,
  setFolderTabs, getParentFolderData } from '~/actions';

import { settings, tiles } from '~/config';

import {
  getTilesFieldname,
  getTilesLayoutFieldname,
  hasTilesData,
} from '@plone/volto/helpers';

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
  { name: '01', uv: 31, Species: 9 },
  { name: '04', uv: 22, Species: 18 },
  { name: '07', uv: 2, Species: 38 },
  { name: '10', uv: 24, Species: 16 },
  { name: '18', uv: 21, Species: 19 },
];

const coverage = [
  { name: '01', uv: 5, pv: 8, amt: 12 },
  { name: '04', uv: 7, pv: 13, amt: 3 },
  { name: '07', uv: 6, pv: 15, amt: 19 },
  { name: '10', uv: 3, pv: 12, amt: 8 },
  { name: '18', uv: 5, pv: 15, amt: 9 },
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
          <YAxis unit="Kha" />
          <Tooltip />
          <Bar dataKey="Species" stackId="a" fill="#cc4400" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

class AreaBarChart extends Component {
  render() {
    return (
      <ResponsiveContainer>
        <AreaChart
          width={500}
          height={400}
          data={coverage}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis unit="M" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="uv"
            stackId="1"
            stroke="#005555"
            fill="#005555"
          />
          <Area
            type="monotone"
            dataKey="pv"
            stackId="1"
            stroke="#3d8888"
            fill="#3d8888"
          />
          <Area
            type="monotone"
            dataKey="amt"
            stackId="1"
            stroke="#7abcbc"
            fill="#7abcbc"
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}

class CountryPageView extends Component {
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
      const pathArr = nextProps.location.pathname.split('/');
      pathArr.length = 3;
      const path = pathArr.join('/');
      const tabsItems = nextProps.parent.items
        .map(i => {
          return {
            url: `${path}/${i.id}`,
            title: i.title,
            '@type': i['@type'],
          };
        })
        .filter(i => i.title !== 'folder_info');
      this.props.setFolderTabs(tabsItems);
    }
  }

  render() {
    const content = this.props.content;
    const tilesFieldname = getTilesFieldname(content);
    const tilesLayoutFieldname = getTilesLayoutFieldname(content);
    {
      /*if (!this.tabs) {
      const pathArr = this.props.location.pathname.split('/');
      pathArr.length = 3;
      const path = pathArr.join('/');
      this.props.getParentFolderData(path);
    }
    */
    }

    return hasTilesData(content) ? (
      <div id="page-document" className="ui wrapper">
        {/*this.tabs && this.tabs.length ? (
          <div
            className={
              'ui item stackable tabs menu ' +
              numberToWord[this.tabs.length]
            }
          >
            {this.tabs.map(tab, index => (
              <Link
                key={tab.url}
                className="item"
                to={tab.url}
                title={tab['@type']}
              >
                {tab.title}
              </Link>
            ))}
          </div>
        ) : (
          ''
        )*/}

        <div className="main-content">
          <div className="ui item stackable tabs menu six">
            <a className="item">Summary</a>
            <a className="item">Forest basic information</a>
            <a className="active item">Forest biodiversity and nature</a>
            <a className="item">Forest and climate</a>
            <a className="item">Forest bioeconomy</a>
            <a className="item">Forest condition</a>
          </div>

          <div className="ui active tab tab-content ">
            <div className="ui stackable two column grid">
              <div className="column">
                <div className="ui one column stackable grid">
                  <div className="column">
                    <h2>Biodiversity and nature</h2>
                    <p>
                      Forests are intimately linked to Romania's cultural,
                      economic, social and historical development. The country
                      is located in the continental temperate region, with a
                      varied relief ranging from seaside to mountain.
                    </p>
                  </div>
                </div>

                <div className="ui one column stackable grid">
                  <div className="column">
                    <div className="ui segment data-box orange-data-highlight">
                      <div className="ui grid">
                        <div className="four wide column">
                          <h5>Tree species lost</h5>
                          <div className="land-data-wrapper">
                            <div className="land-data">12</div>
                            <div className="land-data-content">
                              species threatened by extinction
                            </div>
                          </div>
                          <div className="ui bulleted list">
                            <div className="item">
                              Conifer
                              <span>8 species</span>
                            </div>
                            <div className="item">
                              Broadleaved
                              <span>4 species</span>
                            </div>
                          </div>
                          <p>Integer magna nunc, scelerisque in lacinia nec.</p>
                        </div>
                        <span className="discreet">
                          From 2001 to 2018, Romania lost 336kha of tree cover.
                        </span>
                        <div className="eight wide column">
                          <div className="chart-container">
                            <StackedBarChart />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ui one column stackable grid">
                  <div className="column">
                    <div className="ui segment data-box orange-data-highlight">
                      <div className="ui grid">
                        <div className="four wide column">
                          <h5>Species Coverage</h5>
                          <div className="chart-highlight">
                            Vestibulum eget est ac lorem dapibus lacinia.
                            Integer magna nunc, scelerisque in lacinia nec,
                            laoreet non augue. Nunc quis pharetra magna, in
                            convallis ligula.
                          </div>
                        </div>
                        <span className="discreet">
                          From 2001 to 2018, Romania lost 336kha of tree cover.
                        </span>
                        <div className="eight wide column">
                          <div className="chart-container">
                            <AreaBarChart />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ui two column stackable grid">
                  <div className="column">
                    <div className="ui segment coverage-segment">
                      <h5>Forest coverage</h5>
                      <div className="land-data-wrapper">
                        <div className="land-data">26%</div>
                        <div className="land-data-content">
                          of Romania's land surface <span>6.2 Mha</span>
                        </div>
                      </div>
                      <div className="coverage-data">
                        <div className="owned-data">
                          <span>94%</span> publicy owned
                        </div>
                        <div className="private-data">
                          <span>6%</span> private
                        </div>
                      </div>
                      <span className="discreet">2017 tree cover extent</span>
                    </div>
                  </div>

                  <div className="column">
                    <div className="ui segment data-box deadwood-segment">
                      <h5>Forest deadwood volume</h5>
                      <div className="land-data-wrapper">
                        <div className="land-data">8</div>
                        <div className="land-data-content">
                          m3/ha <br /> standing deadwood volume
                        </div>
                      </div>
                      <div className="ui bulleted list">
                        <div className="item">
                          Conifer
                          <span>94 species</span>
                        </div>
                        <div className="item">Broadleaved</div>
                      </div>
                      <span className="discreet">See all countries</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="column map-container">
                <div className="map-wrapper">
                  <iframe
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
        </div>

        <div className="country-page-content-wrapper">
          {map(content[tilesLayoutFieldname].items, tile => {
            let Tile = null;
            Tile =
              tiles.defaultTilesViewMap[content[tilesFieldname][tile]['@type']];
            return Tile !== null ? (
              <Tile
                key={tile}
                properties={content}
                data={content[tilesFieldname][tile]}
              />
            ) : (
              <div>
                {JSON.stringify(content[tilesFieldname][tile]['@type'])}
              </div>
            );
          })}
        </div>

        <div className="country-report-section">
          <div className="ui stackable two column grid">
            <div className="column">
              <h2>Country Report No 1/2019</h2>
              <p>
                Forests are rich in biodiversity and valuable for recreation,
                water regulation and soil protection. As well as for providing
                timber and other non-wood forest products, forests are important
                for mitigating climate change and for the renewable energy
                sector.
              </p>
              <button className="ui primary button">Open report</button>
            </div>

            <div className="column">
              <h2>Other reports and publications</h2>
              <div className="ui list">
                <div className="item">
                  <i className="file outline icon" />
                  <div className="content">
                    State of Europe’s Forests 2018 Report
                  </div>
                </div>
                <div className="item">
                  <i className="file outline icon" />
                  <div className="content">
                    Romania: National Forest Data 2017
                  </div>
                </div>
                <div className="item">
                  <i className="file outline icon" />
                  <div className="content">
                    State of Europe’s Forests 2017 Report
                  </div>
                </div>
                <div className="item">
                  <i className="file outline icon" />
                  <div className="content">
                    Romania: Lorem ipsum documentarium 2014
                  </div>
                </div>
                <div className="item">
                  <i className="file outline icon" />
                  <div className="content">
                    Romania: National Forest Data 2017
                  </div>
                </div>
                <div className="item">
                  <i className="file outline icon" />
                  <div className="content">
                    State of Europe’s Forests 2017 Report
                  </div>
                </div>
                <div className="item">
                  <i className="file outline icon" />
                  <div className="content">
                    Romania: Lorem ipsum documentarium 2014
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <Container id="page-document">
        {content.description && (
          <p className="documentDescription">{content.description}</p>
        )}
        {content.image && (
          <Image
            className="document-image"
            src={content.image.scales.thumb.download}
            floated="right"
          />
        )}
        {content.remoteUrl && (
          <span>
            The link address is:
            <a href={content.remoteUrl}>{content.remoteUrl}</a>
          </span>
        )}
        {content.text && (
          <div
            dangerouslySetInnerHTML={{
              __html: content.text.data.replace(
                /a href="([^"]*\.[^"]*)"/g,
                `a href="${settings.apiPath}$1/download/file"`,
              ),
            }}
          />
        )}
      </Container>
    );
  }
}

export default connect(
  state => ({
    tabs: state.folder_tabs.items,
    parent: state.parent_folder_data.items,
  }),
  mapDispatchToProps,
)(CountryPageView);
