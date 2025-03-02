import type { Schema, Struct } from '@strapi/strapi';

export interface AddonsSuscripciones extends Struct.ComponentSchema {
  collectionName: 'components_addons_suscripciones';
  info: {
    displayName: 'Suscripciones';
  };
  attributes: {
    annual_price: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    mensual_price: Schema.Attribute.String;
    semestral_price: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface CardBoxes extends Struct.ComponentSchema {
  collectionName: 'components_card_boxes';
  info: {
    description: '';
    displayName: 'boxes';
  };
  attributes: {
    description: Schema.Attribute.Text;
    media: Schema.Attribute.Media<'images' | 'files'>;
    title: Schema.Attribute.String;
  };
}

export interface CardCard extends Struct.ComponentSchema {
  collectionName: 'components_card_cards';
  info: {
    description: '';
    displayName: 'card';
  };
  attributes: {
    description: Schema.Attribute.Text;
    link: Schema.Attribute.String;
    second_title: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface CardDataBox extends Struct.ComponentSchema {
  collectionName: 'components_card_data_boxes';
  info: {
    displayName: 'data_box';
  };
  attributes: {
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface IconsIcons extends Struct.ComponentSchema {
  collectionName: 'components_icons_icons';
  info: {
    displayName: 'Icons';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images' | 'files'>;
    link: Schema.Attribute.String;
  };
}

export interface IconsPaises extends Struct.ComponentSchema {
  collectionName: 'components_icons_paises';
  info: {
    displayName: 'paises';
  };
  attributes: {
    country_code: Schema.Attribute.String;
    country_name: Schema.Attribute.String;
  };
}

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
    description: '';
    displayName: 'box_link';
  };
  attributes: {
    link: Schema.Attribute.String;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface LinksButtonIcon extends Struct.ComponentSchema {
  collectionName: 'components_links_button_icons';
  info: {
    displayName: 'Button Icon';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    link: Schema.Attribute.String;
    text: Schema.Attribute.String;
  };
}

export interface LinksLinkItem extends Struct.ComponentSchema {
  collectionName: 'components_links_link_items';
  info: {
    description: '';
    displayName: 'LinkItem';
    icon: 'link';
  };
  attributes: {
    link: Schema.Attribute.String;
    text: Schema.Attribute.String;
  };
}

export interface SliderCategoryMissionSlider extends Struct.ComponentSchema {
  collectionName: 'components_slider_category_mission_sliders';
  info: {
    description: '';
    displayName: 'Mission Slider';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
    video: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SliderCategorySportsSlider extends Struct.ComponentSchema {
  collectionName: 'components_slider_category_sports_sliders';
  info: {
    displayName: 'Sports Slider';
  };
  attributes: {
    bg_image: Schema.Attribute.Media<'files' | 'images'>;
    deporte: Schema.Attribute.String;
    description: Schema.Attribute.Text;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'addons.suscripciones': AddonsSuscripciones;
      'card.boxes': CardBoxes;
      'card.card': CardCard;
      'card.data-box': CardDataBox;
      'icons.icons': IconsIcons;
      'icons.paises': IconsPaises;
      'images.logos': ImagesLogos;
      'links.box-link': LinksBoxLink;
      'links.button-icon': LinksButtonIcon;
      'links.link-item': LinksLinkItem;
      'slider-category.mission-slider': SliderCategoryMissionSlider;
      'slider-category.sports-slider': SliderCategorySportsSlider;
    }
  }
}
