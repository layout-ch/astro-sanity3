// structure.js
import {
    singletonDocumentListItem,
    filteredDocumentListItems,
} from 'sanity-plugin-singleton-tools';
import { HomeIcon } from '@sanity/icons';
import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S, context) =>
    S.list()
        .title('Content')
        .items([
            singletonDocumentListItem({
                S,
                context,
                type: 'home',
                title: 'Home page',
                id: 'home',
                icon: HomeIcon,
            }),
            S.divider(),
            ...filteredDocumentListItems({ S, context }),
        ]);