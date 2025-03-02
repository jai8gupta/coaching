import { defineField, defineType } from "sanity";
import Image from "next/image";

export const studentType = defineType({
    name: 'student',
    title: 'Student',
    type: 'document',
    fields : [
        defineField({
            name: 'firstName',
            title: 'First Name',
            type: 'string',
        }),
        defineField({
            name: 'lastName',
            title: 'Last Name',
            type: 'string',
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
            validation: (rule) => rule.required()
        }),
        defineField({
            name: 'authId',
            title: 'Auth Id',
            type: 'string',
            validation: (rule) => rule.required()
        }),
        defineField({
            name: 'imageUrl',
            title: 'Profile image url',
            type: 'url',
        }),
    ],
    preview: {
        select: {
            firstName: "firstName",
            lastName: "lastName",
            imageUrl: "imageUrl",
        },
        prepare({firstName, lastName, imageUrl}) {
            return {
                title: `${firstName?.charAt(0).toUpperCase()}${firstName.slice(1)} ${lastName?.charAt(0).toUpperCase()}${lastName.slice(1)}`,
                media: (
                    <Image src={imageUrl} alt={`${firstName} ${lastName}`} height={100} width={100} />
                )
            }
        },
    }
})