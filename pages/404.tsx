import Custom404Page, {
  Custom404Strings,
} from '@ircsignpost/signpost-base/dist/src/404-page';
import CookieBanner from '@ircsignpost/signpost-base/dist/src/cookie-banner';
import { MenuOverlayItem } from '@ircsignpost/signpost-base/dist/src/menu-overlay';
import {
  CategoryWithSections,
  ZendeskCategory,
  getTranslationsFromDynamicContent,
} from '@ircsignpost/signpost-base/dist/src/zendesk';
import { GetStaticProps } from 'next';
import getConfig from 'next/config';

import {
  ABOUT_US_ARTICLE_ID,
  CATEGORIES_TO_HIDE,
  CATEGORY_ICON_NAMES,
  GOOGLE_ANALYTICS_IDS,
  REVALIDATION_TIMEOUT_SECONDS,
  SEARCH_BAR_INDEX,
  SECTION_ICON_NAMES,
  SITE_TITLE,
  USE_CAT_SEC_ART_CONTENT_STRUCTURE,
  ZENDESK_AUTH_HEADER,
} from '../lib/constants';
import {
  LOCALES,
  Locale,
  getLocaleFromCode,
  getZendeskLocaleId,
} from '../lib/locale';
import { getHeaderLogoProps } from '../lib/logo';
import { getFooterItems, getMenuItems } from '../lib/menu';
import {
  COMMON_DYNAMIC_CONTENT_PLACEHOLDERS,
  ERROR_DYNAMIC_CONTENT_PLACEHOLDERS,
  populateCustom404Strings,
  populateMenuOverlayStrings,
} from '../lib/translations';
import { getZendeskMappedUrl, getZendeskUrl } from '../lib/url';

interface Custom404Props {
  currentLocale: Locale;
  // Page title.
  title: string;
  strings: Custom404Strings;
  // A list of |MenuOverlayItem|s to be displayed in the header and side menu.
  menuOverlayItems: MenuOverlayItem[];
  footerLinks?: MenuOverlayItem[];
}

export default function Custom404({
  currentLocale,
  title,
  strings,
  menuOverlayItems,
  footerLinks,
}: Custom404Props) {
  const { publicRuntimeConfig } = getConfig();

  return (
    <Custom404Page
      currentLocale={currentLocale}
      locales={LOCALES}
      title={title}
      strings={strings}
      menuOverlayItems={menuOverlayItems}
      headerLogoProps={getHeaderLogoProps(currentLocale)}
      searchBarIndex={SEARCH_BAR_INDEX}
      footerLinks={footerLinks}
      signpostVersion={publicRuntimeConfig?.version}
      cookieBanner={
        <CookieBanner
          strings={strings.cookieBannerStrings}
          googleAnalyticsIds={GOOGLE_ANALYTICS_IDS}
        />
      }
    />
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const currentLocale: Locale = getLocaleFromCode(locale ?? 'en-us');

  let dynamicContent = await getTranslationsFromDynamicContent(
    getZendeskLocaleId(currentLocale),
    COMMON_DYNAMIC_CONTENT_PLACEHOLDERS.concat(
      ERROR_DYNAMIC_CONTENT_PLACEHOLDERS
    ),
    getZendeskUrl(),
    ZENDESK_AUTH_HEADER
  );

  const strings: Custom404Strings = populateCustom404Strings(dynamicContent);

  const menuOverlayItems = getMenuItems(
    populateMenuOverlayStrings(dynamicContent)
  );

  const footerLinks = getFooterItems(
    populateMenuOverlayStrings(dynamicContent)
  );

  return {
    props: {
      currentLocale,
      strings,
      menuOverlayItems,
      title: strings.errorStrings.subtitle?.concat(' - ', SITE_TITLE),
      footerLinks,
    },
    revalidate: REVALIDATION_TIMEOUT_SECONDS,
  };
};
