import { defineField, defineType } from "sanity";

export const lessontType = defineType({
    name: 'lesson',
    title: 'Lesson',
    type: 'document',
    fields : [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (rule) => rule.required()
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96
            },
            validation: (rule) => rule.required()
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'videoUrl',
            title: 'Video Url',
            type: 'url',
        }),
        defineField({
            name: 'loomUrl',
            title: 'Loom Url',
            type: 'url',
            validation: (rule) => rule.custom((value)=> {
                if (!value) {
                    return true;
                }
                try {
                    const url = new URL(value);
                    if (!url.hostname.endsWith("loom.com")) {
                        return "url must be from loom";
                    }
                    if (!url.hostname.startsWith("/share/")) {
                        return "Must be a loom share url";
                    }
                    const videoId = url.pathname.split("/share/")[1];
                    if (!/^[a-f0-9-]{32, 36}/.test(videoId)) {
                        return "Invalid Loom video Id in Url";
                    }
                    return true;

                } catch (error) {
                    return "Please enter a valid url"
                }
            })
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'string',
        }),
    ],
})