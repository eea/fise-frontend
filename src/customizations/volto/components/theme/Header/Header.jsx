import React from 'react';
import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { Logo, Navigation, Breadcrumbs } from '@plone/volto/components';
import HeaderImage from '~/components/theme/Header/HeaderImage';
import HomepageSlider from '~/components/theme/Header/HomepageSlider';
import MobileSearchWidget from '~/components/theme/MobileSearchWidget/MobileSearchWidget';
import Sticky from 'react-stickynode';
import HeaderBackground from './header-bg.png';
import axios from 'axios';
import {
  getBasePath,
  getNavigationByParent,
} from 'components/manage/Blocks/NavigationBlock/helpers';

const Header = (props) => {
  const [isHomepage, setIsHomePage] = React.useState(
    props.actualPathName === '/',
  );

  const [inheritedImage, setInheritedImage] = React.useState('');
  const [inheritedText, setInheritedText] = React.useState('');
  const [navigationItems, setNavigationItems] = React.useState('');

  React.useEffect(() => {
    if (props.actualPathName) {
      setIsHomePage(props.actualPathName === '/');
    }
  }, [props.actualPathName, props.frontPageSlides]);

  React.useEffect(() => {
    const { inheritLeadingData, parentData, leadNavigation } = props.extraData;
    if (inheritLeadingData && props.extraData) {
      const parentUrl = parentData['@id'];
      axios
        .get(parentUrl, {
          headers: {
            accept: 'application/json',
          },
        })
        .then((response) => {
          const parentImage =
            response.data && response.data.image && response.data.image.download
              ? response.data.image.download
              : '';

          const parentText =
            response.data && response.data.text && response.data.text.data
              ? response.data.text.data
              : '';

          const parentData =
            response.data && props.navItems && response.data['@id']
              ? getNavigationByParent(
                  props.navItems,
                  getBasePath(response.data['@id']),
                )
              : '';
          setInheritedImage(parentImage);
          setInheritedText(parentText);
          if (leadNavigation) {
            setNavigationItems(parentData.items);
          }
        })
        .catch((error) => {
          return error;
        });
    }
  }, [props.extraData, props.navItems]);

  const defaultHeaderImage = props.defaultHeaderImage;
  let headerImageUrl = defaultHeaderImage?.image || defaultHeaderImage;
  const pathName = props.pathname;
  const hideSearch = ['/header', '/head', '/footer'].includes(pathName);

  const { bigLeading, inheritLeadingData, leadNavigation } = props.extraData;

  return (
    <div className="header-wrapper" role="banner">
      <Sticky enabled={true} top={0}>
        <Container>
          <div className="header">
            <div className="logo-nav-wrapper space-between">
              <div className="logo">
                <Logo />
              </div>
              {!hideSearch ? (
                <div className="nav-actions-mobile large screen hidden">
                  <div className="search-widget">
                    <MobileSearchWidget pathname={props.pathname} />
                  </div>
                </div>
              ) : null}
              <Navigation
                navigation={props.navigationItems}
                pathname={props.pathname}
              />
            </div>
          </div>
        </Container>
      </Sticky>
      <Container>
        <div className={`header-bg ${isHomepage ? 'homepage' : 'contentpage'}`}>
          <img src={HeaderBackground} alt="" />
        </div>

        {isHomepage ? (
          <HomepageSlider items={props.frontpage_slides} />
        ) : (
          <div style={{ position: 'relative' }}>
            <Breadcrumbs pathname={props.pathname} />

            <HeaderImage
              bigImage={bigLeading}
              leadNavigation={leadNavigation}
              navigationItems={navigationItems}
              metadata={inheritLeadingData ? inheritedText : ''}
              url={inheritLeadingData ? inheritedImage : headerImageUrl}
            />
          </div>
        )}
      </Container>
    </div>
  );
};
export default connect((state) => ({
  token: state.userSession.token,
  navItems: state.navigation?.items,
}))(Header);
