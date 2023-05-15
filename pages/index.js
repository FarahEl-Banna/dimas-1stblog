import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import Layout, {siteTitle} from '../components/layout';
import utilStyles from "../styles/utils.module.css"
import {getSortedPostsData} from "../lib/posts" 
import Date from '../components/date';

// import fsPromises from 'fs/promises';
// import path from 'path';
export async function getStaticProps(){
  const allPostsData  = getSortedPostsData();

  // const filePath = path.join(process.cwd(), 'dbjson/movies.json');
  // const jsonData = await fsPromises.readFile(filePath);
  // const objectData = JSON.parse(jsonData);
  return {
    props: {allPostsData}
  }
}
// server side render function
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       // props for your component
//     },
//   };
// }

export default function Home({allPostsData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className={utilStyles.headingMd}>
        <p>An ex-med rep shifted my career to something I love to do, which is creative writing.
          I’m currently an English literature student interested in all kinds of life ventures.
          I’m all about enjoying life, reflecting, laughing, ditching social expectations, and thriving.
          I’m here to capture reality, present it with all its bizarre, crazy, and funny aspects, and if that is possible, present methods to overcome it.
          You’ll usually find me armed with some sort of journal and creative tools, as well as a deep desire to talk to you about anything and everything.
          I myself am healing, making adjustments to be more self-reliant, and learning to love myself.
          This is always a work in progress, I assure you.I’ve always questioned,
          "Why are some humans able to create a life they truly love, and others of us aren't?"I realized a lot of this comes down to societal expectations
           and the "roles" we play as individuals in society.So hop in and let’s start reflecting and laughing.</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title, subtitle}) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}><h1 className={utilStyles.headingMd}>{title}</h1>
              <h2 className={utilStyles.headingSm}>{subtitle}</h2>
              </Link>
              <small className={utilStyles.lightText}>
              <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
