// Utility menu overlay functions
import type {
  MenuOverlayItem,
  MenuOverlayStrings,
} from '@ircsignpost/signpost-base/dist/src/menu-overlay';
import {
  CategoryWithSections,
  ZendeskCategory,
} from '@ircsignpost/signpost-base/dist/src/zendesk';

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
  items.push({ key: 'home', label: strings.home, href: '/' });
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
  return items;
}
