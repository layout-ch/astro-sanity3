import { defineField, defineType } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'


export default defineType({
    name: 'page',
    title: 'Pages',
    type: 'document',
    icon: DocumentTextIcon,
    fields: [
        defineField({
            name: 'title',
            title: 'Titel',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),

        defineField({
            name: 'sections',
            title: 'Sections',
            type: 'array',
            of: [

            ],
        }),
        defineField({
            // should match 'languageField' plugin configuration setting, if customized
            name: 'language',
            type: 'string',
            readOnly: true,
        })
        ,
        defineField({
            name: "coordinate",
            type: "object",
            options: {
                collapsed: true,
                columns: 2,
            },
            fields: [
                defineField({ name: "x", type: "number" }),
                defineField({ name: "y", type: "number" }),
            ],
        }),
    ],

})