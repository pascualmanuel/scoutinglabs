import type { Schema, Struct } from '@strapi/strapi';

export interface ImagesLogos extends Struct.ComponentSchema {
  collectionName: 'components_images_logos';
  info: {
    displayName: 'logos';
  };
  attributes: {};
}

export interface LinksBoxLink extends Struct.ComponentSchema {
  collectionName: 'components_links_box_links';
  info: {
    displayName: 'box_link';
  };
  attributes: {
    link: Schema.Attribute.String;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

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

export interface SliderCategoryMissionSlider extends Struct.ComponentSchema {
  collectionName: 'components_slider_category_mission_sliders';
  info: {
    displayName: 'Mission Slider';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
    video: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'images.logos': ImagesLogos;
      'links.box-link': LinksBoxLink;
      'links.link-item': LinksLinkItem;
      'slider-category.mission-slider': SliderCategoryMissionSlider;
    }
  }
}
