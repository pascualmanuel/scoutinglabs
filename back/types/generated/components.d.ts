import type { Schema, Struct } from '@strapi/strapi';

export interface CategoruPrueba extends Struct.ComponentSchema {
  collectionName: 'components_categoru_pruebas';
  info: {
    description: '';
    displayName: 'prueba';
    icon: 'alien';
  };
  attributes: {};
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'categoru.prueba': CategoruPrueba;
    }
  }
}
