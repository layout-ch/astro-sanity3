// ./sanity.config.ts
import { defineConfig, useWorkspace, type NavbarProps } from "sanity";
import { Card, Stack, Text } from '@sanity/ui'
import { structureTool } from "sanity/structure";
import { documentInternationalization, DeleteTranslationAction } from '@sanity/document-internationalization'
import { schemaTypes } from "./src/schemas";
import { visionTool } from '@sanity/vision'
import { structure } from "./src/structure";
import { singletonTools } from 'sanity-plugin-singleton-tools';




export default defineConfig({
    name: "astro-sanity", // Can be whatever
    title: "Astro Sanity 3", // Can be whatever
    projectId: '54p00593',
    dataset: 'production',
    plugins: [structureTool({
        structure
    }), visionTool(), singletonTools(), documentInternationalization({
        // Required configuration
        supportedLanguages: [
            { id: 'fr', title: 'Français' },
            { id: 'de', title: 'Deutsch' },
            { id: 'en', title: 'English' }
        ],
        schemaTypes: ['home'],
    })],
    schema: {
        types: schemaTypes,
        // templates: (prev) =>
        //     prev.filter((template) => !['page'].includes(template.id))
    },
    document: {
        actions: (prev, { schemaType }) => {
            // Add to the same schema types you use for internationalization
            if (['page'].includes(schemaType)) {
                // You might also like to filter out the built-in "delete" action
                return [...prev, DeleteTranslationAction]
            }
            return prev
        },
    },
});