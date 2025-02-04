import React from 'react';
import styles from "./card.module.css";

type CardContent = {
    title: string;
    description: string;
    links: {
        href: string;
        name:string;
    }[]; 
    whatsapp: string;
};

type Props = {
    data: CardContent;
};

const Card = ({ data }: Props) => {
    return (
        <div className={styles.box}>
            {/* Title */}
            <div className={styles.contentHeader}>
                <h3>{data.title}</h3>
            </div>

            {/* Project Links */}
            <div className={styles.linksContainer}>
                {data.links.map((linkObj, i) => (
                    <a
                        key={i}
                        href={linkObj?.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.linkStyle}
                    >
                        🔗 {linkObj?.name}
                    </a>
                ))}
            </div>

            {/* Description */}
            <div
                className={styles.contentHolder}
                dangerouslySetInnerHTML={{ __html: data.description }}
            />

            {/* CTA Button */}
            <div className={styles.buttonHolder}>
                <a href={data.whatsapp} className={styles.buttonStyle}>Enquire Now!</a>
            </div>
        </div>
    );
};

export default Card;
