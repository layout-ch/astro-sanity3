import { defineField, defineType } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'


export default defineType({
    name: 'home',
    title: 'Homepage',
    type: 'document',
    icon: DocumentTextIcon,
    options: {
        singleton: true, // Identify this document as a singleton
    },
    fields: [
        defineField({
            name: 'title',
            title: 'Titel',
            type: 'string',
            // hidden: true,
            // readOnly: true,
        }),

        defineField({
            name: 'sections',
            title: 'Sections',
            type: 'array',
            of: [
                {
                    type: 'hero'
                }
            ],
        }),
        defineField({
            // should match 'languageField' plugin configuration setting, if customized
            name: 'language',
            type: 'string',
            readOnly: true,
        })
    ],
    preview: {
        select: {
            title: 'title'
        }
    }

})