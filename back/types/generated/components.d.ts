import type { Schema, Struct } from '@strapi/strapi';

export interface LinksLinkItem extends Struct.ComponentSchema {
  collectionName: 'components_links_link_items';
  info: {
    displayName: 'LinkItem';
    icon: 'link';
  };
  attributes: {
    link: Schema.Attribute.String;
    texto: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'links.link-item': LinksLinkItem;
    }
  }
}
