"use client"
import React, { useEffect } from "react";
import styles from "./page.module.css";
import Card from "@/components/Card";

const data = [
  {
    title: "Full-Stack Web Development",
    description: `<ul>
      <li>Front-End Mastery with React.js and Next.js - Build dynamic, responsive web applications using modern React features like hooks and context API.</li>
      <li>Back-End Development with Node.js and Express - Create robust REST APIs and manage server-side logic with Node.js and Express.</li>
      <li>Database Integration - Learn to integrate and manage databases like MongoDB and PostgreSQL to build full-stack applications.</li>
      <li>Deployment and CI/CD - Deploy web apps to cloud platforms (AWS, Vercel) and automate workflows with CI/CD pipelines.</li>
    </ul>`,
    links: [{href:"https://youtube-ai-agent-six.vercel.app/", name:"ChatGPT AI-Clone" },  {href:"https://sass-translator.vercel.app/", name:"A Prototype Translater Web App" }, {href: "https://www.dropbox-clone.online/", name: "Dropbox clone"}],
    whatsapp: `https://wa.me/${process.env.NEXT_PUBLIC_PHONE_NUMBER}?text=I'm%20interested%20in%20Full-Stack%20Web%20Development`
  },
  {
    title: "Android and iOS Development",
    description: `<ul>
      <li>Cross-Platform Development with React Native - Build high-performance, native-like applications for both Android and iOS using a single codebase.</li>
      <li>Native Android Development with Kotlin - Master Kotlin to develop fully native Android applications with modern programming techniques.</li>
      <li>Bridging React Native with Native Code - Extend React Native apps by integrating Kotlin and Swift for platform-specific features.</li>
      <li>End-to-End Mobile App Deployment - Learn the app development lifecycle from design to deployment on Google Play and the App Store.</li>
    </ul>`,
    links: [{href:"https://github.com/jai8gupta/coaching/releases/download/musicapp/app-release.apk", name:"Music App" },  {href:"https://github.com/jai8gupta/coaching/releases/download/racinggame/app-debug.apk", name:"A Prototype Retro Racing Game Kotlin Based" }],
    whatsapp: `https://wa.me/${process.env.NEXT_PUBLIC_PHONE_NUMBER}?text=I'm%20interested%20in%20Android%20and%20iOS%20Development`

  },
  {
    title: "Java Development",
    description: `<ul>
      <li>Core Java Programming - Master object-oriented programming concepts, data structures, and algorithms using Java.</li>
      <li>Building RESTful APIs - Learn to develop scalable APIs and web services using Spring Boot.</li>
     </ul>`,
     links: [],
     whatsapp: `https://wa.me/${process.env.NEXT_PUBLIC_PHONE_NUMBER}?text=I'm%20interested%20in%20Java%20Development`
  }
];






export default function Home() {
  // Scroll progress bar logic
  useEffect(() => {
    const handleScroll = () => {
      const scrollIndicator = document.querySelector(`.${styles.scrollIndicator}`);
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (scrollTop / scrollHeight) * 100;
      if (scrollIndicator != null) {
        // @ts-ignore
        scrollIndicator.style.width = `${scrolled}%`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className={styles.rootHome}>
      <div className={styles.scrollIndicator}></div>

      {/* Header */}
      <header>
        <div className={styles.headerBox}>
          <h1 className={styles.simpleTxt}>The Prototype Studio (Coaching the Practical Field)</h1>
        </div>
        <div className={`${styles["electric-line"]}`} />
      </header>

      {/* Cards */}
      <div className={styles.cardHolder}>
        {data.map((object, i) => (
          <Card key={i} data={object} />
        ))}
      </div>


      {/* Footer */}
      <footer className={styles.footer}>
        <p>© 2024 The Prototype Studio | All Rights Reserved</p>
        <div className={styles["social-icons"]}>
          <a href="https://www.linkedin.com/in/jai-gupta-51301b203/">LinkedIn</a>
          <a href="https://github.com/jai8gupta">GitHub</a>
        </div>
      </footer>
    </main>
  );
}
