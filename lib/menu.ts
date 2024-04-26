// Utility menu overlay functions
import type {
  MenuOverlayItem,
  MenuOverlayStrings,
} from '@ircsignpost/signpost-base/dist/src/menu-overlay';
import {
  CategoryWithSections,
  ZendeskCategory,
} from '@ircsignpost/signpost-base/dist/src/zendesk';

import { COUNTRY_SELECTOR, CountrySelectorInterface } from './constants';

export interface CustomMenuOverlayStrings extends MenuOverlayStrings {
  information: string;
  about: string;
  services: string;
}

// TODO Update footer items if needed.
export function getFooterItems(
  strings: CustomMenuOverlayStrings
): MenuOverlayItem[] {
  let items: MenuOverlayItem[] = [];
  items.push({
    key: 'ecuador',
    label: 'InfoPalante Ecuador',
    href: 'https://www.infopalanteec.org/',
  });
  items.push({
    key: 'centroamerica',
    label: 'Centroamérica: Cuéntanos ',
    href: 'https://www.cuentanos.org/',
  });
  items.push({
    key: 'México',
    label: 'México: InfoDigna',
    href: 'https://www.infodigna.org',
  });

  items.push({
    key: 'ee-uu',
    label: 'EE.UU: ImportaMi',
    href: 'https://www.importami.org/',
  });
  items.push({
    key: 'Colombia',
    label: 'Colombia: InfoPalante',
    href: 'https://www.infopalante.org/es',
  });
  return items;
}

// TODO Update menu items if needed.
export function getMenuItems(
  strings: CustomMenuOverlayStrings
): MenuOverlayItem[] {
  let items: MenuOverlayItem[] = [];
  items.push({ key: 'home', label: strings.home, href: '/' });
  items.push({
    key: 'services',
    label: strings.services,
    href: '/#service-map',
  });
  addCountrySelector(items, COUNTRY_SELECTOR);
  return items;
}
function addCountrySelector(
  items: MenuOverlayItem[],
  countries: CountrySelectorInterface[]
) {
  items.push({
    key: 0,
    label: 'Peru',
    children: countries.map((country) => {
      return { key: country.title, label: country.title, href: country.url };
    }),
  });
}
